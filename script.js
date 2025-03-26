let currentPage = 1;
let formData = {
    nombre: '',
    edad: '',
    familiares: [],
    condiciones: [],
    internamientos: []
};

// Función principal para cambiar de página
function goToPage(pageNumber) {
    // Validar rango de páginas
    if (pageNumber < 1 || pageNumber > 5) return;
    
    // Guardar datos antes de cambiar
    saveCurrentPageData();
    
    // Ocultar página actual
    document.querySelector('.page.active').classList.remove('active');
    
    // Mostrar nueva página
    document.getElementById(`page${pageNumber}`).classList.add('active');
    currentPage = pageNumber;
    
    // Actualizar interfaz
    updatePatientInfo();
    updateNavigationButtons();
    
    // Mostrar resumen si es la última página
    if (pageNumber === 5) {
        showResumen();
    }
    
    // Guardar en caché
    localStorage.setItem('currentFormData', JSON.stringify(formData));
}

// Función para avanzar
function nextPage() {
    goToPage(currentPage + 1);
}

// Función para retroceder
function prevPage() {
    goToPage(currentPage - 1);
}

// Actualizar botones de navegación
function updateNavigationButtons() {
    const prevButtons = document.querySelectorAll('.prev-button');
    const nextButtons = document.querySelectorAll('.next-button');
    
    // Mostrar/ocultar botón Anterior
    prevButtons.forEach(btn => {
        btn.style.display = currentPage === 1 ? 'none' : 'block';
    });
    
    // Cambiar texto de Siguiente
    nextButtons.forEach(btn => {
        if (currentPage === 4) {
            btn.textContent = 'Ver Resumen';
        } else if (currentPage === 5) {
            btn.style.display = 'none';
        } else {
            btn.textContent = 'Siguiente';
        }
    });
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos guardados si existen
    const savedData = localStorage.getItem('currentFormData');
    if (savedData) {
        formData = JSON.parse(savedData);
        loadFormData();
    }
    
    // Mostrar primera página
    document.getElementById('page1').classList.add('active');
    updatePatientInfo();
    updateNavigationButtons();
});

// Actualizar información del paciente
function updatePatientInfo() {
    const nombre = document.getElementById('nombre').value;
    const pacienteNombre = nombre ? nombre : 'Nuevo Paciente';
    document.getElementById('current-patient-name').textContent = pacienteNombre;
    document.title = `Formulario - ${pacienteNombre}`;
}

// Guardar datos de la página actual
function saveCurrentPageData() {
    switch(currentPage) {
        case 1:
            formData.nombre = document.getElementById('nombre').value;
            formData.edad = document.getElementById('edad').value;
            break;
        case 2:
            saveFamiliares();
            break;
        case 3:
            saveCondiciones();
            break;
        case 4:
            saveInternamientos();
            break;
    }
}

// Cargar datos del formulario
function loadFormData() {
    // Datos personales
    document.getElementById('nombre').value = formData.nombre || '';
    document.getElementById('edad').value = formData.edad || '';

    // Familiares
    const familiaresDiv = document.getElementById('familiares');
    familiaresDiv.innerHTML = '';
    
    if (formData.familiares && formData.familiares.length > 0) {
        formData.familiares.forEach(familiar => {
            addFamiliar(familiar);
        });
    } else {
        addFamiliar();
    }

    // Condiciones
    const condicionesDiv = document.getElementById('condiciones');
    condicionesDiv.innerHTML = '';
    
    if (formData.condiciones && formData.condiciones.length > 0) {
        formData.condiciones.forEach(condicion => {
            addCondicion(condicion);
        });
    } else {
        addCondicion();
    }

    // Internamientos
    const internamientosDiv = document.getElementById('internamientos');
    internamientosDiv.innerHTML = '';
    
    if (formData.internamientos && formData.internamientos.length > 0) {
        formData.internamientos.forEach(internamiento => {
            addInternamiento(internamiento);
        });
    } else {
        addInternamiento();
    }

    updatePatientInfo();
}

// Funciones para agregar elementos dinámicos
function addFamiliar(data = {}) {
    const familiaresDiv = document.getElementById('familiares');
    const newFamiliar = document.createElement('div');
    newFamiliar.className = 'form-group familiar';
    newFamiliar.innerHTML = `
        <label for="nombreFamiliar">Nombre:</label>
        <input type="text" class="nombreFamiliar form-input" name="nombreFamiliar" value="${data.nombre || ''}">
        <label for="parentesco">Parentesco:</label>
        <input type="text" class="parentesco form-input" name="parentesco" value="${data.parentesco || ''}">
        <label for="edadFamiliar">Edad:</label>
        <input type="number" class="edadFamiliar form-input" name="edadFamiliar" value="${data.edad || ''}">
    `;
    familiaresDiv.appendChild(newFamiliar);
}

function saveFamiliares() {
    formData.familiares = [];
    document.querySelectorAll('.familiar').forEach(familiar => {
        formData.familiares.push({
            nombre: familiar.querySelector('.nombreFamiliar').value,
            parentesco: familiar.querySelector('.parentesco').value,
            edad: familiar.querySelector('.edadFamiliar').value
        });
    });
}

function addCondicion(data = {}) {
    const condicionesDiv = document.getElementById('condiciones');
    const newCondicion = document.createElement('div');
    newCondicion.className = 'form-group condicion';
    newCondicion.innerHTML = `
        <label for="enfermedad">Enfermedad:</label>
        <input type="text" class="enfermedad form-input" name="enfermedad" value="${data.enfermedad || ''}">
        <label for="tiempo">Tiempo con la Enfermedad:</label>
        <input type="text" class="tiempo form-input" name="tiempo" value="${data.tiempo || ''}">
    `;
    condicionesDiv.appendChild(newCondicion);
}

