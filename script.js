const board = document.getElementById("game-board");  // Seleziono la tabella tramite l'id
const point = document.getElementById("count-point");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");  // Bottone reset

const row = 7;  // numero di righe
const cols = 7;  // numero di colonne
const totalCells = row * cols;  // Totale numero di celle
const bombCount = 16;  // numero bombe

let counter = 0;
let gameOver = false;

// Creazione lista indici
const indices = [];
for (let i = 1; i <= totalCells; i++) {
    indices.push(i);
}

// Funzione Mescolamento array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
    }
    return array;
}
// Richiamo della funzione
const shuffled = shuffle(indices);

// Le prime 16 sono bombe
const bombs = new Set(indices.slice(0, bombCount));

for (let r = 0; r < row; r++) {
    for (let c = 0; c < cols; c++) {
        const idx = r * cols + c + 1;
        const btn = document.createElement("button");
        btn.type = 'button';
        btn.className = [
            'w-12', 'h-12', 'sm:w-14', 'sm:h-14',
            'flex', 'items-center', 'justify-center',
            'border', 'border-gray-400', 'rounded',
            'text-gray-800',
            'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-400', 'focus:ring-offset-2',
            'transition-colors', 'duration-150', "text-transparent", "cursor-pointer"
        ].join(' ');
        btn.textContent = idx;

        // Se è bomba, salvo informazione
        if (bombs.has(idx)) {
            btn.dataset.bomb = "true";
        }

        // Comportamento al click: selezione
        btn.addEventListener('click', () => toggleCell(btn));
        board.appendChild(btn);
    }
}

// Funzione gestione click
function toggleCell(el) {
    if (gameOver) return; // blocco click se ho già perso o vinto
    const isPressed = el.getAttribute('aria-pressed') === 'true';
    if (!isPressed) {
        el.setAttribute('aria-pressed', 'true'); // segno la cella come cliccata
        if (el.dataset.bomb === "true") {
            gameOver = true;
            endGame();
        } else {
            el.classList.remove("text-transparent");
            el.classList.add("text-black");
            counter = counter + 1;
            point.innerHTML = counter;
        }
    }
    if (counter === totalCells - bombCount) {
        message.innerHTML = "Hai vinto";
        message.classList.add("text-green-600");
        gameOver = true;
        endGame();
    }
}

//Disabilita tutte le celle a fine gioco
function endGame() {
    const allCells = document.querySelectorAll("#game-board button");
    allCells.forEach(cell => {
        cell.classList.remove("cursor-pointer", "text-transparent");
        cell.classList.add("cursor-not-allowed");  // cursore disabilitato
        if (cell.dataset.bomb === "true") {
            cell.classList.remove("text-transparent");
            cell.classList.add("text-red-600");
            cell.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
            message.innerHTML = "Hai perso";
            message.classList.add("text-red-600");
        } else {
            cell.classList.add("text-black");
        }
    });
}

resetBtn.addEventListener("click", () => {
    location.reload(); // ricarica la pagina e resetta tutto
});
