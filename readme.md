# Learning node

## DONE

### Node
<details>
  <summary>class-1</summary>
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

## NOW
- Express + API