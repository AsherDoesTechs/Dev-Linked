import { NextResponse } from "next/server";

export async function GET() {
  const returnTo = `${process.env.AUTH0_BASE_URL}/`;
  const logoutUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` +
    new URLSearchParams({
      client_id: process.env.AUTH0_CLIENT_ID!,
      returnTo,
    });

  const response = NextResponse.redirect(logoutUrl);

  response.cookies.set("appSession", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}
