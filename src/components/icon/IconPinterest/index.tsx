// src/components/ui/IconArrow/IconArrow.tsx
import React, { ComponentProps } from "react";

type IconProps = ComponentProps<"svg"> & {};

const IconPinterest: React.FC<IconProps> = ({ ...rest }) => {
  // Đây là code SVG của anh, đã được "dọn dẹp" cho React
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect width="24" height="24" rx="12" fill="white" />
      <path
        d="M11.4128 6.06556C9.46488 6.28836 7.5238 7.90311 7.44368 10.2097C7.39333 11.6181 7.7836 12.6747 9.09177 12.9713C9.65945 11.9453 8.90865 11.7189 8.79191 10.9767C8.31236 7.93478 12.2163 5.86034 14.2592 7.98403C15.6727 9.45454 14.7422 13.9787 12.4623 13.5084C10.2786 13.0593 13.5313 9.45806 11.7882 8.75095C10.3713 8.17634 9.61824 10.5088 10.2901 11.6673C9.89636 13.6597 9.04828 15.5371 9.39163 18.0361C10.5052 17.2082 10.8806 15.6227 11.1885 13.9693C11.7482 14.3176 12.0469 14.6799 12.7611 14.7362C15.3946 14.9449 16.8653 12.0426 16.5059 9.36542C16.1866 6.99196 13.8747 5.78412 11.4128 6.06556Z"
        fill="#FF0000"
      />
    </svg>
  );
};

export default IconPinterest;
