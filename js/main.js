const camperForm = document.getElementById("camperForm");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const camperList = document.getElementById("camperList");
const camperSelect = document.getElementById("camper");
const conceptForm = document.getElementById("conceptForm");
const conceptSelect = document.getElementById("concepto");
const conceptosAplicados = document.getElementById("conceptosAplicados");

const campers = [];
let camperIdCounter = 1;

camperForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const identificacion = document.getElementById("identificacion").value;
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const grupo = document.getElementById("grupo").value;
    const campcoins = document.getElementById("campcoins").value;

    const camper = {
        id: camperIdCounter++,
        identificacion,
        nombre,
        telefono,
        correo,
        grupo,
        campcoins,
    };

    campers.push(camper);
    saveCampersToLocalStorage(); // Guarda campers en localStorage
    displayCampers();
    updateCamperSelect();
    camperForm.reset();
});

searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === "") {
        displayCampers();
        return;
    }
    const filteredCampers = campers.filter((camper) => {
        return (
            camper.nombre.toLowerCase().includes(searchTerm) ||
            camper.identificacion.toLowerCase().includes(searchTerm)
        );
    });
    displayCampers(filteredCampers);
});

conceptForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const conceptId = conceptSelect.value;
    const selectedCamperId = camperSelect.value;
    const selectedCamper = campers.find((camper) => camper.id == selectedCamperId);

    if (!selectedCamper) {
        alert("Seleccione un camper válido.");
        return;
    }

    let conceptDescription = "";
    let conceptValue = 0;

    switch (conceptId) {
        case "1":
            conceptDescription = "Llegar Tarde";
            conceptValue = -3;
            break;
        case "2":
            conceptDescription = "Buenas Notas";
            conceptValue = 2;
            break;
        case "3":
            conceptDescription = "Compañerismo";
            conceptValue = 5;
            break;
        case "4":
            conceptDescription = "Decir Groserías";
            conceptValue = -10;
            break;
        default:
            break;
    }

    if (conceptValue !== 0) {
        const parsedCampcoins = parseInt(selectedCamper.campcoins, 10);
        selectedCamper.campcoins = parsedCampcoins + conceptValue;
        const conceptApplied = {
            conceptDescription,
            conceptValue,
        };
        updateCamperCampCoins(selectedCamper);
        displayConceptApplied(conceptApplied);
    }
});

function displayCampers(campersToDisplay = campers) {
    camperList.innerHTML = "";

    campersToDisplay.forEach((camper) => {
        const camperCard = document.createElement("div");
        camperCard.classList.add("camper-card");
        camperCard.setAttribute("data-id", camper.id);
        camperCard.innerHTML = `
            <p><strong>Número de Identificación:</strong> ${camper.identificacion}</p>
            <p><strong>Nombre Completo:</strong> ${camper.nombre}</p>
            <p><strong>Teléfono Celular:</strong> ${camper.telefono}</p>
            <p><strong>Correo Electrónico:</strong> ${camper.correo}</p>
            <p><strong>Grupo Campus:</strong> ${camper.grupo}</p>
            <p><strong>Campcoins Acumulados:</strong> ${camper.campcoins}</p>
            <button class="delete-camper btn btn-danger">Eliminar</button>
        `;
        camperList.appendChild(camperCard);
    });
}

function updateCamperSelect() {
    camperSelect.innerHTML = "";
    campers.forEach((camper) => {
        const option = document.createElement("option");
        option.value = camper.id;
        option.text = camper.nombre;
        camperSelect.appendChild(option);
    });
}

function updateCamperCampCoins(camper) {
    const camperItem = document.querySelector(`#camperList .camper-card[data-id="${camper.id}"]`);
    if (camperItem) {
        const campcoinsInfo = camperItem.querySelector("p strong:last-child");
        campcoinsInfo.innerText = `Campcoins Acumulados: ${camper.campcoins}`;
    }
}

function displayConceptApplied(concept) {
    const conceptAppliedItem = document.createElement("li");
    conceptAppliedItem.innerHTML = `<strong>Concepto:</strong> ${concept.conceptDescription}, <strong>Valor:</strong> ${concept.conceptValue}`;
    conceptosAplicados.appendChild(conceptAppliedItem);
    conceptSelect.value = ""; // Reset concept selection
    camperSelect.value = ""; // Reset camper selection
}

displayCampers();
updateCamperSelect();

// Agregar un evento de clic para eliminar un Camper
camperList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-camper")) {
        const camperId = e.target.closest(".camper-card").getAttribute("data-id");
        const camperIndex = campers.findIndex((camper) => camper.id == camperId);
        if (camperIndex > -1) {
            campers.splice(camperIndex, 1);
            saveCampersToLocalStorage(); // Guarda campers en localStorage
            displayCampers();
        }
    }
});

function saveCampersToLocalStorage() {
    localStorage.setItem("campers", JSON.stringify(campers));
}

// Al cargar la página, intenta cargar los campers desde localStorage
window.addEventListener("load", () => {
    const storedCampers = localStorage.getItem("campers");
    if (storedCampers) {
        campers = JSON.parse(storedCampers);
        camperIdCounter = campers.reduce((max, camper) => Math.max(max, camper.id), 0) + 1;
        displayCampers();
        updateCamperSelect();
    }
});
