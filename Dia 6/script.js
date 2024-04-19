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