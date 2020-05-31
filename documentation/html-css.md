### CSS Selector
**ID Selectors (#)** : The CSS rule below will be applied to the HTML element with id="myp1": 
~~~
#myp1 {
  text-align: center;
  color: red;
}

<p id="myp1"> ip op </p>
~~~

**Class Selectors (.)**: applied on all HTML elements with class="prodtab" 
~~~
.prodtab {
  text-align: center;
  color: red;
}

<h1 class="prodtab">Red anng   </h1>
<p class="prodtab">Red and cen.</p> 
~~~

### Center a block or image
~~~
p.centredtext {
    margin-left: auto;
    margin-right: auto; 
}
...
<p class="entredtext">This a centrer text... </p>
~~~

### Bootstrap 4
**Container**: Bootstrap requires a containing element to wrap site contents.
~~~html
<div class="container">
  your html
</div>
~~~

**Bootstrap 4 Grid System** is built with flexbox and allows up to **12 columns** across the page.

### Responsive Table using div
See [div-table.html](../java-workspace/html-css-lab/div-table.html)

### Flexbox guide
[Excellent article](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background)