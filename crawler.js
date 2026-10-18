// =====================================================
// WEB TIN TỨC 24H
// FILE: crawler.js
// =====================================================


// =====================================================
// 1. TẠO SLUG
// =====================================================

function createSlug(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}


// =====================================================
// 2. TẠO ID
// =====================================================

function createArticleId(url) {

    const match = url.match(/(\d{10,})/);

    if (match) {
        return "dtri-" + match[1];
    }

    return "post-" + Date.now();
}


// =====================================================
// 3. HÀM TẠO BÀI VIẾT
// =====================================================

function createRealPost(
    title,
    excerpt,
    category,
    publishedAt,
    author,
    url,
    image
) {

    return {

        id: createArticleId(url),

        title: title,

        slug: createSlug(title),

        excerpt: excerpt,

        content: `
            <p>${excerpt}</p>

            <p>
                Bài viết được tổng hợp và tóm tắt từ nguồn
                Báo Dân trí nhằm phục vụ bài tập xây dựng
                website tin tức.
            </p>
        `,

        author: author || "Báo Dân trí",

        category: category,

        publishedAt: publishedAt,

        source: "dantri.com.vn",

        url: url,

        image: image
    };
}


// =====================================================
// 4. DỮ LIỆU 40 BÀI VIẾT
// =====================================================

