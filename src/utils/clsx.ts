import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// --- CẤU HÌNH QUY TẮC MERGE ---
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // DẠY TAILWIND-MERGE NHẬN BIẾT FONT-SIZE
      "font-size": [
        {
          text: [
            // Quy tắc 1: Bắt đầu bằng "hs" (VD: text-hs32, text-hs48...)
            (value: string) => /^hs/.test(value),
            // Quy tắc 2: Bắt đầu bằng "t" + số (VD: text-t14, text-t16...)
            (value: string) => /^t\d/.test(value),
          ],
        },
      ],
      // Các class "text-..." còn lại (như text-dark, text-red)
      // nó sẽ tự động hiểu là màu (Text Color) -> Không cần config thêm.
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
