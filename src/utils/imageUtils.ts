// src/utils/imageUtils.ts

export const generateSrcSet = (sizes: any): string => {
    if (!sizes || typeof sizes !== 'object') return '';

    const srcSetEntries: { url: string; width: number }[] = [];

    // 1. Duyệt qua tất cả các key trong object sizes
    Object.keys(sizes).forEach((key) => {
        // Chỉ xử lý các key là URL ảnh (không phải key '-width' hay '-height')
        if (!key.endsWith('-width') && !key.endsWith('-height')) {
            const url = sizes[key];
            const width = sizes[`${key}-width`]; // Tìm key width tương ứng

            // Nếu tìm thấy cặp URL và Width hợp lệ
            if (url && width && typeof width === 'number') {
                srcSetEntries.push({ url, width });
            }
        }
    });

    // 2. (Tùy chọn) Loại bỏ các ảnh trùng lặp kích thước (nếu có)
    // Dùng Map để giữ lại 1 url cho mỗi width
    const uniqueEntries = new Map();
    srcSetEntries.forEach(item => uniqueEntries.set(item.width, item.url));

    // 3. Sắp xếp từ nhỏ đến lớn (Best Practice)
    const sortedEntries = Array.from(uniqueEntries.entries())
        .sort((a, b) => a[0] - b[0]) // a[0] là width
        .map(([width, url]) => `${url} ${width}w`);

    return sortedEntries.join(', ');
};