const defaultPosts = [

    // =================================================
    // THỜI SỰ
    // =================================================

    createRealPost(
        "Chủ tịch Quốc hội: \"Không lấy sự thận trọng làm lý do trì hoãn\"",
        "Chủ tịch Quốc hội nhấn mạnh yêu cầu bảo đảm chất lượng công việc nhưng không lấy sự thận trọng làm lý do trì hoãn.",
        "Thời sự",
        "2026-10-17 08:43",
        "Hoài Thu",
        "https://dantri.com.vn/thoi-su/chu-tich-quoc-hoi-khong-lay-su-than-trong-lam-ly-do-tri-hoan-20261017082719975.htm",
        "images/thoisu01.webp"
    ),

    createRealPost(
        "Sau trận mưa 366mm, chuyên gia dự báo TPHCM còn đón các đợt mưa rất lớn tháng 10",
        "Chuyên gia nhận định TPHCM có thể tiếp tục xuất hiện các đợt mưa cường độ lớn trong tháng 10.",
        "Thời sự",
        "2026-10-03 07:01",
        "An Huy",
        "https://dantri.com.vn/thoi-su/sau-tran-mua-366mm-chuyen-gia-du-bao-tphcm-con-don-cac-dot-mua-rat-lon-thang-10-20261002184607958.htm",
        "images/thoisu02.webp"
    ),

    createRealPost(
        "Tổng Bí thư, Chủ tịch nước Tô Lâm đến thủ đô Canberra, tiếp tục chuyến thăm cấp Nhà nước Australia",
        "Đoàn đại biểu cấp cao Việt Nam đến Canberra, tiếp tục các hoạt động trong chuyến thăm cấp Nhà nước Australia.",
        "Thời sự",
        "2026-08-10 23:02",
        "Báo Dân trí",
        "https://dantri.com.vn/thoi-su/tong-bi-thu-chu-tich-nuoc-to-lam-den-thu-do-canberra-tiep-tuc-chuyen-tham-cap-nha-nuoc-australia-20260810230230837.htm",
        "images/thoisu03.webp"
    ),

    createRealPost(
        "Hơn 6 tấn ốc hương nuôi bị sóng cuốn ra biển, gần 400 người đổ xô xuống bắt",
        "Sóng lớn làm bung lồng nuôi khiến hơn 6 tấn ốc hương bị cuốn ra biển và nhiều người kéo đến tìm bắt.",
        "Thời sự",
        "2026-08-10 21:45",
        "Trương Nguyễn",
        "https://dantri.com.vn/thoi-su/hon-6-tan-oc-huong-nuoi-bi-song-cuon-ra-bien-gan-400-nguoi-do-xo-xuong-bat-20260810200638288.htm",
        "images/thoisu04.webp"
    ),

    createRealPost(
        "Chủ nhà trọ ở TPHCM đến thu tiền, phát hiện khách thuê tử vong",
        "Một chủ nhà trọ tại TPHCM phát hiện khách thuê tử vong khi đến phòng trọ thu tiền.",
        "Thời sự",
        "2026-08-10 21:30",
        "Báo Dân trí",
        "https://dantri.com.vn/thoi-su/chu-nha-tro-o-tphcm-den-thu-tien-phat-hien-khach-thue-tu-vong-20260810213009445.htm",
        "images/thoisu05.webp"
    ),

    createRealPost(
        "Đồng Nai báo cáo tiến độ dự án thành phố sân bay Long Thành",
        "Đồng Nai cập nhật tình hình triển khai các công việc liên quan dự án thành phố sân bay Long Thành.",
        "Thời sự",
        "2026-08-10 20:46",
        "Báo Dân trí",
        "https://dantri.com.vn/thoi-su/dong-nai-bao-cao-tien-do-du-an-thanh-pho-san-bay-long-thanh-20260810204621996.htm",
        "images/thoisu06.webp"
    ),

    createRealPost(
        "\"Giá rẻ thắng giá trị\" trong đấu thầu thiết kế tạo cuộc đua phá giá, làm ẩu",
        "Đại biểu cảnh báo tình trạng cạnh tranh bằng giá thấp trong đấu thầu thiết kế có thể ảnh hưởng chất lượng công trình.",
        "Thời sự",
        "2026-08-10 20:08",
        "Báo Dân trí",
        "https://dantri.com.vn/thoi-su/gia-re-thang-gia-tri-trong-dau-thau-thiet-ke-tao-cuoc-dua-pha-gia-lam-au-20260810200859657.htm",
        "images/thoisu07.webp"
    ),

    createRealPost(
        "TPHCM dự kiến tăng 10% chỉ tiêu thanh niên nhập ngũ năm 2027",
        "TPHCM dự kiến điều chỉnh tăng chỉ tiêu nghĩa vụ quân sự năm 2027 và tiếp tục chú trọng chất lượng tuyển quân.",
        "Thời sự",
        "2026-08-10 19:50",
        "Báo Dân trí",
        "https://dantri.com.vn/thoi-su/tphcm-du-kien-tang-10-chi-tieu-thanh-nien-nhap-ngu-nam-2027-20260810195037957.htm",
        "images/thoisu08.webp"
    ),

    createRealPost(
        "Tổng Bí thư, Chủ tịch nước nêu tiêu chí ưu tiên thu hút các dự án đầu tư",
        "Việt Nam ưu tiên các dự án có công nghệ tiên tiến, quản trị hiện đại và khả năng chuyển giao công nghệ.",
        "Thời sự",
        "2026-08-10 18:48",
        "Báo Dân trí",
        "https://dantri.com.vn/thoi-su/tong-bi-thu-chu-tich-nuoc-neu-tieu-chi-uu-tien-thu-hut-cac-du-an-dau-tu-20260810184847836.htm",
        "images/thoisu09.webp"
    ),

    createRealPost(
        "Hà Nội nắng nóng gần 39 độ C",
        "Bắc Bộ và nhiều tỉnh miền Trung được dự báo tiếp tục nắng nóng, có nơi nhiệt độ vượt 38 độ C.",
        "Thời sự",
        "2026-08-11 00:00",
        "Nguyễn Hải",
        "https://dantri.com.vn/thoi-tiet/ha-noi-nang-nong-gan-39-do-c-20260810213601733.htm",
        "images/thoisu10.webp"
    ),


    // =================================================
    // THẾ GIỚI
    // =================================================

    createRealPost(
        "Ukraine dồn dập khai hỏa, tấn công hàng loạt mục tiêu trong lãnh thổ Nga",
        "Ukraine tiếp tục triển khai nhiều UAV nhằm tấn công các mục tiêu bên trong lãnh thổ Nga.",
        "Thế giới",
        "2026-08-10 22:24",
        "Thành Đạt",
        "https://dantri.com.vn/the-gioi/ukraine-don-dap-khai-hoa-tan-cong-hang-loat-muc-tieu-trong-lanh-tho-nga-20260810221535359.htm",
        "images/thegioi01.webp"
    ),

    createRealPost(
        "Tổng thống Trump muốn chơi “ván cờ” chiến lược, Iran phản ứng cứng rắn",
        "Các động thái chiến lược mới của Mỹ liên quan Iran tiếp tục thu hút sự chú ý của dư luận quốc tế.",
        "Thế giới",
        "2026-08-10 20:04",
        "Báo Dân trí",
        "https://dantri.com.vn/the-gioi/tong-thong-trump-muon-choi-van-co-chien-luoc-iran-phan-ung-cung-ran-20260810200447605.htm",
        "images/thegioi02.webp"
    ),

    createRealPost(
        "Cựu nghị sĩ Thái Lan bắn chết lãnh đạo tỉnh",
        "Một vụ nổ súng liên quan cựu nghị sĩ và lãnh đạo địa phương tại Thái Lan đang được điều tra.",
        "Thế giới",
        "2026-08-10 18:47",
        "Báo Dân trí",
        "https://dantri.com.vn/the-gioi/cuu-nghi-si-thai-lan-ban-chet-lanh-dao-tinh-20260810184726219.htm",
        "images/thegioi03.webp"
    ),

    createRealPost(
        "Cú ngã ngựa của “vua kim cương” Ấn Độ",
        "Bài viết đề cập những biến động xoay quanh một nhân vật nổi tiếng trong ngành kim cương Ấn Độ.",
        "Thế giới",
        "2026-08-10 16:07",
        "Báo Dân trí",
        "https://dantri.com.vn/the-gioi/cu-nga-ngua-cua-vua-kim-cuong-an-do-20260810160723736.htm",
        "images/thegioi04.webp"
    ),

    createRealPost(
        "Ukraine xóa nhòa thất bại chiến dịch phản công 2023?",
        "Diễn biến chiến trường mới đặt ra câu hỏi về khả năng Ukraine thay đổi cục diện sau chiến dịch phản công năm 2023.",
        "Thế giới",
        "2026-08-03 16:20",
        "Báo Dân trí",
        "https://dantri.com.vn/the-gioi/ukraine-xoa-nhoa-that-bai-chien-dich-phan-cong-2023-20260803162039157.htm",
        "images/thegioi05.webp"
    ),

    createRealPost(
        "Ukraine báo động khi tỷ lệ đánh chặn tên lửa đạn đạo Nga còn 29%",
        "Ukraine cảnh báo thách thức từ các cuộc tập kích tên lửa đạn đạo trong bối cảnh tỷ lệ đánh chặn suy giảm.",
        "Thế giới",
        "2026-08-10 16:16",
        "Báo Dân trí",
        "https://dantri.com.vn/the-gioi/ukraine-bao-dong-khi-ty-le-danh-chan-ten-lua-dan-dao-nga-con-29-20260810161639210.htm",
        "images/thegioi06.webp"
    ),

    createRealPost(
        "Thử nghiệm vaccine ngăn ung thư đại trực tràng từ giai đoạn đầu tại Mỹ",
        "Một thử nghiệm vaccine tại Mỹ đang nghiên cứu khả năng giảm nguy cơ ung thư đại trực tràng từ giai đoạn sớm.",
        "Thế giới",
        "2026-08-10 15:51",
        "Báo Dân trí",
        "https://dantri.com.vn/the-gioi/thu-nghiem-vaccine-ngan-ung-thu-dai-truc-trang-tu-giai-doan-dau-tai-my-20260810155151574.htm",
        "images/thegioi07.webp"
    ),

    createRealPost(
        "Ảnh vệ tinh tiết lộ điểm đặc biệt trên dàn tàu ngầm hạt nhân Nga",
        "Hình ảnh vệ tinh cho thấy những thay đổi đáng chú ý liên quan các tàu ngầm hạt nhân của Nga.",
        "Thế giới",
        "2026-08-10 15:05",
        "Báo Dân trí",
        "https://dantri.com.vn/the-gioi/anh-ve-tinh-tiet-lo-diem-dac-biet-tren-dan-tau-ngam-hat-nhan-nga-20260810150531242.htm",
        "images/thegioi08.webp"
    ),

    createRealPost(
        "Nổ súng bên ngoài văn phòng chính quyền địa phương ở Thái Lan",
        "Một quan chức địa phương tại Thái Lan bị thương sau vụ nổ súng bên ngoài văn phòng chính quyền.",
        "Thế giới",
        "2026-08-10 13:57",
        "Báo Dân trí",
        "https://dantri.com.vn/the-gioi/no-sung-ben-ngoai-van-phong-chinh-quyen-dia-phuong-o-thai-lan-20260810135749162.htm",
        "images/thegioi09.webp"
    ),

    createRealPost(
        "Phát hiện xác tàu La Mã hơn 2.000 năm tuổi ngoài khơi nước Ý",
        "Các thợ lặn phát hiện một xác tàu La Mã cổ ngoài khơi Sicily cùng nhiều bình gốm còn được bảo quản.",
        "Thế giới",
        "2026-08-10 11:16",
        "Báo Dân trí",
        "https://dantri.com.vn/dt360/phat-hien-xac-tau-la-ma-hon-2000-nam-tuoi-ngoai-khoi-nuoc-y-20260810111628532.htm",
        "images/thegioi10.webp"
    ),


    // =================================================
    // BẤT ĐỘNG SẢN
    // =================================================

    createRealPost(
        "Giá chung cư, đất nền hạ nhiệt khắp nơi, cơ hội mua nhà rộng hơn",
        "Giá nhà có xu hướng giảm khi thanh khoản suy yếu, tồn kho tăng và người mua thận trọng hơn.",
        "Bất động sản",
        "2026-10-17 18:09",
        "Lê Tỉnh",
        "https://dantri.com.vn/bat-dong-san/gia-chung-cu-dat-nen-ha-nhiet-khap-noi-co-hoi-mua-nha-rong-hon-20261017173320034.htm",
        "images/bds01.webp"
    ),

    createRealPost(
        "Thị trường bất động sản ghi nhận sự điều chỉnh giá tại nhiều khu vực",
        "Giá bán bất động sản sơ cấp tại nhiều khu vực đã điều chỉnh trong bối cảnh nguồn cung tăng và sức mua suy yếu.",
        "Bất động sản",
        "2026-10-15 11:29",
        "Lê Tỉnh",
        "https://dantri.com.vn/bat-dong-san/thi-truong-bat-dong-san-ghi-nhan-su-dieu-chinh-gia-tai-nhieu-khu-vuc-20261015104602368.htm",
        "images/bds02.webp"
    ),

    createRealPost(
        "Xuất hiện thêm căn hộ giá từ 1,24 tỷ đồng tại Hà Nội, nhận hồ sơ từ 9/9",
        "Hà Nội chuẩn bị tiếp nhận hồ sơ mua và thuê mua hàng trăm căn nhà ở xã hội tại dự án Kim Hoa.",
        "Bất động sản",
        "2026-08-10 11:00",
        "Báo Dân trí",
        "https://dantri.com.vn/bat-dong-san/xuat-hien-them-can-ho-gia-tu-124-ty-dong-tai-ha-noi-nhan-ho-so-tu-99-20260810110019906.htm",
        "images/bds03.webp"
    ),

    createRealPost(
        "Nhiều dự án bất động sản treo sắp được “hồi sinh”",
        "Nhiều dự án bất động sản gặp vướng mắc kéo dài đang có cơ hội được tháo gỡ để tiếp tục triển khai.",
        "Bất động sản",
        "2026-08-10 13:39",
        "Báo Dân trí",
        "https://dantri.com.vn/bat-dong-san/nhieu-du-an-bat-dong-san-treo-sap-duoc-hoi-sinh-20260810133900747.htm",
        "images/bds04.webp"
    ),

    createRealPost(
        "Đấu thầu quốc tế khu đô thị gần 70ha, vốn đầu tư hơn 19.300 tỷ đồng",
        "Một dự án khu đô thị quy mô gần 70ha với tổng vốn đầu tư hơn 19.300 tỷ đồng được đưa ra đấu thầu quốc tế.",
        "Bất động sản",
        "2026-08-10 17:32",
        "Báo Dân trí",
        "https://dantri.com.vn/bat-dong-san/dau-thau-quoc-te-khu-do-thi-gan-70ha-von-dau-tu-hon-19300-ty-dong-20260810173220251.htm",
        "images/bds05.webp"
    ),

    createRealPost(
        "Dự án từng được kỳ vọng trở thành thung lũng Silicon ở TPHCM bị thu hồi đất",
        "Một dự án từng được kỳ vọng trở thành trung tâm công nghệ tại TPHCM bị thu hồi đất.",
        "Bất động sản",
        "2026-08-10 12:12",
        "Báo Dân trí",
        "https://dantri.com.vn/bat-dong-san/du-an-tung-duoc-ky-vong-tro-thanh-thung-lung-silicon-o-tphcm-bi-thu-hoi-dat-20260810121205770.htm",
        "images/bds06.webp"
    ),

    createRealPost(
        "Chuyên gia: Lãi vay tăng, người có 2-4 tỷ đồng đang nắm lợi thế khi mua nhà",
        "Trong bối cảnh lãi vay tăng, người có khoản tích lũy lớn có thể có thêm lợi thế khi thương lượng mua nhà.",
        "Bất động sản",
        "2026-08-09 11:17",
        "Báo Dân trí",
        "https://dantri.com.vn/bat-dong-san/chuyen-gia-lai-vay-tang-nguoi-co-2-4-ty-dong-dang-nam-loi-the-khi-mua-nha-20260809111730180.htm",
        "images/bds07.webp"
    ),

    createRealPost(
        "Chung cư hết niên hạn sử dụng: Người mua có bị mất tài sản?",
        "Hết niên hạn sử dụng không đồng nghĩa chung cư lập tức bị phá dỡ mà cần đánh giá mức độ an toàn của công trình.",
        "Bất động sản",
        "2026-08-09 12:05",
        "Báo Dân trí",
        "https://dantri.com.vn/bat-dong-san/chung-cu-het-nien-han-su-dung-nguoi-mua-co-bi-mat-tai-san-20260809120536670.htm",
        "images/bds08.webp"
    ),

    createRealPost(
        "Giá căn hộ chung cư Hà Nội nhiều nơi giảm sâu",
        "Thị trường chung cư Hà Nội xuất hiện thêm những trường hợp điều chỉnh giảm giá.",
        "Bất động sản",
        "2026-08-09 09:14",
        "Báo Dân trí",
        "https://dantri.com.vn/bat-dong-san/gia-can-ho-chung-cu-ha-noi-nhieu-noi-giam-sau-20260809091429992.htm",
        "images/bds09.webp"
    ),

    createRealPost(
        "Tranh chấp chung cư: Đã đến lúc làm rõ quyền của Ban quản trị",
        "Những bất cập về quyền hạn và trách nhiệm của Ban quản trị có thể làm gia tăng tranh chấp tại các chung cư.",
        "Bất động sản",
        "2026-08-08 12:36",
        "Lê Tỉnh",
        "https://dantri.com.vn/bat-dong-san/tranh-chap-chung-cu-da-den-luc-lam-ro-quyen-cua-ban-quan-tri-20260808110817141.htm",
        "images/bds10.webp"
    ),


    // =================================================
    // CÔNG NGHỆ
    // =================================================

    createRealPost(
        "Điểm tuần: Telegram biến mất trên App Store, Galaxy Z Fold8 lên kệ",
        "Các thông tin nổi bật gồm Telegram bị gỡ khỏi App Store, Galaxy Z Fold8 lên kệ và nguy cơ thiếu iPhone 18 Pro.",
        "Công nghệ",
        "2026-08-09 06:13",
        "Thế Anh",
        "https://dantri.com.vn/cong-nghe/diem-tuan-telegram-bien-mat-tren-app-store-galaxy-z-fold8-len-ke-20260808184355799.htm",
        "images/cn01.webp"
    ),

    createRealPost(
        "Clip “bếp gas mini bất ngờ nổ giữa bàn ăn” nổi bật tuần qua",
        "Video ghi lại khoảnh khắc một bếp gas mini bất ngờ phát nổ giữa bàn ăn thu hút sự chú ý trên mạng xã hội.",
        "Công nghệ",
        "2026-08-09 06:12",
        "Quang Huy",
        "https://dantri.com.vn/cong-nghe/clip-bep-gas-mini-bat-ngo-no-giua-ban-an-noi-bat-tuan-qua-20260809051655841.htm",
        "images/cn02.webp"
    ),

    createRealPost(
        "Samsung bắt đầu giao Galaxy Z Fold8, Z Flip8 cho khách hàng Việt",
        "Samsung bắt đầu giao các mẫu điện thoại gập Galaxy Z Fold8 và Z Flip8 tới khách hàng tại Việt Nam.",
        "Công nghệ",
        "2026-08-08 12:21",
        "Báo Dân trí",
        "https://dantri.com.vn/cong-nghe/samsung-bat-dau-giao-galaxy-z-fold8-z-flip8-cho-khach-hang-viet-20260808122127578.htm",
        "images/cn03.webp"
    ),

    createRealPost(
        "Galaxy Z Fold8 lên kệ tại Việt Nam",
        "Galaxy Z Fold8 chính thức được bán tại Việt Nam với nhiều thay đổi về thiết kế và cấu hình.",
        "Công nghệ",
        "2026-08-08 00:43",
        "Báo Dân trí",
        "https://dantri.com.vn/cong-nghe/galaxy-z-fold8-len-ke-tai-viet-nam-20260808004339216.htm",
        "images/cn04.webp"
    ),

    createRealPost(
        "Dropbox mở rộng tích hợp AI với ChatGPT, Claude và Gemini",
        "Dropbox mở rộng khả năng tích hợp với nhiều nền tảng AI nhằm hỗ trợ người dùng xử lý dữ liệu và công việc.",
        "Công nghệ",
        "2026-08-07 15:33",
        "Báo Dân trí",
        "https://dantri.com.vn/cong-nghe/dropbox-mo-rong-tich-hop-ai-voi-chatgpt-claude-va-gemini-20260807153358818.htm",
        "images/cn05.webp"
    ),

    createRealPost(
        "Người dùng ChatGPT miễn phí sẽ không còn cảnh ngán ngẩm vì hết lượt nhắn",
        "Những thay đổi mới được kỳ vọng cải thiện trải nghiệm sử dụng ChatGPT của nhóm người dùng miễn phí.",
        "Công nghệ",
        "2026-08-07 16:39",
        "Báo Dân trí",
        "https://dantri.com.vn/cong-nghe/nguoi-dung-chatgpt-mien-phi-se-khong-con-canh-ngan-ngam-vi-het-luot-nhan-20260807163935573.htm",
        "images/cn06.webp"
    ),

    createRealPost(
        "Lạm dụng AI, không ít người trẻ ra trường cay đắng vì kiến thức rỗng tuếch",
        "Việc sử dụng AI thiếu kiểm soát trong học tập đặt ra những vấn đề về kiến thức, minh bạch và liêm chính.",
        "Công nghệ",
        "2026-08-07 10:51",
        "Báo Dân trí",
        "https://dantri.com.vn/cong-nghe/lam-dung-ai-khong-it-nguoi-tre-ra-truong-cay-dang-vi-kien-thuc-rong-tuech-20260807105123829.htm",
        "images/cn07.webp"
    ),

    createRealPost(
        "Apple, Samsung thống trị phân khúc di động cao cấp",
        "Apple và Samsung tiếp tục giữ vị trí nổi bật trên thị trường điện thoại thông minh cao cấp toàn cầu.",
        "Công nghệ",
        "2026-08-07 12:29",
        "Báo Dân trí",
        "https://dantri.com.vn/cong-nghe/apple-samsung-thong-tri-phan-khuc-di-dong-cao-cap-20260807122942028.htm",
        "images/cn08.webp"
    ),

    createRealPost(
        "Nguy cơ iPhone 18 Pro khan hàng ngay khi lên kệ",
        "Nguồn cung linh kiện có thể ảnh hưởng lượng iPhone 18 Pro được sản xuất và phân phối trong giai đoạn đầu.",
        "Công nghệ",
        "2026-08-06 23:24",
        "Báo Dân trí",
        "https://dantri.com.vn/cong-nghe/nguy-co-iphone-18-pro-khan-hang-ngay-khi-len-ke-20260806232459662.htm",
        "images/cn09.webp"
    ),

    createRealPost(
        "Chuyên gia AI người Việt rời Google để thành lập startup",
        "Tiến sĩ Lê Viết Quốc rời Google và cùng các đồng nghiệp thành lập startup AI Discovery Loop.",
        "Công nghệ",
        "2026-08-06 10:50",
        "Báo Dân trí",
        "https://dantri.com.vn/cong-nghe/chuyen-gia-ai-nguoi-viet-roi-google-de-thanh-lap-startup-20260806105005782.htm",
        "images/cn10.webp"
    )

];


