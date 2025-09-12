let great = (name, timeOfDay) => {
  console.log(`Good ${timeOfDay}, ${name}!`);
};

great("Alice", "morning");
//Output: Good morning, Alice!
great("Bob", "evening");
//Output: Good evening, Bob!

let square = (num) => {
  return num * num;
};
console.log(square(5)); //Output: 25
console.log(square(8)); //Output: 64

let sayHello = () => {
  console.log("Hello there!");
};

sayHello(); //Output: Hello there!

let person = {
  name: "ThanhTai",
  age: 20,
  greet: function () {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  },
};

person.greet(); //Output: Hello, my name is ThanhTai and I am 20 years old.
