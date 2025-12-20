import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

const handleI18n = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // 1. Run Supabase middleware to refresh session (updates request cookies)
  const response = await updateSession(request);

  // 2. Run next-intl middleware with the updated request
  const intlResponse = handleI18n(request);

  // 3. Merge cookies from Supabase response into next-intl response
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
    '/', '/(ar|en)/:path*'
  ],
};
