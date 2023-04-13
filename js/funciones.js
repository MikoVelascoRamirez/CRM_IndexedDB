//Importación de módulos
import variables from './vars.js';

//Destructuring object de variables

const { $formulario, $campos } = variables;

let DB;

function conectarDB() {
  const abrirConexion = window.indexedDB.open("crm", 1);

  abrirConexion.onerror = () => {
    alert("Error al abrir la base de datos");
  };

  abrirConexion.onsuccess = () => {
    DB = abrirConexion.result;
  };
}

function validarCliente(e, method, idCliente = Date.now()) {
  e.preventDefault();

  const [$nombre, $email, $telefono, $empresa] = $campos;

  const cliente = {
    nombre: $nombre.value,
    email: $email.value,
    telefono: $telefono.value,
    empresa: $empresa.value,
    id: Number(idCliente),
  };
  
  // cliente.id = Date.now()
  
  //Validando si el formulario esta vacío
  $campos.some(campo => !campo.value)
    ? imprimirAlerta("Los campos no pueden ir vacíos", "error")
    : setTask(method, cliente);
}

function setTask(method, cliente) {
  const transaction = DB.transaction(["crm"], "readwrite");
  const objectStore = transaction.objectStore("crm");

  //Validamos el tipo de método
  console.log(method, cliente);

  if(method === "add"){
    objectStore.add(cliente);
  } else if( method === "edit"){
    objectStore.put(cliente);
  }

  transaction.oncomplete = () => {
    imprimirAlerta("Operación completada satisfactoriamente", "sucess");

    setTimeout(() => {
      window.location.href = "../html/clientes.html";
    }, 3000);
  };

  transaction.onerror = () => {
    imprimirAlerta("Error al ejecutar la operación", "error");
  };
}

function imprimirAlerta(mensaje, tipo) {
  //Crear la alerta
  const divAlerta = document.createElement("div");
  divAlerta.classList.add("mensajeAlerta");

  if (tipo === "error") {
    divAlerta.style.backgroundColor = "#e74c3c";
  } else {
    divAlerta.style.backgroundColor = "#2ecc71";
  }

  divAlerta.textContent = mensaje;

  $formulario.appendChild(divAlerta);

  setTimeout(() => {
    if(tipo !== "error"){
      $formulario.reset();
    }
    divAlerta.remove();
  }, 3000);
}

const functions = {
  conectarDB,
  validarCliente
};

export default functions;
