// ==========================================
// 1. DỮ LIỆU BÀI VIẾT MẪU
// ==========================================

const defaultPosts = [
    {
        id: "dtri-20260928122246655",
        title: "Hà Nội tính cơ chế bồi thường đất đặc biệt cho 7 dự án đường sắt",
        slug: "ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat",

        excerpt:
            "Hà Nội đang xem xét cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt để triển khai 7 dự án đường sắt quan trọng trên địa bàn thành phố.",

        content:
            `<p>Hà Nội đang nghiên cứu và đề xuất cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt nhằm tháo gỡ khó khăn trong công tác giải phóng mặt bằng cho 7 dự án đường sắt trọng điểm.</p>

            <p>Đây là nhóm dự án hạ tầng giao thông có vai trò quan trọng trong việc phát triển mạng lưới vận tải công cộng và giảm ùn tắc đô thị.</p>

            <p>Thành phố nhấn mạnh việc cần cơ chế linh hoạt để đẩy nhanh tiến độ triển khai, đảm bảo quyền lợi cho người dân bị ảnh hưởng và đồng thời đáp ứng yêu cầu phát triển hạ tầng chiến lược.</p>`,

        author: "Văn Hưng",
        category: "Bất động sản",
        publishedAt: "2026-09-28 12:22",
        source: "dantri.com.vn",

        image:
            "https://picsum.photos/seed/hanoi-railway/900/500",

        url:
            "https://dantri.com.vn/bat-dong-san/ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat-20260928122246655.htm"
    },

    {
        id: "post-2",

        title:
            "Cô gái Việt tiết lộ cảnh chưa từng thấy giữa Bangkok ngập lụt diện rộng",

        slug:
            "co-gai-viet-tiet-lo-canh-bangkok-ngap-lut",

        excerpt:
            "Những hình ảnh đáng chú ý trong đợt ngập lụt tại Bangkok.",

        content:
            "<p>Nội dung bài viết đang được cập nhật.</p>",

        author: "Ban biên tập",
        category: "Thế giới",
        publishedAt: "2026-09-28 10:30",
        source: "dantri.com.vn",

        image:
            "https://picsum.photos/seed/bangkok/900/500",

        url: "#"
    },

    {
        id: "post-3",

        title:
            "Ông bố ở Bắc Ninh khóc như mưa tiễn con gái về nhà chồng",

        slug:
            "ong-bo-bac-ninh-tien-con-gai-ve-nha-chong",

        excerpt:
            "Khoảnh khắc xúc động trong ngày cưới của con gái.",

        content:
            "<p>Nội dung bài viết đang được cập nhật.</p>",

        author: "Ban biên tập",
        category: "Thời sự",
        publishedAt: "2026-09-27 18:00",
        source: "dantri.com.vn",

        image:
            "https://picsum.photos/seed/wedding/900/500",

        url: "#"
    },

    {
        id: "post-4",

        title:
            "Cô gái Việt trồng rau, làm vườn 100m2 trên đất Mỹ để đỡ nhớ nhà",

        slug:
            "co-gai-viet-trong-rau-tren-dat-my",

        excerpt:
            "Để vơi đi nỗi nhớ quê nhà, chị Trinh cải tạo mảnh đất trống quanh nhà thành khu vườn xanh mướt.",

        content:
            "<p>Khu vườn giúp gia đình có thêm rau xanh và cũng là nơi gợi nhớ quê hương.</p>",

        author: "Hải Yến",
        category: "Thế giới",
        publishedAt: "2026-09-27 16:45",
        source: "dantri.com.vn",

        image:
            "https://picsum.photos/seed/garden/900/500",

        url: "#"
    }
];


// ==========================================
// 2. KHỞI TẠO LOCALSTORAGE
// ==========================================

function initializePosts() {

    const savedPosts = localStorage.getItem("posts");

    if (!savedPosts) {

        localStorage.setItem(
            "posts",
            JSON.stringify(defaultPosts)
        );

    }

}


// ==========================================
// 3. LẤY DANH SÁCH BÀI VIẾT
// ==========================================

