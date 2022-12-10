interface Car {
    brand: string;
    model: string;
  }
   
  function getCar(car: Car) {
    return "My Car is " + car.brand + " " + car.model;
  }
   
  let car = { brand: "Fiat", model: "Punto" };
   
  document.body.textContent = getCar(car);