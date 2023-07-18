
// import * as api from "./modules/api.js";
import {
        postDepartamento,
        getDepartamento,
        deleteDepartamento,
        actualizarDepartamento,
        postCiudad,
        getCiudad,
        deleteCiudad,
        actualizarCiudad,
} from "./modules/api.js";


// ## GESTIÓN DEPARTAMENTOS ##

// listar departamentos
document.addEventListener("DOMContentLoaded", () => {
    getDepartamento().then(() => {
        getCiudad();
    });
});

// insertar departamento
let $formAddDepartment = document.querySelector("#formAddDepartment");

let tbodyDepartamentos = document.querySelector("#tbodyDepartamentos");
let formActualizar = document.querySelector("#formActualizar");

$formAddDepartment.addEventListener('submit', async(e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let accion = e.submitter.dataset.accion;
    console.log(data);
    if (accion === "Registrar") {
        postDepartamento(data);
    }

});

// Eliminar/actualizar departamento
tbodyDepartamentos.addEventListener("click", (e) => {
    e.preventDefault();
  
    let tr = e.target.closest("tr");
    let id = tr.id;
  
    let accion = e.target.dataset.accion;
  
    if (accion === "Eliminar") {
      deleteDepartamento(tr, id);
      tr.remove();
    } else if (accion === "Actualizar") {
    let tr = e.target.closest("tr");

    let id = tr.id;

      formActualizar.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("ok");
        console.log(id);
        
        let data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        console.log(id);
        actualizarDepartamento(data, id);
      });
    }
    accion = ""
  });

// ## FIN GESTIÓN DEPARTAMENTOS ##


// ## GESTIÓN CIUDADES ##

let formCiudades = document.querySelector("#formCiudades");
let tbodyCiudades = document.querySelector("#tbodyCiudades");
let formActualizarCiudad = document.querySelector("#formActualizarCiudad");

// Agregar ciudad
formCiudades.addEventListener("submit", (e) => {
  e.preventDefault();

  let data = Object.fromEntries(new FormData(e.target));

  data.DepartamentosId = parseInt(data.DepartamentosId, 10);

  let accion = e.submitter.dataset.accion;

  if (accion === "RegistrarCiudad") {
    postCiudad(data);
  }
});


// eliminar/actualizar Ciudad
tbodyCiudades.addEventListener("click", (e) => {
  e.preventDefault();

  let tr = e.target.closest("tr");
  let id = tr.id;

  let accion = e.target.dataset.accion;

  if (accion === "EliminarCiudad") {
    deleteCiudad(tr, id);
    tr.remove();
  } else if (accion === "ActualizarCiudad") {
    formActualizarCiudad.addEventListener("submit", (e) => {
      e.preventDefault();

      let data = Object.fromEntries(new FormData(e.target));
      actualizarCiudad(data, id);
    });
  }
});



// ## FIN GESTIÓN CIUDAD ##


