"use strict";

/*
Object?
Objects are sometimes called associative arrays, 
since each property is associated with a string value that can be used to access it.

Property names(=keys) must be strings. 
This means that non-string objects cannot be used as keys in the object.
Any non-string object, including a number, is typecasted into a string via the toString method.

cf) Symbol (New on ES6)
A JavaScript object is a mapping between keys and values. 
Keys are strings (or Symbols) and values can be anything. 
*/

//creating new Object: object initializer

const object1 = new Object(),
	object2 = {},	//literal || initializer notation - easy to declare key-value pairs when creating object
	object3 = Object.create(new Object()), // prototype을 지정할 수 있다는게 장점



//with ES6(ES2015)

let a = 'first property',
	b = 2,
	c = {
		'key': 'third property'
	};

const objectWithVariables = {a, b, c};
// {
// 	'a': 'first property',
// 	'b': 2,
// 	'c': {
// 		'key': 'third property'
// 	}
// }
//

// iterator?
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
// Keyed collections: Maps, Sets, WeakMaps, WeakSets
