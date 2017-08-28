// Array method의 return value: concat, slice, splice, map, reduce, filter, etc.

const arr1 = [1],
	arr2 = [2, 3],
	arr3 = [4, 5, 6];

// concat: no manipulation on original arrays // returns a new array
const concat1and2 = arr1.concat(arr2);

console.log(arr1);
console.log(arr2);
console.log(concat1and2);

// concat은 붙이는 것, slice/splice는 자르는 것
// - concat/slice는 원래 array에 영향을 미치지 않음 => 새 어레이 리턴
// splice는 original array에 변형이 가해진다.
// ex. 같은 arrya에 대해 slice

// slice: no manipulation on original arrays // returns a new array

const slice1 = concat1and2.slice();
const slice2 = concat1and2.slice(0);
const slice3 = concat1and2.slice(0, -1);


// splice: MANIPULATES original array // returns an array containing deleted elements

console.log(concat1and2);
const splice1 = concat1and2.splice(0, 1);
const splice2 = concatland2.splice(0, concatland2.length);
// => 위의 두개는 서로 다름.
// => splice2 == concatland2, concatland2 => []
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
// => map과 reduce는 비슷한 역할을 함
// => reduce : 누적 / map : 각각에 뭔가를 해보고 싶을 때
// callback안에서 return해주는 것은 새 array에 들어갈 element!
// manipulates original array!
// map => element를 리턴함
// reduce는 무조건 array 기반, 기존 array에 변형이 일어남
// current element를 copy하는 행위를 해줘야 함.
// acc에 숫자가 안와도 된다!
// callback에서 들어가는 argument가 차이가 난다.

const mapFiveStarScore = complexArray.map((current, index, array) => {
	console.log(current);
	console.log(index);
	console.log(array);

	current.fiveStarScore = Math.floor(current.score / 5000);
	delete current.score;
	return current;
});

console.log(multiplyAllResult);


// reduce: returns the result from the reduction
// callback에서 return 해주어야 하는 것은 accumulator!
// manipulates original array!

const addAllScore1 = complexArray.reduce((acc, cur, i) => {
	console.log(acc);
	console.log(cur);
	console.log(i);

	return acc += cur.score;
});

const addAllScore0 = complexArray.reduce((acc, cur, i) => {
	console.log(acc);
	console.log(cur);
	console.log(i);

	return acc += cur.score;
}, 0);

const addAllScoreWithInitialValue = complexArray.reduce((acc, cur, i) => {
	return acc += cur.score;
}, 0);


const reduceFiveStarScoreArray1 = complexArray.reduce((accumulator, current, index) => {
	console.log(accumulator);
	console.log(current);
	console.log(index);

	current.fiveStarScore = Math.round(current.score / 5000);
	console.log(current.fiveStarScore);
	delete current.newScore;

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