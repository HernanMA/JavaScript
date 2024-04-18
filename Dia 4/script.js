//Example Car
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    getDetails() {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

let myCar = new Car('Toyota', 'Camry', 2022);

console.log(myCar.getDetails());


//Example Person
class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet() {
        return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
    }
}

let person1 = new Person('Alice', 30, 'female');

console.log(person1.greet()); 


//Example book
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    getInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages`;
    }
}

let myBook = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180);

console.log(myBook.getInfo()); 


//Example Number
class MyNumber {
    constructor(value) {
        this.value = value;
    }

    double() {
        return this.value * 2;
    }
}

let myNumberObj = new MyNumber(5);

console.log(myNumberObj.double()); 


//Example function
function calculateRectangleArea(width, height) {
    return width * height;
}

let width = 5;
let height = 10;
let area = calculateRectangleArea(width, height);
console.log(`The area of the rectangle is ${area}`); 

