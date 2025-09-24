export const Exercise8 = () => {
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

  return (
    <div>
      <h2>Kết quả của Exercise 8</h2>
      <p>
        Total: {stats.total}, Min: {stats.min}, Max: {stats.max}
      </p>
      <p>
        Buckets: {"{"} teen: {stats.buckets.teen}, adult: ${stats.buckets.adult}{" "}
        {"}"}
      </p>
    </div>
  );
};
