// #### Would be possible, but is not a good practise! ####
// const person: {
//     name: string,
//     age: number,
//     hobbies: string[],
//     role: [number, string]
// } = {
//     name: 'Maximilian',
//     age: 24,
//     hobbies: ['Coding', '3D Printing', 'Reading'],
//     role: [2, 'admin']
// }

enum Role { ADMIN, READ_ONLY, AUTHOR }

const person = {
    name: 'Maximilian',
    age: 24,
    hobbies: ['Coding', '3D Printing', 'Reading'],
    role: Role.ADMIN
}

console.log(person)


for (const hobby of person.hobbies) {
    console.log(hobby.toLowerCase())
}