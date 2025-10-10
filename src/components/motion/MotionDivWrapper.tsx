"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

type MotionElement =
  | "div"
  | "section"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "a"
  | "button"
  | "img";

type MotionWrapperProps = MotionProps & {
  as?: MotionElement;
  children?: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  src?: string; // for img
  alt?: string; // for img
  style?: React.CSSProperties;
  id?: string;
  [key: string]: any;
};

const MotionWrapper = ({ as = "div", children, ...props }: MotionWrapperProps) => {
  if (typeof window === "undefined") return <>{children}</>; // SSR fallback

  switch (as) {
    case "a":
      return <motion.a {...props}>{children}</motion.a>;
    case "span":
      return <motion.span {...props}>{children}</motion.span>;
    case "section":
      return <motion.section {...props}>{children}</motion.section>;
    case "h1":
      return <motion.h1 {...props}>{children}</motion.h1>;
    case "h2":
      return <motion.h2 {...props}>{children}</motion.h2>;
    case "h3":
      return <motion.h3 {...props}>{children}</motion.h3>;
    case "p":
      return <motion.p {...props}>{children}</motion.p>;
    case "button":
      return <motion.button {...props}>{children}</motion.button>;
    case "img":
      return <motion.img {...props} />; // self-closing, no children
    case "div":
    default:
      return <motion.div {...props}>{children}</motion.div>;
  }
};

export default MotionWrapper;
