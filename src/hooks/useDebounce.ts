import { useState, useEffect } from "react";

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Đặt bộ đếm ngược
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nếu giá trị thay đổi trước khi hết giờ -> Hủy bộ đếm cũ
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
