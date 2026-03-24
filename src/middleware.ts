import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;
    
    // Protect admin routes (API and Pages)
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      if (token?.role !== "ADMIN") {
        // If it's an API route, return 403. Otherwise, next-auth handles redirect to login.
        if (pathname.startsWith("/api/")) {
          return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
        // Redirect to unauthorized or home if not admin
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/account/:path*", 
    "/admin/:path*",
    "/api/user/:path*", 
    "/api/admin/:path*"
  ],
};
