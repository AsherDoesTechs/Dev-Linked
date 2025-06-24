import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  if (!code) {
    return new NextResponse("Authorization code not found", { status: 400 });
  }

  return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/`);
}