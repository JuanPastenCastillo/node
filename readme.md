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

## NOW
- CORS and API Rest