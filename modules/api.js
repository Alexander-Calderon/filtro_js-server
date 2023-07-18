
const URL = "http://localhost:3000"
const headers = new Headers({ "Content-Type": "application/json" });

// ## INICIO DEPARTAMENTOS ##

//Listar departamentos
export async function getDepartamento() {
    let data = await (await fetch(`${URL}/Departamentos`)).json();
    mostrarDepartamento(data);
}

//Agregar departamentos
export async function postDepartamento(data){
    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
    let personas = await (await fetch(`${URL}/Departamentos`,config)).json();
    getDepartamento(data);

}

//Eliminar departamentos
export async function deleteDepartamento(tr, id) {
    let data = Object.fromEntries(new FormData(tr.target));
  
    let config = {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(data),
    };
    
    let del = await (await fetch(`${URL}/Departamentos/${id}`, config)).json();
  }

    //Actualizar departamentos
    export async function actualizarDepartamento(data, id) {
        let config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
        };    
        let act = await (await fetch(`${URL}/Departamentos/${id}`, config)).json();
        location.reload();


    }

// ## FIN DEPARTAMENTOS ##


// ## INICIO CIUDADES ##

export async function getCiudad() {
    let ciudades = await (await fetch(`${URL}/Ciudades`)).json();
    let departamentos = await (await fetch(`${URL}/Departamentos`)).json();
    mostrarCiudad(ciudades, departamentos);
  
    const selectDepartamentos = document.getElementById("DepartamentosId");
    const selectDepartamentosModal = document.getElementById("departamentoIdCiudad");
  
    departamentos.forEach((departamento) => {
      const option = document.createElement("option");
      option.value = departamento.id;
      option.textContent = departamento.nomDepartamento;
      selectDepartamentos.appendChild(option);
  
      const optionModal = document.createElement("option");
      optionModal.value = departamento.id;
      optionModal.textContent = departamento.nomDepartamento;
      selectDepartamentosModal.appendChild(optionModal);
    });
  }


    // insertar ciudades
    export async function postCiudad(data) {
        let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        };    
        let ciudades = await (await fetch(`${URL}/Ciudades`, config)).json();
    }

    //borrar ciudades
    export async function deleteCiudad(tr, id) {
        let data = Object.fromEntries(new FormData(tr.target));
      
        let config = {
          method: "DELETE",
          headers: headers,
          body: JSON.stringify(data),
        };
      
        let del = await (await fetch(`${URL}/Ciudades/${id}`, config)).json();
      }

      //actualizar ciudades
      export async function actualizarCiudad(data, id) {
        data.DepartamentosId = parseInt(data.DepartamentosId);
        let config = {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(data),
        };
      
        let act = await (await fetch(`${URL}/Ciudades/${id}`, config)).json();
        location.reload();

      }



  //////////////////////
  //////////////////////

    //mostrar departamento (export d)
  function mostrarDepartamento(data) {
    let tbodyDepartamentos = document.querySelector("#tbodyDepartamentos");
  
    tbodyDepartamentos.innerHTML = "";
  
    data.forEach((department) => {
      let tr = document.createElement("tr");
      tr.setAttribute("id", `${department.id}`);
      tr.setAttribute("class", "tr");
      tr.innerHTML = `
      <td>${department.id}</td>
      <td>${department.nomDepartamento}</td>
      <td>
      <input type="submit" data-accion="Eliminar" value="Eliminar" class="btn btn-danger py-1 me-3">
      <input type="button" data-mdb-toggle="modal" data-mdb-target="#modalModificar" data-accion="Actualizar" value="Actualizar" class="btn btn-warning py-1">
      </td>
      `;
  
      tbodyDepartamentos.appendChild(tr);
    });
  }

  
 
  //mostrar ciudades ex
  export default function mostrarCiudad(ciudades, departamentos) {
    let tbodyCiudades = document.querySelector("#tbodyCiudades");
    tbodyCiudades.innerHTML = "";
  
    ciudades.forEach((ciudad) => {
      let tr = document.createElement("tr");
      tr.setAttribute("id", `${ciudad.id}`);
      tr.setAttribute("class", "tr");
      tr.innerHTML = `
          <td>${ciudad.id}</td>
          <td>${ciudad.nomCiudad}</td>
          <td>${getDepartamentoNombre(ciudad.DepartamentosId, departamentos)}</td>
          <td>
          <input type="submit" data-accion="EliminarCiudad" value="Eliminar" class="btn btn-danger py-1 me-3">
          <input type="button" data-mdb-toggle="modal" data-mdb-target="#modalActualizarCiudad" data-accion="ActualizarCiudad" value="Actualizar" class="btn btn-warning py-1">        
          </td>
        `;
  
      tbodyCiudades.appendChild(tr);
    });
  }
  
  function getDepartamentoNombre(departamentoId, departamentos) {
    const departamento = departamentos.find((departamento) => departamento.id === departamentoId);
    return departamento ? departamento.nomDepartamento : "Departamento no encontrado";
  }
  