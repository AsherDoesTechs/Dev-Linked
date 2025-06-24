import { NextResponse } from 'next/server';

export async function GET() {
  const auth0LoginUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?` +
    new URLSearchParams({
      client_id: process.env.AUTH0_CLIENT_ID!,
      redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
      response_type: 'code',
      scope: 'openid profile email',
    });

  return NextResponse.redirect(auth0LoginUrl);
}