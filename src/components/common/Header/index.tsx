import { images } from "@/lib/images";
import { cn } from "@/utils/clsx";
import { ChevronDownIcon, ChevronRightIcon, SearchIcon } from "lucide-react";
import React, { ComponentProps } from "react";
import SmartLink from "../Link";
import Button from "../Button";
import { AnimatePresence, motion } from "motion/react";
import { HeaderData, Menu } from "@/types/general";
import Mobile from "./components/Mobile";
import SearchBox from "./components/SearchBox";
import CallMobile from "./components/CallMobile";

const NavigationChildItem = ({
  item,
  ...rest
}: ComponentProps<"div"> & {
  item: Menu;
}) => {
  if (!item.children || item?.children.length === 0) {
    return (
      <SmartLink
        to={item?.url || "#"}
        target={item?.target || "_self"}
        className="flex items-center rounded-[8px] p-2 md:p-2.5 lg:p-3 w-full group/child hover:bg-[#FCF3F2] "
      >
        <span className="typo-title text-gray group-hover/child:text-[#C73F2E] group-hover/child:font-semibold transition-colors text-sm md:text-base">
          {item?.label}
        </span>
      </SmartLink>
    );
  }
  return (
    <div
      {...rest}
      className=" relative flex rounded-[8px] items-center justify-between p-2 md:p-2.5 lg:p-3 cursor-pointer hover:bg-[#FCF3F2] group/child "
    >
      <span className="typo-title text-gray group-hover/child:text-[#C73F2E] group-hover/child:font-semibold transition-colors text-sm md:text-base">
        {item?.label}
      </span>
      <ChevronRightIcon className="w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 group-hover/child:text-[#C73F2E]" />
    </div>
  );
};

