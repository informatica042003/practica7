let currentPage = 1;
let formData = {
    nombre: '',
    edad: '',
    familiares: [],
    condiciones: [],
    internamientos: []
};

function nextPage(pageNumber) {
    document.querySelector(`.page.active`).classList.remove('active');
    document.getElementById(`page${pageNumber}`).classList.add('active');
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

    // Generar el resumen organizado
    let resumenHTML = `
        <h3>Datos Personales</h3>
        <ul>
            <li><strong>Nombre:</strong> ${formData.nombre}</li>
            <li><strong>Edad:</strong> ${formData.edad}</li>
        </ul>

        <h3>Familiares</h3>
        <ul>
            ${formData.familiares.map(familiar => `
                <li>
                    <strong>Nombre:</strong> ${familiar.nombre}<br>
                    <strong>Parentesco:</strong> ${familiar.parentesco}<br>
                    <strong>Edad:</strong> ${familiar.edad}
                </li>
            `).join('')}
        </ul>

        <h3>Condiciones Pre-Existentes</h3>
        <ul>
            ${formData.condiciones.map(condicion => `
                <li>
                    <strong>Enfermedad:</strong> ${condicion.enfermedad}<br>
                    <strong>Tiempo:</strong> ${condicion.tiempo}
                </li>
            `).join('')}
        </ul>

        <h3>Internamientos Realizados</h3>
        <ul>
            ${formData.internamientos.map(internamiento => `
                <li>
                    <strong>Fecha:</strong> ${internamiento.fecha}<br>
                    <strong>Centro Médico:</strong> ${internamiento.centroMedico}<br>
                    <strong>Diagnóstico:</strong> ${internamiento.diagnostico}
                </li>
            `).join('')}
        </ul>
    `;

    resumenDiv.innerHTML = resumenHTML;
}

function downloadJSON() {
    // Convertir los datos a formato JSON
    const jsonData = JSON.stringify(formData, null, 2);


    const blob = new Blob([jsonData], { type: 'application/json' });

    // Crear un enlace para descargar el archivo
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos-formulario.json'; // Nombre del archivo
    document.body.appendChild(a);
    a.click(); // Simular clic en el enlace
    document.body.removeChild(a); // Eliminar el enlace
    URL.revokeObjectURL(url); // Liberar memoria
}
