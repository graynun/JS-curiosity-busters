// Array method의 return value: concat, slice, splice, map, reduce, filter, etc.



const arr1 = [1],
	arr2 = [2, 3],
	arr3 = [4, 5, 6];


// concat: no manipulation on original arrays // returns a new array
const concat1and2 = arr1.concat(arr2); 

console.log(arr1);
console.log(arr2);
console.log(concat1and2);


// slice: no manipulation on original arrays // returns a new array

const slice1 = concat1and2.slice();
const slice2 = concat1and2.slice(0);
const slice3 = concat1and2.slice(0, -1);


// splice: MANIPULATES original array // returns an array containing deleted elements

console.log(concat1and2);
const splice1 = concat1and2.splice(0, 1);
console.log(concat1and2, splice1);


// map: 

const multiplyAllResult = arr1.concat(arr2.concat(arr3.concat)).map((current, index, array) => {

});


// reduce:

// filter: