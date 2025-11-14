import { NextResponse } from "next/server";
import { call_login_records } from "@/actions/userCallProfile";

export async function GET() {
  try {
    const userData = await call_login_records();

    if (!userData) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error("Get user profile error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
