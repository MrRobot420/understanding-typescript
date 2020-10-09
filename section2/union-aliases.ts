type Combinable = number | string
type ResultDescriptor = 'as-text' | 'as-number'

function combine(n1: Combinable, n2: Combinable, resultConversion: ResultDescriptor) {
    let result
    if (typeof n1 === 'number' && typeof n2 === 'number' || resultConversion === 'as-number') result = +n1 + +n2
    else result = n1.toString() + n2.toString()
    return result
}

const age = combine(21, 3, 'as-number')
console.log(age)

const stringAge = combine('Max ', 24, 'as-text')
console.log(stringAge)

const stringString = combine('Max', ' Karl', 'as-text')
console.log(stringString)