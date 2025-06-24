import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const allCookies = cookieStore.getAll();

    const sessionCookie = allCookies.find(
      (cookie: { name: string }) => cookie.name.startsWith("auth0.")
    );

    const idToken = sessionCookie?.value;

    if (!idToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decoded = jwt.decode(idToken) as JwtPayload | null;

    if (!decoded) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(decoded), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Token decode error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
