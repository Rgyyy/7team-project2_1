import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 특정 모임의 게시글 목록 가져오기
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const posts = await prisma.moimPost.findMany({
      where: { activityId: id },
      select: {
        id: true,
        moimPostCat: true,
        moimPostTitle: true,
        moimPostContent: true,
        createdAt: true,
        _count: { select: { likes: true, comments: true } },
        user: { select: { user_id: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
