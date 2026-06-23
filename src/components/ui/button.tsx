import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-tight transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:shadow-[var(--glow)] hover:brightness-[1.03] active:translate-y-px",
  secondary:
    "border border-line-strong text-ink hover:border-ink hover:bg-surface active:translate-y-px",
  ghost: "px-1 text-ink-dim hover:text-ink",
};

/** Composición de clases del botón, reutilizable en client components. */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) {
  return cn(base, sizes[size], variants[variant], className);
}

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  external?: boolean;
  download?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
      )}
    </>
  );
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow,
  external,
  download,
  className,
  children,
  ...rest
}: Props) {
  const cls = cn(base, sizes[size], variants[variant], className);

  if (href) {
    const isAnchor = href.startsWith("#");
    const isExternalHref =
      external || href.startsWith("http") || href.startsWith("mailto:");

    if (isAnchor || isExternalHref || download) {
      return (
        <a
          href={href}
          className={cls}
          download={download}
          {...(isExternalHref && !href.startsWith("mailto:")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...rest}
        >
          <Inner arrow={arrow}>{children}</Inner>
        </a>
      );
    }

    return (
      <Link href={href} className={cls} {...rest}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
