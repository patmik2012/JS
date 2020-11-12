import { people } from "./people";

//Write a function that return the number of people that have starships
//use the Array.prototype.filter method
function cntHasStarShip() {
   return people.filter(p => p.starships.length > 0).length;
   //5let: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

}

console.log("Has starships:");
console.log(cntHasStarShip());

//Add a vehiclesCount property to each object, the value of the property is number of items of the array of vehicles property
function addVehiclesCount() {
  people.forEach(p => p.vehiclesCount = p.vehicles.length);
}

addVehiclesCount();
console.log("Vehicles Cnt:");
console.log("--------------");
people.forEach(p => console.log(p.name, p.vehiclesCount));

//Sort the people object by the number of items in the array of films property
//use the Array.prototype.sort method
function sortByFilmsCnt() {
  people.sort(function(a, b) {
  return b.films.length - a.films.length;})
  //5let: https://developer.mozilla.org/hu/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
}

console.log(" ");
console.log("Sorted by films:");
console.log("----------------");
sortByFilmsCnt();
people.forEach(p => console.log(p.name, p.films.length));

//Sort the people objects by the number of items in the starships array and within that by the number of items in the vehicles array
//use the Array.prototype.sort method
function sortByStarshipsandVehicles() {
  people.sort(function(a,b){
  return  b.starships.length - a.starships.length || b.vehicles.length - a.vehicles.length;})   
}


console.log(" ");
console.log("Sorted by starships, vehicles:");
console.log("----------------");
sortByStarshipsandVehicles();
people.forEach(p => console.log(p.name, p.starships.length, p.vehiclesCount));

//Count the total number of vehicles
//use the Array.prototype.reduce method
function countVehicles() {
  return people.reduce((accumulator, element) => {
    return accumulator + element.vehicles.length;}, 0);
//5let: https://www.codegrepper.com/code-examples/delphi/reduce+count+and+reduce+sum
}

console.log(" ");
console.log("Total vehicles count:");
console.log("---------------------");
console.log(countVehicles());