function saveCondiciones() {
    formData.condiciones = [];
    document.querySelectorAll('.condicion').forEach(condicion => {
        formData.condiciones.push({
            enfermedad: condicion.querySelector('.enfermedad').value,
            tiempo: condicion.querySelector('.tiempo').value
        });
    });
}

function addInternamiento(data = {}) {
    const internamientosDiv = document.getElementById('internamientos');
    const newInternamiento = document.createElement('div');
    newInternamiento.className = 'form-group internamiento';
    newInternamiento.innerHTML = `
        <label for="fecha">Fecha:</label>
        <input type="date" class="fecha form-input" name="fecha" value="${data.fecha || ''}">
        <label for="centroMedico">Centro Médico:</label>
        <input type="text" class="centroMedico form-input" name="centroMedico" value="${data.centroMedico || ''}">
        <label for="diagnostico">Diagnóstico:</label>
        <input type="text" class="diagnostico form-input" name="diagnostico" value="${data.diagnostico || ''}">
    `;
    internamientosDiv.appendChild(newInternamiento);
}

function saveInternamientos() {
    formData.internamientos = [];
    document.querySelectorAll('.internamiento').forEach(internamiento => {
        formData.internamientos.push({
            fecha: internamiento.querySelector('.fecha').value,
            centroMedico: internamiento.querySelector('.centroMedico').value,
            diagnostico: internamiento.querySelector('.diagnostico').value
        });
    });
}

// Mostrar resumen
function showResumen() {
    saveCurrentPageData();
    const resumenDiv = document.getElementById('resumen');
    
    let resumenHTML = `
        <h3>Datos Personales</h3>
        <ul>
            <li><strong>Nombre:</strong> ${formData.nombre || 'No especificado'}</li>
            <li><strong>Edad:</strong> ${formData.edad || 'No especificado'}</li>
        </ul>

        <h3>Familiares</h3>
        <ul>
    `;

    if (formData.familiares.length > 0) {
        resumenHTML += formData.familiares.map(familiar => `
            <li>
                <strong>Nombre:</strong> ${familiar.nombre || 'No especificado'}<br>
                <strong>Parentesco:</strong> ${familiar.parentesco || 'No especificado'}<br>
                <strong>Edad:</strong> ${familiar.edad || 'No especificado'}
            </li>
        `).join('');
    } else {
        resumenHTML += '<li>No se han agregado familiares</li>';
    }

    resumenHTML += `
        </ul>

        <h3>Condiciones Pre-Existentes</h3>
        <ul>
    `;

    if (formData.condiciones.length > 0) {
        resumenHTML += formData.condiciones.map(condicion => `
            <li>
                <strong>Enfermedad:</strong> ${condicion.enfermedad || 'No especificado'}<br>
                <strong>Tiempo:</strong> ${condicion.tiempo || 'No especificado'}
            </li>
        `).join('');
    } else {
        resumenHTML += '<li>No se han agregado condiciones</li>';
    }

    resumenHTML += `
        </ul>

        <h3>Internamientos Realizados</h3>
        <ul>
    `;

    if (formData.internamientos.length > 0) {
        resumenHTML += formData.internamientos.map(internamiento => `
            <li>
                <strong>Fecha:</strong> ${internamiento.fecha || 'No especificado'}<br>
                <strong>Centro Médico:</strong> ${internamiento.centroMedico || 'No especificado'}<br>
                <strong>Diagnóstico:</strong> ${internamiento.diagnostico || 'No especificado'}
            </li>
        `).join('');
    } else {
        resumenHTML += '<li>No se han agregado internamientos</li>';
    }

    resumenHTML += '</ul>';
    resumenDiv.innerHTML = resumenHTML;
}

// Descargar JSON
function downloadJSON() {
    saveCurrentPageData();
    const jsonData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `datos-paciente-${formData.nombre || 'anonimo'}-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearForm() {
    if (confirm('¿Estás seguro de que quieres comenzar un nuevo formulario? Se perderán los datos no guardados.')) {
        // Limpiar datos y localStorage
        localStorage.removeItem('currentFormData');
        formData = { nombre: '', edad: '', familiares: [], condiciones: [], internamientos: [] };
        
        // Restablecer a página 1
        document.querySelector('.page.active').classList.remove('active');
        document.getElementById('page1').classList.add('active');
        currentPage = 1;
        
        // Limpiar todos los campos
        document.getElementById('nombre').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('familiares').innerHTML = '';
        document.getElementById('condiciones').innerHTML = '';
        document.getElementById('internamientos').innerHTML = '';
        document.getElementById('resumen').innerHTML = '';
        
        // Restablecer elementos mínimos
        addFamiliar();
        addCondicion();
        addInternamiento();
        
        // Actualizar interfaz
        document.getElementById('cache-notification').style.display = 'none';
        updatePatientInfo();
        
        // RESTABLECER TODOS LOS BOTONES SIGUIENTE
        document.querySelectorAll('.next-button').forEach(btn => {
            btn.style.display = 'inline-block'; // Mostrar botones siguiente
            btn.textContent = 'Siguiente'; // Restablecer texto
        });
        
        // Asegurar que el botón anterior esté oculto en página 1
        updateNavigationButtons();
    }
}