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

// Object: not iterable
// Object is wayyyyy too universal - defining class with 'Object'
let cat = {
  sound: 'miao',
  talk: function() {
    console.log(this.sound);
  }
}

// iterable? - when iterable protocol is implmemeted on an object, it's 'iterable'
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
// sample code from https://stackoverflow.com/questions/29886552/why-are-objects-not-iterable-in-javascript
let obj = { 
    a: '1', 
    b: { something: 'else' }, 
    c: 4, 
    d: { nested: { nestedAgain: true }}
};

obj[Symbol.iterator] = function() {
    var keys = [];
    var ref = this;
    for (var key in this) {
        //note:  can do hasOwnProperty() here, etc.
        keys.push(key);
    }

    return {
        next: function() {
            if (this._keys && this._obj && this._index < this._keys.length) {
                var key = this._keys[this._index];
                this._index++;
                return { key: key, value: this._obj[key], done: false };
            } else {
                return { done: true };
            }
        },
        _index: 0,
        _keys: keys,
        _obj: ref
    };
};


// Object as a data structure - Keyed collections: Map, Set
// cf) keyed collections https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections
// Map - Object(as a data structure) like - holds key-value (both could be objects/primitive values) pair
// no literal notation!

let animalsWithSound = new Map();
animalsWithSound.set('cat', 'meow');
animalsWithSound.set('dog', 'bark');
animalsWithSound.set(1, '...first?');
animalsWithSound.set(NaN, 'Neither an animal nor a Number?');
animalsWithSound.set({}, 'it\'s even empty');

// iterate in insertion order
for (let [key, value] of animalsWithSound) {
	console.log('key is ' + key);
	console.log('value is ' + value);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections#Object_and_Map_compared

// Set - collections of values
// no duplicate value allowed 

let numbers = new Set();
numbers.add(1);
numbers.add(1);
numbers.add(2);
numbers.add(3);

// iterate in insertion order
for (let value of numbers) {
	console.log(value); // 1,2,3
}


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections#Array_and_Set_compared


// WeakMap: key must be 'object'
// 'weakly referenced' - when the key object is not referenced by other part of the code, it will be garbage collected
