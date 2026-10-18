// ==========================================
// 1. Cấu hình & Hàm nạp dữ liệu chung
// ==========================================

// Hàm lấy dữ liệu bài viết (Ưu tiên localStorage, nếu trống sẽ tự động đọc file categories.json)
async function getNewsData() {
    let newsData = JSON.parse(localStorage.getItem("newsData"));
    
    if (!newsData) {
        try {
            const response = await fetch("categories.json");
            newsData = await response.json();
            // Lưu lại vào localStorage để tái sử dụng mượt mà
            localStorage.setItem("newsData", JSON.stringify(newsData));
        } catch (error) {
            console.error("Lỗi khi tải file categories.json:", error);
        }
    }
    return newsData;
}

// ==========================================
// 2. Xử lý Trang Chủ (index.html)
// ==========================================

async function renderHomePage() {
    const homeContainer = document.getElementById("news-container") || document.getElementById("content") || document.querySelector(".main-content");
    if (!homeContainer) return; // Không phải trang chủ thì bỏ qua

    const newsData = await getNewsData();
    if (!newsData) {
        homeContainer.innerHTML = "<p style='padding:20px; text-align:center;'>Không thể tải dữ liệu tin tức.</p>";
        return;
    }

    let htmlContent = "";
    
    // Kiểm tra cấu trúc dữ liệu mảng danh mục
    const categories = Array.isArray(newsData) ? newsData : (newsData.categories || [newsData]);

    categories.forEach(cat => {
        const articles = cat.articles || cat.items || [];
        if (articles.length > 0) {
            htmlContent += `
                <section class="category-section" style="margin-bottom: 30px;">
                    <h2 class="category-title" style="border-bottom: 2px solid #0056b3; padding-bottom: 5px; color: #0056b3;">${cat.name || cat.category || 'Tin Nổi Bật'}</h2>
                    <div class="articles-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 15px;">
            `;

            articles.forEach(article => {
                const articleId = article.id || article.link;
                htmlContent += `
                    <div class="article-card" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        ${article.image ? `<img src="${article.image}" alt="${article.title}" style="width:100%; height:180px; object-fit:cover;" onerror="this.style.display='none'">` : ''}
                        <div style="padding: 15px;">
                            <h3 style="font-size: 16px; margin-bottom: 10px;"><a href="detail.html?id=${encodeURIComponent(articleId)}" style="text-decoration:none; color:#333;">${article.title}</a></h3>
                            <p style="font-size: 13px; color: #666; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${article.description || article.summary || ''}</p>
                            <a href="detail.html?id=${encodeURIComponent(articleId)}" style="display:inline-block; margin-top:10px; color:#0056b3; font-weight:bold; font-size:13px; text-decoration:none;">Xem chi tiết →</a>
                        </div>
                    </div>
                `;
            });

            htmlContent += `
                    </div>
                </section>
            `;
        }
    });

    homeContainer.innerHTML = htmlContent;
}

// ==========================================
// 3. Xử lý Trang Chi Tiết (detail.html)
// ==========================================

async function renderDetailPage() {
    const detailContainer = document.getElementById("detail-content");
    if (!detailContainer) return; // Không phải trang chi tiết thì bỏ qua

    // Lấy ID bài viết từ tham số URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    if (!articleId) {
        detailContainer.innerHTML = "<p style='padding:20px; text-align:center;'>Không tìm thấy tham số bài viết!</p>";
        return;
    }

    const newsData = await getNewsData();
    let foundArticle = null;

    if (newsData) {
        const categories = Array.isArray(newsData) ? newsData : (newsData.categories || [newsData]);
        for (const cat of categories) {
            const articles = cat.articles || cat.items || [];
            const article = articles.find(a => (a.id && a.id === articleId) || (a.link && a.link === articleId));
            if (article) {
                foundArticle = article;
                break;
            }
        }
    }

    if (foundArticle) {
        detailContainer.innerHTML = `
            <article class="article-detail" style="background:#fff; padding:20px; border-radius:8px; margin-top:20px;">
                <h1 style="font-size: 24px; color: #222; margin-bottom: 15px;">${foundArticle.title || ''}</h1>
                <div class="article-meta" style="margin-bottom: 20px; color: #777; font-size: 13px;">
                    <span>📅 Ngày đăng: ${foundArticle.pubDate || foundArticle.date || 'Mới cập nhật'}</span>
                    ${foundArticle.author ? `<span style="margin-left:15px;">✍️ Tác giả: ${foundArticle.author}</span>` : ''}
                </div>
                ${foundArticle.description ? `<p style="font-weight:bold; font-size:16px; line-height:1.5; color:#444; margin-bottom:20px; background:#f9f9f9; padding:12px; border-left:4px solid #0056b3;">${foundArticle.description}</p>` : ''}
                <div class="article-body" style="line-height: 1.8; font-size: 15px; color: #333;">
                    ${foundArticle.content || foundArticle.summary || '<p>Nội dung bài viết đang được cập nhật...</p>'}
                </div>
                <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
                    <a href="index.html" style="display:inline-block; padding:10px 20px; background:#0056b3; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">← Quay lại trang chủ</a>
                </div>
            </article>
        `;
    } else {
        detailContainer.innerHTML = `
            <div style="padding: 40px; text-align: center; background: #fff; border-radius: 8px; margin-top: 20px;">
                <h3>Nội dung bài viết không tồn tại hoặc chưa được cập nhật dữ liệu.</h3>
                <p style="margin: 15px 0; color: #666;">Vui lòng thử bấm cào tin để cập nhật dữ liệu mới nhất.</p>
                <a href="crawler.html" style="display:inline-block; padding:8px 16px; background:#28a745; color:#fff; text-decoration:none; border-radius:4px; margin-right:10px;">Đến trang Cào Tin</a>
                <a href="index.html" style="display:inline-block; padding:8px 16px; background:#0056b3; color:#fff; text-decoration:none; border-radius:4px;">Về Trang Chủ</a>
            </div>
        `;
    }
}

// ==========================================
// 4. Xử lý Tự động ẩn ảnh bị lỗi (onError)
// ==========================================

function handleImageErrors() {
    const observer = new MutationObserver(() => {
        document.querySelectorAll("img").forEach(img => {
            img.onerror = function() {
                this.style.display = 'none'; // Tự động ẩn ảnh khi link bị lỗi/chặn
            };
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// ==========================================
// 5. Khởi chạy khi trang tải xong
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
    renderDetailPage();
    handleImageErrors();
});