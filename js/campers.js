// Variables relacionadas con campers y almacenamiento en localStorage
export const campers = [];
export let camperIdCounter = 1;

// Guardar campers en localStorage
export function saveCampersToLocalStorage() {
    localStorage.setItem('campers', JSON.stringify(campers));
}

// Al cargar la página, intenta cargar los campers desde localStorage
window.addEventListener('load', () => {
    const storedCampers = localStorage.getItem('campers');
    if (storedCampers) {
        campers.push(...JSON.parse(storedCampers));
        camperIdCounter = campers.reduce((max, camper) => Math.max(max, camper.id), 0) + 1;
    }
});
