const myPromise = new Promise((resolve, reject) => {
  reject(new Error("Oops, something went wrong"))
})

Promise.reject(new Error("Fail here"))
  .catch(() => {
    console.log("rejected")
  }) // Handle the rejected promise
  .then(() => {
    // Keep the program running with another promise
    return Promise.resolve()
  })
  .catch(() => {
    // It's ok, we don't care if there was an error before
    console.log("It's ok, we don't care if there was an error before")
  })

// Make the program continue despite the first rejection
Promise.all([myPromise, Promise.reject(new Error("Fail here 2"))])
  .catch(() => {
    console.log("Continue the execution")
  })
  .finally(() => {
    console.log("The program continues")
  })
