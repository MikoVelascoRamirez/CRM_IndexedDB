const $formulario = document.querySelector("form");
const $nombre = $formulario.querySelector("#inp_Name");
const $email = $formulario.querySelector("#inp_Email");
const $telefono = $formulario.querySelector("#inp_Phone");
const $empresa = $formulario.querySelector("#inp_Empresa");

// settingVars();

// function settingVars() {
//   if (!window.location.href.includes("clientes.html")) {
//     $formulario = document.querySelector("form");
//     $nombre = $formulario.querySelector("#inp_Name");
//     $email = $formulario.querySelector("#inp_Email");
//     $telefono = $formulario.querySelector("#inp_Phone");
//     $empresa = $formulario.querySelector("#inp_Empresa");
//   }
// }

const variables = {
  $formulario,
  $campos: [$nombre, $email, $telefono, $empresa],
};

export default variables;