function getPosts() {

    try {

        const posts =
            JSON.parse(
                localStorage.getItem("posts")
            );

        if (Array.isArray(posts)) {
            return posts;
        }

    } catch (error) {

        console.log(
            "Lỗi đọc dữ liệu:",
            error
        );

    }

    return defaultPosts;
}


// ==========================================
// 4. TẠO ẢNH DỰ PHÒNG
// ==========================================

function setFallbackImage(img) {

    img.onerror = null;

    img.src =
        "https://picsum.photos/seed/news24h/900/500";

}


// ==========================================
// 5. XỬ LÝ CRAWLER
// ==========================================

function crawlArticle() {

    // Tìm ô nhập URL
    const urlInput =
        document.getElementById("url-input") ||
        document.getElementById("article-url") ||
        document.querySelector(
            'input[type="url"]'
        ) ||
        document.querySelector(
            'input[type="text"]'
        );


    // Tìm vùng hiện JSON
    const output =
        document.getElementById("crawl-result") ||
        document.getElementById("result") ||
        document.querySelector("pre");


    if (!urlInput) {

        alert(
            "Không tìm thấy ô nhập URL."
        );

        return;
    }


    const url =
        urlInput.value.trim();


    if (url === "") {

        alert(
            "Vui lòng nhập URL bài viết!"
        );

        return;
    }


    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {

        alert(
            "URL không hợp lệ!"
        );

        return;
    }


    // ======================================
    // DEMO DỮ LIỆU CRAWL
    // ======================================

    const idMatch =
        url.match(/(\d{10,})/);


    const articleId =
        idMatch
            ? "dtri-" + idMatch[1]
            : "dtri-" + Date.now();


    const crawledArticle = {

        id: articleId,

        title:
            "Hà Nội tính cơ chế bồi thường đất đặc biệt cho 7 dự án đường sắt",

        slug:
            "ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat",

        excerpt:
            "Hà Nội đang xem xét cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt để triển khai 7 dự án đường sắt quan trọng trên địa bàn thành phố.",

        content:
            `<p>
                Hà Nội đang nghiên cứu và đề xuất
                cơ chế bồi thường, hỗ trợ và tái định cư
                đặc biệt nhằm tháo gỡ khó khăn trong
                công tác giải phóng mặt bằng cho
                7 dự án đường sắt trọng điểm.
            </p>

            <p>
                Đây là nhóm dự án hạ tầng giao thông
                có vai trò quan trọng trong việc phát
                triển mạng lưới vận tải công cộng và
                giảm ùn tắc đô thị.
            </p>`,

        author:
            "Văn Hưng",

        category:
            "Bất động sản",

        publishedAt:
            "2026-09-28 12:22",

        source:
            "dantri.com.vn",

        image:
            "https://picsum.photos/seed/hanoi-railway/900/500",

        url: url

    };


    // ======================================
    // LƯU LOCALSTORAGE
    // ======================================

    let posts = getPosts();


    // Kiểm tra xem bài đã tồn tại chưa
    const existingIndex =
        posts.findIndex(
            post =>
                String(post.id) ===
                String(crawledArticle.id)
        );


    if (existingIndex >= 0) {

        posts[existingIndex] =
            crawledArticle;

    } else {

        posts.unshift(
            crawledArticle
        );

    }


    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );


    // ======================================
    // HIỂN THỊ JSON
    // ======================================

    if (output) {

        output.textContent =
            JSON.stringify(
                crawledArticle,
                null,
                2
            );

    }


    alert(
        "Crawl thành công! Bài viết đã được lưu vào LocalStorage."
    );

}


// ==========================================
// 6. TỰ ĐỘNG GẮN SỰ KIỆN CHO NÚT CRAWL
// ==========================================

function setupCrawlerButton() {

    const button =
        document.getElementById("crawl-btn") ||
        document.getElementById("crawl-button") ||
        document.querySelector(
            'button[type="button"]'
        ) ||
        document.querySelector("button");


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            crawlArticle();

        }
    );

}


// ==========================================
// 7. KHỞI CHẠY
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializePosts();

        setupCrawlerButton();

    }
);