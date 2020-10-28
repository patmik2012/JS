/*
EXERCISE 1
Write a function that processes the query string of an url and returns every parameters of it in the following format:
name1:value1, name2:value2, name3:value3....

sample:
input: "http://example.com/path/to/page?firstname=john&lastname=doe&email=jdoe@example.com" 
output: "firstname:john, lastname:doe, email:jdoe@example.com"
*/

function getParams(url) {
  let eredmeny = "";
  url = url.split("?")[1];
  url = url.replaceAll("=", ":");
  eredmeny = url.replaceAll("&", ", ");
  return eredmeny;
}

console.log(
  getParams(
    "http://example.com/path/to/page?firstname=john&lastname=doe&email=jdoe@example.com"
  )
);

/*
EXERCISE 2
Write a function that prints a decimal number in binary or octal or hexadecimal format. 
The function accepts 2 parameter the number and on of the following strings: 'OCT', 'HEX', 'BIN'
IF the first parameter is not a number or an invalid string value is passed as the 2nd parameter 
the function returns the 'Invalid parameter' string

sample:
input: 10, 'BIN'
output: '1010'
input: 10, 'OCT'
output: '12'
input: 10, 'HEX'
output: 'A'
input: 10, 'OTHER'
output: 'Invalid parameter'

 */

function convertDecimal(value, format) {
  if (typeof value === "number") {
    if ((format = "BIN")) return value.toString(2);
    if ((format = "OCT")) return value.toString(8);
    if ((format = "HEX")) return value.toString(16);
  } else return "Invalid parameter";
}

console.log(convertDecimal(10, "BIN"));
console.log(convertDecimal(10, "OCT"));
console.log(convertDecimal(10, "HEX"));
console.log(convertDecimal(10, "OTHER"));
console.log(convertDecimal("A", "HEX"));

//let's pass the value in octal / hexadecimal format
console.log(convertDecimal(010, "BIN")); //octal
console.log(convertDecimal(0x10, "BIN")); //hexa

/*
EXERCISE 3
Write a function that returns a random integer in the range specified by the min, max parameters passed 
min inclusive, max exclusive

sample: 
input: 10, 20
output: ie. 10, 14, 19 

*/

function generateInRange(min, max) {
  if (max < min) return "Maximumnak nagyobbnak kell lennie minimumnál!";
  return Math.round(min + Math.random() * (max - min));
}

console.log(generateInRange(10, 20));