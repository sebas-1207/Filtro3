// Funciones relacionadas con la interfaz de usuario y visualización de datos
import { campers, saveCampersToLocalStorage } from './campers.js';

export function displayCampers(campersToDisplay = campers) {
    const camperList = document.getElementById('camperList');
    camperList.innerHTML = '';

    campersToDisplay.forEach((camper) => {
        const camperCard = document.createElement('div');
        camperCard.classList.add('camper-card');
        camperCard.setAttribute('data-id', camper.id);
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

export function updateCamperSelect() {
    const camperSelect = document.getElementById('camper');
    camperSelect.innerHTML = '';
    campers.forEach((camper) => {
        const option = document.createElement('option');
        option.value = camper.id;
        option.text = camper.nombre;
        camperSelect.appendChild(option);
    });
}

export function updateCamperCampCoins(camper) {
    const camperItem = document.querySelector(`#camperList .camper-card[data-id="${camper.id}"]`);
    if (camperItem) {
        const campcoinsInfo = camperItem.querySelector('p strong:last-child');
        campcoinsInfo.innerText = `Campcoins Acumulados: ${camper.campcoins}`;
    }
}

export function displayConceptApplied(concept) {
    const conceptosAplicados = document.getElementById('conceptosAplicados');
    const conceptAppliedItem = document.createElement('li');
    conceptAppliedItem.innerHTML = `<strong>Concepto:</strong> ${concept.conceptDescription}, <strong>Valor:</strong> ${concept.conceptValue}`;
    conceptosAplicados.appendChild(conceptAppliedItem);
    const conceptSelect = document.getElementById('concepto');
    const camperSelect = document.getElementById('camper');
    conceptSelect.value = ''; // Reset concept selection
    camperSelect.value = ''; // Reset camper selection

    saveCampersToLocalStorage(); // Guarda campers en localStorage
}
