// components/ItemOpacity.tsx
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, HTMLMotionProps, useInView } from "motion/react";
import { cn } from "@/utils/clsx";

interface Props extends Omit<HTMLMotionProps<"div">, "ref"> {
  children?: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  isAnimation?: boolean;
}

const ItemOpacity = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      isAnimation = true,
      className,
      delay = 0.5,
      duration = 1,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Dùng useInView để theo dõi khi element vào viewport
    const inView = useInView(internalRef, {
      once: true,
      amount: "some",
      margin: "0px 0px -50px 0px",
    });

    if (!isAnimation) {
      // Nếu không cần animation, render thẳng
      return (
        <motion.div className={cn(className)} {...props}>
          {children}
        </motion.div>
      );
    }

    // Check lần đầu khi mount - element có sẵn trong viewport không
    useEffect(() => {
      if (shouldAnimate === null && internalRef.current) {
        const rect = internalRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
          // Đang trong viewport → hiện ngay, không animate
          setShouldAnimate(false);
          setIsVisible(true);
        } else {
          // Ngoài viewport → cần animate khi scroll vào
          setShouldAnimate(true);
        }
      }
    }, [shouldAnimate]);

    // Khi inView thay đổi và cần animate
    useEffect(() => {
      if (shouldAnimate && inView) {
        setIsVisible(true);
      }
    }, [inView, shouldAnimate]);

    // Merge refs
    const setRefs = (element: HTMLDivElement | null) => {
      (internalRef as React.MutableRefObject<HTMLDivElement | null>).current =
        element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current =
          element;
      }
    };

    // Chưa check xong → hiện content để tránh flash
    if (shouldAnimate === null) {
      return (
        <motion.div ref={setRefs} className={cn(className)} {...props}>
          {children}
        </motion.div>
      );
    }

    // Không cần animate (đã trong viewport từ đầu)
    if (!shouldAnimate) {
      return (
        <motion.div ref={setRefs} className={cn(className)} {...props}>
          {children}
        </motion.div>
      );
    }

    // Cần animate
    return (
      <motion.div
        ref={setRefs}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{
          duration: duration,
          ease: [0.25, 0.1, 0.25, 1],
          delay: isVisible ? delay : 0,
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

ItemOpacity.displayName = "ItemOpacity";

export default ItemOpacity;