// =====================================================
// 5. KHỞI TẠO LOCALSTORAGE
// =====================================================

function initializePosts() {

    let savedPosts = [];

    try {

        const saved =
            localStorage.getItem("posts");

        if (saved) {

            const parsed =
                JSON.parse(saved);

            if (Array.isArray(parsed)) {
                savedPosts = parsed;
            }
        }

    } catch (error) {

        console.error(
            "Lỗi đọc LocalStorage:",
            error
        );
    }


    const postMap = new Map();


    // Đưa dữ liệu mặc định vào trước
    defaultPosts.forEach(
        function (post) {

            postMap.set(
                String(post.id),
                post
            );
        }
    );


    // Giữ lại bài đã crawl thêm
    savedPosts.forEach(
        function (post) {

            if (
                !postMap.has(
                    String(post.id)
                )
            ) {

                postMap.set(
                    String(post.id),
                    post
                );
            }
        }
    );


    localStorage.setItem(
        "posts",
        JSON.stringify(
            Array.from(
                postMap.values()
            )
        )
    );
}


// =====================================================
// 6. LẤY DANH SÁCH BÀI VIẾT
// =====================================================

function getPosts() {

    try {

        const posts =
            JSON.parse(
                localStorage.getItem(
                    "posts"
                )
            );


        if (Array.isArray(posts)) {
            return posts;
        }

    } catch (error) {

        console.error(
            "Lỗi đọc LocalStorage:",
            error
        );
    }


    return defaultPosts;
}


