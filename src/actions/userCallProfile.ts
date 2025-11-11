"use server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/actions/userAuth";

export async function call_login_records() {
  try {
    const user = await getUser();
    if (!user) return null;

    const userData = await prisma.user_data.findUnique({
      where: { user_id: user.userId },
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
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        participations: {
          select: {
            id: true,
            activityId: true,
            activity: {
              select: {
                id: true,
                title: true,
                difficultyLevel: true,
                participants: true,
                maxParticipants: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });
    console.log(userData);
    return userData || null;
  } catch (error) {
    return null;
  }
}
