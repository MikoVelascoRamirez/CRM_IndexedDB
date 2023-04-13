let DB;

document.addEventListener("DOMContentLoaded", () => {
    obtenerClientes();
});

function obtenerClientes() {
  const abrirConexion = window.indexedDB.open("crm", 1);

  abrirConexion.onsuccess = () => {
    DB = abrirConexion.result;
    const objectStore = DB.transaction("crm").objectStore("crm");

    objectStore.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;

      if (cursor) {
        pintarTabla(cursor.value);
        cursor.continue();
      }
    };
  };

  abrirConexion.onerror = () => {
    console.error("Hubo un error al intentar abrir la BD");
  };
}

function pintarTabla(cliente) {
  const { nombre, email, telefono, empresa, id } = cliente;

  const cuerpoTabla = document.querySelector("tbody");
  const fragment = document.createDocumentFragment();
  const fila = document.createElement("tr");

  fila.innerHTML = `
          <td>
          <p>${nombre}</p>
              <p>${email}</p>            
              </td>
          <td>${telefono}</td>
          <td>${empresa}</td>
          <td><a href="editarCliente.html?id=${id}">Editar</a> <a href="#" data-id=${id}>Eliminar</a> </td>
        `;

  fragment.appendChild(fila);
  cuerpoTabla.appendChild(fragment);
}
