import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 특정 모임의 게시글 목록 가져오기 (커서 기반 페이지네이션)
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "10");

    // 커서 기반 쿼리 구성
    const posts = await prisma.moimPost.findMany({
      where: { activityId: id },
      select: {
        id: true,
        moimPostCat: true,
        moimPostTitle: true,
        image: true,
        moimPostContent: true,
        createdAt: true,
        _count: { select: { likes: true, comments: true } },
        user: { select: { user_id: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit + 1, // 한 개 더 가져와서 다음 페이지 존재 여부 확인
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1, // 커서 자체는 제외
      }),
    });

    // 다음 페이지 존재 여부 확인
    const hasMore = posts.length > limit;
    const postsToReturn = hasMore ? posts.slice(0, limit) : posts;
    const nextCursor = hasMore
      ? postsToReturn[postsToReturn.length - 1].id
      : null;

    return NextResponse.json({
      posts: postsToReturn,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