// =====================================================
// 7. LƯU BÀI VIẾT
// =====================================================

function savePost(post) {

    const posts =
        getPosts();


    const index =
        posts.findIndex(
            function (item) {

                return (
                    String(item.id) ===
                    String(post.id)
                );
            }
        );


    if (index >= 0) {

        posts[index] = post;

    } else {

        posts.unshift(post);
    }


    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );
}


// =====================================================
// 8. TÌM BÀI TỪ URL DÂN TRÍ
// =====================================================

async function extractArticleFromUrl(url) {

    if (!url) {

        throw new Error(
            "Vui lòng nhập URL bài viết."
        );
    }


    let parsedUrl;


    try {

        parsedUrl =
            new URL(url);

    } catch (error) {

        throw new Error(
            "URL không hợp lệ."
        );
    }


    if (
        !parsedUrl.hostname.includes(
            "dantri.com.vn"
        )
    ) {

        throw new Error(
            "Vui lòng nhập URL bài viết từ Báo Dân trí."
        );
    }


    const cleanUrl =
        parsedUrl.origin +
        parsedUrl.pathname;


    const existingPost =
        defaultPosts.find(
            function (post) {

                try {

                    const postUrl =
                        new URL(post.url);


                    const cleanPostUrl =
                        postUrl.origin +
                        postUrl.pathname;


                    return (
                        cleanPostUrl ===
                        cleanUrl
                    );

                } catch (error) {

                    return (
                        post.url === url
                    );
                }
            }
        );


    if (existingPost) {

        return {
            ...existingPost,
            id: createArticleId(url),
            url: cleanUrl
        };
    }


    throw new Error(
        "URL này chưa có trong dữ liệu mẫu. Do giới hạn CORS, trình duyệt không thể tự lấy mọi bài Dân trí trực tiếp."
    );
}


