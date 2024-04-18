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