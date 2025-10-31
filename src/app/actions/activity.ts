'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/actions/userAuth';

interface ActivityData {
  title: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  duration: string;
  maxParticipants: string;
  difficultyLevel: string;
  price: string;
  organizer: string;
  phone: string;
  email: string;
}

export async function createActivity(data: ActivityData) {
  try {
    // 로그인 확인
    const user = await getUser();
    if (!user?.userId) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    // 카테고리 찾기
    const category = await prisma.category.findUnique({
      where: { name: data.category },
    });

    if (!category) {
      return { success: false, error: '유효하지 않은 카테고리입니다.' };
    }

    // 지역 찾기
    const location = await prisma.location.findUnique({
      where: { name: data.location },
    });

    if (!location) {
      return { success: false, error: '유효하지 않은 지역입니다.' };
    }

    // 활동(모임) 생성
    const activity = await prisma.activity.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        time: data.time,
        address: data.address,
        duration: parseInt(data.duration),
        maxParticipants: parseInt(data.maxParticipants),
        difficultyLevel: data.difficultyLevel,
        price: parseInt(data.price || '0'),
        organizer: data.organizer,
        phone: data.phone,
        email: data.email,
        categoryId: category.id,
        locationId: location.id,
        userId: user.userId, // 작성자 ID 추가
      },
      include: {
        category: true,
        location: true,
      },
    });

    // 캐시 갱신
    revalidatePath('/activities');

    return { success: true, data: activity };
  } catch (error) {
    console.error('Activity creation error:', error);
    return { success: false, error: '모임 생성에 실패했습니다.' };
  }
}