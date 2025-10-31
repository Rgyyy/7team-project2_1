import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 모든 카테고리 조회
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { activities: true }, // 각 카테고리의 활동 개수
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: '카테고리 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}