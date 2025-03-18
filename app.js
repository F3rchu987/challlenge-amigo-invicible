// Lista para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim(); // Capturar el valor del campo de entrada

    if (nombre === "") { // Validar que no esté vacío
        alert("Por favor, inserte un nombre.");
        return;
    }

    if (amigos.includes(nombre)) { // Evitar nombres duplicados
        alert("Este nombre ya fue ingresado.");
        return;
    }

    amigos.push(nombre); // Agregar el nombre al array
    actualizarLista(); // Actualizar la lista en pantalla

    input.value = ""; // Limpiar el campo de entrada
}

// Función para actualizar la lista de amigos en el HTML
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpiar la lista antes de actualizar

    amigos.forEach((nombre) => {
        let li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

// Función para sortear el amigo secreto
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos 2 participantes para sortear.");
        return;
    }

    let copiaAmigos = [...amigos]; // Copia del array original para hacer las asignaciones
    let resultado = [];

    amigos.forEach((nombre) => {
        let opciones = copiaAmigos.filter((amigo) => amigo !== nombre); // Evitar que se asignen a sí mismos

        if (opciones.length === 0) { // Si no hay opciones válidas, reiniciar el sorteo
            alert("Error en el sorteo, intentándolo de nuevo...");
            sortearAmigo();
            return;
        }

        let indiceAleatorio = Math.floor(Math.random() * opciones.length);
        let amigoSecreto = opciones[indiceAleatorio];

        resultado.push({ amigo: nombre, secreto: amigoSecreto });

        // Eliminar el nombre seleccionado de la copia para evitar duplicados
        copiaAmigos = copiaAmigos.filter((amigo) => amigo !== amigoSecreto);
    });

    mostrarResultados(resultado);
}

// Función para mostrar los resultados del sorteo
function mostrarResultados(resultado) {
    let listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = ""; // Limpiar la lista antes de actualizar

    resultado.forEach((asignacion) => {
        let li = document.createElement("li");
        li.textContent = `${asignacion.amigo} → ${asignacion.secreto}`;
        listaResultado.appendChild(li);
    });
}

// Función para sortear un amigo aleatorio
function sortearUnAmigo() {
    if (amigos.length === 0) { // Validar que haya amigos en la lista
        alert("No hay amigos en la lista para sortear.");
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * amigos.length); // Generar un índice aleatorio
    let amigoSorteado = amigos[indiceAleatorio]; // Obtener el nombre sorteado

    document.getElementById("resultado").innerHTML = `<li>🎉 Amigo sorteado: <strong>${amigoSorteado}</strong></li>`; // Mostrar resultado
}