const NavigationItem = ({ item, index }: { item: Menu; index: number }) => {
  const [childMenu, setChildMenu] = React.useState<Menu[]>([]);
  const [currentChildIndex, setCurrentChildIndex] = React.useState<
    number | null
  >(null);
  const [childOffset, setChildOffset] = React.useState<number>(0);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const childContainerRef = React.useRef<HTMLDivElement>(null);

  if (!item?.children || item?.children.length === 0) {
    return (
      <SmartLink
        to={item?.url || "#"}
        target={item?.target || "_self"}
        className="px-2 md:px-3 lg:px-3.5 w-auto py-1.5 md:py-2 bg-[#F2F9FD] flex items-center justify-center text-[#1E1F20] relative cursor-pointer hover:font-bold"
      >
        <p className="typo-body font-normal uppercase text-xs md:text-sm lg:text-base whitespace-nowrap">
          {item?.label}
        </p>
      </SmartLink>
    );
  }

  const handleChildHover = (
    hovered: boolean,
    index?: number | null,
    children?: Menu[] | null,
    element?: HTMLDivElement | null,
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (hovered && children && element && childContainerRef.current) {
      setChildMenu(children);
      setCurrentChildIndex(index!);

      const containerRect = childContainerRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const offsetLeft = elementRect.left - containerRect.left;

      setChildOffset(offsetLeft);
    } else {
      timeoutRef.current = setTimeout(() => {
        setChildMenu([]);
        setCurrentChildIndex(null);
      }, 100);
    }
  };

  return (
    <div
      className={cn(
        "px-2 md:px-2! lg:px-0! lg:pr-[clamp(0.5rem,_-7.3214rem_+_10.7143vw,_1.25rem)]! max-[1300px]:px-2! xl:px-3 w-max py-1.5 xl:py-2 flex items-center justify-center group text-[#1E1F20] relative cursor-default",
      )}
    >
      <p className="typo-body font-normal group-hover:font-bold uppercase text-[13px] lg:text-[clamp(0.75rem,0.2027rem+0.8403vw,0.875rem)] xl:text-[clamp(0.875rem,_-0.125rem_+_1.25vw,_1rem)] whitespace-nowrap transition-all duration-500 ease-in-out">
        {item.label}
      </p>
      <ChevronDownIcon className="text-[#C73F2E]! ml-0.5 md:w-5 md:h-5 min-[1440px]:w-6 min-[1440px]:h-6 group-hover:rotate-180 transition-all duration-300 ease-in-out" />
      {item.children && (
        <div
          className={cn(
            "rounded-[16px] inline-flex w-fit absolute top-full  mt-0 lg:mt-7.5 left-0 -translate-x-30 bg-transparent opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all  duration-300 ease-in-out z-50 overflow-visible",
          )}
        >
          <div
            ref={childContainerRef}
            className={cn(
              "shadow-[3.79px_3.79px_18.96px_0px_#00000026]",
              "flex flex-col p-4 md:p-6 lg:p-8 gap-3 md:gap-4 min-w-72 md:min-w-80 lg:min-w-100 rounded-[16px] bg-white transition-all duration-300 ease-in-out",
              {
                "rounded-r-none":
                  childMenu.length > 0 && item.children?.length > 0,
              },
            )}
          >
            <div className="flex flex-col gap-1 justify-center items-start">
              {item?.url !== "#" && item?.url !== "" ? (
                <SmartLink
                  to={item?.url || "#"}
                  target={item?.target || "_self"}
                  className="typo-lead font-semibold text-[#1E1F20] text-sm md:text-base lg:text-lg"
                >
                  {item?.label}
                </SmartLink>
              ) : (
                <p className="typo-lead font-semibold text-[#1E1F20] text-sm md:text-base lg:text-lg">
                  {item?.label}
                </p>
              )}
              <p
                className={cn(
                  "text-[#707174] typo-body text-xs md:text-sm lg:text-base",
                  {
                    hidden: !item?.description,
                  },
                )}
              >
                {item?.description ?? ""}
              </p>
            </div>
            <div className="border border-[#DBDBDC] border-solid" />
            <div
              className={cn(
                "grid  gap-y-1 gap-x-4 w-full",
                item?.children.length >= 8
                  ? "grid-cols-1 xl:grid-cols-[316px_316px]"
                  : "grid-cols-1",
              )}
            >
              {item?.children.map((child, idx) => (
                <NavigationChildItem
                  key={idx}
                  item={child}
                  onMouseEnter={(e) =>
                    handleChildHover(
                      true,
                      idx,
                      child?.children,
                      e.currentTarget,
                    )
                  }
                  onMouseLeave={() => handleChildHover(false, null, [])}
                />
              ))}
            </div>
          </div>
          <AnimatePresence>
            {childMenu.length > 0 && (
              <motion.div
                key="child-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onMouseEnter={() => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                }}
                onMouseLeave={() => handleChildHover(false, null, [])}
                className={cn(
                  "transition-all duration-300 ease-in-out items-stretch",
                  "w-fit rounded-r-[16px] bg-[#F0F0F0] p-4 md:p-6 lg:p-8 flex flex-col gap-3 md:gap-4 min-w-72 md:min-w-80 lg:min-w-100",
                )}
              >
                <div className="flex flex-col gap-1 justify-center items-start">
                  <p className="typo-lead font-semibold text-[#1E1F20] text-sm md:text-base lg:text-lg">
                    {item.children?.[currentChildIndex!]?.label}
                  </p>
                </div>
                <div
                  className={cn("flex flex-col gap-y-2 gap-x-4 w-full h-full")}
                >
                  {childMenu.map((child, idx) => (
                    <SmartLink
                      to={child?.url ?? "#"}
                      target={child?.target || "_self"}
                      className="w-full p-2 hover:bg-[#F9E6E4] text-title rounded-[4px] text-xs md:text-sm lg:text-base"
                      key={idx}
                    >
                      {child.label}
                    </SmartLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

interface Props {
  headerGroup: HeaderData;
}

const Header = ({ headerGroup }: Props) => {
  console.log("headerGroup:", headerGroup);
  const phone =
    headerGroup?.phone?.title.split("<span>")[1].split("</span>")[0] || "";

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const searchButtonRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Logic: Chỉ đóng khi click KHÔNG nằm trong SearchBox VÀ KHÔNG nằm trong nút Search
      if (
        isSearchOpen && // Chỉ chạy khi đang mở
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchButtonRef.current && // Kiểm tra nút search
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearchOpen]);

  return (
    <>
      <header className="w-full fixed top-0 left-0 bg-white z-50 h-auto md:h-auto min-[1042px]:h-25 shadow-sm ">
        <CallMobile
          bookingOnline={headerGroup?.booking_mobile}
          phone={{
            ...headerGroup?.phone,
            title: phone,
          }}
        />
        <div className="flex max-w-body mx-auto w-full h-auto md:h-full justify-between items-center gap-2 md:gap-3 xl:gap-4 p-4 md:px-6 xl:pl-[41px] xl:pr-10">
          <SmartLink to="/" className="cursor-pointer w-24 shrink-0">
            <img
              src={headerGroup?.logo || images.logo}
              alt="Logo"
              className="h-auto w-full aspect-96/48"
              width={96}
              height={48}
            />
          </SmartLink>
          <Mobile
            bookingOnline={headerGroup?.booking_mobile}
            menu={headerGroup?.menu}
            logo={headerGroup?.logo_white}
          />

          <div className=" hidden min-[1042px]:flex flex-wrap items-center w-max justify-start">
            {headerGroup?.menu &&
              headerGroup?.menu?.map((item, idx) => (
                <NavigationItem key={idx} item={item} index={idx} />
              ))}
          </div>
          <div className="hidden min-[1042px]:flex items-center gap-2 md:gap-3 lg:gap-[12px] xl:gap-4 shrink-0">
            <div className="hidden lg:flex flex-col justify-center items-start">
              <SmartLink
                to={headerGroup?.phone?.url || "#"}
                target={headerGroup?.phone?.target || "_self"}
                className="typo-lead text-[#C73F2E] font-semibold text-sm xl:text-[clamp(0.875rem,0.5477rem+0.5025vw,1rem)] whitespace-nowrap xl:max-w-max max-[1085px]:max-w-[105px] max-[1085px]:whitespace-normal"
              >
                {headerGroup?.phone?.title.split("<span>")[0] || ""}
              </SmartLink>
              <SmartLink
                to={headerGroup?.phone?.url || "#"}
                target={headerGroup?.phone?.target || "_self"}
                className="text-title text-[#1E1F20] text-sm xl:text-lg whitespace-nowrap"
              >
                {phone || ""}
              </SmartLink>
            </div>
            <div className="hidden md:flex xl:block">
              <Button
                to={headerGroup?.booking_online?.url || "#"}
                target={headerGroup?.booking_online?.target || "_self"}
                className="px-3 xl:px-4 py-2 xl:py-3 text-sm lg:text-[clamp(0.75rem,-2rem+3.3333vw,1rem)] md:text-base whitespace-nowrap"
              >
                {headerGroup?.booking_online?.title || "Schedule now"}
              </Button>
            </div>
            <div className=" hidden xl:block md:flex">
              <div ref={searchButtonRef} className="inline-block">
                <Button
                  variant="outlined"
                  className="rounded-full p-2 xl:p-3"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <SearchIcon className="w-5 h-5 xl:w-6 xl:h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <SearchBox
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          ref={searchRef}
        />
      </header>
    </>
  );
};

export default Header;
