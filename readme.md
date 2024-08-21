# Learning node && backend

## DONE

<details>
  <summary>class-1: NODE</summary>
  <ol start="0">
    <li>
      <details>
        <summary>CommonJS and Modules && Paint with colors the terminal without dependencies</summary>
          <ul>
           <li>How to import and export commonjs files and modules</li>
           <li>How to paint with color, background color, and text changes on terminal</li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>OS info</summary>
          <ul>
           <li>OS Info from <code>node:os</code> </li>
           <li>It can be access to: platform, release, architecture, cpu, free memory, total memory and more </li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>FS stat: isFile, isDirectory, isSize</summary>
          <ul>
           <li>Can now if a something is a file, is directory, the size with <code>node:fs</code></li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Read a file: sync, callback, promisify</summary>
          <ul>
           <li>Can read a file sync, with callbacks and using promisify</li>
           <li>Caveat 🟨: only tested with <code>.txt</code> files</li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Read a file: IIFE, promises-then, async await (sequential), async await (parallel)</summary>
          <ul>
           <li>Can read a file sync, with IIFE, promises-then, async await (sequential), async await (parallel)</li>
           <li>Caveat 🟨: only tested with <code>.txt</code> files</li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Path, with <code>node:path</code> is possible to: </summary>
          <ul>
           <li>Know the path separator for your actual OS</li>
           <li>Get the absolute ir relative path</li>
           <li>Know if a route is relative or absolute</li>
           <li>Know the file name from a given route</li>
           <li>Know the file extention from a file</li>
           <li>Know the file plus extension from a given route</li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>LS: promises, promises-then</summary>
          <ul>
           <li>This is a app that list the files from this folder in a promisify way and in a Sync way</li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Process: how to take arguments by terminal</summary>
          <ul>
           <li> The <code>process.argv</code> give you access to argumentos of entry: with this you can configure things in the command line, if you made an API and you want put configurations there passing arguments to it. This is an array</li>
           <li>With <code>process.on("exit", callback)</code>can do things when the process end, of the process, specific errors, and so son</li>
           <li>The <code>process.cwd()</code> is the Current work directory (cwd): says where which folder we are running the process, not where is the file but from which folder the command was executed to run the file </li>
           <li>The problem with <code>node</code> is it can access to <code>.env</code> variables leading acccess to too many power like deleting files, for example</li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>LS advance: thenable, async await, arguments, prompt</summary>
          <ul>
           <li>More advance <code>ls</code>with a thenable, async await, arguments and prompts on terminal</li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Http server</summary>
          <ul>
           <li>Creation of a http server only with <code>node</code></li>
          </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Free port method</summary>
          <ul>
           <li>Method to get a free port if the desired is used</li>
          </ul>
      </details>
    </li>
  </ol>
  
</details>


