/// Exercice 1 
// Define the Person class
class Person {
    constructor(name, age, country) {
        this.name = name;
        this.age = age;
        this.country = country;
    }

    // Method to display person's details
    displayDetails() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Country: ${this.country}`);
    }
}

// Create instances of the Person class
const person1 = new Person('John', 30, 'USA');
const person2 = new Person('Alice', 25, 'Canada');

// Display details of the persons
person1.displayDetails();
person2.displayDetails();



// Exercice 2
//Define rectangle class
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    //Method to calculate rectangle area
    calculateArea() {
        return (this.width * this.width);
    }

    //Method to calculate rectangule perimeter
    calculatePerimeter() {
        return 2 * (this.width + this.height);
    }
}

//Create an instance of the Rectangle class
const rectangle = new Rectangle(7, 8);

//Calculate area and perimeter of the rectangle
const area = rectangle.calculateArea();
const perimeter = rectangle.calculatePerimeter();

console.log('Area of the perimeter: ', area)
console.log('Perimeter of the rectangle: ', perimeter)



// Exercice 3
//Define the vehicule class
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    //Method to display details
    displayDetailss() {
        console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`);
    }
}

//Define the car sub class inheriting from vehicle
class Car extends Vehicle {
    constructor(make, model, year, doors) {
        super(make, model, year);
        this.doors = doors;
    }

    //Override the display method to include the number of doors
    displayDetailss() {
        super.displayDetailss();
        console.log(`Number of doors: ${this.doors}`);
    }
}

//Create an instance of the Car class
const myCar = new Car ('Toyota', 'Ford', 2015, 4);

//Display details of the car
myCar.displayDetailss();



//Exercice 4
class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    //Method to deposit money into the account
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount} into account ${this.accountNumber} New balance: ${this.balance}`);
    }

    //Method to withdraw money from the account
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`withdrawn ${amount}, from account ${this.accountNumber}. New balance: ${this.balance}`);
        } else {
            console.log(`Insufficient funds. Cannot withdraw ${amount} from account ${this.accountNumber}`)
        }
    }
}

//Create instances of the BankAccount class
const account1 = new BankAccount('111111', 1000)
const account2 = new BankAccount('222222', 500)

//Deposit money into accounts
account1.deposit(200);
account2.deposit(300);

//withdraw money from accounts
account1.withdraw(300);
account2.withdraw(600);



//Exercice 5
// Define the Shape class
class Shape {
    calculateArea() {
        // Default implementation returns 0
        return 0;
    }
}

// Define the Circle subclass inheriting from Shape
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    // Override the calculateArea method for circles
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
}

// Define the Triangle subclass inheriting from Shape
class Triangle extends Shape {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }

    // Override the calculateArea method for triangles
    calculateArea() {
        return 0.5 * this.base * this.height;
    }
}

// Create an instance of the Circle class
const circle = new Circle(5);
console.log("Area of the circle:", circle.calculateArea());

// Create an instance of the Triangle class
const triangle = new Triangle(4, 6);
console.log("Area of the triangle:", triangle.calculateArea());
