//Dùng filter để loại bỏ các giá trị không phải số
//Dùng map để tính tổng các số còn lại
const sum = (...nums) => {
    let sumResult = 0;
    const newArr = nums.filter(num => !isNaN(num));
    newArr.map((num) => (sumResult = Number(num) + sumResult));
    return sumResult;
}
//Dùng forEach để kiểm tra và tính tổng các số
const sum2 = (...nums) => {
  let sumResult = 0;
  nums.forEach((num) => {
    const n = Number(num);
    if (!isNaN(n)) {
      sumResult += n;
    }
  });
  return sumResult;
};
console.log(sum(1, 2, 3));
console.log(sum(1, "x", 4));
const avg = (...nums) => {
    const count = nums.filter(num => !isNaN(num)).length;
    if (count === 0) return 0;
    return sum(...nums) / count;
}
console.log(avg(1, 2, 3,4));
console.log(avg(0));
