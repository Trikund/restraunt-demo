import { forwardRef, type ReactNode } from 'react';
import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';

interface PageTransitionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(
  ({ children, className = '', ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

PageTransition.displayName = 'PageTransition';

export default PageTransition;
