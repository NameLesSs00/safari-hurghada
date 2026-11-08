import createMiddleware from "next-intl/middleware";

import { routing } from "./src/i18n/routing";

const handleProxy = createMiddleware(routing);

export function proxy(request: any) {
  return handleProxy(request);
}

export default handleProxy;

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
