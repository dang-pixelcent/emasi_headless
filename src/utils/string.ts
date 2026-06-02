import { ScriptItem } from "@/types/general";

export const formatUppercaseFirstLetter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatSearchParams = (params: string) => {
  if (!params) return null;
  const searchParams = new URLSearchParams(params);
  const obj: any = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

export const buildMenuTree = async (items: any[]) => {
  const itemMap = new Map<number, any>();
  const roots: any[] = [];

  // Khởi tạo map và thêm trường children
  await items.forEach((item) =>
    itemMap.set(item.id, { ...item, children: [] })
  );

  // Gắn children vào parent
  await items.forEach((item) => {
    const node = itemMap.get(item.id)!;
    if (item.parentId && itemMap.has(item.parentId)) {
      itemMap.get(item.parentId)!.children!.push(node);
    } else if (item.parentId === 0) {
      roots.push(node);
    }
  });

  // Sắp xếp đệ quy theo order
  const sortTree = (nodes: any[]) => {
    nodes.sort((a, b) => a.order - b.order);
    nodes.forEach((n) => n.children && sortTree(n.children));
  };

  await sortTree(roots);
  return roots;
};

export const extractScripts = (
  html: string
): {
  scripts: ScriptItem[];
  noscripts: string[];
} => {
  const div = document.createElement("div");
  div.innerHTML = html;

  const scripts = Array.from(div.querySelectorAll("script"));
  const noscripts = Array.from(div.querySelectorAll("noscript"));

  return {
    scripts: scripts.map((s) => {
      // Lấy tất cả attributes của script
      const attributes: Record<string, string> = {};
      Array.from(s.attributes).forEach((attr) => {
        attributes[attr.name] = attr.value;
      });

      return {
        src: s.getAttribute("src"),
        async: s.hasAttribute("async"),
        content: s.innerHTML,
        attributes, // Thêm tất cả attributes
      };
    }),
    noscripts: noscripts.map((n) => n.outerHTML),
  };
};

export function injectHtml(
  position: "start" | "end",
  htmlListScripts?: ScriptItem[],
  htmlListNoScripts?: string[]
) {
  if (typeof window === "undefined") return;
  if (!document || !document.body) return;
  if (!htmlListScripts?.length && !htmlListNoScripts?.length) return;

  const insertNode = (node: Node) => {
    if (position === "start") {
      document?.body?.insertBefore(node, document.body.firstChild);
    } else {
      document.body.appendChild(node);
    }
  };

  /* ================= NOSCRIPT ================= */
  if (htmlListNoScripts?.length) {
    htmlListNoScripts.forEach((noscriptHtml) => {
      if (!noscriptHtml.trim()) return;

      const temp = document.createElement("div");
      temp.innerHTML = noscriptHtml.trim();

      Array.from(temp.children).forEach((el) => {
        if (el.tagName === "NOSCRIPT") {
          insertNode(el.cloneNode(true));
        }
      });
    });
  }

  /* ================= SCRIPT ================= */
  if (htmlListScripts?.length) {
    htmlListScripts.forEach((script) => {
      if (script.src && document.querySelector(`script[src="${script.src}"]`)) {
        return;
      }

      const scriptEl = document.createElement("script");

      // Gắn tất cả attributes (bao gồm data-widget-id, data-resources-url, etc.)
      if (script.attributes) {
        Object.entries(script.attributes).forEach(([key, value]) => {
          scriptEl.setAttribute(key, value);
        });
      }

      // Fallback nếu không có attributes object
      if (script.src && !script.attributes?.src) {
        scriptEl.src = script.src;
        scriptEl.async = !!script.async;
      }

      if (script.content) {
        scriptEl.text = script.content;
      }

      insertNode(scriptEl);
    });
  }
}
