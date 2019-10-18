/*
Receives two values,
Prints a message indicating if they match or not.
*/

const assertEqual = function(actual, expected) {
  if (actual === expected) {
    console.log(`✅ ✅ ✅ Assertion Passed: ${actual} === ${expected}`);
  } else {
    console.log(`😡 😡 😡 Assertion Failed: ${actual} !== ${expected}`);
  }
};

/*
Accepts two objects
Returns true if both objects have identical keys with identical values.
Otherwise returns false

Two objects are equal when:
- they have the same number of keys
- the value for each key is the same in both objects
*/

const eqObjects = function(object1, object2) {
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);
  // if they don't have the same number of keys, return false
  if (keys1.length !== keys2.length) {
    return false;
  } else {
    for (let key in object2) {                       //else, for each key in obj1
      if (!object2[key]) {                           //if object2 doesn't contain the key return false
        return false;
      } else if (Array.isArray(object2[key])) {     //else, if the key value is an array
        if (!eqArrays(object2[key], object1[key])) { //check if the arrays match
          return false;                             //if not, return false
        }
      } else if (object1[key] !== object2[key]) { //else, check if key values are equal
        return false;                             //if not, return false
      }
    }
  }
  return true; //if the function gets this far, they're identical - return true
};

/*
Accepts two objects
Console.logs a message about whether they're equal or not
*/

const assertObjectsEqual = function(actual, expected) {
  const inspect = require('util').inspect;
  if (eqObjects(actual, expected)) {
    console.log(`✅ ✅ ✅ Assertion Passed: ${inspect(actual)} === ${inspect(expected)}`);
  } else {
    console.log(`😡 😡 😡 Assertion Failed: ${inspect(actual)} !== ${inspect(expected)}`);
  }
};

// Receives a string where spaces are represented by "%20"
// Returns a string where instances of "%20" are replaced with a space

const getSpaces = function(string) {
  let spacedOutString = "";
  for (let i = 0; i < string.length; i++) {
    if ((string[i] === "\%") && (string[i + 1] === "2") && ((string[i + 2]) === "0")) {
     spacedOutString += " ";
     i += 2;
    } else spacedOutString += string[i]
  }
  return spacedOutString;
};

// Receives a string of key-value pairs separated by &
// Returns an array of separate strings representing each key-value pair

const separatePairs = function(string) {
  return string.split("\&");
};

// Receives an array of strings, where each string represents a key-value pair
// Returns an array of arrays, where each sub-array represents a key-value pair 

const keyValuePairArrays = function(array) {
  let keyValueArray = [];
  array.forEach(string => keyValueArray.push(string.split("\=")));
  return keyValueArray;
}

/*
Receives a URL encoded string of key-value pairs
returns the JavaScript object that represents that data.
with appropriate key-value pairs

- %20 represents a space
- Key-value pairs are represented using = : key=value
- Multiple key-value pairs are separated using & : key1=value1&key2=value2
*/


const urlDecode = function(string) {
  let str = string.trim();
  let decodedStrObject = {};
  let keyValuePairArray = keyValuePairArrays(separatePairs((getSpaces(str))));

  keyValuePairArray.forEach(function(pair) {
    decodedStrObject[pair[0]] = pair[1];
  })

  return decodedStrObject;
};

assertObjectsEqual(urlDecode("duck=rubber"), {duck: "rubber"});
assertObjectsEqual(urlDecode("bootcamp=Lighthouse%20Labs"), {bootcamp: "Lighthouse Labs"});
assertObjectsEqual(urlDecode("city=Vancouver&weather=lots%20of%20rain"), {city: "Vancouver", weather: "lots of rain"});
assertEqual(urlDecode("city=Vancouver&weather=lots%20of%20rain").weather, "lots of rain");
