import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

/**
 * Reusable button.
 * variant: "primary" | "secondary"
 * withArrow: shows a trailing arrow icon (used for primary CTAs)
 */
export default function Button({
  children,
  variant = "primary",
  withArrow = false,
  as = "button",
  href,
  onClick,
  type = "button",
  className = "",
}) {
  const classes = `${styles.btn} ${styles[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />}
    </>
  );

  if (as === "a") {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
