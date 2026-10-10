import { NextResponse } from "next/server";

export function middleware(request) {
  const sessionCookie = request.cookies.get("addis-eats-session")?.value;

  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);

    signInUrl.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search,
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders/:path*", "/checkout/:path*", "/kitchen/:path*"],
};