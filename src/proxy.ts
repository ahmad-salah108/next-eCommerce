import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { updateSession, createMiddlewareClient } from "@/lib/supabase/proxy";

const handleI18n = createMiddleware(routing);

function proxyRedirect(
  request: NextRequest,
  response: NextResponse,
  redirectPath: string
) {
  const redirectUrl = new URL(redirectPath, request.url);
  const redirectResponse = NextResponse.redirect(redirectUrl);
  
  // Preserve cookies from Supabase response
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
  });
  return redirectResponse;
}

export default async function proxy(request: NextRequest) {
  // 1. Run Supabase middleware to refresh session (updates request cookies)
  const response = await updateSession(request);

  // 2. Check authentication and role
  const supabase = createMiddlewareClient(request);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Extract locale from pathname (format: /locale/path or just /path)
  const pathSegments = pathname.split("/").filter(Boolean);
  const locale =
    pathSegments[0] === "ar" || pathSegments[0] === "en"
      ? pathSegments[0]
      : "en";
  const pathWithoutLocale =
    pathSegments[0] === "ar" || pathSegments[0] === "en"
      ? "/" + pathSegments.slice(1).join("/")
      : pathname;

  if (error || !user) {
    proxyRedirect(request, response, `/${locale}/sign-in`);
  }

  // If user is logged in, check their role and redirect accordingly
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    // Only redirect non-admin users away from dashboard
    // Admins can visit "/" and other routes freely
    if (
      profile?.role !== "admin" &&
      pathWithoutLocale.startsWith("/dashboard")
    ) {
      proxyRedirect(request, response, `/${locale}`);
    }
  }

  // 3. Run next-intl middleware with the updated request
  const intlResponse = handleI18n(request);

  // 4. Merge cookies from Supabase response into next-intl response
  // This ensures that any auth tokens refreshed by Supabase are not lost
  response.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value, cookie);
  });

  return intlResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/",
    "/(ar|en)/:path*",
  ],
};
