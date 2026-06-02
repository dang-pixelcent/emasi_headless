import React, { ComponentProps } from "react";
import { cn } from "@/utils/clsx";
import SmartLink from "../Link";

interface VariantStyles {
  red: string;
  orange: string;
  white: string;
}

type Props = Omit<ComponentProps<"button">, ""> & {
  variant?: "contained" | "outlined" | "text";
  color?: "red" | "orange" | "white";
  to?: string;
  target?: string;
  state?: any;
};

interface Variants {
  contained: VariantStyles;
  outlined: VariantStyles;
  text: VariantStyles;
}

const variants: Variants = {
  contained: {
    red: "bg-red text-white border border-red hover:bg-white hover:text-red ",
    orange:
      "bg-orange text-white border border-orange hover:bg-white hover:text-orange ",
    white:
      "bg-[#FAFAFA] text-orange border border-orange hover:bg-transparent hover:text-orange ",
  },
  outlined: {
    red: "bg-white text-red border border-red hover:bg-red hover:text-white ",
    orange:
      "bg-white text-orange border border-orange hover:bg-orange hover:text-white ",
    white:
      "bg-[#FAFAFA] text-orange border border-orange hover:bg-transparent hover:text-orange ",
  },
  text: {
    red: "text-red ",
    orange: "text-orange ",
    white: "text-[#FAFAFA] ",
  },
};
const Button = ({
  children,
  variant = "contained",
  color = "red",
  to,
  target,
  state,
  ...rest
}: Props) => {
  const defaultClass =
    "uppercase typo-lead font-semibold cursor-pointer px-[30.5px] py-4 flex justify-center items-center rounded-[100px] gap-2 w-auto md:w-max";
  if (to) {
    return (
      <SmartLink
        target={target}
        onClick={rest.onClick as any}
        to={to}
        state={state}
        {...rest}
        className={cn(defaultClass, variants[variant][color], rest.className)}
      >
        {children}
      </SmartLink>
    );
  }
  return (
    <button
      {...rest}
      className={cn(defaultClass, variants[variant][color], rest.className)}
      aria-label="btn"
    >
      {children}
    </button>
  );
};

export default Button;
