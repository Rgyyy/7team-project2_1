import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    const user = await prisma.user_data.findUnique({
      where: {
        id: userId, // ✅ id로 조회 (user_id가 아님)
        user_state: "0", // 정상 회원만 조회
      },
      select: {
        user_name: true,
        user_id: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      userName: user.user_name,
      userId: user.user_id,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
