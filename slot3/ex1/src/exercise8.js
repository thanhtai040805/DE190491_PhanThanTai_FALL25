const ages = [12, 18, 22, 15, 30, 19, 25, 13, 17];

// Dùng reduce để tính tổng, min, max, và đếm số lượng teen/adult
const stats = ages.reduce(
  (acc, age) => {
    acc.total += age;
    if (age < acc.min) acc.min = age; // Cập nhật min nếu nhỏ hơn min hiện tại
    if (age > acc.max) acc.max = age; // Cập nhật max nếu lớn hơn max hiện tại
    if (age >= 13 && age <= 19) acc.buckets.teen++; // Nếu tuổi từ 13-19, tăng teen
    if (age >= 20) acc.buckets.adult++; // Nếu tuổi >=20, tăng adult
    return acc;
  },
  { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } } // Giá trị khởi tạo
);

// In kết quả tổng, min, max
console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
// In kết quả đếm teen và adult
console.log(
  `Buckets: { teen: ${stats.buckets.teen}, adult: ${stats.buckets.adult} }`
);
