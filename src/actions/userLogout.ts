"use server";

import { cookies } from "next/headers";

export async function logoutUser() {
  try {
    // 쿠키에서 토큰 제거
    const cookieStore = await cookies();
    cookieStore.delete("token");

    console.log("로그아웃 성공");
    return { success: true };
  } catch (error) {
    console.error("로그아웃 에러:", error);
    return { success: false, error: "로그아웃 중 오류가 발생했습니다." };
  }
}
