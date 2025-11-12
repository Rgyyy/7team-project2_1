// app/api/posts/[postId]/route.ts
// 게시글 수정(PATCH)과 삭제(DELETE) API 통합

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/actions/userAuth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    postId: string;
  }>;
};

// 게시글 수정 API
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { postId } = await params;
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { moimPostCat, moimPostTitle, moimPostContent } = body;

    // 입력값 검증
    if (!moimPostCat || !moimPostTitle || !moimPostContent) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // 게시글 존재 여부 및 권한 확인
    const post = await prisma.moimPost.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (post.userId !== userId) {
      return NextResponse.json(
        { error: "게시글을 수정할 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 게시글 수정
    const updatedPost = await prisma.moimPost.update({
      where: { id: postId },
      data: {
        moimPostCat,
        moimPostTitle,
        moimPostContent,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "게시글이 수정되었습니다.", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("게시글 수정 오류:", error);
    return NextResponse.json(
      { error: "게시글 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 게시글 삭제 API
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { postId } = await params;
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    // 게시글 존재 여부 및 권한 확인
    const post = await prisma.moimPost.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (post.userId !== userId) {
      return NextResponse.json(
        { error: "게시글을 삭제할 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 게시글 삭제 (관련 댓글, 좋아요도 cascade로 자동 삭제됨)
    await prisma.moimPost.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      { message: "게시글이 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("게시글 삭제 오류:", error);
    return NextResponse.json(
      { error: "게시글 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
