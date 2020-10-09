// IMPORTANT INFO:
// Decorators do NOT run at instantiation, but at DEFINITION OF classes! 
// -> If you instatiate multiple PRODUCTS for example, it will NOT execute multiple times!

console.log('#### Decorators: ');

// Decorators
function Logger(constructor: Function) {
    console.log('Logging...')
    console.log(constructor)
}

@Logger
class Person {
    name = 'Max'
    constructor() {
        console.log('Creating person object...');
    }
}

const p1 = new Person()
console.log(p1);


// ######################################
// Decorator Factories:
console.log('#### Decorator Factories: ');

function Logger2(logString: string) {
    console.log('LOGGER FACTORY');
    return function (constructor: Function) {
        console.log(logString)
        console.log(constructor)        // Just in order to show what will be executed
    }
    
}

@Logger2('LOGGING - PERSON')
class Person2 {
    name = 'Max'
    constructor() {
        console.log('Creating person object...');
    }
}

const p2 = new Person()
console.log(p1);


console.log('#### More usefull Decorators: ');
// ######################################
// More usefull Decorators:

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function(constructor: any) {
        console.log('Creating template...');
        const hookElement = document.getElementById(hookId)
        const person = new constructor()
        if (hookElement) {
            hookElement.innerHTML = template
            hookElement.querySelector('h1')!.textContent = 'The persons name is ' + person.name
        }
    }
}

@Logger2('LOGGING...')                  // run first (top down) - execute second (bottom up)
@WithTemplate('<h1></h1>', 'app')       // run second (bottom up) - execute first (top down)
class Person3 {
    name = 'Max'
    constructor() {
        console.log('Creating person object...');
    }
}



console.log('#### Diving into property Decorators: ');

// ######################################
// Diving into property Decorators:

function Log(target: any, propertyName: string) {
    console.log('Property Decorator!')
    console.log(target, propertyName)
}

class Product {
    @Log
    title: string
    private _price: number

    set price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            console.log('Invalid price - should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t
        this._price = p
    }

    getPriceWithTax(tax: number) {
        return this._price * (1 + tax)
    }
}



console.log('#### Accessor and Parameter Decorators: ');

// ######################################
// Accessor and Parameter Decorators:

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor Decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method Decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter Decorator!')
    console.log(target)
    console.log(name)
    console.log(position)
}

class Product2 {
    title: string
    private _price: number

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            console.log('Invalid price - should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t
        this._price = p
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax)
    }
}


console.log('#### Returning and Changing a class: ');

// ######################################
// Returning and Changing a class:

function WithTemplate2(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super()
                console.log('Creating template...');
                const hookElement = document.getElementById(hookId)
                if (hookElement) {
                    hookElement.innerHTML = template
                    hookElement.querySelector('h1')!.textContent = 'The persons name is ' + this.name
                }
            }
        }
    }
}

@Logger2('LOGGING...')                  // run first (top down) - execute second (bottom up)
@WithTemplate('<h1></h1>', 'app')       // run second (bottom up) - execute first (top down)
class Person5 {
    name = 'Max'
    constructor() {
        console.log('Creating person object...');
    }
}

const prod1 = new Product('Book', 19)
const prod2 = new Product('Book 2', 29)





// ######################################
// Creating an autobind decorator:
console.log('#### Creating an autobind decorator: ');

function Autobind(_: any, _2: string | Symbol | number, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true, 
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    } 
    return adjustedDescriptor
}


class Printer {
    message = 'This works'

    @Autobind
    showMessage() {
        console.log(this.message);
        
    }
}

const printer = new Printer()

const button = document.querySelector('button')!
button.addEventListener('click', printer.showMessage)


/* VALIDATORS: OWN IMPLEMENTATION for example for module class-validator */

// ######################################
// Validation with decorators:
console.log('#### Validation with decorators: ');


interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]     // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...registeredValidators[target.constructor.name][propName], 'required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...registeredValidators[target.constructor.name][propName], 'positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name]
    if (!objValidatorConfig) {
        return true
    }
    let isValid = true
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop]
                    break
                case 'positive':
                    isValid = isValid && obj[prop] > 0
                    break
            }
        }
    }
    return isValid
}


class Course {
    @Required
    title: string
    @PositiveNumber
    price: number

    constructor(t: string, p: number) {
        this.title = t
        this.price = p
    }
}


const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event => {
    event.preventDefault()
    const titleElement = document.getElementById('title') as HTMLInputElement
    const priceElement = document.getElementById('price') as HTMLInputElement

    const title = titleElement.value
    const price = +priceElement.value

    const createdCourse = new Course(title, price)

    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!')
        return
    }
    console.log(createdCourse);
})