// =====================================================
// 9. CRAWL BÀI VIẾT
// =====================================================

async function crawlArticle() {

    const urlInput =
        document.getElementById(
            "article-url"
        );


    const button =
        document.getElementById(
            "crawl-btn"
        );


    const status =
        document.getElementById(
            "result-status"
        );


    const output =
        document.getElementById(
            "json-output"
        );


    if (
        !urlInput ||
        !button ||
        !status ||
        !output
    ) {

        return;
    }


    const url =
        urlInput.value.trim();


    if (!url) {

        status.textContent =
            "❌ Vui lòng nhập URL bài viết.";

        status.style.color =
            "red";

        return;
    }


    try {

        button.disabled = true;

        button.textContent =
            "Đang Crawl...";


        status.textContent =
            "⏳ Đang trích xuất dữ liệu...";

        status.style.color =
            "#333";


        const article =
            await extractArticleFromUrl(
                url
            );


        savePost(article);


        output.textContent =
            JSON.stringify(
                article,
                null,
                2
            );


        status.textContent =
            "✅ Crawl thành công! Dữ liệu đã được lưu vào LocalStorage.";

        status.style.color =
            "green";


    } catch (error) {

        status.textContent =
            "❌ " + error.message;

        status.style.color =
            "red";


        output.textContent =
            "Không thể trích xuất dữ liệu.";


    } finally {

        button.disabled = false;

        button.textContent =
            "Bắt đầu Crawl";
    }
}


// =====================================================
// 10. ẢNH DỰ PHÒNG
// =====================================================

function setFallbackImage(img) {

    if (!img) {
        return;
    }


    // Tránh vòng lặp lỗi ảnh
    img.onerror = null;


    // Nếu chưa có ảnh thì ẩn khung ảnh đi
    img.style.display = "none";
}


// =====================================================
// 11. KHỞI CHẠY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Đưa 40 bài vào LocalStorage
        initializePosts();


        // Nếu đang ở crawler.html
        const button =
            document.getElementById(
                "crawl-btn"
            );


        if (button) {

            button.addEventListener(
                "click",
                crawlArticle
            );
        }

    }
);