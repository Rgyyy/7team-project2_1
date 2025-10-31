import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/userAuth';

// 모든 활동 조회 (GET 요청)
export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        category: true,
        location: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: '활동 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 새 활동 생성 (POST 요청)
export async function POST(request: Request) {
  try {
    const user = await getUser();

    // 사용자 인증 확인
    if (!user || !user.userId) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const data = await request.json();

    // 카테고리 확인
    const category = await prisma.category.findUnique({
      where: { name: data.category },
    });
    if (!category) {
      return NextResponse.json(
        { error: '유효하지 않은 카테고리입니다.' },
        { status: 400 }
      );
    }

    // 지역 확인
    const location = await prisma.location.findUnique({
      where: { name: data.location },
    });
    if (!location) {
      return NextResponse.json(
        { error: '유효하지 않은 지역입니다.' },
        { status: 400 }
      );
    }

    // 새 활동 생성
    const newActivity = await prisma.activity.create({
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
        userId: user.userId, // 인증된 사용자의 ID 사용
      },
      include: {
        category: true,
        location: true,
      },
    });

    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: '활동 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}
