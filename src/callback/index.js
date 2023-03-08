function sum(num1, num2) {
    return num1 + num2;
}

function rest(num1, num2) {
    return num1 - num2;
}

function mult(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    return num1 / num2;
}

function calc(num1, num2, callback) {
    return callback(num1, num2);
};


console.log(calc(2,2,sum));
console.log(calc(2,2,rest));
console.log(calc(2,2,mult));
console.log(calc(2,2,div));


function execCallback(callback) {
    setTimeout(callback, 2000) //ejecuta el codigo despues de X segundo- en este caso 2000 =2seg
  }
  function callback() {
    console.log("AQUI ESTOY DESPUES DE 2seg");
  }

  execCallback(callback);