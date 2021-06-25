# TimeOuts and iterevals

## window.setTimeOut()

특정 시간이 경과한 뒤에 특정 코드 블럭을 한 번 실행. (1초는 1000ms 단위의 시간 간격)

```js
// Syntax
let timeoutID = scope.setTimeout(function[, delay]);
```

`setTimeOut()`호출에 의해 실행된 함수는 `clearInterval()` 함수로 취소 시킬 수 있다.

```js
// timeout 취소
let myGreeting = setTimeout(sayHi, 2000, 'Mr. Universe');
clearTimeout(myGreeting);
```

## window.setInterval()

호출 간에 일정한 시간 간격으로 특정 코드 블럭을 반복적으로 실행.

```js
// Syntax
let intervalID = scope.setInterval(function[, delay]);
```

`setInterval()`호출에 의해 실행된 함수는 `clearInterval()` 함수로 취소 시킬 수 있다.

```js
// interval 취소
const myInterval = setInterval(myFunction, 2000);
clearInterval(myInterval);
```

## Math.floor()

주어진 숫자와 같거나 작은 정수 중에서 큰수를 반환.

```js
console.log(Math.floor(0.2)); // 0
console.log(Math.floor(45.95)); // 45
console.log(Math.floor(45.03)); // 45
console.log(Math.floor(-45.05)); // -46
console.log(Math.floor(-45.95)); // -46
```
