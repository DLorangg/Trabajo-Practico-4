function validarInput() {
    let input = document.getElementById("numero");
    let numero = input.value;

    let val = /^[0-9]*$/;

    if (!val.test(numero)) {
        alert("Error: Solo se permiten números.");
        input.value = ""; 
    }
}

function copiarResultadoEnc() {
    let resultado = document.getElementById("resultado");
    let numeroEncriptado = resultado.textContent.split(":")[1].trim();

    navigator.clipboard.writeText(numeroEncriptado)
        .then(() => {
            let mensajeCopiado = document.getElementById("mensaje-copiado");
            mensajeCopiado.textContent = "Número encriptado copiado al portapapeles";
            mensajeCopiado.style.display = "block";
        })
        .catch((error) => {
            console.error("Error al copiar el número encriptado:", error);
        });
}

function copiarResultadoDesenc() {
    let resultado = document.getElementById("resultado");
    let numeroDesencriptado = resultado.textContent.split(":")[1].trim();

    navigator.clipboard.writeText(numeroDesencriptado)
        .then(() => {
            let mensajeCopiado = document.getElementById("mensaje-copiado");
            mensajeCopiado.textContent = "Número desencriptado copiado al portapapeles";
            mensajeCopiado.style.display = "block";
        })
        .catch((error) => {
            console.error("Error al copiar el número desencriptado:", error);
        });
}

function encriptar(numero) {
    let numeroCompleto = numero.padStart(4, "0"); // Completar con ceros si el número no tiene 4 cifras

    let digito1 = parseInt(numeroCompleto[0]);
    let digito2 = parseInt(numeroCompleto[1]);
    let digito3 = parseInt(numeroCompleto[2]);
    let digito4 = parseInt(numeroCompleto[3]);

    digito1 = (digito1 + 7) % 10;
    digito2 = (digito2 + 7) % 10;
    digito3 = (digito3 + 7) % 10;
    digito4 = (digito4 + 7) % 10;

    [digito1, digito3] = [digito3, digito1];
    [digito2, digito4] = [digito4, digito2];

    let numeroEncriptado = digito1 * 1000 + digito2 * 100 + digito3 * 10 + digito4;

    return numeroEncriptado.toString().padStart(4, "0");
}

function desencriptar(numero_encriptado) {
    let digito1 = Math.floor(numero_encriptado / 1000);
    let digito2 = Math.floor((numero_encriptado / 100) % 10);
    let digito3 = Math.floor((numero_encriptado / 10) % 10);
    let digito4 = numero_encriptado % 10;

    [digito1, digito3] = [digito3, digito1];
    [digito2, digito4] = [digito4, digito2];

    digito1 = (digito1 + 3) % 10;
    digito2 = (digito2 + 3) % 10;
    digito3 = (digito3 + 3) % 10;
    digito4 = (digito4 + 3) % 10;

    let numero_original = digito1 * 1000 + digito2 * 100 + digito3 * 10 + digito4;

    return numero_original;
}


function encriptarNumero() {
    let numero = document.getElementById("numero").value;

    if (numero.length !== 4) {
        alert("Error: El número debe tener exactamente 4 dígitos.");
        return;
    }

    let numeroEncriptado = encriptar(numero);
    let resultado = document.getElementById("resultado");
    resultado.textContent = "Número encriptado es: " + numeroEncriptado;
    resultado.style.display = "block";

    let btnCopiar = document.getElementById("btn-copiar");
    btnCopiar.style.display = "inline-block";
}

function desencriptarNumero() {
    let numero = document.getElementById("numero").value;

    if (numero.length !== 4) {
        alert("Error: El número debe tener exactamente 4 dígitos.");
        return;
    }

    let numeroDesencriptado = desencriptar(numero);
    let resultado = document.getElementById("resultado");
    resultado.textContent = "El número desencriptado es: " + numeroDesencriptado;
    resultado.style.display = "block";

    let btnCopiar = document.getElementById("btn-copiar");
    btnCopiar.style.display = "inline-block";
}