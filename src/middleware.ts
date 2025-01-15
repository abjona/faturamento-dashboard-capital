import { decodeFirebaseToken } from "firebase-edge-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("userToken");
  
  if (!token) {
    const loginUrl = new URL("/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Decodifique o token JWT usando a chave pública do Firebase
    await decodeFirebaseToken(token.value, "app-capital-premios");
    if (request.nextUrl.pathname == "/signin" || request.nextUrl.pathname == "/" ){
      const dashUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashUrl);
    }
    // Continue para a rota solicitada
    return NextResponse.next();
  } catch (error) {
    console.error("Token inválido ou expirado:", error);

    const loginUrl = new URL("/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};