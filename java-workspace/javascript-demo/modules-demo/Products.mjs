// Module Products.mjs 
var totalSale=0; 
  
export function sell(item, quanity) 
{ 
    totalSale=totalSale+item.price*quanity; 
    item.stock=item.stock-quanity; 
    return 0; 
} 
  
export { totalSale}; 