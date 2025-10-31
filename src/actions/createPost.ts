// 이주한
// posts/new/page.js 처리

"use server";

import { prisma } from "@/lib/prisma";
import { MoimPostCat } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
  try {
    const category = formData.get("category") as MoimPostCat;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    // 사용자 생성
    await prisma.moimPost.create({
      data: {
        moimPostCat: category,
        moimPostTitle: title,
        moimPostContent: content,
      },
    });

    console.log("게시글 작성 성공");
  } catch (error: any) {
    console.error("게시글 작성 에러");
    return { error: "게시글 작성 중 오류가 발생했습니다." };
  }

  redirect("/posts");
}
