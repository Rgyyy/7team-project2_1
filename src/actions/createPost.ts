"use server";

import { prisma } from "@/lib/prisma";
import { MoimPostCat } from "@prisma/client";
import { redirect } from "next/navigation";
import { getUserIdNameEmail } from "@/actions/userDataCall"; // ✅ 이거 사용

export async function createPost(
  activityId: string,
  prevState: any,
  formData: FormData
) {
  try {
    // ✅ 올바른 userId 가져오기
    const user = await getUserIdNameEmail();

    if (!user) {
      return { error: "로그인이 필요합니다." };
    }

    const category = formData.get("category") as MoimPostCat;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.moimPost.create({
      data: {
        moimPostCat: category,
        moimPostTitle: title,
        moimPostContent: content,
        activityId: activityId,
        userId: user.userId, // ✅ user_data.id (PK)
      },
    });

    console.log("게시글 작성 성공");
  } catch (error: any) {
    console.error("게시글 작성 에러:", error);
    return { error: "게시글 작성 중 오류가 발생했습니다." };
  }

  redirect(`/activities/${activityId}/posts`);
}
