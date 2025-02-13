import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
const publicRoutes = [
  { path: "/", whenAuthenticated: "redirect" },
  { path: "/signin", whenAuthenticated: "redirect" },
];

const REDIRECT_NOT_AUTHENTICATED = "/";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("userToken");
  const publicRoute = publicRoutes.find((route) => route.path === path);

  if (!token && publicRoute) {
    return NextResponse.next();
  }
  if (token && !publicRoute) {
    const tokenDecoded = jwtDecode(token.value);

    if (tokenDecoded.exp) {
      const expirationDate = new Date(tokenDecoded.exp * 1000); // Convertendo de segundos para milissegundos
      console.log("Token expira em:", expirationDate);

      if (expirationDate < new Date()) {
        console.log("Token expirado!");
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_NOT_AUTHENTICATED;

        const response = NextResponse.redirect(redirectUrl);
        response.cookies.delete("userToken");
        return response;
      } else {
        return NextResponse.next();
      }
    } else {
      console.log("Token expiration date is undefined");
    }
  }

  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.whenAuthenticated == "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
