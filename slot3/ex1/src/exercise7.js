const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
];

// Tạo company0New với start += 1 mà không làm đổi companies[0]
const company0New = { ...companies[0], start: companies[0].start + 1 };

// Hàm concatAll dùng rest và spread
function concatAll(...arrays) {
    return [].concat(...arrays);
}

// In kết quả
console.log(companies[0]);
console.log(company0New);
console.log(concatAll([1,2],[3],[4,5]));

