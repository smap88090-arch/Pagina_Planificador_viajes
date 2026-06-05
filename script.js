
let viajes = [];

/*--
AGREGAR VIAJE
Obtiene los datos del formulario, calcula el gasto diario y añade una fila a la tabla.
--*/

function agregarViaje() {

    // Obtener valores del formulario
    let destino = document.getElementById("destino").value;
    let dias = Number(document.getElementById("dias").value);
    let presupuesto = Number(document.getElementById("presupuesto").value);


// Validación básica de los campos
    if(destino === "" || dias === "" || presupuesto === ""){
    alert("Completa todos los campos");
    return;
    } else if (dias <= 0) {
        alert("Los días deben ser mayores que 0.");
        return;
    } else if (presupuesto <= 0) {
        alert("Debes ingresar un monto minimo.");
        return;
    } else if (destino === "") {
        alert("Debes ingresar un destino.");
        return;
    }


        // Calcular gasto diario
    let gastoDiario = calcularGastoDiario(presupuesto,dias);

    // Guardar viaje en el array
    viajes.push({
        destino,
        dias,
        presupuesto,
        gastoDiario
    });

    // Buscar tabla
    let tabla = document.getElementById("tablaResultados");

    // Añadir nueva fila
    tabla.innerHTML += `
    <tr>
        <td>${destino}</td>
        <td>${dias}</td>
        <td>€${presupuesto}</td>
        <td>€${gastoDiario}</td>
    </tr>
    `;

    // Mostrar advertencia según el gasto diario
    let zona = document.getElementById("advertencia");

    // Mostrar mensaje según presupuesto diario
    if (gastoDiario < 30) {
            zona.innerHTML = `<p class="alerta">Presupuesto diario bajo </p>
                              <p class="alerta">(Minimo 30.00€ diario)</p>`;
    } else {
            zona.innerHTML = `<p class="suficiente">Presupuesto suficiente</p>`;
    }

    // Limpiar formulario
    document.getElementById("formViaje").reset();
}

/*--
CALCULAR GASTO DIARIO
Devuelve el presupuesto diario con 2 decimales.
--*/

function calcularGastoDiario(presupuesto,dias) {
    return (presupuesto / dias).toFixed(2);
}

/*--
EXPORTAR CSV
Genera un archivo CSV descargable
con todos los viajes almacenados. --*/
function exportarCSV() {

    // Encabezados
    let csv =
        "Destino;Dias;Presupuesto;Gasto Diario\n";

    // Añadir cada viaje
    viajes.forEach(viaje => {csv +=`${viaje.destino};${viaje.dias};${viaje.presupuesto};${viaje.gastoDiario}\n`;});

    // Crear archivo CSV
    let blob = new Blob([csv],{ type: "text/csv" });

    // Crear enlace temporal
    let enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);

    enlace.download = "viajes.csv";

    // Descargar archivo
    enlace.click();

    // Liberar memoria
    URL.revokeObjectURL(enlace.href);
}