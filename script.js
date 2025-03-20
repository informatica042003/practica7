let currentPage = 1;
let formData = {
    datosPersonales: {},
    familiares: [],
    condiciones: [],
    internamientos: []
};

function nextPage(page) {
    document.getElementById(`page${currentPage}`).classList.remove('active');
    document.getElementById(`page${page}`).classList.add('active');
    currentPage = page;
}

function prevPage(page) {
    document.getElementById(`page${currentPage}`).classList.remove('active');
    document.getElementById(`page${page}`).classList.add('active');
    currentPage = page;
}

function addFamiliar() {
    const familiaresDiv = document.getElementById('familiares');
    const newFamiliar = document.createElement('div');
    newFamiliar.className = 'familiar';
    newFamiliar.innerHTML = `
        <label for="nombreFamiliar">Nombre:</label>
        <input type="text" class="nombreFamiliar" required>
        <label for="parentesco">Parentesco:</label>
        <input type="text" class="parentesco" required>
        <label for="edadFamiliar">Edad:</label>
        <input type="number" class="edadFamiliar" required>
    `;
    familiaresDiv.appendChild(newFamiliar);
}

function addCondicion() {
    const condicionesDiv = document.getElementById('condiciones');
    const newCondicion = document.createElement('div');
    newCondicion.className = 'condicion';
    newCondicion.innerHTML = `
        <label for="enfermedad">Enfermedad:</label>
        <input type="text" class="enfermedad" required>
        <label for="tiempo">Tiempo con la Enfermedad:</label>
        <input type="text" class="tiempo" required>
    `;
    condicionesDiv.appendChild(newCondicion);
}

function addInternamiento() {
    const internamientosDiv = document.getElementById('internamientos');
    const newInternamiento = document.createElement('div');
    newInternamiento.className = 'internamiento';
    newInternamiento.innerHTML = `
        <label for="fecha">Fecha:</label>
        <input type="date" class="fecha" required>
        <label for="centroMedico">Centro Médico:</label>
        <input type="text" class="centroMedico" required>
        <label for="diagnostico">Diagnóstico:</label>
        <input type="text" class="diagnostico" required>
    `;
    internamientosDiv.appendChild(newInternamiento);
}

function submitForm() {
    // Recopilar datos
    formData.datosPersonales = {
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value
    };

    formData.familiares = Array.from(document.querySelectorAll('.familiar')).map(familiar => ({
        nombre: familiar.querySelector('.nombreFamiliar').value,
        parentesco: familiar.querySelector('.parentesco').value,
        edad: familiar.querySelector('.edadFamiliar').value
    }));

    formData.condiciones = Array.from(document.querySelectorAll('.condicion')).map(condicion => ({
        enfermedad: condicion.querySelector('.enfermedad').value,
        tiempo: condicion.querySelector('.tiempo').value
    }));

    formData.internamientos = Array.from(document.querySelectorAll('.internamiento')).map(internamiento => ({
        fecha: internamiento.querySelector('.fecha').value,
        centroMedico: internamiento.querySelector('.centroMedico').value,
        diagnostico: internamiento.querySelector('.diagnostico').value
    }));

    // Mostrar resumen
    const resumenDiv = document.getElementById('resumen');
    resumenDiv.innerHTML = JSON.stringify(formData, null, 2);

    // Guardar en JSON
    saveToJson(formData);
}

function saveToJson(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fetch('data.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }).then(response => {
        if (response.ok) {
            alert('Datos guardados correctamente.');
        } else {
            alert('Error al guardar los datos.');
        }
    });
}