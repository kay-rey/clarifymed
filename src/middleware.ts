import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
	const authRes = await auth0.middleware(request);

  // for now its just dashboard as the protected route
	const protectedRoutes = ["/dashboard", "/saved"];

  // check if the route is protected
	const isProtected = protectedRoutes.some(
		(route) =>
			request.nextUrl.pathname === route ||
			request.nextUrl.pathname.startsWith(`${route}/`),
	);

	if (request.nextUrl.pathname.startsWith("/auth")) {
		return authRes;
	}

	if (isProtected) {
		const session = await auth0.getSession(request);
		if (!session) {
			// user is not authenticated, redirect to login page
			return NextResponse.redirect(
				new URL("/auth/login", request.nextUrl.origin),
			);
		}
	}

	// the headers from the auth middleware should always be returned
	return authRes;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
