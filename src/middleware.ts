import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const offset = request.cookies.get("timezoneOffset")?.value;
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const base = request.nextUrl.origin;
  if (
    typeof offset === "undefined" ||
    parseInt(offset) > 24 ||
    parseInt(offset) < -24
  ) {
    return NextResponse.redirect(`${base}/loading?to=${pathname}${search}`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/events/:path*"],
};
