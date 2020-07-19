// FUNCION: Calculadora

var a = prompt("¿Cuál es el primer número?");
var b = prompt("¿Cuál es el segundo número?");
var accion = prompt("¿Qué operación quieres hacer? Entra la letra que corresponda:\n\ns (suma)\nr (resta)\nm (multiplicación)\nd (división)");

const calculadora = (a, b, accion) => {
    if (!Number.isFinite(value1) || !Number.isFinite(value2)) {
        return "Número no válido"
    }
    if (accion === "s") {
        return a + b;
    } else if (accion === "r") {
        return a - b;
    } else if (accion === "m") {
        return a * b;
    } else if (accion === "d") {
        return a / b;
    } else {
        result = NaN;
    }
    return `Your result is ${result}`
}

// FUNCION: Multiplicar sin multiplicar
const multi = (a, b) => {
    let result = 0;
    for (let i = 0; i < b; i++) {
        result += a;
    }
    return result;
}