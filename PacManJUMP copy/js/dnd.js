let draggedImageId = null;

// Función para permitir el dragover
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    
    // Obtener id de la imagen
    const data = event.dataTransfer.getData("text");
    const draggedImage = document.getElementById(data);

    // Guarda el id en la variable global 
    draggedImageId = draggedImage.id;

    const dropZone = document.querySelector('.drop-zone');

    // Crea una nueva imagen en la zona de drop
    const img = document.createElement('img');
    img.id = 'draggedImage';
    img.src = draggedImage.src;
    
    dropZone.innerHTML = '';  
    dropZone.appendChild(img);

    document.querySelector('.drop-zone p').style.display = 'none';
}


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function showAlert(message) {
    const alertBox = document.getElementById("alerta");
    const alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    alertBox.style.display = "flex";
}

function closeAlert() {
    document.getElementById("alerta").style.display = "none";
}

// funcion para seleccionar el personaje
function selectPlayer() {
    if (!draggedImageId) {
        showAlert("You must select a character!");
        return;
    }

    // guarda el personaje en localStorage
    localStorage.setItem("selectedCharacter", draggedImageId);

    document.getElementById("dragDropArea").style.display = "none";

    window.location.href = "../indexJuego.html"; 
}

// regresar al menu
function goBackToMenu() {
    document.getElementById("dragDropArea").style.display = "none"; 
    document.getElementById("menu").style.display = "flex";
    const canvas = document.getElementById("gameCanvas");
    canvas.style.display = "block"; 

     // Limpiar el campo de texto del nombre del jugador
    document.getElementById("playerName").value = ""; 

     // Restablecer la selección de jugadores registrados (si hay alguno seleccionado)
    const existingNames = document.getElementById("existingNames");
    existingNames.value = "Select an already registered player"; // Reset the existing player selection
}
