// 유저 프로필 수정데이터 수정하기
"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editUserProfile(formData: FormData) {
  try {
    const userName = formData.get("user_name") as string;
    const userEmail = formData.get("user_email") as string;
    const userMainLocation = formData.get("user_main_location") as string;
    const userID = formData.get("user_id") as string;

    // 입력값 검증
    if (!userName || !userEmail || !userID) {
      throw new Error("필수 필드가 누락되었습니다.");
    }

    // 현재 사용자 확인
    const currentUser = await prisma.user_data.findUnique({
      where: {
        user_id: userID,
      },
    });

    if (!currentUser) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    // 이메일 중복 확인 (현재 사용자 제외)
    const existingUser = await prisma.user_data.findFirst({
      where: {
        user_email: userEmail,
        NOT: {
          id: currentUser.id,
        },
      },
    });

    if (existingUser) {
      throw new Error("이미 사용 중인 이메일입니다.");
    }

    // 이름 중복 확인 (현재 사용자 제외)
    const existingUserName = await prisma.user_data.findFirst({
      where: {
        user_name: userName,
        NOT: {
          id: currentUser.id,
        },
      },
    });

    if (existingUserName) {
      throw new Error("이미 사용 중인 이름입니다.");
    }

    // 프로필 업데이트
    await prisma.user_data.update({
      where: {
        id: currentUser.id,
      },
      data: {
        user_name: userName,
        user_email: userEmail,
        user_main_location: userMainLocation || null,
      },
    });

    // 캐시 재검증
    revalidatePath("/profile");
    revalidatePath("/profile/edit");
  } catch (error) {
    console.error("프로필 수정 중 오류 발생:", error);
    throw error;
  }

  // 성공 시 프로필 페이지로 리다이렉트
  redirect("/profile");
}
