
## JavaScript
### ES6 Features
http://es6-features.org

### Adding event handlers

~~~
document.getElementById(id).onclick = function(){code}

Example:

<input type="button" id="button1" value="button1" /> 

document.getElementById("button1").onclick = function() {
													window.alert("button 1 clicked!");
													};
~~~

## Modules 
 1. Create a module **Products.mjs** 
~~~
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
~~~
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
~~~
const square = function (n) {return n*n; };

console.log ('sqare of 9 is ', square(9));
~~~

Function expression are usufull to pass a function as a parameter of another function
~~~
function fmap(f, a) {
  let res = []; 
  let i; 
  for (i = 0; i != a.length; i++)
    res[i] = f(a[i]);
  return res;
}

let numbers = [0, 1, 2, 5, 10];
let squares = fmap(square,numbers);
console.log(squares); //=> [0, 1, 4, 25, 100]
~~~

### Arrow function expression
map is predefined on array object
~~~
numbers = [0, 1, 2, 5, 10]

var cubes = numbers.map(function(n) {return n*n*n});

console.log(cubes); // [0, 1, 8, 125, 1000]
~~~ 

that is equivalent to 
~~~ 
cubes = numbers.map(n => {return n*n*n;});
~~~ 

And because function has only one instruction
~~~ 
cubes = numbers.map(n => (n*n*n));
~~~ 

### Maps
~~~
var users = [
			    {id : 1, name: "Reynolds"},
  			  {id : 2, name: "Frye"},
  			  {id : 3, name: "Cobb"}];

users.map(user => console.log(user.name));

const ids = users.map(user => user.id);

console.log (ids);  // [1, 2, 3]
~~~

### ForEach
~~~
users.forEach (user => console.log('id=', user.id, 'username=', user.name));
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



