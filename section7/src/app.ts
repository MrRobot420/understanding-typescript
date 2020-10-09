const names: Array<string> = []
const names2: Array<string | number> = []
const names3: Array<any> = []

// names2[0].toString()

const promise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
        resolve('This is done!')
    }, 2000)
})


promise.then(data => {
    data.split(' ')
})

// ########################################
// Creating a generic function: 

function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}


// MAGIC!!
console.log(merge({ name: 'Max' }, { age: 24 }))
const mergedObj = merge({ name: 'Max'}, { age: 24 }) 
const mergedObj2 = merge({ name: 'Max', hobbies: [0] }, { age: 24 }) 
const mergedObj3 = merge({ name: 'Max', hobbies: ['sports', 0] }, { age: 24 })
const mergedObj4 = merge(
    { 
        name: 'Max', 
        hobbies: ['sports', 'coding', 'music'] 
    }, 
    { 
        age: 24 
    })


console.log(mergedObj4);
 

// ########################################
// Working with constraints: 


console.log(mergedObj4);

// This tells typeScript, that this function expects objects as params!
function mergeSpecial<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}

const mergedObj5 = mergeSpecial(
    { 
        name: 'Max', 
        hobbies: ['sports', 'coding', 'music'] 
    }, 
    { 
        age: 24 
    })


// ########################################
// More Generics:

interface Lengthy {
    length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.'
    if (element.length === 1) {
        descriptionText = 'Got 1 value.'
    } else if (element.length > 1) {
        descriptionText = `has ${element.length} elements.`
    }
    return [element, descriptionText]
}


console.log(countAndDescribe('Hi there!'))
console.log(countAndDescribe(['Sports', 'Cooking']))
console.log(countAndDescribe([]))



// ########################################
// The keyof constraint


function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key]
}

// Prevent dumb typos:
// extractAndConvert('Max', 'name')
// extractAndConvert({ name: 'Max' }, 'names')
extractAndConvert({ name: 'Max' }, 'name')




// ########################################
// Generic Classes:


class DataStorage<T extends string | number | boolean> {
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item)) { 
            return
        }
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Max')
textStorage.addItem('Felix')
textStorage.addItem('Keckl')
textStorage.addItem('Phil')
textStorage.removeItem('Keckl')
console.log(textStorage.getItems());


const numberStorage = new DataStorage<number>()
numberStorage.addItem(1)
numberStorage.addItem(2)
numberStorage.addItem(3)
numberStorage.removeItem(2)

console.log(numberStorage.getItems());


const booleanStorage = new DataStorage<boolean>()

booleanStorage.addItem(true)
booleanStorage.addItem(false)
booleanStorage.removeItem(false)

console.log(booleanStorage.getItems());


// const objStorage = new DataStorage<object>()
// objStorage.addItem({ name: 'Max' })
// objStorage.addItem({ name: 'Manu' })
// objStorage.removeItem({ name: 'Max' })

// console.log(objStorage);


// BONUS:

interface CourseGoal {
    title: string
    description: string
    completeUntil: Date
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = date
    return courseGoal as CourseGoal
}

const newNames: Readonly<string[]> = ['Max', 'Anna']
// newNames.push('Bernd')              // Not working because of readonly


