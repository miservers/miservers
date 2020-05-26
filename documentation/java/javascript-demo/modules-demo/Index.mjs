import {totalSale, sell} from './Products.mjs'


let item = {
            name: "milk",
            price: 10,
            stock: 1000
           };

console.log('Before. totalSale', totalSale, 'DH , milk stock=',  item.stock);

sell (item, 50);

console.log('After. totalSale' , totalSale, 'DH , milk stock=',  item.stock);
