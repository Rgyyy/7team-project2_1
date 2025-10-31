"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const userPassword = formData.get("userPassword") as string;
    const userName = formData.get("userName") as string;
    const userEmail = formData.get("userEmail") as string;
    const userMainLocation =
      (formData.get("userMainLocation") as string) || null;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(userPassword, 12);

    // 사용자 생성
    await prisma.user_data.create({
      data: {
        user_id: userId,
        user_password: hashedPassword,
        user_name: userName,
        user_email: userEmail,
        user_main_location: userMainLocation,
      },
    });

    console.log("회원가입 성공");
  } catch (error: any) {
    console.error("회원가입 에러");
    if (error.code === "P2002") {
      return { error: "이미 존재하는 사용자 ID, 이름 또는 이메일입니다." };
    }
    return { error: "회원가입 중 오류가 발생했습니다." };
  }

  redirect("/");
}
