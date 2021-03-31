const x = 1
let y = 5

console.log(x, y)   // tulostuu 1, 5
y += 10
console.log(x, y)   // tulostuu 1, 15
y = 'teksti'
console.log(x, y)   // tulostuu 1, teksti
//x = 4               // aiheuttaa virheen

const t = [1, -1, 3]

t.push(5)

console.log(t.length) // tulostuu 4
console.log(t[1])     // tulostuu -1

t.forEach(value => {
    console.log(value)  // tulostuu 1, -1, 3, 5 omille riveilleen
})

const t2 = [1, -1, 3]

const t3 = t.concat(5)

console.log(t2)  // tulostuu [1, -1, 3]
console.log(t3) // tulostuu [1, -1, 3, 5]

const t4 = [1, 2, 3]
const m1 = t4.map(value => value * 2)
console.log(m1)   // tulostuu [2, 4, 6]
const m2 = t4.map(value => '<li>' + value + '</li>')
console.log(m2)

const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
}

const object12 = {
    name: 'Full Stack -websovelluskehitys',
    level: 'aineopinto',
    size: 5,
}

const object3 = {
    name: {
        first: 'Juha',
        last: 'Tauriainen',
    },
    grades: [2, 3, 5, 3],
    department: 'TKTL',
}

console.log(object1.name)         // tulostuu Arto Hellas
const fieldName = 'age'
console.log(object1[fieldName])    // tulostuu 35

object1.address = 'Tapiola'
object1['secret number'] = 12341


//Funktiot
const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log(result)

const square = p => {
    console.log(p)
    return p * p
}

const square2 = p => p * p

const t5 = [1, 2, 3]
const tSquared = t.map(p => p * p)

function product(a, b) {
    return a * b
}

const vastaus = product(2, 6)

const average = function (a, b) {
    return (a + b) / 2
}

const vastaus2 = average(2, 5)

// Olioiden metodit ja this
const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
    greet: function () {
        console.log('hello, my name is', this.name)
    },
    doAddition: function (a, b) {
        console.log(a + b)
    },
}

arto.doAddition(1, 4)        // tulostuu 5

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)  // tulostuu 25

arto.greet()       // tulostuu hello, my name is Arto Hellas

const referenceToGreet = arto.greet
referenceToGreet() // tulostuu ainoastaan hello, my name is

//setTimeout(arto.greet, 1000)

//setTimeout(arto.greet.bind(arto), 1000)
// sekunnin päästä tulostuu hello, my name is Arto Hellas

// Luokat
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    greet() {
        console.log('hello, my name is', this.name)
    }
}

const arto2 = new Person('Arto Hellas', 35)
arto2.greet()

const juhq = new Person('Juha Tauriainen', 48)
juhq.greet()