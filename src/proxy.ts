import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./strategies/verify-token";

const publicRoutes = [
  { path: "/", whenAuthenticated: "next" },
  { path: "/auth/sign-in", whenAuthenticated: "redirect" },
  { path: "/auth/sign-up", whenAuthenticated: "redirect" },
  { path: "/auth/forgot-password", whenAuthenticated: "next" },
  { path: "/auth/reset-password", whenAuthenticated: "next" },
] as const;

const redirectWhenNotAuthenticatedRoute = "/auth/sign-in";

export default async function proxy(request: NextRequest) {
  const token = await verifyToken();
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);

  if (!token && publicRoute) {
    return NextResponse.next();
  }

  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = redirectWhenNotAuthenticatedRoute;

    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/dashboard";

    return NextResponse.redirect(redirectUrl);
  }

  if (token && !publicRoute) {
    //TODO: verify jwt expiration

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
