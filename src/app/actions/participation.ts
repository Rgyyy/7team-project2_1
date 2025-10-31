'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/actions/userAuth';

// 참여하기
export async function joinActivity(activityId: string) {
  try {
    const user = await getUser();
    if (!user?.userId) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    // 활동 확인
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      include: {
        participations: true,
      },
    });

    if (!activity) {
      return { success: false, error: '모임을 찾을 수 없습니다.' };
    }

    // 작성자는 참여 불가
    if (activity.userId === user.userId) {
      return { success: false, error: '본인이 작성한 모임에는 참여할 수 없습니다.' };
    }

    // 이미 참여했는지 확인
    const existingParticipation = await prisma.participation.findUnique({
      where: {
        activityId_userId: {
          activityId,
          userId: user.userId,
        },
      },
    });

    if (existingParticipation) {
      return { success: false, error: '이미 참여한 모임입니다.' };
    }

    // 정원 확인
    if (activity.participants >= activity.maxParticipants) {
      return { success: false, error: '참여 인원이 마감되었습니다.' };
    }

    // 참여 생성
    await prisma.participation.create({
      data: {
        activityId,
        userId: user.userId,
      },
    });

    // 참가자 수 증가
    await prisma.activity.update({
      where: { id: activityId },
      data: {
        participants: {
          increment: 1,
        },
      },
    });

    revalidatePath(`/activities/${activityId}`);
    revalidatePath('/activities');

    return { success: true, message: '모임에 참여했습니다!' };
  } catch (error) {
    console.error('Join activity error:', error);
    return { success: false, error: '참여에 실패했습니다.' };
  }
}

// 참여 취소
export async function cancelParticipation(activityId: string) {
  try {
    const user = await getUser();
    if (!user?.userId) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    const participation = await prisma.participation.findUnique({
      where: {
        activityId_userId: {
          activityId,
          userId: user.userId,
        },
      },
    });

    if (!participation) {
      return { success: false, error: '참여하지 않은 모임입니다.' };
    }

    // 참여 삭제
    await prisma.participation.delete({
      where: {
        id: participation.id,
      },
    });

    // 참가자 수 감소
    await prisma.activity.update({
      where: { id: activityId },
      data: {
        participants: {
          decrement: 1,
        },
      },
    });

    revalidatePath(`/activities/${activityId}`);
    revalidatePath('/activities');

    return { success: true, message: '참여를 취소했습니다.' };
  } catch (error) {
    console.error('Cancel participation error:', error);
    return { success: false, error: '취소에 실패했습니다.' };
  }
}

// 참여 여부 확인
export async function checkParticipation(activityId: string) {
  try {
    const user = await getUser();
    if (!user?.userId) {
      return { isParticipating: false };
    }

    const participation = await prisma.participation.findUnique({
      where: {
        activityId_userId: {
          activityId,
          userId: user.userId,
        },
      },
    });

    return { isParticipating: !!participation };
  } catch (error) {
    console.error('Check participation error:', error);
    return { isParticipating: false };
  }
}