import Button from "@/components/common/Button";
import { Menu } from "@/types/general";
import React from "react";
interface Props {
  bookingOnline?: {
    title: string;
    url: string;
    target?: string;
  };
  phone?: {
    title: string;
    url: string;
    target?: string;
  };
}
const CallMobile = ({ bookingOnline, phone }: Props) => {
  return (
    <div className="min-[1042px]:hidden flex gap-4 items-center border-b border-black/10 bg-[#F6FBFE] p-4">
      <Button
        className="px-5 py-2.5 text-base font-semibold shadow-sm hover:shadow-md transition-shadow w-full md:w-full lining-nums proportional-nums"
        to={bookingOnline?.url}
        target={bookingOnline?.target || "_self"}
      >
        {bookingOnline?.title || "Book now"}
      </Button>

      <Button
        className="px-5 py-2.5 text-base font-semibold shadow-sm hover:shadow-md transition-shadow w-full md:w-full lining-nums proportional-nums"
        to={phone?.url || "#"}
        target={phone?.target || "_self"}
      >
        {phone?.title || ""}
      </Button>
    </div>
  );
};

export default CallMobile;
