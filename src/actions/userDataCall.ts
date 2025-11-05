"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function getUserIdNameEmail() {
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
        id: true, // ← 이게 중요!
        user_name: true,
        user_email: true,
      },
    });

    if (!userData) {
      return null;
    }

    return {
      userId: userData.id, // ✅ user_data.id 반환 (user_id 아님!)
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
    const user = await getUserIdNameEmail();
    if (!user) {
      return null;
    }
    return user.userName || null;
  } catch (error) {
    console.error("Error fetching user name:", error);
    return null;
  }
}
