// ==========================================
// 1. Cấu hình & Hàm nạp dữ liệu chuẩn GitHub Pages
// ==========================================

async function getNewsData() {
    let newsData = null;
    try {
        newsData = JSON.parse(localStorage.getItem("newsData"));
    } catch (e) {
        console.error("Lỗi đọc localStorage:", e);
    }
    
    // Nếu localStorage trống, tự động nạp từ file categories.json
    if (!newsData) {
        try {
            // Xác định đường dẫn tương đối lẫn tuyệt đối trên GitHub Pages
            let jsonPath = "categories.json";
            if (window.location.hostname.includes("github.io")) {
                jsonPath = "./categories.json";
            }

            let response = await fetch(jsonPath);
            if (!response.ok) {
                // Thử đường dẫn fallback nếu bị lệch subpath /web-tin-tuc/
                response = await fetch("/web-tin-tuc/categories.json");
            }

            if (response.ok) {
                newsData = await response.json();
                localStorage.setItem("newsData", JSON.stringify(newsData));
            }
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
    const homeContainer = document.getElementById("news-container") || 
                          document.getElementById("content") || 
                          document.querySelector(".main-content");
    if (!homeContainer) return;

    const newsData = await getNewsData();
    if (!newsData) {
        homeContainer.innerHTML = "<p style='padding:20px; text-align:center;'>Không thể tải dữ liệu tin tức.</p>";
        return;
    }

    let htmlContent = "";
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
    if (!detailContainer) return;

    // Lấy ID bài viết từ URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    if (!articleId) {
        detailContainer.innerHTML = "<p style='padding:20px; text-align:center;'>Không tìm thấy bài viết!</p>";
        return;
    }

    const newsData = await getNewsData();
    let foundArticle = null;

    if (newsData) {
        const categories = Array.isArray(newsData) ? newsData : (newsData.categories || [newsData]);
        for (const cat of categories) {
            const articles = cat.articles || cat.items || [];
            // Tìm bài khớp ID hoặc Link
            const article = articles.find(a => 
                (a.id && a.id === articleId) || 
                (a.link && a.link === articleId) ||
                (a.id && encodeURIComponent(a.id) === encodeURIComponent(articleId))
            );
            if (article) {
                foundArticle = article;
                break;
            }
        }
    }

    if (foundArticle) {
        detailContainer.innerHTML = `
            <article class="article-detail" style="background:#fff; padding:20px; border-radius:8px; margin-top:20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h1 style="font-size: 24px; color: #222; margin-bottom: 15px;">${foundArticle.title || ''}</h1>
                <div class="article-meta" style="margin-bottom: 20px; color: #777; font-size: 13px;">
                    <span>📅 Ngày đăng: ${foundArticle.pubDate || foundArticle.date || 'Mới cập nhật'}</span>
                    ${foundArticle.author ? `<span style="margin-left:15px;">✍️ Tác giả: ${foundArticle.author}</span>` : ''}
                </div>
                ${foundArticle.description ? `<p style="font-weight:bold; font-size:16px; line-height:1.5; color:#444; margin-bottom:20px; background:#f9f9f9; padding:12px; border-left:4px solid #0056b3;">${foundArticle.description}</p>` : ''}
                <div class="article-body" style="line-height: 1.8; font-size: 15px; color: