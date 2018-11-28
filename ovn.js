
//Kommentar
console.log('OK, Mäster O!');
let name = 'Yeanne d\'Arc';
console.log(name);

let firstName = 'Daniel';
let surName = 'Mojansson';
console.log(firstName);
console.log(surName);

//constant - kan inte ändras
const intRate = 0.3;
console.log(intRate);

//String
//Number
//Boolean
//Undefined
//null

let isApproved = false;
console.log(isApproved);
//Undefined - ka användas som en slags temp
let unKnown = undefined; //Undefined
let selectedColor = null; //Undefined


//Object

//Symbol är ännu en primitiv
let age = 30;
let person = {
name: 'Daniel',
age: 12
};
//dont notation
person.name = 'Doktor';

//bracjet notation
//om det körs i runtime så kan bracket användas

let selection = 'name';
//person['name'] = 'Yunes';
person['selection'] = 'Yunes';

console.log(person.name);

//Array
let selectedColors = ['red']; 
selectedColors[7] = 1;
console.log(selectedColors.length);
for(let i = 0; i < selectedColors.length; i++){
    console.log(selectedColors[i]);
}




//Function
function greet(name, surName){
    console.log('Ok, ' + name + ' ' + surName + '!');
}

//greet('Johnny');
//greet('Mary');
greet(name, surName);