const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
//const ages = [33, 12, 20, 16];


const [fist, , third=0, ...restAge] = ages;

console.log(fist);

console.log(third)

console.log(...restAge)
