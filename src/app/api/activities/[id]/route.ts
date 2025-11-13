import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/actions/userDataCall";


// 특정 활동 조회
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const activity = await prisma.activity.findUnique({
      where: { id },
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
    });

    if (!activity) {
      return NextResponse.json(
        { error: "활동을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "활동을 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// 활동 수정
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user?.userId) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const data = await request.json();

    // 권한 확인
    const activity = await prisma.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      return NextResponse.json(
        { error: "모임을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (activity.userId !== user.userId) {
      return NextResponse.json(
        { error: "수정 권한이 없습니다." },
        { status: 403 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { name: data.category },
    });

    const location = await prisma.location.findUnique({
      where: { name: data.location },
    });

    if (!category || !location) {
      return NextResponse.json(
        { error: "유효하지 않은 카테고리 또는 지역입니다." },
        { status: 400 }
      );
    }

    const updatedActivity = await prisma.activity.update({
      where: { id },
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
      },
      include: {
        category: true,
        location: true,
      },
    });

    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "활동 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}

// 활동 삭제
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user?.userId) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { id } = await params;

    // 권한 확인
    const activity = await prisma.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      return NextResponse.json(
        { error: "모임을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (activity.userId !== user.userId) {
      return NextResponse.json(
        { error: "삭제 권한이 없습니다." },
        { status: 403 }
      );
    }

    await prisma.activity.delete({
      where: { id },
    });

    return NextResponse.json({ message: "활동이 삭제되었습니다." });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "활동 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}