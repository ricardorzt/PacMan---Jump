const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let pacManX = 50;
let pacManY = canvas.height / 2;
let pacManMouth = 0.2;
let mouthDirection = 1;
const dots = [];

// Generar los puntos en la línea de movimiento de Pac-Man
for (let i = 50; i < canvas.width - 50; i += 50) {
    dots.push({ x: i, y: pacManY });
}

// Función para dibujar a Pac-Man
function drawPacMan(x, y) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(x, y, 50, pacManMouth * Math.PI, (2 - pacManMouth) * Math.PI);
    ctx.lineTo(x, y);
    ctx.fill();
}

// Función para dibujar los puntos que Pac-Man come
function drawDots() {
    ctx.fillStyle = "white";
    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

// Función para actualizar la escena
function updateScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    drawPacMan(pacManX, pacManY);

    // Animación de la boca de Pac-Man
    pacManMouth += 0.05 * mouthDirection;
    if (pacManMouth >= 0.4 || pacManMouth <= 0.1) {
        mouthDirection *= -1;
    }

    // Movimiento de Pac-Man de izquierda a derecha
    pacManX += 2;
    if (pacManX > canvas.width + 50) {
        pacManX = -50;
    }

    requestAnimationFrame(updateScene);
}
updateScene();

function showAlert(message) {
    const alertBox = document.getElementById("alerta");
    const alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    alertBox.style.display = "flex";
}

function closeAlert() {
    document.getElementById("alerta").style.display = "none";
}

// Función para validar el nombre del jugador
function validatePlayerName(name) {
    const regex = /^[a-zA-Z0-9_]{4,8}$/; // Permite solo letras, números y guiones bajos, con 4-8 caracteres
    return regex.test(name);
}

function formatDate(date) {
    const day = ("0" + date.getDate()).slice(-2); // Asegurar que el día tenga dos dígitos
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Asegurar que el mes tenga dos dígitos
    const year = date.getFullYear(); // Obtener el año con 4 dígitos
    return `${day}-${month}-${year}`; // Retornar la fecha en formato dd-mm-aaaa
}

function startGame() {
    let playerName = document.getElementById("playerName").value.trim();
    
    // Si el nombre del jugador está vacío, intentar obtenerlo de los nombres existentes
    if (playerName.trim() === "") {
        const selectedName = document.getElementById("existingNames").value;
        if (selectedName === "") {
            showAlert("¡Please enter a name!");
            return;
        }
        playerName = selectedName;
    }

    // Validar el nombre si no muestra una alerta
    if (!validatePlayerName(playerName)) {
        showAlert("The nickname must be between 4 and 8 characters long and can only contain letters, digits and _");
        return;
    }

    let players = JSON.parse(localStorage.getItem("players")) || {};

    // Si el jugador no está registrado, agregarlo
    if (!players[playerName]) {
        const currentDate = new Date();
        players[playerName] = {
            score: 0, // Inicializar la puntuación en 0
            date: formatDate(currentDate) // Guardar la fecha
        };
    }

    // Guardar el nombre del jugador actual en 'currentPlayer'
    localStorage.setItem("currentPlayer", playerName);

    // Guardar la lista de jugadores en el localStorage
    localStorage.setItem("players", JSON.stringify(players));

    document.getElementById("menu").style.display = "none";
    canvas.style.display = "none";
    document.getElementById("dragDropArea").style.display = "flex";
}


// Función para salir del juego
function exitGame() {
    window.close();
}

// Cargar los jugadores registrados al iniciar la página
window.onload = function() {
    const players = JSON.parse(localStorage.getItem("players")) || {};
    const existingNames = document.getElementById("existingNames");

    existingNames.innerHTML = '<option value="">Select an existing name</option>';
    
    if (Object.keys(players).length > 0) {
        existingNames.style.display = "inline-block";
        Object.keys(players).forEach(name => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            existingNames.appendChild(option);
        });
    } else {
        existingNames.style.display = "none";
    }
};
