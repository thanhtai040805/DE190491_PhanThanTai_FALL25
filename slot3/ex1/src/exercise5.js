const people = [
  { name: "Bob", age: 25 },
  { name: "Alice", age: 18 },
  { name: "Joy", age: 30 },
  { name: "Ponk", age:  19},
  { name: "Buuu", age: 12 },
];

// Dùng filter để lọc ra người >= 13 và <= 19
//Dùng map để map sang dạng 'name + (age)'
const teens = people
  .filter((p) => (p.age >= 13) & (p.age <= 19))
  .map((p) => (p = `${p.name} (${p.age})`));
teens.forEach((str) => console.log(str));


