// movie.js
// Mảng chứa dữ liệu 6 movie với các thuộc tính:
// showtimes: [{cinema, datetime}] (ISO 8601 strings)
// fullDescription: mô tả đầy đủ
// shortDescription: mô tả rút gọn
// poster: URL ảnh (placeholder)
// title, year, country, duration (phút)
// genre: mảng các thể loại (dùng để hiển thị Badge trong UI)

const movies = [
  {
    id: "m001",
    title: "Bình Minh Im Lặng",
    year: 2023,
    country: "Việt Nam",
    duration: 118,
    genre: ["Drama", "Mystery"],
    poster: "/images/post1.jfif",
    fullDescription:
      "Bình Minh Im Lặng kể về hành trình nội tâm của một giáo viên làng nhỏ sau một biến cố gia đình. Khi bí mật cũ bị khơi dậy, anh phải đối diện với những lựa chọn khó khăn giữa sự thật và bình yên. Phim khai thác sâu vào cảm xúc, các mối quan hệ làng xã và những hệ quả của những bí mật bị chôn vùi.",
    shortDescription:
      "Hành trình đối mặt với quá khứ và sự thật của một giáo viên làng.",
    showtimes: [
      { cinema: "CGV Vincom", datetime: "2025-10-08T14:30:00+07:00" },
      { cinema: "Galaxy Nguyễn Du", datetime: "2025-10-08T19:00:00+07:00" },
      { cinema: "Lotte Cinema", datetime: "2025-10-09T16:00:00+07:00" },
    ],
  },

  {
    id: "m002",
    title: "The Silent Dawn",
    year: 2024,
    country: "USA",
    duration: 132,
    genre: ["Sci-Fi", "Thriller"],
    poster: "/images/post2.jfif",
    fullDescription:
      "Trong tương lai gần, Trái Đất rơi vào một hiện tượng kỳ lạ khiến các bình minh dần biến mất. Một nhóm khoa học gia và nhà báo phải hợp lực để tìm ra nguồn gốc của hiện tượng trước khi loài người mất đi hy vọng. Phim kết hợp yếu tố khoa học viễn tưởng với căng thẳng tâm lý và những bất ngờ về nhân tính.",
    shortDescription:
      "Một cuộc đua với thời gian để cứu lấy bình minh của nhân loại.",
    showtimes: [
      { cinema: "IMAX Landmark", datetime: "2025-10-08T21:00:00+07:00" },
      { cinema: "MegaBX HCM", datetime: "2025-10-09T18:30:00+07:00" },
    ],
  },

  {
    id: "m003",
    title: "Hành Trình Mùa Hạ",
    year: 2021,
    country: "Hàn Quốc",
    duration: 105,
    genre: ["Romance", "Slice of Life"],
    poster: "/images/post3.jfif",
    fullDescription:
      "Một câu chuyện nhẹ nhàng về hai người trẻ gặp gỡ trong một mùa hè ở bờ biển. Qua những bữa ăn, những buổi chiều dài và những bí mật nhỏ, họ học cách trưởng thành, buông bỏ và trân trọng khoảnh khắc hiện tại. Phim chú trọng đến nhịp điệu chậm rãi và những khung hình giàu cảm xúc.",
    shortDescription: "Tình yêu và sự trưởng thành qua một mùa hè ở biển.",
    showtimes: [
      { cinema: "Arthouse Cineplex", datetime: "2025-10-09T13:00:00+07:00" },
      { cinema: "BHD Star", datetime: "2025-10-09T20:00:00+07:00" },
    ],
  },

  {
    id: "m004",
    title: "Long Road Home",
    year: 2019,
    country: "UK",
    duration: 145,
    genre: ["Drama", "Historical"],
    poster: "/images/post4.jfif",
    fullDescription:
      "Lấy bối cảnh sau một cuộc chiến, Long Road Home theo chân một người lính trở về quê hương với những sang chấn tinh thần chưa được chữa lành. Phim khai thác đề tài lịch sử, gia đình và quá trình hàn gắn, cùng những xung đột giữa ký ức và hiện tại.",
    shortDescription: "Hành trình hàn gắn sau chiến tranh của một người lính.",
    showtimes: [
      { cinema: "Classic Cinema", datetime: "2025-10-10T15:30:00+07:00" },
    ],
  },

  {
    id: "m005",
    title: "Đêm Không Ngủ",
    year: 2025,
    country: "Việt Nam",
    duration: 98,
    genre: ["Crime", "Noir"],
    poster: "/images/post5.jfif",
    fullDescription:
      "Một đêm dài ở thành phố, nơi một thám tử tự do bị cuốn vào chuỗi sự kiện tội phạm liên kết với những người từ quá khứ. Với ánh đèn neon và tiếng mưa rơi, phim xây dựng bầu không khí Noir và những tình tiết lắt léo dẫn đến một kết thúc khó đoán.",
    shortDescription: "Noir hiện đại về một đêm biến cố của một thám tử.",
    showtimes: [
      { cinema: "TP.HCM Indie", datetime: "2025-10-08T22:45:00+07:00" },
      { cinema: "CGV Thao Dien", datetime: "2025-10-09T20:15:00+07:00" },
    ],
  },

  {
    id: "m006",
    title: "Voyage of Colors",
    year: 2022,
    country: "Japan",
    duration: 74,
    genre: ["Animation", "Family"],
    poster: "/images/post6.jfif",
    fullDescription:
      "Một phim hoạt hình đầy màu sắc về cô bé và chú chim biết hát, cùng hành trình khám phá thế giới kỳ diệu của cảm xúc. Phim dành cho gia đình, với hình ảnh đẹp, âm nhạc du dương và thông điệp về tình bạn, lòng dũng cảm và sự tò mò.",
    shortDescription: "Hoạt hình ấm áp về tình bạn và sự khám phá.",
    showtimes: [
      { cinema: "Kids Cinema", datetime: "2025-10-11T10:00:00+07:00" },
      { cinema: "BHD Star", datetime: "2025-10-11T12:30:00+07:00" },
    ],
  },
];

export default movies;
