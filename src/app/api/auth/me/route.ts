import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ correct, no await

    // ✅ Use cookie name that Auth0 sets by default
    const idToken = cookieStore.get("id_token")?.value || cookieStore.get("appSession")?.value;

    if (!idToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decoded = jwt.decode(idToken);

    return new Response(JSON.stringify(decoded), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error decoding token:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
