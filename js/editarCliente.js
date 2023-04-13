//Importación de módulos
import variables from "./vars.js";
import functions from "./funciones.js";

//Destructuring de objetos importados
const { $formulario, $campos } = variables;
const { conectarDB, validarCliente } = functions;

let DB, idCliente;

document.addEventListener("DOMContentLoaded", () => {
  //Abrir la BD
  conectarDB();

  //Leer la url y verificar el id

  const paramusUrl = new URLSearchParams(window.location.search);
  idCliente = paramusUrl.get("id");

  if (idCliente) {
    setTimeout(() => {
      obtenerID(idCliente);
    }, 100);
  }
});

$formulario.addEventListener("submit", e => validarCliente(e, "edit", idCliente));

function obtenerID(id) {
  const abrirConexion = window.indexedDB.open("crm", 1);

  abrirConexion.onerror = () => {
    alert("Error al abrir la base de datos");
  };

  abrirConexion.onsuccess = () => {
    DB = abrirConexion.result;

    const transaction = DB.transaction("crm");
    const objectStore = transaction.objectStore("crm");

    const cliente = objectStore.openCursor(); //Parecido a un select

    cliente.onsuccess = (e) => {
      const cursor = e.target.result; //Trae el resultado de la consulta

      if (cursor) {
        //Valida si hay algo, es decir, si hubo un resultado
        if (cursor.value.id === Number(id)) {
          //Cursor.value contiene el valor del resultado de la consulta
          llenarFormulario(cursor.value);
        }
        cursor.continue();
      }
    };

  };
}

function llenarFormulario(cliente) {
  //Obtenemos los datos del cliente
  const { nombre, email, telefono, empresa} = cliente;
  const [$nombre, $email, $telefono, $empresa] = $campos;

  //Rellenamos el formulario
  $nombre.value = nombre;
  $email.value = email;
  $telefono.value = telefono;
  $empresa.value = empresa;
}