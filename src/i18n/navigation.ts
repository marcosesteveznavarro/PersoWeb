import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Wrappers de navegación con awareness de locale. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
