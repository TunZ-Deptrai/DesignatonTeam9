# Designathon 2026 — Team 9

## Project Overview

- Client: MỘC STUDIO
- Target market: Manila, Philippines
- Project type: Responsive web application supporting desktop and mobile browsers.
- Tech stack: React 19 + TypeScript + Vite 8 + Tailwind CSS v4.

Các nội dung vẫn chưa được team quyết định:

- Primary target audience — đối tượng mục tiêu chính.
- Problem statement — phát biểu vấn đề.
- Core service moment — thời điểm trải nghiệm dịch vụ cốt lõi.
- Final user flow — luồng người dùng cuối cùng.
- Detailed features — các tính năng chi tiết.
- Desktop-first or mobile-first layout — hướng triển khai layout.

Layout sẽ tuân theo thiết kế Figma được team duyệt; không mặc định sản phẩm bắt buộc mobile-first.

## Môi trường

- Node.js 24.x
- npm (máy khởi tạo dùng npm 11.11.0)

## Chạy dự án

Sau khi clone hoặc cập nhật package-lock.json:

```sh
npm ci
npm run dev
```

Mở địa chỉ mà Vite hiển thị trong terminal. Dừng server bằng Ctrl+C.

```sh
npm run build
npm run lint
npm run preview
```

Build xuất ra thư mục dist. Khi deploy Vercel, chọn Node.js 24.x, build command npm run build và output directory dist.

## Cấu trúc source

- src/app/: thành phần gốc và cấu hình ứng dụng.
- src/components/ui/: UI dùng chung; hiện để trống.
- src/features/: mỗi user flow sẽ có thư mục riêng; chưa tạo feature.
- src/assets/: ảnh, icon và tài nguyên dùng trong source; hiện để trống.
- src/styles/: CSS toàn cục và import Tailwind.
- src/main.tsx: điểm khởi động React.

Các file .gitkeep giúp Git giữ lại thư mục trống. Tailwind dùng plugin @tailwindcss/vite và @import "tailwindcss" trong CSS.

## Phối hợp trong team

Sau khi bộ khung được duyệt và có commit đầu tiên trên main, mỗi người tạo branch riêng cho user flow của mình. Cập nhật main trước khi tạo branch; gửi pull request để review và merge. Giữ package-lock.json trong Git và dùng npm ci trên máy còn lại để cài đúng phiên bản dependencies.

Hiện chỉ có trang placeholder. Chưa tích hợp Motion, router hoặc thư viện UI.
