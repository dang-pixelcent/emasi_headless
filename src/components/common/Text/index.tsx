import React from "react";
import { cn } from "@/utils/clsx";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

// TextCaption component: 10px on mobile, 14px on desktop
export const TextCaption = ({ children, className, ...props }: Props) => {
  return (
    <p
      className={cn(
        "md:text-t14 text-[10px] font-body leading-normal",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};

// TextBody component: 12px for mobile, 16px for desktop
export const TextBody = ({ children, className, ...props }: Props) => {
  return (
    <p
      className={cn(
        "md:text-t16 text-[12px] font-body leading-normal",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};

// TextTitle component: 14px on mobile, 18px on desktop
export const TextTitle = ({ children, className, ...props }: Props) => {
  return (
    <p
      className={cn(
        "md:text-t18 text-[14px] font-body leading-normal",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};

// TextLead component: 16px on mobile, 20px on desktop
export const TextLead = ({ children, className, ...props }: Props) => {
  return (
    <p
      className={cn(
        "md:text-t20 text-[16px] font-body leading-normal",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};
