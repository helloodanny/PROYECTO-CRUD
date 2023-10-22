console.log("Entro index.js");

let agenda = JSON.parse(localStorage.getItem("agendas")) || [];


// Estas son las referencias a mis inputs
const inputnombredelpaciente = document.getElementById("nombredelpaciente");
const inputlesion = document.getElementById("lesion");
const inputtxrealizadoyavances = document.getElementById("txrealizadoyavances");
const inputproximacita = document.getElementById("proximacita");

// Estas son las referencias a mis botones
const btnguardar = document.getElementById("btnguardar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const divPaciente = document.getElementById("divPaciente");
const alertSinPacientes = document.getElementById("alertSinPacientes");

let indexEditar = null;

// Constructor de un objeto Paciente
class Paciente {
    constructor(nombre, lesion, txrealizado, siguienteCita) {
        this.nombre = nombre;
        this.lesion = lesion;
        this.txrealizado = txrealizado;
        this.siguienteCita = siguienteCita;
    }
}


function guardarPaciente() {
    let nombre = inputnombredelpaciente.value;
    let lesion = inputlesion.value;
    let txrealizado = inputtxrealizadoyavances.value;
    let proximacita = inputproximacita.value;

    let paciente = new Paciente(
        nombre,
        lesion,
        txrealizado,
        proximacita
    );

    if (indexEditar === null) {
        agenda.push(paciente); // Crear desde Cero
    } else {
        agenda[indexEditar] = paciente; // Actualizar
        indexEditar = null;
    }

    limpiarFormularioPacientes();
    localStorage.setItem("agendas", JSON.stringify(agenda));
    mostrarPacientes();

}

// Borrar todos los pacientes
function borrarTodo() {
    localStorage.clear();
    limpiarFormularioPacientes();
    agenda = [];
    mostrarPacientes();
    alert("Se borraron los pacientes");
}

function editarPaciente(index) {
    let pacienteAEditar = agenda[index];
    inputnombredelpaciente.value = pacienteAEditar.nombre;
    inputlesion.value = pacienteAEditar.lesion;
    inputtxrealizadoyavances.value = pacienteAEditar.txrealizado;
    inputproximacita.value = pacienteAEditar.siguienteCita;
    indexEditar = index;
}

function eliminarPaciente(index) {
    agenda.splice(index, 1);
    // Guardar en el local storage
    localStorage.setItem("agendas", JSON.stringify(agenda));
    mostrarPacientes();
}

function mostrarPacientes() {
    if (agenda.length === 0) {
        divPaciente.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertSinPacientes">
            No hay pacientes agregados
        </div>`;
    } else {
        divPaciente.innerHTML = "";
        agenda.forEach((paciente, index) => {
            divPaciente.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-12">
                         <div class="card-body">
                            <h5 class="card-title">${paciente.nombre}</h5>
                            
                            <h6 class="card-subtitle mb-2 text-body-secondary">${paciente.lesion} - ${paciente.txrealizado} - ${paciente.siguienteCita}</h6>
                            <div class="row mb-2">
                               <div class="col">
                                  <button class="btn btn-warning w-100 mt-2" type="button" id="editar-${index}" onclick="editarPaciente(${index})">Editar</button>
                               </div>
                               <div class="col">
                                  <button class="btn btn-danger w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarPaciente(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}

function limpiarFormularioPacientes() {
    inputnombredelpaciente.value = "";
    inputlesion.value = "";
    inputtxrealizadoyavances.value = "";
    inputproximacita.value = "";
}

btnguardar.addEventListener("click", guardarPaciente);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarPacientes();