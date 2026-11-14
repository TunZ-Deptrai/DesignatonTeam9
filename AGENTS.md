# Designathon 2026 — Team 9

## Bối cảnh và phạm vi

- Client: MỘC STUDIO. Thị trường mở rộng: Manila, Philippines.
- Đây là cuộc thi UX/Service Design; mục tiêu là thiết kế trải nghiệm dịch vụ cốt lõi. Team hiện vẫn đang nghiên cứu.
- Chưa chốt: đối tượng mục tiêu chính, problem statement, core service moment, user flow, tính năng, desktop-first hay mobile-first và Design System cuối cùng.
- Không coi các nội dung chưa chốt là quyết định của team. Không mặc định website là thương mại điện tử cho tới khi team duyệt giải pháp cuối cùng.
- Chỉ triển khai yêu cầu đã được team duyệt; không tự tạo yêu cầu nghiệp vụ, người dùng mục tiêu, flow hoặc tính năng.
- Team đã xác nhận sản phẩm là responsive web application; không triển khai ứng dụng mobile native.
- Website phải hoạt động tốt trên trình duyệt desktop (PC/laptop) và mobile (Android/iPhone); hỗ trợ tablet khi có thể.
- GitHub: https://github.com/TunZ-Deptrai/DesignatonTeam9
- Figma: https://www.figma.com/design/hacfngIMwLdxPUJRy23vts/Designathon-2026---Team-9

## Công nghệ và cấu trúc

- Tuân theo React 19 + TypeScript + Vite 8 + Tailwind CSS v4 hiện có; dùng npm và Node.js 24.x.
- Không tự đổi stack, thay đổi kiến trúc lớn hoặc cài thêm dependencies khi chưa được phép.
- `src/app/`: app shell và cấu hình chung.
- `src/components/ui/`: UI dùng chung, ưu tiên tái sử dụng component React.
- `src/features/<flow-name>/`: code của từng flow được giao.
- `src/assets/`: hình ảnh và assets.
- `src/styles/`: global CSS.

## Figma và triển khai UI

- Figma là nguồn chuẩn cho thiết kế hình ảnh đã được team duyệt; không coi mọi frame trong file là đã duyệt.
- Dùng Figma MCP để đọc đúng frame được giao trước khi triển khai.
- Lấy thông số chính xác khi có: width, height, padding, gap, typography, màu sắc, radius, shadow, Auto Layout và assets.
- Tái sử dụng component của Design System hiện có khi phù hợp.
- Giữ đúng layout, spacing, typography, màu sắc, hình ảnh và phân cấp component.
- Không tự thay đổi UI hoặc bịa thiết kế còn thiếu. Nếu không lấy được thông số hoặc không truy cập được frame, báo rõ giới hạn và phần cần làm rõ.
- Phân biệt rõ thiết kế đã duyệt, thông tin còn thiếu và đề xuất do AI tạo; đề xuất không phải là phê duyệt triển khai.
- Kiểm tra responsive theo yêu cầu và viewport đã duyệt; không tự chọn desktop-first hay mobile-first làm yêu cầu sản phẩm.
- So sánh UI đã code với screenshot Figma khi có thể; báo rõ nếu chưa đối chiếu được.
- Không chỉnh sửa Figma nếu chưa được cho phép rõ ràng.
- Nếu chỉ có thiết kế desktop, không tự tạo một thiết kế mobile hoàn toàn mới. Đề xuất cách thích ứng responsive và xin duyệt trước khi triển khai các phần chưa được đặc tả.

## Thiết kế responsive

- Bám sát các layout Figma đã duyệt; lựa chọn desktop-first hay mobile-first theo các layout đó.
- Dùng Flexbox/Grid để xây dựng layout responsive; tránh chiều rộng cố định gây tràn ngang.
- Bảo đảm typography dễ đọc trên cả mobile và desktop; hình ảnh thích ứng với vùng chứa.
- Hỗ trợ cả thao tác chạm và chuột. Button và các phần tử tương tác phải có kích thước vùng chạm phù hợp.
- Tránh cuộn ngang, trừ khi đó là hành vi có chủ đích trong thiết kế đã duyệt.

## Prototype và motion

- Triển khai điều hướng và tương tác theo user flow đã duyệt; không tự thêm tương tác làm thay đổi UX.
- Không giả định prototype Figma chứa đầy đủ thông số animation.
- Khi motion chưa có spec, đề xuất timing, easing và hành vi trước, chờ duyệt rồi mới triển khai; đặc biệt với animation lớn hoặc phức tạp.
- Có thể dùng Motion for React khi phù hợp và được phép; việc cài package vẫn cần phê duyệt.
- Ưu tiên độ chính xác UI và tương tác hơn animation trang trí. Motion nên nhẹ, hỗ trợ khả năng sử dụng và không làm sai layout đã duyệt.
- Tôn trọng `prefers-reduced-motion`.
- Motion phải hoạt động trên cả desktop và mobile; không phụ thuộc riêng vào hover.
- Tránh animation gây layout shift hoặc làm giảm hiệu năng trên thiết bị mobile.

## Phối hợp và Git

- Nhiều lập trình viên và AI cùng làm việc qua repository chung; không ghi đè công việc của đồng đội.
- Trước khi thay đổi, kiểm tra `git status`, branch hiện tại và remote; bảo toàn thay đổi sẵn có.
- `main`: phiên bản ổn định, đã review. Không code feature trực tiếp trên `main`; không push trực tiếp vào `main`.
- `feature/flow-<name>`: mỗi user flow được giao làm trên branch riêng. Tên branch chỉ là quy ước, không xác nhận flow đã được duyệt.
- `backup/stable`: nhánh phục hồi; chỉ tạo hoặc cập nhật khi có xác nhận rõ ràng. Không tự ghi đè nhánh backup.
- Không sửa flow của đồng đội hoặc feature không liên quan khi chưa được phép.
- Thay đổi shared component và cấu hình chung phải được phối hợp với team.
- Không tự merge PR hoặc merge branch khi chưa được duyệt.
- Nếu có merge conflict, dừng và báo; không tự chọn nội dung để ghi đè.
- Chuẩn bị checkpoint trước thay đổi lớn; chỉ tạo commit/checkpoint khi được yêu cầu hoặc cho phép. Chỉ commit file liên quan; push checkpoint khi được duyệt.
- Không force-push. Không chạy `git reset --hard` hoặc `git clean` khi chưa có phê duyệt rõ ràng.
- Không xóa branch khi chưa được phép. Chỉ tạo Git tag cho mốc ổn định quan trọng khi được duyệt.

## Kiểm tra chất lượng

- Với thay đổi code, chạy `npm run build` và `npm run lint` trước khi báo hoàn thành.
- Kiểm tra feature bị ảnh hưởng và responsive tại các viewport đã duyệt; bảo đảm không làm hỏng flow khác.
- Với thay đổi UI, kiểm tra thêm các chiều rộng đại diện: mobile 375px và 390px; desktop 1280px và 1440px. Đây là kích thước kiểm tra, không tự thay thế kích thước frame hoặc breakpoint đã được duyệt.
- Kiểm tra điều hướng, spacing, typography, hình ảnh và tương tác; xác nhận không có cuộn ngang ngoài chủ đích.
- Với thay đổi chỉ có tài liệu, kiểm tra nội dung và phạm vi file; nói rõ nếu không chạy build/lint vì không thay đổi code.
- Báo lỗi trung thực, các kiểm tra đã chạy và phần chưa kiểm chứng. Không tuyên bố test thành công nếu chưa thực sự chạy.

## Minh bạch sử dụng AI và giao tiếp

- Giao tiếp với người dùng bằng tiếng Việt; giải thích các quyết định kỹ thuật quan trọng và hỏi trước khi thay đổi kiến trúc lớn.
- Sau mỗi công việc đáng kể, báo cáo: nhiệm vụ thực hiện, công cụ AI đã dùng, file thay đổi, quyết định/phê duyệt của con người, kiểm tra đã chạy và giả định chưa được kiểm chứng.
- Ghi tóm tắt này trong báo cáo công việc; không tự tạo thêm file log ngoài phạm vi được giao.
- Không bịa kết quả nghiên cứu hoặc khẳng định kết luận do AI tạo đã được người dùng thật xác thực.
- `AGENTS.md` là nguồn quy tắc dự án dùng chung cho Codex và Claude Code. `CLAUDE.md` chỉ dẫn tới file này; tránh duy trì hai bộ quy tắc trùng lặp hoặc mâu thuẫn.
