//1 tạo ra 1 mảng số nguyên -> duyệt qua mảng bằng for / forEach / map -> in ra màn hình
//2 lọc ra các phần từ chẳn / filter
//3 tạo 1 mảng people là list các person id, name, age. Duyệt qua mảng -> in ra danh sách với 3 tham số kia -> rồi lọc qua ds và in ra những người có age > 25 và tính tổng tuổi của nhóm người trong danh sách


let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
console.log(); // Xuống dòng sau khi in xong

numbers.forEach((num) => {
    console.log(num);
});
console.log();


numbers.map((num) => { 
    console.log(num);
});
console.log();


// Bài 2: Lọc ra các phần tử chẵn
let evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("Even Numbers:", evenNumbers);
console.log();

// Bài 3: Mảng people
let people = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 22 },
    { id: 3, name: "Charlie", age: 28 },
    { id: 4, name: "David", age: 24 },
]


people.forEach((person) => {
    console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});
console.log();

let olderThan25 = people.filter((person) => person.age > 25);
console.log("People older than 25:", olderThan25);
console.log();

let totalAge = people.reduce((sum, person) => sum + person.age, 0);
console.log("Total Age:", totalAge);

