import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

/**
 * Reusable button.
 * variant: "primary" | "secondary"
 * withArrow: shows a trailing arrow icon (used for primary CTAs)
 * as: "button" (default) | "a" | any component (e.g. React Router's Link)
 * ...rest: forwarded to whatever "as" renders (href, to, onClick, etc.)
 */
export default function Button({
  children,
  variant = "primary",
  withArrow = false,
  as = "button",
  type = "button",
  className = "",
  ...rest
}) {
  const classes = `${styles.btn} ${styles[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />}
    </>
  );

  // "as" can be a string tag ("a", "button") or an actual component (Link, NavLink, etc.)
  const Component = as;

  if (Component === "button") {
    return (
      <button type={type} className={classes} {...rest}>
        {content}
      </button>
    );
  }

  return (
    <Component className={classes} {...rest}>
      {content}
    </Component>
  );
}