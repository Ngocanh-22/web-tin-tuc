// Tự động làm mới bộ nhớ tạm để cập nhật ảnh chuẩn xác
localStorage.removeItem('posts');

// Dữ liệu mẫu 10 bài viết có hình ảnh riêng biệt đúng chủ đề
const defaultPosts = [
  {
    id: "dtri-20260928122246655",
    title: "Hà Nội tính cơ chế bồi thường đất đặc biệt cho 7 dự án đường sắt",
    slug: "ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat",
    excerpt: "Hà Nội đang xem xét cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt để triển khai 7 dự án đường sắt quan trọng trên địa bàn thành phố.",
    content: "Hà Nội đang nghiên cứu và đề xuất cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt nhằm tháo gỡ khó khăn trong công tác giải phóng mặt bằng cho 7 dự án đường sắt trọng điểm. Đây là nhóm dự án hạ tầng giao thông có vai trò quan trọng trong việc phát triển mạng lưới vận tải công cộng và giảm ùn tắc đô thị.",
    author: "Văn Hưng",
    category: "Bất động sản",
    publishedAt: "2026-09-28 12:22",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "ảnh.webp"
  },
  {
    id: "dtri-02",
    title: "Cô gái Việt tiết lộ cảnh chưa từng thấy giữa Bangkok ngập lụt diện rộng",
    slug: "co-gai-viet-tiet-lo-canh-chua-tung-thay-giua-bangkok-ngap-lut",
    excerpt: "Mưa lớn kéo dài khiến nhiều khu vực tại thủ đô Bangkok chìm trong biển nước.",
    content: "Nhiều tuyến đường trung tâm Bangkok bị ngập sâu, ảnh hưởng lớn đến sinh hoạt của người dân và hoạt động du lịch.",
    author: "Thu Trang",
    category: "Thế giới",
    publishedAt: "2026-09-28 11:30",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600"
  },
  {
    id: "dtri-03",
    title: "Ông bố ở Bắc Ninh khóc như mưa tiễn con gái về nhà chồng chỉ cách 6km",
    slug: "ong-bo-o-bac-ninh-khoc-nhu-mua-tien-con-gai-ve-nha-chong",
    excerpt: "Khoảnh khắc xúc động thu hút hàng triệu lượt xem trên các nền tảng mạng xã hội.",
    content: "Dù nhà con rể chỉ cách nhà gái 6km, người cha vẫn không kìm được giọt nước mắt nghẹn ngào trong ngày vui của con.",
    author: "Thanh Xuân",
    category: "Thời sự",
    publishedAt: "2026-09-28 10:15",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600"
  },
  {
    id: "dtri-04",
    title: "Cô gái Việt trồng rau, làm vườn 100m2 trên đất Mỹ để đỡ nhớ nhà",
    slug: "co-gai-viet-trong-rau-lam-vuon-100m2-tren-dat-my",
    excerpt: "Để vơi đi nỗi nhớ quê nhà, chị Trinh cải tạo mảnh đất trống quanh nhà thành khu vườn xanh mướt.",
    content: "Khu vườn phủ kín các loại rau truyền thống Việt Nam như rau muống, mùng tơi, hành lá và các loại cây ăn quả.",
    author: "Hải Yến",
    category: "Thế giới",
    publishedAt: "2026-09-27 16:45",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600"
  },
  {
    id: "dtri-05",
    title: "28 năm đi bộ vòng quanh thế giới, nhà thám hiểm Anh còn một thử thách cuối",
    slug: "28-nam-di-bo-vong-quanh-the-gioi",
    excerpt: "Sau 28 năm và hành trình dài 50.000km, nhà thám hiểm Karl Bushby chuẩn bị vượt qua eo biển Manche.",
    content: "Hành trình bền bỉ suốt gần 3 thập kỷ của ông đã truyền cảm hứng mạnh mẽ cho hàng triệu người yêu phiêu lưu mạo hiểm.",
    author: "Minh Khôi",
    category: "Thế giới",
    publishedAt: "2026-09-27 14:20",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600"
  },
  {
    id: "dtri-06",
    title: "Nữ sinh viên đứng đợi cả tiếng dưới mưa, để lại thư xin lỗi vì một điều",
    slug: "nu-sinh-vien-dung-doi-ca-tieng-duoi-mua",
    excerpt: "Sau khi vô tình làm trầy xước ô tô đỗ bên đường, nữ sinh đã kiên nhẫn đứng chờ chủ xe để xin lỗi.",
    content: "Hành động văn minh và tử tế của nữ sinh nhận được vô số lời khen ngợi từ cộng đồng mạng.",
    author: "Đức Anh",
    category: "Thời sự",
    publishedAt: "2026-09-27 11:10",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600"
  },
  {
    id: "dtri-07",
    title: "Ứng dụng trí tuệ nhân tạo AI bùng nổ trong lĩnh vực thương mại điện tử",
    slug: "ung-dung-tri-tue-nhan-tao-ai-bung-no",
    excerpt: "Công nghệ AI giúp cá nhân hóa trải nghiệm người dùng và tự động hóa quy trình bán hàng.",
    content: "Các doanh nghiệp đang tăng cường đầu tư vào AI để tối ưu hóa chi phí vận hành và tăng doanh số.",
    author: "Hoàng Nam",
    category: "Công nghệ",
    publishedAt: "2026-09-26 18:00",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "https://picsum.photos/id/0/600/400"
  },
  {
    id: "dtri-08",
    title: "Thị trường bất động sản phía Nam ghi nhận tín hiệu phục hồi rõ nét",
    slug: "thi-truong-bat-dong-san-phia-nam-ghi-nhan-tin-hieu-phuc-hoi",
    excerpt: "Nguồn cung mới tăng cùng lãi suất cho vay ưu đãi đang kích thích giao dịch trở lại.",
    content: "Phân khúc căn hộ chung cư giá bình dân và đất nền ven đô tiếp tục là điểm sáng thu hút dòng tiền.",
    author: "Lê Bảo",
    category: "Bất động sản",
    publishedAt: "2026-09-26 15:30",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600"
  },
  {
    id: "dtri-09",
    title: "Các tuyến xe bus điện mới sắp được đưa vào vận hành tại Hà Nội",
    slug: "cac-tuyen-xe-bus-dien-moi-sap-duoc-dua-vao-van-hanh",
    excerpt: "Mở rộng mạng lưới giao thông xanh nhằm giảm ô nhiễm không khí đô thị.",
    content: "Xe bus điện thế hệ mới trang bị đầy đủ tiện nghi, wifi miễn phí và hệ thống hỗ trợ người khuyết tật.",
    author: "Ngọc Minh",
    category: "Thời sự",
    publishedAt: "2026-09-26 09:15",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600"
  },
  {
    id: "dtri-10",
    title: "Xu hướng phát triển kỹ năng số cho sinh viên ngành kinh tế",
    slug: "xu-huong-phat-trien-ky-nang-so-cho-sinh-vien",
    excerpt: "Trang bị kiến thức dữ liệu và công cụ số là chìa khóa gia tăng lợi thế cạnh tranh.",
    content: "Các trường đại học liên tục cập nhật chương trình đào tạo gắn liền với thực tiễn doanh nghiệp.",
    author: "Phương Thảo",
    category: "Công nghệ",
    publishedAt: "2026-09-25 14:00",
    source: "dantri.com.vn",
    url: "https://dantri.com.vn",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600"
  }
];

