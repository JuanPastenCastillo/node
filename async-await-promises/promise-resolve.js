/* node async-await-promises/promise-resolve.mjs */

/*
 * Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
 */

let thePromise4EveryPending = Promise.resolve("Never resolved 🟥")
console.log("thePromise4EveryPending:", thePromise4EveryPending)

let nowWeHaveTheValue = Promise.resolve(`We have value ✅`)
nowWeHaveTheValue.then((x) => console.log("Variable:", x))

Promise.resolve("It can be done lineally without assigning a variable").then(
  (x) => console.log("Linear:", x),
)

const promiseArr = Promise.resolve([1, 2, 3])
promiseArr.then((v) => {
  console.log("Array:", v)
})

const original = Promise.resolve(33)
const cast = Promise.resolve(original)
cast.then((value) => {
  console.log(`Value: ${value}`)
})
console.log(`original === cast ? ${original === cast}`)

// Logs, in order:
// original === cast ? true
// value: 33

const throwOnResolve = Promise.resolve({
  then() {
    throw new TypeError("Throwing")
  },
})

throwOnResolve.then(
  (v) => {
    // not called
  },
  (e) => {
    console.error("throw on resolve", e) // TypeError: Throwing
  },
)

const resolveBeforeThrowStillResolve = Promise.resolve({
  then(onFulfilled) {
    onFulfilled("Resolving")
    throw new TypeError("Throwing")
  },
})
resolveBeforeThrowStillResolve.then(
  (v) => {
    console.log(v) // "Resolving"
  },
  (e) => {
    // not called
  },
)

const nestedPromisesResolved = {
  then(onFulfilled, onRejected) {
    onFulfilled({
      // The nestedPromisesResolved is fulfilled with another thenable
      then(onFulfilled, onRejected) {
        onFulfilled(42)
      },
    })
  },
}

Promise.resolve(nestedPromisesResolved).then((v) => {
  console.log(v) // 42
})

/*

This code will lead to infinite recursion

const thenable = {
  then(onFulfilled, onRejected) {
    onFulfilled(thenable)
  },
}

Promise.resolve(thenable) 
*/
