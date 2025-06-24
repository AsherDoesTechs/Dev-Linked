import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("appSession"); // or auth0.<name>

  const idToken = sessionCookie?.value;
  if (!idToken) {
    return new Response(JSON.stringify(null), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const decoded = jwt.decode(idToken);

  return new Response(JSON.stringify(decoded), {
    headers: { "Content-Type": "application/json" },
  });
}
