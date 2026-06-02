import Button from "@/components/common/Button";
import SmartLink from "@/components/common/Link";
import { MenuIcon, X, ChevronDownIcon } from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu } from "@/types/general";
import { images } from "@/lib/images";

interface Props {
  menu: Menu[];
  bookingOnline?: {
    title: string;
    url: string;
    target?: string;
  };
  logo?: string;
}

const MobileMenuItemContent = ({
  item,
  level = 0,
  onClose,
}: {
  item: Menu;
  level?: number;
  onClose: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  if (!item?.children || item?.children.length === 0) {
    return (
      <SmartLink
        to={item.url || "#"}
        target={item.target || "_self"}
        className="block px-5 py-3.5 text-[#1E1F20] hover:bg-gradient-to-r hover:from-[#F2F9FD] hover:to-[#E8F4F8] hover:text-[#0066CC] font-medium transition-all duration-300 border-b border-gray-100 last:border-b-0"
        onClick={onClose}
      >
        <span className="text-[15px]">{item?.label}</span>
      </SmartLink>
    );
  }

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-[#1E1F20] hover:bg-gradient-to-r hover:from-[#F2F9FD] hover:to-[#E8F4F8] hover:text-[#0066CC] font-semibold transition-all duration-300 "
      >
        {item?.url !== "#" && item?.url !== "" ? (
          <SmartLink
            onClick={(e: any) => {
              e.stopPropagation();
              if (item.url) {
                onClose(e);
              }
            }}
            to={item.url || "#"}
            target={item.target || "_self"}
            className="text-[15px]"
          >
            {item?.label}
          </SmartLink>
        ) : (
          <span className="text-[15px]">{item?.label}</span>
        )}
        <ChevronDownIcon
          className={`w-5 h-5 transition-all duration-300 ${
            expanded ? "rotate-180 text-[#0066CC]" : "text-gray-500"
          }`}
        />
      </button>
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`bg-gradient-to-b from-[#FAFBFC] to-white ${
              level === 0 ? "pl-4 shadow-inner" : "pl-3"
            } flex flex-col`}
          >
            {item.children.map((child, idx) => (
              <MobileMenuItemContent
                key={idx}
                item={child}
                level={level + 1}
                onClose={onClose}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Mobile = ({ menu, bookingOnline, logo }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="min-[1042px]:hidden flex gap-2 items-center">
        {/* <Button
          className="px-4 py-2.5 text-base font-semibold shadow-sm hover:shadow-md transition-shadow"
          to={bookingOnline?.url}
          target={bookingOnline?.target || "_self"}
        >
          {bookingOnline?.title || "Book now"}
        </Button> */}
        <button
          onClick={() => setIsOpen(true)}
          className="text-[#21272A] p-2.5 hover:bg-gray-100 rounded-lg transition-all "
          aria-label="Open menu"
        >
          <MenuIcon className="w-6 h-6 text-[#21272A]" strokeWidth={2.5} />
        </button>
      </div>
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            key="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden animate-in fade-in duration-200"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
              onClick={handleClose}
            />

            <div className="absolute top-0 right-0 bottom-0 w-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 bg-red shadow-md">
                <SmartLink to="/" className="cursor-pointer w-24 shrink-0">
                  <img
                    src={logo || images.logo}
                    alt="Logo"
                    className="h-auto w-full aspect-96/48"
                    width={96}
                    height={48}
                  />
                </SmartLink>
                <button
                  onClick={handleClose}
                  className="text-white p-2 hover:bg-white/20 transition-all rounded-lg "
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 overscroll-contain">
                <div className="flex flex-col py-2">
                  {menu &&
                    menu?.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                      >
                        <MobileMenuItemContent
                          item={item}
                          onClose={handleClose}
                        />
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Mobile;
