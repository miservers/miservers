
### JavaScript Demos
[javascript-demo.html](../java-workspace/javascript-lab/javascript-demo.html)

### ES6 Features
http://es6-features.org

### Adding event handlers

~~~javascript
document.getElementById(id).onclick = function() { code }

// Example

<input type="button" id="button1" value="button1" /> 

document.getElementById("button1").onclick = function() {
                                    window.alert("button 1 clicked!");};
~~~

### Event object
When a W3C event listener’s event occurs and it calls its associated function, it  passes a single argument to the function—a reference to the event object.   
Event properties:
 * type : The event that occurred (click, focus, blur, etc.)
 * target : The element to which the event occurred 
 * value
~~~html
<script>
  function sayHello () {
	  alert ("Event target:" + event.target + " , type:" + event.type);
  }

</script> 

<input type="button" id="buttondemo" value="say Hello" onclick="sayHello()"/> 
~~~


### Objects
**Plain Object**  
~~~javascript
const obj = { a: 'foo', b: 42, c: {} }; //c is an object attribute
obj.a = 'bar';
~~~

### Modules 
 1. Create a module **Products.mjs** 
~~~javascript
var totalSale=0; 
  
export function sell(item, quanity) 
{ 
    totalSale=totalSale+item.price*quanity; 
    item.stock=item.stock-quanity; 
    return 0; 
} 
  
export { totalSale}; 
~~~

2. Using it in **Index.mjs**:
~~~javascript
import {totalSale, sell} from './Products.mjs'

let item = {
            name: "milk",
            price: 10,
            stock: 1000
           };
sell (item, 50);
console.log('totalSale' , totalSale, 'DH , milk stock=',  item.stock);
~~~

 3. Run this module on Node JS
~~~
  node --experimental-modules Index.mjs
~~~

### Function expression
Function expression is a normal function but stored in a variable. Function expression are usufull to pass a function as a parameter of another function. In the example bellow **square** is called **callback functions**.
~~~javascript
const square = function (n) {return n*n; };

function fmap(f, a) {
  let res = [];  let i; 
  for (i = 0; i != a.length; i++)
    res[i] = f(a[i]);
  return res;
}

let numbers = [0, 1, 2, 5, 10];
let squares = fmap(square,numbers);
console.log(squares); //=> [0, 1, 4, 25, 100]
~~~

### Arrow function expression
Format of Arrow function declaration
~~~javascript
let myfunc = (arg1, arg2, ...argN) => expression
~~~

* **(...args) => expression**  : expression Without curly braces. the function evaluates it and returns the result.
* **(...args) => { body }**: we need an explicit return to return something.  

**map** is predefined on array object
~~~javascript
numbers = [0, 1, 2, 5, 10]

var cubes = numbers.map(function(n) {return n*n*n});

console.log(cubes); // [0, 1, 8, 125, 1000]
~~~ 

that is equivalent to 
~~~javascript
cubes = numbers.map(n => {return n*n*n;});
~~~ 

And because function has only one instruction
~~~javascript
cubes = numbers.map(n => (n*n*n));
~~~ 

### Maps
~~~javascript
var users = [
			    {id : 1, name: "Reynolds"},
  			  {id : 2, name: "Frye"},
  			  {id : 3, name: "Cobb"}];

users.map(user => console.log(user.name));

const ids = users.map(user => user.id);

console.log (ids);  // [1, 2, 3]
~~~

### ForEach
~~~javascript
users.forEach (user => console.log('id=', user.id, 'username=', user.name));
~~~

### Methods
Methods are functions stored are object properties
~~~javascript
// Object 
var person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};

console.log("Full name " + person.fullName());
~~~

### Strict mode
To enable the full javascript new features, you must use strict mode. In this mode "bad syntax" will be treated as real errors(not declared variable is not allowed,etc). 
~~~javascript
'use strict';
~~~

### this
 * In a method, *this* refers to the owner object.
 * Alone, *this* refers to the global object.
 * In a function, *this* refers to the global object.
 * In a function, in strict mode, *this* is undefined.
 * In an event, *this* refers to the element that received the event.
 * Methods like call(), and apply() can refer *this* to any object.

### JavaScript Tricks
**Redirect url**

~~~js
onClick={window.location.href="/patient/edit"}
~~~


### JavaScript References
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide


## AngularJS
### Two-way Binding
~~~html
<div ng-app="myApp" ng-controller="myCtrl">
  Name: <input ng-model="firstname">
  <h2>{{firstname}}</h2>
</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.firstname = "Pop";
  $scope.lastname = "Mark";
});
</script>
~~~



