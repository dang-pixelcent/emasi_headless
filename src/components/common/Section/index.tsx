import { cn } from "@/utils/clsx";
import React, { ComponentProps } from "react";
import ItemOpacity from "../ItemOpacity";

const Section = ({ className, ...props }: ComponentProps<"section">) => {
  return (
    <section
      className={cn(" py-20 relative overflow-clip", className)}
      {...props}
    >
      <ItemOpacity
        className="section-container max-w-body mx-auto"
        isAnimation={true}
      >
        {props.children}
      </ItemOpacity>
    </section>
  );
};

export default Section;
