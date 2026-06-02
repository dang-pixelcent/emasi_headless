import React from "react";
import { Link } from "gatsby";

interface Props {
  to: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  activeClassName?: string;
  partiallyActive?: boolean;
  state?: any;
  replace?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

// 1. Lấy tất cả domain từ env
const rawDomains = [
  process.env.GATSBY_SITE_URL,
  process.env.GATSBY_SITE_URL_2,
  process.env.GATSBY_SITE_URL_3,
  process.env.GATSBY_SITE_URL_4,
].filter((url): url is string => !!url);

// 2. Tự động thêm cả phiên bản www và non-www
const internalDomains = rawDomains.flatMap((url) => {
  const cleanUrl = url.replace(/\/$/, "");
  try {
    const urlObj = new URL(cleanUrl);
    const host = urlObj.hostname;

    if (host.startsWith("www.")) {
      // Có www -> thêm phiên bản không có www
      const nonWww = cleanUrl.replace("://www.", "://");
      return [cleanUrl, nonWww];
    } else {
      // Không có www -> thêm phiên bản có www
      const withWww = cleanUrl.replace("://", "://www.");
      return [cleanUrl, withWww];
    }
  } catch {
    return [cleanUrl];
  }
});

const SmartLink: React.FC<Props> = ({
  to,
  children,
  className,
  target,
  activeClassName,
  partiallyActive,
  state,
  replace,
  onClick,
}) => {
  if (!to) return null;

  let isInternal = false;
  let finalTo = to;

  // LOGIC XỬ LÝ
  if (to.startsWith("/")) {
    // Trường hợp 1: Link tương đối -> Nội bộ
    isInternal = true;
  } else {
    // Trường hợp 2: Kiểm tra xem link có bắt đầu bằng BẤT KỲ domain nào trong list không
    const matchedDomain = internalDomains.find((domain) =>
      to.startsWith(domain),
    );

    if (matchedDomain) {
      isInternal = true;
      finalTo = to.replace(matchedDomain, "");
      if (finalTo === "") finalTo = "/";
    }
  }

  if (isInternal) {
    return (
      <Link
        onClick={onClick}
        className={className}
        to={finalTo}
        target={target}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        state={state}
        replace={replace}
        rel="noopener noreferrer"
        aria-label="link"
      >
        {children}
      </Link>
    );
  }

  // External Link
  return (
    <a
      onClick={onClick}
      className={className}
      href={to}
      target={target}
      rel="noopener noreferrer"
      aria-label="link"
    >
      {children}
    </a>
  );
};

export default SmartLink;
