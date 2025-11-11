import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdNameEmail } from "@/actions/userDataCall";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserIdNameEmail();
    const { id } = await params;

    if (!user?.userId) {
      return NextResponse.json({ isParticipating: false });
    }

    const participation = await prisma.participation.findUnique({
      where: {
        activityId_userId: {
          activityId: id,
          userId: user.userId,
        },
      },
    });

    return NextResponse.json({ isParticipating: !!participation });
  } catch (error) {
    console.error("Check participation error:", error);
    return NextResponse.json({ isParticipating: false });
  }
}
