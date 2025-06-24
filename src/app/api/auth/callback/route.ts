import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { exchangeCodeForToken } from '@/app/lib/auth0'; // custom util (see below)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const tokenRes = await exchangeCodeForToken(code);

  if (!tokenRes?.id_token) {
    return NextResponse.json({ error: 'Invalid token response' }, { status: 401 });
  }

  const response = NextResponse.redirect(new URL('/', req.url));
  response.cookies.set('appSession', tokenRes.id_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}