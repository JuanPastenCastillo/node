/* node --watch class-2/1.http.js */

/* HTTP is one of many protocols that are useful to transfer some type of data. In this case HTTP means HyperText Transfer Protocol (HTTP). This is the most used on internet to transfer data, specially web pages. 
Examples:
  - A user have some device (a phone) and wants to reach some content. In order to reach it the user should make a request. The request have a: 
    + url (where are you making the request)
    + headers (aditional information about the request like tokens, type of data we are especting to receive, we can send the cookies). Those are optional
    + the method (the type fo request: GET —to request— or POST —to send— or others)
    + and sometimes we send a body (data we want to send)
  - The request reach a Server. The server will process it the request with everything sent from the user (it will go to a database, treath the data). That process will take some time (unknow time) and when this finish it will send a response to the user.
  - The request and the response have different data and this is critical to understand how all of this work. Every part have to send different data
  - The data that the response have is:
    + statusCode (200, 404, 500, etc)
    + body of the response: this are actually the data that you asked
    + headers
  - After receiving the data, the conextion should be closed unleass some header will say that it should keep open
  
  Caveats 🟨:
  - With the statusCode: in reality this is in the header but is important this to be alone because when the headers is writen first the statusCode is writen and after that the headers
  - The HTTP protocol historically had so many security problems and therefore exist the HTTPS protocol. This can be used on localhost but is too complicated and it require a certification. Right now we are going to focus on the HTTP and the API. Another problem is having a service on HTTP on localhost that works correctly but when you deploy it you wrapp that in a service that use HTTPS, therefore interanally is HTTP but is wrapped in HTTPS so everything is encrypted and it doesn't have any problems
  
*/

const http = require("node:http") // http protocol
const fs = require("node:fs")
const path = require("node:path")

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  console.log("req:", req.url)
  res.setHeader("Content-Type", "text/html; charset=utf-8") // The "Content-Type" can be: text/plain, text/html, application/json, etc
  if (req.url === "/") {
    /* A word for status code:
    - From 100 to 199: Informational
    - From 200 to 299: Success
    - From 300 to 399: Redirection
    - From 400 to 499: Client error // The client tried: enter to a page that doesn't exist; send data in a wrong format; it doesn't have permission to access to something
    - From 500 to 599: Server error
    Source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    
    Typical statusCode:
    - 200: OK
    - 301: Moved permanently // The resource of this direction was moved to other direction
    - 400: Bad request
    - 404: Not found
    - 500: Internal server error
    */
    // res.statusCode = 200 // OK: this is the statusCode by default
    res.end(
      "<h1>Welcome to my home page. Some weird things: áéíóúñ åÅøØæÆ ýþæö</h1>"
    )
  } else if (req.url === "/image") {
    /* 
    The "data" second argument here is a Buffer. A Buffer is a global class in nodejs that is useful to work with binary data: a when a .txt file or an image is received by nodejs is readed they binary data and is stored, temporary, in some place of the physical memory to work with them.
    
    Before the read of the data nodejs doesn't know what it is: an image, a text or other, is just a binary data. The nodejs know that is an image when reach the "else" where the header is set to "Content-Type: image/<extension>". Here the codification magic happen: the browser know is an image because the Content-Type setted. 
    
    The buffers are useful to work with files, images, criptography and anything that is not plain text or jsons. Those are critical when you want to work with data transmision because how to file are readed or to received through the network
    */

    const thePath = path.join(__dirname, "images", "no.webp")

    fs.readFile(thePath, (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end("<h1>500: Internal server error</h1>")
      } else {
        // res.statusCode = 200 // OK: this is the statusCode by default
        res.setHeader("Content-Type", "image/webp")
        res.end(data)
      }
    })
  } else if (req.url === "/contact") {
    // res.statusCode = 200 // OK: this is the statusCode by default
    res.end("<h1>Contact</h1>")
  } else {
    res.statusCode = 404 // Not found
    res.end("<h1>404</h1>")
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
