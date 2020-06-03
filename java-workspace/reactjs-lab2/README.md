### What is tested in this lab?
Lab 1 :
 * Thinking React example : https://fr.reactjs.org/docs/thinking-in-react.html
 * Retrieve data from server : **fetch** function
 * Json server
 * Hooks : useState, useEffect

Lab 2:
 * **React Bootstrap**: React implementation of JQery Bootstrap CSS.
 * **React Router**: 
 * **State**

### React Bootstrap
React implementation of JQery Bootstrap CSS. Examples : [BootstrapDemo.js](../reactjs-lab2/src/BootstrapDemo.js)

**Installation** 
~~~
npm install --save react-bootstrap bootstrap
~~~

**CSS**  
Include Bootstrap CSS in your Index.js or App.js  
~~~javascript
import 'bootstrap/dist/css/bootstrap.min.css';
~~~  

### React Router
React Router is a standard library.  [RouterDemo.js](../reactjs-lab2/src/RouterDemo.js)
**Installation**
~~~
npm install react-router-dom --save
~~~

**match object**
~~~javascript  
console.log("Match: ", props.match);
  Match:  {path: "/contact", url: "/contact", isExact: true, params: {…}}
~~~

**isPrivate** : indicate if the route can be accessed without authentication.


### reference
 * https://www.w3schools.com/bootstrap

 
## Available Scripts

### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

### `npm run build`

### `npm run eject`
