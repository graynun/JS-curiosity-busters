// 1-0. Promises
// Promise: an Object has two functions on it

var promise = {
  then: function() {},
  catch: function() {}
}

// + 최종적인 하나의 값을 표현하는 객체
// + Promise 객체는 아직 완료되지 않았을 수도 있는 동시적 연산을 감싸고 있음. 하지만 결국 결과 값을 만든다.

// 1-1. then method
// Promise 객체는 자신의 then 메서드로 콜백을 받아들임.
// then 메서드는 *최종적인 값의 한 종류*를 표현하는 하나의 promise 객체를 받을 수 있게 해 준다.
// 콜백에서 어떤 값을 반환하더라도 또 다른 최종 값의 종류를 표현하는 새로운 promise 객체를 생성한다.

var fileP = downloadP("file.txt")
var lengthP = fileP.then(function(file) {
  return fileP.length
})

lengthP.then(function(length) {
  console.log("length: ", length)
})

// 1-2. 비동기 통신과 Promise
// 비동기 API를 구조화 하기 위해서 콜백을 인자로 받아들이는 경우들
// Promise는 인자로 콜백을 받아들이지 않는 대신 Promise 객체를 반환

// 1-3. composability(구성력?)
// 이미 존재하는 promise에서 새로운 promise를 생성하는 능력 덕분
// * making join utility
var filesP = join(downloadP("file1.txt")),
                 (downloadP("file2.txt")),
                 (downloadP("file3.txt"))
filesP.then(function(files) {
  console.log("file1: ", files[0])
  console.log("file2: ", files[1])
  console.log("file3: ", files[2])
})

// * Callback problems
// > 그래서 콜백이 왜 나쁜데?

export default function getLikes () {
  getUsers((err, users) => {
    if (err) return fn(err);
    filterUsersWithFriends((err, usersWithFriends) => {
      if (err) return fn(err);
      getUsersLikes(usersWithFriends, (err, likes) => {
        if (err) return fn (err);
        fn(null, likes);
      });
    });
  });
}

// - Error handling is repetitive
// - Error handling is unspecified
// : 대부분 error의 매개변수를 사용해 콜백을 호출하거나 성공한 대신 null을 사용한다.
// 하지만 null 대신 false가 될 수도 있다. 따라서 여러 오류가 발생하면 여러 콜백을 받을 수 있다.
// - Scheduling is unspecified

// 2. Promise는 어떻게 동작하나

let promiseToCleanTheRoom = new Promise(function(resolve, reject) {
  // cleaning the room
  let isClean = true

  if(isClean) {
    resolve('Clean')
  } else {
    reject('not Clean')
  }
})

promiseToCleanTheRoom.then(function(fromResolve) {
  console.log('the room is ' + fromResolve)
}).catch(function(fromReject) {
  console.log('the room is ' + fromReject)
})

// 3. nested Promise
// methods: Promise.all(), Promise.race()

let cleanRoom = function() {
  return new Promise(function(resolve, reject) {
    resolve('Cleaned the room!')
  })
}

let removeGarbage = function(message) {
  return new Promise(function(resolve, reject) {
    resolve(message + 'remove Garbage')
  })
}

let getIcecream = function(message) {
  return new Promise(function(resolve, reject) {
    resolve(message + 'Got Icecream!')
  })
}

// cleanRoom()
//   .then(function(result){ return removeGarbage(result) })
//   .then(function(result){ return getIcecream(result) })
//   .then(function(result){ console.log('whole finished!' + result) })

Promise.race([cleanRoom(), removeGarbage(), getIcecream()]).then(function(){
  console.log('one of them is finished')
})

// 4. 작동 순서 예시

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

// result

script start
script end
promise1
promise2
setTimeout

// (* 엔진의 차이: Microsoft Edge, Firefox 40, iOS Safari and desktop Safari 8.0.8
// log setTimeout before promise1 and promise2)

// Microtask에 관해 알아야 함...

// Promises can be in two settled states => resolved / rejected
// resolved value, rejected value를 받기 위해 callback을 쓸 수 있다.

// Promise에 callback을 넘길 수도 있다.
// Promise는 하나의 값을 뜻한다. => 특정 호출에 대해 성공한 뒤에는 오류를 얻을 수가 없다.
// 혹은 값과 오류를 나중에 얻게 된다.

// resolve를 Promise의 return으로, reject를 throw로 생각할 수 있다.
// => `async`와 `await`를 통해 이러한 의미가 구현됨

// Promise의 동작은 `then`과 `catch`를 부르는 때마다 모두 계속해서 비동기적이다.
// Promise를 사용할 때 error handler를 사용하지 않으면 오류에 대해 알 수 없는 경우가 많다.