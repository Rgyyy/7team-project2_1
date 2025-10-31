"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUser() {
  try {
    // 쿠키에서 토큰 제거
    const cookieStore = await cookies();
    cookieStore.delete("token");

    console.log("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 에러:", error);
  }

  redirect("/"); // 메인 페이지로 리다이렉트
}
