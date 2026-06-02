// src/components/ui/IconArrow/IconArrow.tsx
import React, { ComponentProps } from "react";

type IconProps = ComponentProps<"svg"> & {};

const IconLinked: React.FC<IconProps> = ({ ...rest }) => {
  // Đây là code SVG của anh, đã được "dọn dẹp" cho React
  return (
    <svg
      {...rest}
      width="19"
      height="17"
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.97321 16.7447V5.44642H0.221158V16.7447H3.9736H3.97321ZM2.09797 3.9041C3.40611 3.9041 4.22052 3.03652 4.22052 1.95229C4.19603 0.843363 3.40611 0 2.12284 0C0.838696 0 0 0.843363 0 1.9522C0 3.03642 0.814112 3.904 2.07338 3.904H2.09767L2.09797 3.9041ZM6.05002 16.7447H9.80177V10.4359C9.80177 10.0987 9.82626 9.76058 9.92538 9.51972C10.1965 8.84478 10.8138 8.14611 11.8506 8.14611C13.2079 8.14611 13.7512 9.1821 13.7512 10.7011V16.7447H17.5028V10.2666C17.5028 6.79641 15.6521 5.18154 13.1836 5.18154C11.1598 5.18154 10.2709 6.31371 9.77709 7.08482H9.80206V5.44681H6.05021C6.09918 6.50673 6.04992 16.7451 6.04992 16.7451L6.05002 16.7447Z"
        fill="white"
      />
    </svg>
  );
};

export default IconLinked;
