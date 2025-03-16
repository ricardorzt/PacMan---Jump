function showInstructions() {
    // Ocultar el menú y el canvas
    document.getElementById("menu").style.display = "none";
    canvas.style.display = "none"; document.getElementById("instructionsContainer").style.display = "block";
  
}

function closeInstructions() {
    document.getElementById("instructionsContainer").style.display = "none";

    

    document.getElementById("menu").style.display = "flex"; // Mostrar el menú
    const canvas = document.getElementById("gameCanvas");
    canvas.style.display = "block";
}
