import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 모든 지역 조회
export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      include: {
        _count: {
          select: { activities: true }, // 각 지역의 활동 개수
        },
      },
      orderBy: {
        code: 'asc', // 지역 코드 순서대로
      },
    });
    
    return NextResponse.json(locations);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: '지역 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}