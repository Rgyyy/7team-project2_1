"use server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/actions/userAuth";

export async function call_login_records() {
  try {
    const user = await getUser();
    if (!user) return null;

    const userData = await prisma.user_data.findUnique({
      where: {
        user_id: user.userId,
        user_state: "0", // 정상 회원만 조회
      },
      select: {
        user_id: true,
        user_main_location: true,
        user_name: true,
        user_email: true,
        login_records: {
          select: {
            id: true,
            login_time: true,
            login_location: true,
            login_ip: true,
            login_platform: true,
          },
          orderBy: { login_time: "desc" },
          take: 5,
        },
        activities: {
          select: {
            id: true,
            title: true,
            difficultyLevel: true,
            participants: true,
            maxParticipants: true,
            price: true,
            date: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        participations: {
          select: {
            id: true,
            activityId: true,
            createdAt: true, // 가입날짜
            activity: {
              select: {
                id: true,
                title: true,
                difficultyLevel: true,
                participants: true,
                maxParticipants: true,
                price: true, // 참가비 추가
                date: true, // 모임날짜 추가
                createdAt: true, // 모임 생성날짜
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });
    // console.log(userData);
    return userData || null;
  } catch (error) {
    return null;
  }
}
