const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
//const ages = [33, 12, 20, 16];


const [first, , third = 0, ...restAge] = ages;

console.log(first % 2 === 0);

console.log(first);

console.log(third);

console.log(...restAge);

const isEvenArr = restAge.filter((a) => a % 2 === 0);
isEvenArr.forEach((a) => console.log(a));