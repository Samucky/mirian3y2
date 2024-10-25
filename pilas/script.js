let operacionActual = '';

// Función para invertir una palabra utilizando una pila
function invertirPalabra(palabra) {
    const pila = [];
    for (const letra of palabra) {
        pila.push(letra); // Agregamos cada letra a la pila
    }

    let palabraInvertida = '';
    while (pila.length > 0) {
        palabraInvertida += pila.pop(); // Desapilamos y construimos la palabra invertida
    }
    return palabraInvertida;
}

// Función para verificar si una palabra es un palíndromo
function esPalindromo(palabra) {
    const invertida = invertirPalabra(palabra);
    return palabra === invertida; // Comparamos la palabra original con la invertida
}

// Función para sumar números grandes utilizando pilas
function sumarNumerosGrandes(num1, num2) {
    const pila1 = [];
    const pila2 = [];
    const resultado = [];

    for (const digito of num1) {
        pila1.push(parseInt(digito)); // Agregamos cada dígito a la pila 1
    }

    for (const digito of num2) {
        pila2.push(parseInt(digito)); // Agregamos cada dígito a la pila 2
    }

    let acarreo = 0;
    while (pila1.length > 0 || pila2.length > 0 || acarreo > 0) {
        let suma = acarreo; // Inicializamos la suma con el acarreo
        if (pila1.length > 0) {
            suma += pila1.pop(); // Desapilamos de la pila 1
        }
        if (pila2.length > 0) {
            suma += pila2.pop(); // Desapilamos de la pila 2
        }

        resultado.push(suma % 10); // Guardamos el último dígito de la suma
        acarreo = Math.floor(suma / 10); // Calculamos el acarreo
    }

    return resultado.reverse().join(''); // Devolvemos el resultado como una cadena
}

// Función para reemplazar valores en una pila
function Reemplazar(pila, nuevo, viejo) {
    // Recorremos la pila y reemplazamos los valores
    for (let i = 0; i < pila.length; i++) {
        if (pila[i] === viejo) {
            pila[i] = nuevo; // Reemplazamos viejo por nuevo
        }
    }
}

// Función para realizar el reemplazo de valores en la pila
function realizarReemplazo() {
    const entradaPila = document.getElementById('inputPila').value.trim();
    const nuevo = parseInt(document.getElementById('nuevoValor').value.trim());
    const viejo = parseInt(document.getElementById('valorViejo').value.trim());

    // Validar que la entrada de la pila no esté vacía
    if (entradaPila === '') {
        alert("Por favor, introduce valores para la pila.");
        return;
    }

    // Validar que los nuevos y viejos valores sean números
    if (isNaN(nuevo) || isNaN(viejo)) {
        alert("Por favor, asegúrate de que los valores nuevo y viejo sean números válidos.");
        return;
    }

    // Convertimos la entrada en un arreglo de enteros
    let pila = entradaPila.split(',').map(Number);

    // Verificar si la pila contiene solo números
    if (pila.some(isNaN)) {
        alert("Por favor, asegúrate de que todos los valores de la pila sean números válidos.");
        return;
    }

    // Llamamos a la función Reemplazar
    Reemplazar(pila, nuevo, viejo);

    // Mostramos el resultado
    const resultadoReemplazo = document.getElementById('resultadoReemplazo');
    resultadoReemplazo.innerText = "Pila después de reemplazar: " + pila.join(', ');
    resultadoReemplazo.style.display = 'block'; // Mostrar resultado
}

// Función para realizar la validación de entrada
function esEntradaValida(valor, tipo) {
    if (tipo === 'texto') {
        return /^[a-zA-Z]+$/.test(valor); // Solo letras
    } else if (tipo === 'numero') {
        return /^[0-9]+$/.test(valor); // Solo números
    }
    return false; // Valor no válido
}

// Función para mostrar el contenedor de ingreso según la operación
function mostrarIngreso(operacion) {
    operacionActual = operacion; // Guardamos la operación actual
    document.getElementById('inputContainer').style.display = 'block'; // Mostramos el contenedor de entrada
    document.getElementById('inputField1').value = ''; // Limpiamos el campo 1
    document.getElementById('inputField2').value = ''; // Limpiamos el campo 2
    document.getElementById('resultado').innerText = ''; // Limpiamos el resultado
    document.getElementById('resultado').style.display = 'none'; // Ocultamos el resultado

    // Configuramos los campos según la operación
    if (operacion === 'suma') {
        document.getElementById('inputField1').placeholder = 'Ingresa el primer número grande';
        document.getElementById('inputField2').style.display = 'block'; // Mostramos el segundo campo
        document.getElementById('inputField2').placeholder = 'Ingresa el segundo número grande';
    } else {
        document.getElementById('inputField2').style.display = 'none'; // Ocultamos el segundo campo
    }

    // Ocultar contenedores de otras operaciones
    document.getElementById('reemplazoContainer').style.display = 'none'; // Ocultamos el contenedor de reemplazo
}

// Función para procesar el ingreso de datos
function procesarIngreso() {
    const valor1 = document.getElementById('inputField1').value.trim(); // Obtenemos el primer valor
    let resultado = '';

    // Validar que el primer valor no esté vacío y sea del tipo correcto
    if (valor1 === '') {
        alert("Por favor, ingresa un valor.");
        return;
    }

    if (operacionActual === 'invertir') {
        if (!esEntradaValida(valor1, 'texto')) {
            alert("Por favor, ingresa solo letras para invertir.");
            return;
        }
        resultado = invertirPalabra(valor1); // Invertimos la palabra
        document.getElementById('resultado').innerText = "Palabra invertida: " + resultado;
    } else if (operacionActual === 'palindromo') {
        if (!esEntradaValida(valor1, 'texto')) {
            alert("Por favor, ingresa solo letras para verificar si es palíndromo.");
            return;
        }
        const esPal = esPalindromo(valor1); // Verificamos si es palíndromo
        resultado = esPal ? `${valor1} es un palíndromo.` : `${valor1} no es un palíndromo.`;
        document.getElementById('resultado').innerText = resultado; // Mostramos el resultado
    } else if (operacionActual === 'suma') {
        const valor2 = document.getElementById('inputField2').value.trim(); // Obtenemos el segundo valor
        
        // Validar que el segundo valor no esté vacío y sea del tipo correcto
        if (valor2 === '') {
            alert("Por favor, ingresa un segundo número grande.");
            return;
        }
        if (!esEntradaValida(valor2, 'numero')) {
            alert("Por favor, ingresa solo números para la suma.");
            return;
        }

        resultado = sumarNumerosGrandes(valor1, valor2); // Sumamos los números grandes
        document.getElementById('resultado').innerText = "Resultado de la suma: " + resultado; // Mostramos el resultado
    }

    document.getElementById('resultado').style.display = 'block'; // Mostramos el resultado
}

// Función para mostrar el contenedor de reemplazo
function mostrarReemplazo() {
    // Ocultar contenedores de otras operaciones
    document.getElementById('inputContainer').style.display = 'none'; // Ocultamos el contenedor de ingreso
    document.getElementById('reemplazoContainer').style.display = 'block'; // Mostramos el contenedor de reemplazo
}
