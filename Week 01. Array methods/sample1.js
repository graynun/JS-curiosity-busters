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


const complexArray = [
	{
		name: '스파이더맨: 홈커밍',
		score: 22920
	}, {
		name: '내 사랑',
		score: 8416
	}, {
		name: '덩케르크',
		score: 14111
	}, {
		name: '군함도',
		score: 18045
	}, {
		name: '너의 이름은.',
		score: 21769
	}, {
		name: '다크 나이트',
		score: 6256
	}
];


// map: return new array with the result of callback
// callback안에서 return해주는 것은 새 array에 들어갈 element!
// manipulates original array!

const mapFiveStarScore = complexArray.map((current, index, array) => {
	console.log(current);
	console.log(index);
	console.log(array);

	current.fiveStarScore = Math.floor(current.score / 5000);
	return current;
});

console.log(multiplyAllResult);


// reduce: returns the result from the reduction
// callback에서 return 해주어야 하는 것은 accumulator!
// manipulates original array!

const addAllScore = complexArray.reduce((acc, cur, i) => {
	console.log(accumulator);
	console.log(current);
	console.log(index);

	return acc += cur.score;
});

const addAllScoreWithInitialValue = complexArray.reduce((acc, cur, i) => {
	return acc += cur.score;
}, 0);


const reduceFiveStarScoreArray = complexArray.reduce((accumulator, current, index) => {
	console.log(accumulator);
	console.log(current);
	console.log(index);

	current.fiveStarScore = Math.round(current.score / 5000);
	console.log(current.fiveStarScore);
	delete current.score;

	accumulator.push(current);

	return accumulator;
}, []);

const reduceFiveStarScoreObject = complexArray.reduce((accumulator, current, index) => {
	console.log(accumulator);
	console.log(current);
	console.log(index);
	
	current.fiveStarScore = Math.round(current.score / 5000);
	console.log(current.fiveStarScore);
	delete current.score;

	accumulator[current.name] = current;

	return accumulator;
}, {});


// filter: returns new array with elements passed the test
// callback에서 return 해주어야 하는 것은 원하는 요소에 대해서 true를 반환할 조건
// manipulates original array!

const complexArray = [
	{
		name: '스파이더맨: 홈커밍',
		score: 22920
	}, {
		name: '내 사랑',
		score: 8416
	}, {
		name: '덩케르크',
		score: 14111
	}, {
		name: '군함도',
		score: 18045
	}, {
		name: '너의 이름은.',
		score: 21769
	}, {
		name: '다크 나이트',
		score: 6256
	}
];

const filteredMovies = complexArray.filter((element, index, array) => {
	element.fiveStarScore = Math.round(element.score / 5000);
	return element.score > 20000;
});