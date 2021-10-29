import {totalSale, sell} from './Products.mjs'

console.log ('Sales')


let item = {
            name: "milk",
            price: 10,
            stock: 1000
           };


let p1 = document.getElementById("p1")
p1.textContent = 'Before Sale: totalSale=' + totalSale + 'DH, milk stock='+ item.stock

sell (item, 50);


let p2 = document.getElementById("p2")
p2.textContent = 'After Sale: totalSale=' + totalSale + 'DH, milk stock='+ item.stock
