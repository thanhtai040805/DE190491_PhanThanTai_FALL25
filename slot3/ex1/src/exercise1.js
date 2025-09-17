const double = (n) => n * 2;

// Dùng toán tử 3 ngôi để viết hàm isEven
const isEven =(n) => (n % 2 === 0) ? true : false;

// Hoặc dùng if...else
const isEven2 = (n) => {if(n % 2 === 0) { return true } else { return false }};

console.log(double(7));
console.log(isEven(10));
console.log(isEven(7));

