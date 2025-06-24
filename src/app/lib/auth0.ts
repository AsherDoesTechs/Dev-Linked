export async function exchangeCodeForToken(code: string) {
  const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
    }),
  });

  if (!response.ok) {
    console.error("❌ Token exchange failed:", await response.text());
    return null;
  }

  const data = await response.json();
  return {
    access_token: data.access_token,
    id_token: data.id_token,
    expires_in: data.expires_in,
    token_type: data.token_type,
  };
}
