console.log("Entro index.js");

let agenda = JSON.parse(localStorage.getItem("agenda")) || [];


// Estos son las referencias a mis inputs
const nombredelpaciente = document.getElementById("nombredelpaciente");
const LESION = document.getElementById("LESION ");
const txrealizadoyavances= document.getElementById("txrealizadoyavances");
const proximacita = document.getElementById("proximacita");

// Estas son las referencias a mis botones
const btnguardar= document.getElementById("btnguardar");
const btneditar = document.getElementById("btneditar");
