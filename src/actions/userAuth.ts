"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return null;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    
    // ✅ user_id로 user_data 찾아서 실제 id 반환
    const userData = await prisma.user_data.findUnique({
      where: { user_id: decoded.userId },
      select: { 
        id: true,           // ← 이게 중요!
        user_name: true,
        user_email: true,
      },
    });
    
    if (!userData) {
      return null;
    }
    
    return {
      userId: userData.id,  // ✅ user_data.id 반환 (user_id 아님!)
      userName: userData.user_name,
      userEmail: userData.user_email,
    };
  } catch (error) {
    console.error("Error in getUser:", error);
    return null;
  }
}

export async function getUserName() {
  try {
    const user = await getUser();
    if (!user) {
      return null;
    }
    const userData = await prisma.user_data.findUnique({
      where: {
        user_id: user.userId,
        user_state: "0", // 정상 회원만 조회
      },
      select: { user_name: true },
    });
    return userData?.user_name || null;
  } catch (error) {
    console.error("Error fetching user name:", error);
    return null;
  }
}

export async function deleteUser() {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, error: "로그인이 필요합니다." };
    }

    // user_state를 1로 변경하여 회원 탈퇴 처리
    await prisma.user_data.update({
      where: { user_id: user.userId },
      data: { user_state: "1" },
    });

    // 쿠키에서 토큰 제거
    const cookieStore = await cookies();
    cookieStore.delete("token");

    return { success: true };
  } catch (error) {
    console.error("회원 탈퇴 오류:", error);
    return { success: false, error: "회원 탈퇴 중 오류가 발생했습니다." };
  }
}
