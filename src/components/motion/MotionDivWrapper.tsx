"use client";

import { createElement, ReactNode } from "react";
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

const motionComponentMap: Record<MotionElement, any> = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  a: motion.a,
  button: motion.button,
  img: motion.img,
};

const MotionWrapper = ({
  as = "div",
  children,
  ...props
}: MotionWrapperProps) => {
  if (typeof window === "undefined") {
    const {
      animate,
      initial,
      exit,
      transition,
      whileHover,
      whileTap,
      whileFocus,
      whileDrag,
      whileInView,
      viewport,
      variants,
      drag,
      dragControls,
      dragConstraints,
      dragElastic,
      dragMomentum,
      dragTransition,
      layout,
      layoutId,
      custom,
      inherit,
      onDrag,
      onDragStart,
      onDragEnd,
      onDragTransitionEnd,
      onAnimationStart,
      onAnimationComplete,
      onUpdate,
      ...domProps
    } = props;

    return createElement(
      as,
      domProps,
      as === "img" ? undefined : children
    );
  }

  const MotionComponent =
    motionComponentMap[as] ?? motionComponentMap["div"];

  if (as === "img") {
    return <MotionComponent {...props} />;
  }

  return <MotionComponent {...props}>{children}</MotionComponent>;
};

export default MotionWrapper;
