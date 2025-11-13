"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(prevState: any, formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const userPassword = formData.get("userPassword") as string;
    const gpsLocation = formData.get("gpsLocation") as string;
    const deviceInfo = formData.get("deviceInfo") as string;

    if (!userId || !userPassword) {
      return { error: "아이디와 비밀번호를 모두 입력해주세요." };
      // 폼단에서 처리 되어야하는데 이게 뜬다면 뭔가 문제가 있는것.
    }
    const user = await prisma.user_data.findUnique({
      where: { user_id: userId },
    });
    if (!user) {
      return { error: "존재하지 않는 사용자입니다." };
    }

    // 회원 상태 확인 (0: 정상, 1: 탈퇴)
    if (user.user_state === "1") {
      return { error: "탈퇴한 회원입니다." };
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.user_password
    );
    if (!isPasswordValid) {
      return { error: "비밀번호가 일치하지 않습니다." };
    }

    const token = jwt.sign(
      {
        userId: user.user_id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: false, // ✅ HTTP에서도 작동하도록 false로 설정 (HTTPS 사용 시 true로 변경)
      sameSite: "lax", // ✅ strict → lax 로 변경
      path: "/", // ✅ 전체 경로에서 쿠키 접근
      maxAge: 60 * 60 * 24, // 24시간
    });

    // 로그인 기록 저장, 추후 저장할 요소 추가제거 고려해봐야할듯.
    const headersList = await headers();
    let ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      headersList.get("x-client-ip") ||
      headersList.get("cf-connecting-ip") || // Cloudflare
      headersList.get("remote-addr") ||
      "unknown";
    // x-forwarded-for에 여러 IP가 있는 경우 첫 번째 IP 사용
    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "localhost";
    }
    const serverUserAgent = headersList.get("user-agent") || "unknown";

    // 클라이언트에서 전송된 정보와 서버에서 수집한 정보 결합
    const finalLocation = gpsLocation || null;
    const finalPlatform = deviceInfo || serverUserAgent;

    await prisma.login_record.create({
      data: {
        user_id: user.user_id,
        login_time: new Date(),
        login_location: finalLocation,
        login_ip: ip,
        login_platform: finalPlatform,
      },
    });
  } catch (error: any) {
    console.error("로그인 에러:", error);
    return { error: "로그인 중 오류가 발생했습니다." };
  }

  redirect("/");
}
