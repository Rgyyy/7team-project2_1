import { NextResponse } from "next/server";
import { getUser } from "@/actions/userDataCall";

export async function GET() {
  try {
    const user = await getUser();

    if (!user?.userId) {
      return NextResponse.json({ userId: null }, { status: 200 });
    }
    return NextResponse.json({ userId: user.userId });
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json({ userId: null }, { status: 200 });
  }
}
