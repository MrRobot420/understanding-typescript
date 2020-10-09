// Intersection Types
type Admin = {
    name: string
    privileges: string[]
}

type Employee = {
    name: string
    startDate: Date
}

type ElevatedEmployee = Admin & Employee


const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric


function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }
    return a + b
}

type UnknownEmployee = Employee | Admin


function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ', emp.name);
    if ('privileges' in emp) {
        console.log('Privileges: ', emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('StartDate: ', emp.startDate);
    }
}

printEmployeeInformation({ name: 'Max', startDate: new Date(), privileges: ['create-server'] })

// #############################
// Type Guards:
class Car {
    drive() {
        console.log('Driving...')
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...')
    }

    loadCargo(amount: number) {
        console.log('Loading cargo... ' + amount)
    }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
    vehicle.drive()
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000)
    }
}

useVehicle(v1)
useVehicle(v2)

// ###############################
// Discriminating Unions:
interface Bird {
    type: 'bird'    // This here is 'discriminating'
    flyingSpeed: number
}


interface Horse {
    type: 'horse'   // This here is 'discriminating'
    runningSpeed: number
}

type Animal = Bird | Horse


function moveAnimal(animal: Animal) {
    let speed
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed
            break
        case 'horse':
            speed = animal.runningSpeed
    }
    console.log('Moving at speed: ' + speed);
}


moveAnimal({ type: 'bird', flyingSpeed: 30 })



// ################################
// Type Casting: 
const paragraph = document.querySelector('p')                                               // Knows HTMLType
const paragraph2 = document.getElementById('message-output')                                // Does not know!
const userInputElement1 = <HTMLInputElement>document.getElementById('user-input')!          // version 1 (working)
const userInputElement2 = document.getElementById('user-input')! as HTMLInputElement        // version 2 (working)
userInputElement2.value = 'Hi there!'                                                       // set DOM element to text

const userInputElement = document.getElementById('user-input')
if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hi there!'
}



// ################################
// Index Properties: 

interface ErrorContainer {              // { email: 'Not a valid email', username: 'Must start with a letter'}
    // id: number                       // WOULD NOT BE POSSIBLE!
    [prop: string]: string
}


const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a letter',
}


// ################################
// Function Overloads: 

// -> See above implementation! (Nearly at the top)
// type Combinable = string | number
// type Numeric = number | boolean

// type Universal = Combinable & Numeric
function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: string, b: number): string;
function add2(a: number, b: string): string;
function add2(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }
    return a + b
}

const result = add2('Max', ' Schwarz')
result.split(' ')


// ################################
// Optional Chaining


const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company'}
}

console.log(fetchedUserData?.job?.title);


// ################################
// Nullish Coalescing
const userInput = null
const storedData = userInput ?? 'DEFAULT'

console.log(storedData);
