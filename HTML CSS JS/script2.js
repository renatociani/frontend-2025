/*console.log('ciao')
x=6;
y=10
function somma(x,y){
    console.log(x+y)
}
somma(x,y)

let persona = "mario"
persona = "luigi"
console.log(persona)
let personatagliata = persona.slice(0,2)
console.log(personatagliata)*/
let persona = "mario"
console.log(persona.charAt(1))

let array = ["giulio", "marco", "gabriele"]
array.unshift("paola")
array.splice(2,0,"mattia nera")
console.log(array.slice(1));
console.log(array);

const numbers1 = [45, 4, 9, 16, 25];
const numbers2 = numbers1.map(myFunction);

function myFunction(value, index, array) {
  return value * 2;
}

console.log(numbers2)

// Create a Map
const fruits = new Map([
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
  ]);

  fruits.get("apples");   

  class Studente {
   constructor(nome,cognome,eta,materia){
    this.nome= nome;
    this.cognome= cognome;
    this.eta= eta;
    this.materia= materia;
   }
   saluta(){
    return "ciao sono "+this.nome;
   }

  }
let studente = new Studente("mario","rossi",15,"matematica")
console.log(studente.saluta())

let text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}';

const obj = JSON.parse(text);

console.log(obj)
