import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/actions/userDataCall";

// 모든 활동 조회 (페이지네이션 & 필터링 & 정렬)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 페이지네이션 파라미터
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;
    
    // 필터 파라미터
    const categoryFilter = searchParams.get('category');
    const locationFilter = searchParams.get('location');
    const sortBy = searchParams.get('sortBy') || 'latest';
    const searchQuery = searchParams.get('search');
    
    // where 조건 구성
    const whereCondition: any = {};
    
    if (categoryFilter && categoryFilter !== '전체') {
      const category = await prisma.category.findUnique({
        where: { name: categoryFilter },
      });
      if (category) {
        whereCondition.categoryId = category.id;
      }
    }
    
    if (locationFilter && locationFilter !== '전국') {
      const location = await prisma.location.findUnique({
        where: { name: locationFilter },
      });
      if (location) {
        whereCondition.locationId = location.id;
      }
    }
    
    // 정렬 조건 구성
    let orderBy: any;
    switch (sortBy) {
      case 'latest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'date-asc':
        orderBy = [{ date: 'asc' }, { time: 'asc' }];
        break;
      case 'date-desc':
        orderBy = [{ date: 'desc' }, { time: 'desc' }];
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }
    
    // 전체 개수 조회
    const totalCount = await prisma.activity.count({
      where: whereCondition,
    });
    
    // 페이지네이션된 데이터 조회
    const activities = await prisma.activity.findMany({
      where: whereCondition,
      include: {
        category: true,
        location: true,
        user: {
          select: {
            id: true,
            user_name: true,
            user_email: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });
    
    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / limit);
    
    console.log(`Fetched ${activities.length} activities (page ${page}/${totalPages}, sort: ${sortBy})`);
    
    return NextResponse.json({
      activities,
      totalPages,
      currentPage: page,
      totalCount,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "활동 목록을 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// 새 활동 생성
export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user?.userId) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    const category = await prisma.category.findUnique({
      where: { name: data.category },
    });
    
    if (!category) {
      return NextResponse.json(
        { error: "유효하지 않은 카테고리입니다." },
        { status: 400 }
      );
    }

    const location = await prisma.location.findUnique({
      where: { name: data.location },
    });
    
    if (!location) {
      return NextResponse.json(
        { error: "유효하지 않은 지역입니다." },
        { status: 400 }
      );
    }
    
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
        price: parseInt(data.price || "0"),
        organizer: data.organizer,
        phone: data.phone,
        email: data.email,
        categoryId: category.id,
        locationId: location.id,
        userId: user.userId,
      },
      include: {
        category: true,
        location: true,
        user: {
          select: {
            id: true,
            user_name: true,
          },
        },
      },
    });
    
    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "활동 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}