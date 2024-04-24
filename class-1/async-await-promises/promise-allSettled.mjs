/* node async-await-promises/promise-allSettled.mjs */

const promise1 = Promise.resolve(3)
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "foo"),
)
const promise3 = Promise.resolve(["resolved", 99])

const promise4 = Promise.resolve(33)
const promise5 = Promise.reject(new Error("an error"))
const promise6 = new Promise((res, rej) => setTimeout(() => rej(5000), 1500))

const promise7 = new Promise((resolve) => setTimeout(() => resolve(66), 0))
const promise8 = 99
const promise9 = [88, 77]
const promise10 = { key: "value", pretty: true }

const promises = [
  promise1,
  promise2,
  promise3,
  promise4,
  promise5,
  promise6,
  promise7,
  promise8,
  promise9,
  promise10,
]

/**
 * Retrieves the values from an array of promises using the Promise.allSettled method.
 * The function logs the current date inside the promise.
 * It creates an object with two arrays: 'rejected' and 'fulfilled',
 * and pushes the resolved or rejected promises into their respective arrays.
 *
 * @returns {Object} - An object containing the 'rejected' and 'fulfilled' arrays.
 * @property {Array<Object>} rejected - An array of rejected promises.
 * @property {"rejected"} rejected[].status - The status of the rejected promise ('rejected').
 * @property {unknown} rejected[].reason - The reason for the rejection.
 * @property {Array<Object>} fulfilled - An array of fulfilled promises.
 * @property {"fulfilled"} fulfilled[].status - The status of the fulfilled promise ('fulfilled').
 * @property {unknown} fulfilled[].value - The value of the fulfilled promise.
 
 * * Documentation of Promise.allSettled parameters: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#parameters
 * 
 * * Documentation of Promise.allSettled return: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#return_value
 * 
 * * Documentation of Promise.allSettled description: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#return_value
 */
const getValues = async ({ thePromises }) => {
  return await Promise.allSettled(thePromises).then((x) => {
    let allObj = {
      rejected: [],
      fulfilled: [],
    }

    x.forEach((y) => {
      if (y.status === "rejected") {
        allObj.rejected.push(y)
      } else {
        allObj.fulfilled.push(y)
      }
    })
    return allObj
  })
}

let { rejected, fulfilled } = await getValues({ thePromises: promises })
console.log("rejected:", rejected)
console.log("fulfilled:", fulfilled)

let amountRejected = rejected.length
console.log("amountRejected:", amountRejected)
let amountFulfilled = fulfilled.length
console.log("amountFulfilled:", amountFulfilled)
