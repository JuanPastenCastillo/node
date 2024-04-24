/* node async-await-promises/promise-all.js  */
/* 
  * Is similar to Promise.allSettled but it doesn't return rejected promises but only the fulfilled values
 
 This is used when you have two variables that work togheter, without one the other couldn't work, like "choose a dish" and "get the prices of everything else"
 
 The Promise.all is the best choise for concurrency mehotd
*/

/* Example of one reject */
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("one"), 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("two"), 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("three"), 3000)
})
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("four"), 4000)
})
const p5 = new Promise((resolve, reject) => {
  reject(new Error("reject"))
})

// Using .catch:
Promise.all([p1, p2, p3, p4, p5])
  .then((values) => {
    console.log(values)
  })
  .catch((error) => {
    console.error(error.message)
  })

// Logs:
// "reject"

/* Handling possible rejections */
const p10 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p1_delayed_resolution"), 200)
})

const p20 = new Promise((resolve, reject) => {
  reject(new Error("p2_immediate_rejection"))
})

Promise.all([p10.catch((error) => error), p20.catch((error) => error)]).then(
  (values) => {
    console.log("values:", values)
    console.log(values[0]) // "p1_delayed_resolution"
    console.error(values[1]) // "Error: p2_immediate_rejection"
  },
)
