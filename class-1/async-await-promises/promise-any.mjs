/* node async-await-promises/promise-any.mjs */
/**
 * Evaluates an array of promises and returns the value of the first promise that fulfills.
 * @param {Object} thePromises - An array of promises to evaluate.
 * @typedef {Object} MyReturnType
 "* @property {unknown|Array<unknown>|[]} data - The fulfilled value: unknown vaue or an array of unknown values of any amount or an empty array"
 * @property {string|"fulfilled"} message - A message indicating fulfillment: any string or the string 'fulfilled'.
 * @property {boolean} isError - A flag indicating if an error occurred.
 * @returns {MyReturnType} An object containing the fulfilled value, a message indicating fulfillment, and a flag indicating if an error occurred.
 * 
 * * Documentation of Promise.any parameters: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any#parameters
 * 
 * * Documentation of Promise.any return: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any#return_value
 * 
 * * Description and difference between Primse.all and Promise.race: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any#description
 */
const evaluatePromisesAny = async ({ thePromises }) => {
  try {
    if (thePromises.length === 0) {
      throw new Error("The array must have at least one element")
    }

    const value = await Promise.any(thePromises)
    return { data: value, message: "fulfilled", isError: false }
  } catch (error) {
    return { data: error.errors || [], message: error.message, isError: true }
  }
}

const promise1 = Promise.reject(0)
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"))
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"))
const promisesArr1 = [promise1, promise2, promise3]
let promises1 = await evaluatePromisesAny({ thePromises: promisesArr1 })
console.log("promises1:", promises1)

const promise2_b = new Promise((resolve) => setTimeout(resolve, 100, "equal_1"))
const promise3_b = new Promise((resolve) => setTimeout(resolve, 100, "equal_2"))
const promise4_b = new Promise((resolve) => setTimeout(resolve, 100, "equal_3"))

const promisesArr2 = [promise2_b, promise3_b, promise4_b]

let promises2 = await evaluatePromisesAny({ thePromises: promisesArr2 })
console.log("promises2:", promises2) // equal_1

const promisesArr3 = [promise4_b, promise3_b, promise2_b]
let promises3 = await evaluatePromisesAny({ thePromises: promisesArr3 })
console.log("promises3:", promises3) // equal_1

const promise1_c = Promise.reject(0)
const promise2_c = Promise.reject(404)
const promise3_c = Promise.reject(99)
const promise4_c = new Promise((res, rej) => setTimeout(rej, 1500, 999))

const promisesArr4 = [promise1_c, promise2_c, promise3_c, promise4_c]

let promises4 = await evaluatePromisesAny({ thePromises: promisesArr4 })
console.log("promises4:", promises4)

let promises5 = await evaluatePromisesAny({ thePromises: [] })
console.log("promises5:", promises5)
