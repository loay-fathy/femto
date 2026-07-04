import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match everything except Next internals, the API dir, and any path with a
  // file extension (static assets like /logo.png, /favicon.svg) so those are
  // never locale-rewritten.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
