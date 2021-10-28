### Introduction to Node.js
**Node.js** is a javascript runtime environment. It executes javascript outside the browser. 
It is built on V8 and libuv. V8 is the google javascript engine, developed in c++. libuv is a c++ library for asynchronous I/O(fs, sockets) and thread pool.

### Browser vs Node.js
Browser:
  - Access to DOM via document object. others objects, like window, provided by the the browser are also accessible.
  - in browser, you don't have the same API that node.js provide by its modules, like FS access. 

Node.js
  - no browser object can be accessed. so browser DOM is not reachable. 
  - by node.js you control the javascript execution environment. you don't worry about the client browser.

### References
- https://nodejs.dev/learn:  Good

