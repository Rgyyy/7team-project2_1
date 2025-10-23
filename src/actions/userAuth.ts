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
    return decoded;
  } catch (error) {
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
      where: { user_id: user.userId },
      select: { user_name: true },
    });
    return userData?.user_name || null;
  } catch (error) {
    console.error("Error fetching user name:", error);
    return null;
  }
}
