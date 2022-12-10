function getCar(car) {
    return "My Car is " + car.brand + " " + car.model;
}
var car = { brand: "Fiat", model: "Punto" };
document.body.textContent = getCar(car);
