import React, { ComponentProps } from "react";

type IconProps = ComponentProps<"svg"> & {};

const IconBolt = ({ ...rest }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_261_4734)">
        <path
          d="M13 3V10H19L11 21V14H5L13 3Z"
          stroke="#C73E22"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_261_4734">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconBolt;
