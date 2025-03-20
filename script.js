let currentPage = 1;
let formData = {
    nombre: '',
    edad: '',
    familiares: [],
    condiciones: [],
    internamientos: []
};

function nextPage(pageNumber) {
    document.getElementById(`page${currentPage}`).style.display = 'none';
    document.getElementById(`page${pageNumber}`).style.display = 'block';
    currentPage = pageNumber;
    if (pageNumber === 5) {
        showResumen();
    }
}

function addFamiliar() {
    const familiaresDiv = document.getElementById('familiares');
    const newFamiliar = document.createElement('div');
    newFamiliar.className = 'familiar';
    newFamiliar.innerHTML = `
        <label for="nombreFamiliar">Nombre:</label>
        <input type="text" class="nombreFamiliar" name="nombreFamiliar">
        <label for="parentesco">Parentesco:</label>
        <input type="text" class="parentesco" name="parentesco">
        <label for="edadFamiliar">Edad:</label>
        <input type="number" class="edadFamiliar" name="edadFamiliar">
    `;
    familiaresDiv.appendChild(newFamiliar);
}

function addCondicion() {
    const condicionesDiv = document.getElementById('condiciones');
    const newCondicion = document.createElement('div');
    newCondicion.className = 'condicion';
    newCondicion.innerHTML = `
        <label for="enfermedad">Enfermedad:</label>
        <input type="text" class="enfermedad" name="enfermedad">
        <label for="tiempo">Tiempo con la Enfermedad:</label>
        <input type="text" class="tiempo" name="tiempo">
    `;
    condicionesDiv.appendChild(newCondicion);
}

function addInternamiento() {
    const internamientosDiv = document.getElementById('internamientos');
    const newInternamiento = document.createElement('div');
    newInternamiento.className = 'internamiento';
    newInternamiento.innerHTML = `
        <label for="fecha">Fecha:</label>
        <input type="date" class="fecha" name="fecha">
        <label for="centroMedico">Centro Médico:</label>
        <input type="text" class="centroMedico" name="centroMedico">
        <label for="diagnostico">Diagnóstico:</label>
        <input type="text" class="diagnostico" name="diagnostico">
    `;
    internamientosDiv.appendChild(newInternamiento);
}

function showResumen() {
    const resumenDiv = document.getElementById('resumen');
    formData.nombre = document.getElementById('nombre').value;
    formData.edad = document.getElementById('edad').value;

    formData.familiares = [];
    document.querySelectorAll('.familiar').forEach(familiar => {
        formData.familiares.push({
            nombre: familiar.querySelector('.nombreFamiliar').value,
            parentesco: familiar.querySelector('.parentesco').value,
            edad: familiar.querySelector('.edadFamiliar').value
        });
    });

    formData.condiciones = [];
    document.querySelectorAll('.condicion').forEach(condicion => {
        formData.condiciones.push({
            enfermedad: condicion.querySelector('.enfermedad').value,
            tiempo: condicion.querySelector('.tiempo').value
        });
    });

    formData.internamientos = [];
    document.querySelectorAll('.internamiento').forEach(internamiento => {
        formData.internamientos.push({
            fecha: internamiento.querySelector('.fecha').value,
            centroMedico: internamiento.querySelector('.centroMedico').value,
            diagnostico: internamiento.querySelector('.diagnostico').value
        });
    });

    resumenDiv.innerHTML = JSON.stringify(formData, null, 2);
}

function submitForm() {
    // Aquí puedes agregar la lógica para enviar los datos a un servidor o guardarlos en localStorage
    console.log('Datos guardados:', formData);
    alert('Datos guardados exitosamente');
}