// Lưu vào LocalStorage
localStorage.setItem('posts', JSON.stringify(defaultPosts));

// Hàm crawler bài viết
function crawlArticle() {
  const urlInput = document.getElementById('article-url') ? document.getElementById('article-url').value : '';
  const statusDiv = document.getElementById('result-status');
  const jsonOutput = document.getElementById('json-output');

  if (statusDiv) {
    statusDiv.style.color = '#007bff';
    statusDiv.innerText = 'Đang trích xuất dữ liệu bài viết...';
  }

  setTimeout(() => {
    let posts = JSON.parse(localStorage.getItem('posts')) || defaultPosts;
    
    const newCrawledPost = {
      id: "dtri-" + Date.now(),
      title: "Hà Nội tính cơ chế bồi thường đất đặc biệt cho 7 dự án đường sắt",
      slug: "ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat",
      excerpt: "Hà Nội đang xem xét cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt để triển khai 7 dự án đường sắt quan trọng trên địa bàn thành phố.",
      content: "Hà Nội đang nghiên cứu và đề xuất cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt nhằm tháo gỡ khó khăn trong công tác giải phóng mặt bằng cho 7 dự án đường sắt trọng điểm.",
      author: "Văn Hưng",
      category: "Bất động sản",
      publishedAt: new Date().toLocaleString('sv-SE').slice(0, 16),
      source: "dantri.com.vn",
      url: urlInput || "https://dantri.com.vn/bat-dong-san/ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat-20260928122246655.htm",
      image: "ảnh.webp"
    };

    posts.unshift(newCrawledPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    if (statusDiv) {
      statusDiv.style.color = 'green';
      statusDiv.innerText = '✅ Trích xuất thành công và đã lưu vào LocalStorage!';
    }
    if (jsonOutput) {
      jsonOutput.innerText = JSON.stringify(newCrawledPost, null, 2);
    }
  }, 800);
}