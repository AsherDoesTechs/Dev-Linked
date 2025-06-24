import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/?error=missing_code`);
  }

  const tokenRes = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error("Failed to exchange token:", tokenData);
    return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/?error=token_exchange_failed`);
  }

  const id_token = tokenData.id_token;

  const response = NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/`);
  response.cookies.set({
    name: 'appSession',
    value: id_token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return response;
}