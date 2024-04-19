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
