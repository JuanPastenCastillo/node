/* node async-await-promises/promise-race.mjs */

/**
 * Evaluates an array of promises and returns the value of the first promise that fulfills or rejects.
 *
 * @param {Object} thePromises - An array of promises to evaluate.
 * @typedef {Object} MyReturnType  * An object containing the value of the first promise that fulfills or rejects, and the state of the promise.
 *  @property {unknown} value - The value of the first promise that fulfills or rejects.
 *  @property {"fulfilled"|"rejected"} state - The state of the promise ("fulfilled" or "rejected").
 * @returns {MyReturnType}
 
 * * Documentation of Promise.race parameters: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race#parameters
 *
 * * Documentation of Promise.race return: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race#return_value
 *
 * * Description and difference between Primse.all and Promise.race: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race#description
 */
const evaluatePromisesRace = async ({ thePromises }) => {
  try {
    if (thePromises.length === 0) {
      throw new Error("The array must have at least one element")
    }

    const value = await Promise.race(thePromises)
    return { value: value, state: "fulfilled" }
  } catch (error) {
    let isErrorObject =
      Object.prototype.toString.call(error).slice(8, -1) === "Error"

    let theMessage = isErrorObject ? error.message : error

    return { value: theMessage, state: "rejected" }
  }
}

const promise1 = new Promise((resolve) =>
  setTimeout(resolve, 100, "quick resolve"),
)
const promise2 = new Promise((resolve) =>
  setTimeout(resolve, 500, "slow resolve"),
)

let allResolved = await evaluatePromisesRace({
  thePromises: [promise1, promise2],
})
console.log("allResolved:", allResolved)

const promise3 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "quick reject"),
)
const promise4 = new Promise((resolve, reject) =>
  setTimeout(reject, 500, "slow reject"),
)

let allRejected = await evaluatePromisesRace({
  thePromises: [promise3, promise4],
})
console.log("allRejected:", allRejected)

const promise5 = new Promise((resolve, reject) =>
  setTimeout(resolve, 100, "quick resolve"),
)
const promise6 = new Promise((resolve, reject) =>
  setTimeout(reject, 500, "slow reject"),
)

let oneResolveOneRejected = await evaluatePromisesRace({
  thePromises: [promise5, promise6],
})
console.log("oneResolveOneRejected:", oneResolveOneRejected)

const promise7 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "quick reject"),
)
const promise8 = new Promise((resolve, reject) =>
  setTimeout(resolve, 500, "slow resolve"),
)

let oneRejectedOneResolve = await evaluatePromisesRace({
  thePromises: [promise7, promise8],
})
console.log("oneRejectedOneResolve:", oneRejectedOneResolve)

/* This will never resolve bby Promise.race but here it get resolved because the throw */
let nothingPassed = await evaluatePromisesRace({ thePromises: [] })
console.log("nothingPassed:", nothingPassed)

let increadibleQuick = await evaluatePromisesRace({
  thePromises: [
    Promise.resolve(9999),
    new Promise((res) => setTimeout(res, 1, "1 millisecond Res")),
  ],
})

console.log("increadibleQuick:", increadibleQuick)

const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)]
const resolvedPromisesArray2 = [Promise.resolve(44), Promise.resolve(33)]

const p = Promise.race(resolvedPromisesArray)
const p2 = Promise.race(resolvedPromisesArray2)
// Immediately logging the value of p
console.log("p:", p)
console.log("p2:", p2)

setTimeout(() => {
  console.log("⌛the stack is now empty")
  console.log("p:", p)
  console.log("p2:", p2)
})

const foreverPendingPromise = Promise.race([])
const alreadyFulfilledProm = Promise.resolve(100)

const arr = [foreverPendingPromise, alreadyFulfilledProm, "non-Promise value"]
const arr2 = [foreverPendingPromise, "non-Promise value", Promise.resolve(100)]
const p10 = Promise.race(arr)
const p20 = Promise.race(arr2)

console.log("p10:", p10)
console.log("p20:", p20)
setTimeout(() => {
  console.log("✨the stack is now empty")
  console.log("p10:", p10)
  console.log("p20:", p20)
})

// Logs, in order:
// Promise { <state>: "pending" }
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "fulfilled", <value>: 100 }
// Promise { <state>: "fulfilled", <value>: "non-Promise value" }

function promiseState(promise) {
  const pendingState = { status: "pending" }

  return Promise.race([promise, pendingState]).then(
    (value) =>
      value === pendingState ? value : { status: "fulfilled", value },
    (reason) => ({ status: "rejected", reason }),
  )
}

const p100 = new Promise((res) => setTimeout(() => res(100), 100))
const p200 = new Promise((res) => setTimeout(() => res(200), 200))
const p300 = new Promise((res, rej) => setTimeout(() => rej(300), 100))

async function getStates() {
  console.log(await promiseState(p100))
  console.log(await promiseState(p200))
  console.log(await promiseState(p300))
}

console.log("Immediately after initiation:")
getStates()
setTimeout(() => {
  console.log("After waiting for 100ms:")
  getStates()
}, 100)

// Logs:
// Immediately after initiation:
// { status: 'pending' }
// { status: 'pending' }
// { status: 'pending' }
// After waiting for 100ms:
// { status: 'fulfilled', value: 100 }
// { status: 'pending' }
// { status: 'rejected', reason: 300 }

const data = Promise.race([
  fetch("/api"),
  new Promise((resolve, reject) => {
    // Reject after 500 milliseconds
    setTimeout(() => reject(new Error("Request timed out")), 500)
  }),
])
  .then((res) => res.json())
  .catch((err) => console.error(err))
