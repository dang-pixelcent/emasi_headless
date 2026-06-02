import React from "react";
import { cn } from "@/utils/clsx";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export const HeadingH1 = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "text-hs40 md:text-hs64 font-heading font-normal leading-[1.2] md:leading-normal text-dark",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export const HeadingH2 = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h2
      className={cn(
        "md:text-hs48 text-[32px] font-heading md:leading-[1.4] leading-[1.2] text-dark font-medium tracking-[-0.96px]",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export const HeadingH3 = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h3
      className={cn(
        "md:text-hs32 text-[24px] font-heading leading-[1.2] text-dark font-medium tracking-[-0.72px] md:tracking-[-1.6px]",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const HeadingH4 = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h4
      className={cn(
        "md:text-t20 text-t20 font-heading leading-[1.1] text-primary font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
};
