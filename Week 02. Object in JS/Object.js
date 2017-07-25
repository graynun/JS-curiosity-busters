// 0. Last week

// 😲 Mysterious return value of map/reduce/filter
// => They don't change data(immutability), and make new array.
// => Returned new array is references/duplicates former(original) one.
// Why we use them?

// How those work

// 1) map returns new array which references former array but new form of each elements
// map(샌드위치에 들어갈 재료들 array 🥕, 🍞, 🍅, 🍖)
// ... map-ing 🥒 ...
// => return value : 🥗 샌드위치에 들아갈 수 있도록 한 입 크기로 썰어진 채소들 array!

// 2) reduce returns new array which references former array but totally new version of former one.
// [샌드위치에 들어갈 재료들 array 🥕, 🍞, 🍅, 🍖].reduce(acc, prev, function makeSandwitch)
// ... accumulating ...
// => return value : 🌯 샌드위치!(는 재료 각각의 엘리먼트와 전혀 다른 모양)

// Anyway, returning new array is for data mutability.
// To protect original one. 🔒

// #more: immutable data structure, functional programming

// map, reduce, filter는 higer order function
// higher order function
// => 함수가 함수의 input/output(parameter/return value)
// => 중요한 이유는
// ==> 원하는 결과를 얻기 위해 iterator를 쓰지 않아도 된다.
// ==> 데이터를 변화시키지 않아도 된다.
// 즉 만들어진 이유? 혹은 가장 중요한 역할이 원본 데이터를 건드리지 않기 위함.


// [Exercise]
// * Reduce Array into Single Data
// reduce -- map : reduce로 map과 같은 기능을 할 수 있게 만들기.

var us = [
    "Amy",
    "Amy",
    "Amy",
    "Bubbles",
    "Bubbles",
    "YoungIm",
    "YoungIm",
    "Juyeon"
    ]

var initialValue = {};

var reducer = function (who, person) {
    if(!who[person]) {
        who[person] = 1;
    } else {
        who[person] = who[person] + 1;
    }

    return who;
};

var result = us.reduce(reducer, initialValue);

// map의 경우
var doubleMapped = data.map(function(item) {
  return item * 2;
});


// reduce —- filter : reduce로 filter 기능 구현하기

var data2 = [1, 2, 3, 4, 5, 6, 7];
var evens = data2.reduce(function(acc, value) {
  if (value % 2 === 0) {
    acc.push(value);
  }
  return acc;
}, []);
// [2, 4, 6]

// filter의 경우
var evenFiltered = data2.filter(function(item) {
  return (item % 2 === 0);
})


// 왜 알아야 할까?
// 만약, 짝수만 골라서 두 배로 하고 싶다면?(map + filter)

var filterMapped = data2.filter(function(value) {
  return (value % 2 === 0);
}).map(function(value) {
  return value * 2;
});

// 같은 데이터를 놓고 두번의 함수를 돌리면, 데이터가 많아졌을 때 성능이 떨어진다.

var reducedFilterMap = data2.reduce(function(acc, value) {
  if (value % 2 === 0) {
    acc.push(value * 2)
  }
  return acc;
}, [])


// * -------------------------------------------------------------------- * //

// WEEK 02. OBJECT IN JS { 👀... }

obj = {
  "Mon" : 24,
  "Tue" : 25,
  "Wed" : 26,
  "Thur" : 27,
  "Fri" : 28,
  "Sat" : 29,
  "Sun" : 30
};

// 오브젝트 길이 리턴하기
Object.keys(obj).length

// 해당 키가 있는 지 확인하기
obj["key"] !== undefined   // 1. undefined 활용(faster)
obj.hasOwnProperty("key")  // 2. hasOwnProperty 활용
"key" in obj === true      // 3. in operator 활용(prototype chain 확인)

var myObj = {
  method : function() {}
};

myObj.hasOwnProperty('method');
'method' in myObj;
// true

myObj.hasOwnProperty('valueOf');  // false
'valueOf' in myObj;               // true

// 오브젝트의 key/value 값 출력하기

// 1. forEach
// combine 'Object.keys()' and 'Array.prototype.forEach()'

Object.keys(obj).forEach(function (key) {
    console.log(key, obj[key]);
});

// 2. entries
// Object.entries () 메서드는 for ... in 루프와 마찬가지로
// 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환
Object.entries(obj).forEach(
    ([key, value]) => console.log(key, value)
);

// 3. for - in 사용하기
for(var prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
        console.log('no value!');
    }
  console.log(prop);
}

// * for ... in 루프는 임의의 순서로 객체의 속성을 반복 (따라서 인덱스 순서가 중요한 배열을 반복하는 데에는 사용 X)
// * 순서가 중요한 경우 숫자 인덱스가 있는 for 루프를 사용해야 함 - Array.prototype.forEach() 또는 for ... of
// * 오브젝트는 순서가 없고 for-in 루프는 배열의 인덱스가 아니라 객체의 열거 가능한 속성을 통해 수행됨.

let cat = {
  sound: 'miao',
  talk: function() {
    console.log(this.sound)
  }
}

cat.talk() // "miao"

let talkFunction = cat.talk;
talkFunction() // undefined

// talkFunction은 더이상 메서드가 아님. cat과의 connection이 사라진다.

let boundFunction = talkFunction.bind(cat)
boundFunction() // "miao"

let button = document.getElementById('myNiceButton')
button.addEventListener(
  'click',
  cat.talk.bind(cat)
)

// this는 function에 쓸 수 있는 특별한 키워드.
function talk(sound) {
  console.log(sound);
}
talk('hello');

// this context is missing
function talk(sound) {
  console.log(this.sound);
}
talk('hello'); // undefined => this의 context 문제

// bind 1
function talk() {
  console.log(this.sound);
}
let jennybe = {
  sound: 'hi amy!'
}
let talkBoundToJennybe = talk.bind(jennybe);
talkBoundToJennybe()

// bind 2
let talk = function() {
  console.log(this.sound);
}
let jennybe = {
  speak: talk,
  sound: 'Hi hi Amy! :>'
}
jennybe.speak(); // speak is calling reference
talk(); // global


