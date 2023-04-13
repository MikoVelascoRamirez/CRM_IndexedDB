const $table = document.querySelector("table");

document.addEventListener("DOMContentLoaded", () => {
  
  $table.addEventListener("click", (e) => {
    if (e.target.textContent.includes("Eliminar")) {
      eliminarRegistro(e);
    }
  });

});


function eliminarRegistro(e) {
  const idCliente = Number(e.target.dataset.id);
  const confirmar = confirm("¿Estás seguro de eliminar este cliente?");

  if (confirmar) {
    const abrirConexion = window.indexedDB.open("crm", 1);
    
    abrirConexion.onsuccess = () => {
      let DB = abrirConexion.result;
      const transaction = DB.transaction("crm", "readwrite");
      const objectStore = transaction.objectStore("crm");
      objectStore.delete(idCliente);

      transaction.oncomplete = () => {
        e.target.parentElement.parentElement.remove();
      };

      transaction.onerror = () => {
        imprimirAlerta("Error al eliminar", "error");
      };

    };
  }

}