<details>
  <summary>class-2: HTTP && Express</summary>
  <ol>
    <li>
      <details>
        <summary>HTTP Server</summary>
          <ul>
           <li>HTTP is one of many protocols that are useful to transfer some type of data. In this case HTTP means HyperText Transfer Protocol (HTTP). This is the most used on internet to transfer data, specially web pages. Examples: 
           <ul>
             <li>A user have some device (a phone) and wants to reach some content. In order to reach it the user should make a request. The request have a: 
             <ul>
               <li>
                 url (where are you making the request)
               </li>
               <li>
                 headers (aditional information about the request like tokens, type of data we are especting to receive, we can send the cookies). Those are optional
               </li>
               <li>
                 the method (the type fo request: GET —to request— or POST —to send— or others)
               </li>
               <li>
                 and sometimes we send a body (data we want to send)
               </li>
             </ul>
             </li>
             <li>
               The request reach a Server. The server will process it the request with everything sent from the user (it will go to a database, treath the data). That process will take some time (unknow time) and when this finish it will send a response to the user.
             </li>
             <li>The request and the response have different data and this is critical to understand how all of this work. Every part have to send different data</li>
             <li>The data that the response have is:
               <ul>
                 <li>statusCode (200, 404, 500, etc)</li>
                 <li>body of the response: this are actually the data that you asked</li>
                 <li>headers</li>
               </ul>
             </li>
             <li>After receiving the data, the conextion should be closed unleass some header will say that it should keep open</li>
            </ul>
           </li>
           <li>Caveats 🟨:
             <ul>
               <li>With the statusCode: in reality this is in the header but is important this to be alone because when the headers is writen first the statusCode is writen and after that the headers</li>
               <li>The HTTP protocol historically had so many security problems and therefore exist the HTTPS protocol. This can be used on localhost but is too complicated and it require a certification. Right now we are going to focus on the HTTP and the API. Another problem is having a service on HTTP on localhost that works correctly but when you deploy it you wrapp that in a service that use HTTPS, therefore interanally is HTTP but is wrapped in HTTPS so everything is encrypted and it doesn't have any problems</li>
               </ul>
             </li>
             <li>
               Status code:
               <ul>
                 <li>
                   From 100 to 199: Informational
                 </li>
                 <li>
                   From 200 to 299: Success
                 </li>
                 <li>
                   From 300 to 399: Redirection
                 </li>
                 <li>
                   From 400 to 499: Client error. The client tried: enter to a page that doesn't exist; send data in a wrong format; it doesn't have permission to access to something
                 </li>
                 <li>
                   From 500 to 599: Server error
                 </li>
                 <li>
                   Recommended source: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">https://developer.mozilla.org/en-US/docs/Web/HTTP/Status</a>
                 </li>
               </ul>
             </li>
             <li>
               Typical statusCode:
               <ul>
                 <li>
                   200: OK. This is the default, it can be omitted if everything goes okay
                 </li>
                 <li>
                   301: Moved permanently. The resource of this direction was moved to 
                 </li>
                 <li>
                   400: Bad request
                 </li>
                 <li>
                   404: Not found
                 </li>
                 <li>
                   500: Internal server error. This is a tricky one because you will not know exactly what happened
                 </li>
               </ul>
             </li>
             <li>
               Buffer data on the file <code>class-2/1.http.js</code>:
               <ul>
                 <li>
                   The "data" second argument here is a Buffer. A Buffer is a global class in nodejs that is useful to work with binary data: a when a .txt file or an image is received by nodejs is readed they binary data and is stored, temporary, in some place of the physical memory to work with them.
                 </li>
                 <li>
                   Before the read of the data nodejs doesn't know what it is: an image, a text or other, is just a binary data. The nodejs know that is an image when reach the "else" where the header is set to "Content-Type: image/<code>extension</code>". Here the codification magic happen: the browser know is an image because the Content-Type setted. 
                 </li>
                 <li>The buffers are useful to work with files, images, criptography and anything that is not plain text or jsons. Those are critical when you want to work with data transmision because how to file are readed or to received through the network</li>
               </ul>
             </li>
          </ul>
      </details>
      <li>
      <details>
        <summary>Routing</summary>
        <ul>
          <li>In commonJS you can import json data directly and use it</li>
          <li>Methods of routing:
            <ul>
              <li>GET: To get data</li>
              <li>HEAD: Is exactly the same as get but without the responding of the body. Is usually used to know if the user have permission to access to some content</li>
              <li>POST: To create data</li>
              <li>PUT: To update data, this replace the content</li>
              <li>PATCH: To modifiy partially some data</li>
              <li>DELETE: To delete data</li>
              <li>OPTIONS: This is used to know which communication are available for the target resource. This is usually the problem we have on CORS on browser. The browser make a request to a server and this server send a response with the type of comunication allowed. The OPTION return the headers CORS</li>
            </ul>
          </li>
          <li>Caveats 🟨:
            <ul>
              <li>There's some discusión about the use of POST versus PATCH. Search it</li>
            </ul>
          </li>
          <li>In this class the file api.http was used</li>
        </ul>
      </details>
      <li>
        <details>
          <summary>Express</summary>
          <ul>
            <li>When you use express it add some header call X-Powered-By with the value of "Express". This could lead to security problems because everyone can know te technology you are using and try to exploit vulnerabilities there. is recommended to disable this with «app.disable("x-powered-by")»</li>
            <li>One of the magic thing of express is the use of middleware. This can be used to extract cookies, validate if the user is logged, extract the data from json or any type of logic. Is something previous to to do before it arraive to the request. When it's done it call the «next()» method to continue. The middleware is executed between the request and the response</li>
            <li>
              Middleware: 
              <ul>
                <li>You can decide to which request the middleware will affect. For example:
                <ul>
                  <li>app.use("/pokemon/*", fn) → All the requests that start with "/pokemon/*" will be affected</li>
                <li>app.use("/", fn) → Only the request on home will be affected</li>
                <li>app.use(fn) → All the routes will be affected. This is the usual behavior</li>
                </ul>
                </li>
              </ul>
              <ul>
                <li>The middleware can be used also for specific methods: only for GET, only for POST</li>
              </ul>
              <ul>
                <li>Caveats 🟨:
                  <ul>
                    <li>You shouldn't forget the final «next()» method because if you forget it will wait infinitely for the next request</li>
                    <li>A middleware can be used at first, in between or at last. The concept of this is "be in the middle" but technically the «app.use()» can be used as a middleware anywhere. Is like a proxy, intercep the request to respond it later. A proxy and a middleware intercep a request but the final goal is different: the Proxy will have the responsibility of orchestration but the Middleware will do that and apply some logic or task into it. A Middleware could reject a request</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>On Express the method <code>app.use(express.json())</code> ccan be used to make something a json. See the file <code>class-2/3.express.js</code> on line <code>33</code> to learn it</li>
            <li>Express allow you to use the route first and the callback after</li>
            <li>In the post, everything is the same as nodejs</li>
            <li>The calls of <code>app.*</code> is dependendat on the order</li>
            <li>The API <code>app.liste</code> is the same as nodejs</li>
          </ul>
        </details>
      </li>
      </li>
    </li>
    </details>
    
