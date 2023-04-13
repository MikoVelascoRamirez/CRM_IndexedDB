
  let DB;

  document.addEventListener("DOMContentLoaded", () => {
    crearDB();
  });

  //Crea la BD en IndexedDB
  function crearDB() {
    const crearBD = window.indexedDB.open("crm", 1);

    crearBD.onsuccess = () => {
      DB = crearBD.result;
    };

    crearBD.onerror = () => {
      console.log("Hubo un error");
    };

    //Configuración de la BD
    crearBD.onupgradeneeded = (e) => {
      const db = e.target.result;
      const objectStore = db.createObjectStore("crm", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStore.createIndex("nombre", "nombre", { unique: false });
      objectStore.createIndex("email", "email", { unique: true });
      objectStore.createIndex("telefono", "telefono", { unique: false });
      objectStore.createIndex("empresa", "empresa", { unique: false });
      objectStore.createIndex("id", "id", { unique: true });
    };
  }
