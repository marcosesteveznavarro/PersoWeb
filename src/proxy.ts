// Next 16 renombra `middleware` → `proxy`. next-intl se monta aquí para
// la negociación de locale y el redirect de `/` al locale por defecto.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Todo excepto api, internals de Next y archivos con extensión.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
