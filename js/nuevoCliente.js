//Importación de módulos
import functions  from './funciones.js';
import variables from './vars.js';

//Accedemos a las funciones exportadas
const { conectarDB, validarCliente} = functions;
const { $formulario } = variables;

document.addEventListener("DOMContentLoaded", () => {
  conectarDB();

  $formulario.addEventListener("submit", e => validarCliente(e, "add"));
});