<details>
  <summary>class-3: CORS + API Rest with Express</summary>
  <ol>
    <li>
    <details>
      <summary>API REST</summary>
      <ul>
        <li>
          REST mean: Representational State Transfer an Software Architecture (not a framework, not a library, not an idea, not a pattern)
        </li>
        <li>
          Was created to transfer data specially on web
        </li>
        <li>
          Was created on the 2000 year by Roy Fielding
        </li>
        <li>
          Principals features on REST:
          <ul>
            <li>
              Scalability
            </li>  
            <li>
              Simplicity
            </li>  
            <li>
              Visibility
            </li>  
            <li>
              Portability
            </li>  
            <li>
              Realiability
            </li>  
            <li>
              Easy to modify
            </li>  
          </ul>
        </li>
        <li>
          All Software Architecture should achieve a goal with some principals that can sustain over time the best possible way and simplify the creation of that piece of software. This is the goal of every Software Architecture
        </li>
        <li>
          Fundamentals on REST:
          <ul>
            <li>Resources: everything here is a resource (a user, book, some publication, an image or a collection of this resources, a list of users, books, and so on). Every resource will be identified with an URL</li>
            <li>Methods: what kind of action you want to do with the resource. This could be GET, POST, PUT, PATCH, DELETE, HEAD, CONNECT and TRACE. The most common actions made here are the "CRUD" → Create (POST), Read (GET), Update (PUT or PATCH), Delete (DELETE)</li>
            <li>Representation: This is how the resource is represented: the most common representation is JSON but is not mandatory, this could be also XML, HTML, CSV, etc. The client decide which representation be the resource, having none restriction on the format. One client can ask for a JSON while other client can ask for a XML representation</li>
            <li>Stateless: every request to the server should contain all the neccesary data to understand that request. This mean the server should not be able to remember anything about the request. For example it cannot save how many calls have been made to the server, it have to make pagination or not, that data should be always on the URL of the request. Sometimes some data can be save to help the client but in that case the REST architecture will be break. Another case is when we have some database on the backend.</li>
            <li>Unified interfaz: this is difficul to break it but it means that the interfaz between client and server should be consistent for every interaction. The URLs should always do the same, should always be called the same</li>
            <li>Separation of concepts: components of client and server should be separated. This allow the server and the client evolve independently</li>
          </ul>
        </li>
        <li>Caveat 🟨:
          <ul>
            <li>Sometimes you can make some API that is not REST, another architecture exist (like SOAP or GraphQL). Some people think that an API that return a JSON is immediately a REST API but it is not always the case</li>
            <li>Resources: sometimes you can decide to identify the resources with a path on the URL or with some queries. It will depend on the specific use case you want to achieve</li>
          </ul>
        </li>
      </ul>
    </details>
    <li>
      <details>
        <summary>Express use path-to-regex</summary>
        <ol>
          <li>Is possible to put regex in the URL but express use this library: path-to-regex, like this <code>app.get("/movies/:id", fn)</code>
          </li>
          <li>Is possible to use <code>/movies/:id/:couldBeMore/*:andAsMuchAsYouWant</code> where the <code>:id</code>, <code>:couldBeMore</code>, <code>:andAsMuchAsYouWant</code> and <code>*</code> are part of the URL separated by an slash. Is your decition using it this way or making them query params</li>
          <li>Everytime you can, use path-to-regex because make the regex by you can lead into problems</li>
          <li>To know more check the github repository of <a href="https://github.com/pillarjs/path-to-regexp">pillarjs</a> or the <a href="https://expressjs.com/en/guide/routing.html">express explanation in their documentation</a>r></li>
        </ol>
      </details>
      </li>
      <li>
        <details>
          <summary>POST, PATCH, PUT and Schema (Zod)</summary>
          <ul>
            <li>To Understand the POST: You have to work all the time in the same route, is not like you can put here `app.post("/create-movies", fn)`, this is because the Resource is defined by the URL and is the verb which decide what's going to be done there: GET, POST, other</li>
            <li>ID on Post: <code>crypto.randomUUID()</code></li>
            <li>With Zod: You can validate the data with the method "parse" or you can use "safeParse". With "safeParse" you will have a object result with data or errors. You can even use the safeParseAsync to avoid blocking the request return movieSchema.parse(objectToValidate)</li>
            <li>On the error of the validation of schema (Zod):
              <ul>You can pass here a 422 instead a 400:
                <li>
                  The 400 status code is because the client did something to lead on this error: sintaxis error, the data sent was not correct. The important thing here is: the client cannot do a new request without modifications
                </li>
                <li>Other approach is 422: the server understood the request, type of content but the sintaxis of the resource was not possible to created because some validation or instruction was not correct. The same as the previous: client will not be able to make another request is it not change something </li>
                <li>Final though, use anything you want  </li>
              </ul>
            </li>
            <li>Remember, a REST API don't save data by their own. For that, use a database </li>
            <li>Idempotence and differences between POST, PUT and PATCH:
              <ul>
                <li>Idempotence: is the property of realize an action several times and even though achieve the same result as you would  get with the first try. Pure functions are idempotent. This property talk about the inner state of something. Now the methods</li>
                <li>Purpose of POST: create a new element/resource on server
                  <ol>
                    <li>On URL: `/movies`</li>
                    <li>Idempotence: this is not idempotente because every time you call this method a new resource is created</li>
                  </ol>
                </li>
                <li>Purpose of PUT: update an existing element/resource on server o create it if it doesn't exist
                  <ol>
                    <li>On URL: `/movies/:id` → `/movies/123-456-789`</li>
                    <li>Idempotence: this is idempotente the bast majority of the time, but it could not be sometimes</li>
                  </ol>
                </li>
                <li>Purpose of PATCH: update partially an existing element/resource on server
                  <ol>
                    <li>On URL: `/movies/:id` → `/movies/123-456-789`</li>
                    <li>Idempotence: this is not idempotente ithe bast majority of the time, but it could be sometimes</li>
                  </ol>
                </li>
              </ul>
              <li>One question, is it danger to create the ID from outside? The answer: it could be but this will depend of the context of the application. For example, sometimes this ID can come from outside: the email of an user for example or other thing that will identify that person as unique in the analog world</li>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
            <summary>CORS: Cross Origin Resource Sharing</summary>
            <ul>
              <li>This only works on browsers not in servers. The CORS is a mechanism that restrict if a resource can be used on some origin. The browsers make the request to this resource. Here the browser on origin <code>http://localhost:8080/</code> aka <code>mywebsite.com</code> ask to <code>http://localhost:3000</code> aka <code>API.com</code> <i>Is true that <strong>mywebsite.com</strong> who is not you (of course the browser ask in this situation, if would not, it would not ask) is able to get resources from <strong>API.com</strong>?</i></li>
              <li>When this is not possible the way from the API to say <strong>no</strong> is with the <strong>lack of headers</strong></li>
              <li>This problem can only be solved in the backend: on the API, on proxy, in the router or on anything that can add the required header. Who should add that header? For now that's not important</li>
              <li>The way to to solve this in express is adding this to the routes you want to enable <code>res.header("Access-Control-Allow-Origin", "http://localhost:8080")</code>. In this case <code>http://localhost:8080</code> would be <i><strong>mywebsite.com</strong></i></li>
              <li>You can also replace the specific <code>http</code> site for this <code>*</code>, to enable all the request for anyone</li>
              <li>Here is very possible that you don't know would be the origin, it would be <code>3000</code>, <code>8080</code>, <code>4500</code>, <code>1234</code>? So, the solution for this could be:
                <ul>
                  <li>Detect the origin and decide what to do. For example, you can have a list of <code>ACCEPTED_ORIGINS</code></li>
                </ul>
                <li>
                  A caveat here 🟨: the <code>origin</code> header is not always sent by the browser. This is not send by the browser when the request is from the same origin. This mean, if I'm in the <code>http:localhost:3000</code> and I make a request to <code>http:localhost:3000</code> no <code>origin</code> header will sent
                </li>
                <li>Exist simples and complex methods with CORS:
                  <ul>
                    <li>Simples: <code>GET</code>, <code>HEAD</code> and <code>POST</code>
                    </li>
                    <li>Complex: <code>PUT</code>, <code>PATCH</code> and <code>DELETE</code>
                      <ul>
                        <li>This methods have something call <code>Preflight</code>, this mean that you need to add a call with the method <code>OPTIONS</code> in order to make them acceptable</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  At the end the problem with <code>CORS</code> is a problem of headers. You should be able to use <code>res.header("Access-Control-Allow-Origin", origin)</code> and <code>res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")</code> to solve it in the correct place: in the middleware and/or where the request is made
                </li>
                <li>Is it possible to solve this using express or you can use a third party library call <code>cors</code>. Check the <code>app.js</code> file to check how to use it. One caveat 🟨 with that solution: it will solve adding an <code>*</code> to everything. In order to make that library behave as the native approach you have to pass it some options</li>
              </li>
            </ul>
        </details>
      </li>
    </li>
  </ol>
</details>

<details>
  <summary>class-4: MVC and Deploying of API</summary>
  <ol>
    <li>
      <details>
        <summary>Environmental variables</summary>
        <ul>
          <li>This should be always on <code>UPPERCASE</code></li>
          <li>On express it can be used like this to deploy it on some service: 
            <ol>
              <li><code>const PORT = process.env.PORT ?? 3000</code></li>
              <li><code>app.listen(PORT, () => { console.log(`Server listening on port http://localhost:${PORT}`)})</code></li>
            </ol>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Configuration on hosting</summary>
        <ul>
          <li>Normally the host ask you for a <code>start</code> script on the <code>package.json</code> to run the file or maybe it will ask on the configuration</li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>ESModules</summary>
        <ul>
          <li>In order to use the ESModules instead the commonJS approach, you can go into your package.json and add this <code>"type": "module"</code>. With that you will be able to use the ESModules without change the extension of the files. But at the same time, you will not be able to use the commonJS approach without change the extension of the file</li>
          <li>When you import some module is a good practice put the extention, like this <code>import { QUERY_KEYS, moviesQueryParams } from "./utils/moviesQueryParams.js"</code>. As developer we are bas used to not put the extension at the end, because we are lazy, because TypeScript, because builders</li>
          <li>On ESModules import json is not allow directly <code>import allMoviesJSON from "./data/movies.json"</code> you can do it with different approaches:
            <ul>
              <li><code>import allMoviesJSON from "./data/movies.json" assert { type: "json" }</code> → This is not recommended because the <code>assert</code> will stop work at some point</li>
              <li><code>import allMoviesJSON from "./data/movies.json" with { type: "json" }</code> → Change the <code>assert</code> for <code>with</code> </li>
              <li>
                <ol>
                  <li><code>import fs from "node:fs"</code></li>
                  <li><code>const allMoviesJSON = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"))</code></li>
                </ol>
              </li>
              <li>
                Recommended (until the import of JSON will be native on ESModules): create a require (this is more performante)
                <ol>
                  <li><code>import { createRequire } from "node:module"</code></li>
                  <li><code>const require = createRequire(import.meta.url)</code></li>
                  <li><code>const allMoviesJSON = require("./data/movies.json")</code></li>
                </ol>
              </li>
            </ul>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>MVC: Model, View, Controller</summary>
        <ul>
          <li>Exist some debate if the MVC is a <code>Design Pattern</code> or a <code>Architecture Patterns</code>. It seems more like an architecture. Nonetheless, it doesn't explain everything because it doesn't tell you how to implement the <code>View</code></li>
          <li>This is highly used on web and mobile applications but other frameworks also work like this, like <code>ruby on rails</code>, <code>Django</code>, <code>ASP.net</code> and others</li>
          <li>
            This architecture forces you to separate the application in three main component that work togheter, the Mode, the View and the Controller
          </li>
          <li>
            Exist several iteration of this architecture. But the one we going to see here is the most classic one
          </li>
          <li><code>Model:</code>
           <ul>
            <li>This is the logic of the business, the data structure, inner rules of the business</li>
            <li>
              This is in charge of access the database, update the data, check if the integrity of the data are correct (for example, if you try to create and ID, that ID shouldn't exist)
            </li>
           </ul>
          </li>
          <li><code>View:</code>
           <ul>
            <li>This is the most important part for the user: with this the user will interact because the user cannot interact with the Model neither the Controller</li>
            </ul>
          </li>
          <li><code>Controller:</code>
           <ul>
              <li>This is an intermediary between the Model and the View, this respond to the entries of the user every time they make on. This part of the application is responsable for know what to do with the model. Is like an Orchestrator</li>
            </ul>
          </li>
          <li>
              This three parts should work togheter. First the controller will ask for data to the <code>Model</code>, the model will return the data to the <code>Controller</code> and after that it will init the <code>View</code>. After that the user throught the <code>View</code> will interact wanting something happen. With that interact of the user the <code>Controller</code> will act asking for the correct data to the <code>Model</code>, generally speaking having the <code>CRUD</code> approach here with them
          </li>
          <li>
            Remember here, from the <code>View</code> is not possible to interact directly with the <code>Model</code>. But is possible indirectly because the user, at the end, make some request to the <code>Model</code> through the <code>Controller</code>
          </li>
          <li>
            The advantage of this is the separation of the responsabilities on the application, specially the Logic of the Business (<code>Model</code>), because this is the most important thing on the application when it have to connect to a database. This will help to scalability and test, to name some
          </li>
          <li>Examples:
            <ul>
              <li><code>View</code>:
                <ul>
                  <li><code>React</code></li>
                  <li><code>Vue</code></li>
                </ul>
              </li>
              <li><code>Controller</code>:
                <ul>
                  <li><code>Express</code></li>
                  <li><code>DJango</code></li>
                </ul>
              </li>
              <li><code>Model</code>:
                <ul>
                  <li><code>mySQL</code></li>
                  <li><code>mongoDB</code></li>
                  <li>Local</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            The goal is have black boxes that interact with each other. Each one should know how to interact with the other but it doesn't whould know how them interanally make their things. This is the key of architecture and clean code: separation of by layers, separation of concepts
          </li>
          <li>
            In the code is not neccesary that the <code>Model</code> and the <code>Controll</code> share the same names for the methods. Even sometimes you will need to call more than one <code>Model</code> from the <code>Controller</code>
          </li>
          <li>Validations:
            <ul>
              <li>This happend along all the aplication: <code>Model</code>, <code>View</code>, <code>Controller</code> but is made in different ways depending on the category</li>
              <li><code>Controller</code>: usually here the validation is of format and coherence of the data received, to be possible to be procesed before send it to the <code>Model</code>. When it comes from the input from the user, is a good thing to validate the data before to send it to the <code>Model</code>. With this validation you allow the data is correct to be used or to avoid attacks</li>
              <li><code>Model</code>: usually the validation here are for the business rules, data coherence, data persistant in the database and others like check the ID</li>
              <li>The <code>View</code> is the most useless for the business logic but is the most important in terms of user experience</li>
              <li>Is debatable if the <code>Model</code> can have some method that say which field allow and with wich type, like a integer, a string and so son. That method can be exported into the <code>Controller</code> to make the validation there. Here the validation will stay apply in the <code>Model</code> but it will be used, also, by the <code>Controller</code> </li>
              <li>With this said: validation on <code>Model</code> and <code>Controller</code> are mandatory, validations on <code>View</code> are optional (very interesting)</li>
            </ul>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Difference between <code>Design Pattern</code> and <code>Architecture Pattern</code></summary>
        <ul>
          <li>The <code>Design Pattern</code>: is an easy, repeteable, to solve something specific in a part of the code. For example:
            <ol>
              <li>Pattern Observer</li>
              <li>Pattern Factory</li>
              <li>Pattern Modules</li>
            </ol>
          </li>
          <li>The <code>Architecture Pattern</code> has to do with all your application: how to implement everything</li>
          <li>The architecture on software development make sense when you work on business with products or services. In order to be a Software Engineering, you need to create products that scale, be maintainable and work</li>
        </ul>
      </details>
    </li>
  </ol>
</details>

<details>
  <summary>class-5: Creation of a database with mySQL and evoiding hackers (good practices)</summary>
  <ul>
    <li>A database is a collection of data interrelated and saved without unnecessary redundancy</li>
    <li>All database should allow insertion, modification and delete of data </li>
    <li>There's two type fo data in a database:
      <ul>
        <li>Date from users: created by the user</li>
        <li>Data of the system: data that the database use for their management. For example: which user have access to the database</li>
      </ul>
      </li>
    <li>
      The characteristics of a database:
      <ul>
        <li>Versatile: depending of the user and application, it should behave acordly</li>
        <li>Performance: should have the enough speed for every client that make request to the database</li>
        <li>Low redundancy: should be the lowest possible</li>
        <li>High access capacity to gain the most possible time on requests</li>
        <li>High index of integrity: if any amount of user try to use the database, this should not fail for create new data, have redundancy or for slow updating</li>
        <li>Very high security and privacy. This taking in mind not only the software but also the hardware: fire, stealing, and so on</li>
        <li>Should receive periodic updates to avoid obsolescence</li>
      </ul>
    </li>
    <li>
      User should not know how the data is organized and saved. Becuase of this the data should be presented to the user in a easy way to be interpreted y modified. With this: exist three principals levels on for the user interact with the database:
      <ul>
        <li>Intern level: closest level for the physical storage. It allow to write like is in the computer. Here you have the configuration files: files that have the data, direction of the files and organization</li>
        <li>Conceptual level: The data that will be used is presented without having in mind the Intern Level.</li>
        <li>Extern level: the closest to the user. Here the data that the user want is writen (totally or partially)</li>
      </ul>
      A database can have only one Intern Level, only one Conceptual level but many External Levels
    </li>
    <li>The data within a database are naturally related, for example: a product belong a category and is associated with multiple tags. The term for this is <code>Relational Database</code></li>
    <li>A <code>Relational Database</code> is like a spreadsheet: a <code>table</code> is a page, that contain <code>columns</code> and <code>rows</code>. A <code>table</code> can relate to another <code>table</code> using various type of relationships like <code>one-to-one</code> and <code>one-to-many</code> </li>
    <li>What is <code>SQL</code>
      <ul>
        <li>The acronmyn <code>SQL</code> stands for <b>Structured Query Language</b>. This is the standarized language to access the database </li>
        <li><code>SQL</code> is composed of three parts:
          <ol>
            <li><b>Data Definition Language</b> (<code>DDL</code>): includes statements for defining the database and its objects such as tables, views, triggers, stored procedures, etc</li>
            <li><b>Data Manipulation Language</b> (<code>DML</code>): contains statements for updating and querying data</li>
            <li><b>Data Control Language</b> (<code>DCL</code>): allows you to grant permissions to users to access specific data in the database</li>
          </ol>
        </li>
      </ul>
    </li>
    <li>Important <code>SQL</code> commands:
      <ul>
        <li><code>start transaction;</code>: this is for make changes without commit it. With this you can make changes safely without worring to mess it up. In this state you can use the <code>rollback</code> to revert the changes. And when you be happy with your changes, you can use the <code>commit;</code> in order to apply all the changes</li>
      </ul>
    </li>
    <li>What is <code>MySQL</code>
      <ul>
        <li>Is a robust database management system designed for managing relational databases. It is open-source software supported by <code>Oracle</code>, meaning that you can use <code>MySQL</code> without any cost. Additionally, you will have the flexibility to modify its source code to tailor it to your specific requirements</li>
        <li>When compared to other database software like <code>Oracle Database</code> or <code>Microsoft SQL Server</code>, <code>MySQL</code> is relatively easy to master</li>
        <li><code>MySQL</code> is versatile and can run on various platforms, including <code>UNIX</code>, <code>Linux</code>, and <code>Windows</code></li>
        <li><code>MySQL</code> is renowned for its reliability, scalability, and speed</li>
      </ul>
    </li>
    <li>In order to run some <code>sql</code> scripts you can:
      <ul>
        <li>Run a pluggin on vscode: <a href="https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2" target="_blank">MySQL by Weijan Chen</a>, and this is the website <a href="https://database-client.com" target="_blank">database-client.com</a></li>
        <li>Or you can run by the <code>mySQL shell</code> following the nex steps:
          <ol>
            <li>
              Reach with the terminal the desired path or know the path of your file
            </li>
            <li>
              Once you get the path run this on the terminal to open the <code>mySQL Command Line Client</code>: <code>mysqlsh</code>
            </li>
            <li>
              You should explicty change use the <code>sql</code> shell with <code>\sql</code>
            </li>
            <li>
              Now be sure that you are connected to the actual server running <code>\c [user]@[host_name]</code>: example <code>\c root@localhost</code>. Maybe the terminal will ask you for a password
            </li>
            <li >
              Run the command <code>\. [name_of_script].sql</code> and done
            </li>
            <li value='6'>
                <strong>IMPORTANT:</strong> &#9889; Running the <code>sql</code> scripts this way will allow you to use the <code>SOURCE</code> command, that comes from the <code>mySQL Command Line Client</code> which will help you to upload and run other scripts files in a more efficient way
            </li>
          </ol>
        </li>
      </ul>
      <ul>
      </ul>
    </li>
    <li>Dependency Inyection
      <ul>
        <li>This is a <code>Design Pattern</code> to improve code efficiency eficciency, modularity, control, reusability and make the code testable. Also, the code is uncouple by design</li>
        <li>The basic idea is: a <code>object</code>, <code>class</code> or <code>function</code> can receive their dependencies from outisde and the inner behavior change depending on how this information is provided</li>
      </ul>
    </li>
  </ul>
  
</details>


<details>
  <summary>class-6: Chat in real time with node, socke.tio, sql, html & css</summary>
  <ul>
    <li>Available protocols
      <ul>
        <li><code>HTTP</code>: this is the more used on internet</li>
        <li><code>FTP</code></li>
        <li><code>DNS</code></li>
        <li><code>WebSockets</code>: usually real time chats use this protocol</li>
        <li>And many more...</li>
      </ul>
     </li>
     <li>What about <code>Transmission Control Protocol (TCP)</code>? This is for reliable delivery data packets
  </ul>
  <ul>
    <li>Difference between <code>HTTP</code> and <code>WebSockets</code>
      <ul><code>HTTP</code>
        <li>Stateless: this allow the resource be 'cacheable', this mean if you want something that is always the same, the request should return all the time the same resource, like some text or image. Usually this is the case</li>
        <li>Use cases: html, js, images, rest API (CRUD), unidirectional, cheap process with high latency</li>
        <li>Is not Event Driven</li>
      </ul>
      <ul><code>WebSockets</code>
        <li>Stateful: is not 'cacheable', is doesn't make sense some resource of a chat have this property</li>
        <li>Use cases: realtime, low latency data (high frequency communication), bidirectional information</li>
        <li>Is based on Events</li>
      </ul>
    </li>
  </ul>
  <ul> Making an real time chat:
    <li>With <code>HTTP</code>: the user make a request to the server and the server provide a response. Further responses will require more requests. This is basically how internet works. To achive a real time (chat) you should use something call "polling", this mean, every <code>x</code> amount of time you will ask to the server if you have new data to serve. This is not real time. The problem with this approach is every request contain so much information, not only what we want plus the latency.
      <ul>
        <li>Other way to make it <code>HTTP Server Events</code>: this is very interesting but remain unidirectional</li>
      </ul>
    </li>
    <li>With <code>WebSockets</code>: the user make an "Initial HTTP handshake", you tell to server "I want to initiate the data transfer, I'm using WebSockets" (is always the user who made the first conextion and is the server who decide to accept or not the conextion with WebSockets). After the first petition the conextion will persist with <code>WebSockets</code>, this mean the user can send data to the server at any time but also, the server can send data to the user at any time. The conextion can be closed by the user of by the server. The magic of a "real-time-something" happen when the conextion is live.</li>
    <li>Both, <code>HTTP</code> and <code>WebSockets</code> uses <code>TCP</code></li>
    <li>More advances concepts would be: multi, full, half duplex:
      <ul>
        <li>Full: Allows data to be transmitted in both directions simultaneously over a single connection. Example: <code>WebSockets</code></li>
        <li>Half: Data can be transmitted in both directions, but not simultaneously. Typically, one direction is active while the other is passive. Example: <code>HTTP</code> and <code>HTTP/2</code> </li>
        <li>Multi: The ability to transmit multiple streams of data over a single connection concurrently. Example: <code>HTTP/2</code></li>
      </ul>
       </li>
  </ul>
  
</details>


## NOW
- Chat in real time with nodejs, socket.io, sql, html and css

## Pending
1. Learn how to make authentication and authorization
  - Authjs
  - Passport
  - Clerkl
  - Oauth 2.0
  - NextAuth
  - Jason Web TOkens (JWT)
  - Redis (or similar)
2. MongoDB:
  - How to use it with expressjs
  - Perform a `CRUD` with the database using mongoDB
3. Learn how to use mongoose with express
  - How to use it with expressjs
  - Perform a `CRUD` with the database using mongoose
