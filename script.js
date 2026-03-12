const board = document.getElementById("game-board");  // Seleziono la tabella tramite l'id
const point = document.getElementById("count-point");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");  // Bottone reset

const row = 7;  // numero di righe
const cols = 7;  // numero di colonne
const totalCells = row * cols;  // Totale numero di celle
const bombCount = 10;  // numero bombe

let counter = 0;
let flaggedBombs = 0;
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

// Le prime n sono bombe
const bombs = new Set(shuffled.slice(0, bombCount));

// Funzione che conta le bombe adiacenti a una cella (r, c) con indice base-0
function countAdjacentBombs(r, c) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < row && nc >= 0 && nc < cols) {
                const neighborIdx = nr * cols + nc + 1;
                if (bombs.has(neighborIdx)) count++;
            }
        }
    }
    return count;
}

const cellGrid = []; // matrice [r][c] -> elemento button

for (let r = 0; r < row; r++) {
    cellGrid[r] = [];
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

        // Se è bomba, salvo informazione
        if (bombs.has(idx)) {
            btn.dataset.bomb = "true";
            btn.textContent = "";
        } else {
            const adjacent = countAdjacentBombs(r, c);
            btn.textContent = adjacent > 0 ? adjacent : "";
        }

        btn.dataset.row = r;
        btn.dataset.col = c;

        // Comportamento al click: selezione
        btn.addEventListener('click', () => toggleCell(btn));
        btn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            flagCell(btn);
        });
        board.appendChild(btn);
        cellGrid[r][c] = btn;
    }
}

// Apre una cella sicura e aggiorna il contatore
function openCell(el) {
    el.setAttribute('aria-pressed', 'true');
    el.classList.remove("text-transparent", "cursor-pointer");
    el.classList.add("text-black");
    el.style.backgroundColor = "#e5e7eb";
    counter++;
    point.innerHTML = counter;
}

// Flood fill: apre ricorsivamente le celle adiacenti se non hanno bombe vicine
function revealEmpty(r, c) {
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr < 0 || nr >= row || nc < 0 || nc >= cols) continue;
            const neighbor = cellGrid[nr][nc];
            if (neighbor.getAttribute('aria-pressed') === 'true') continue;
            if (neighbor.dataset.bomb === 'true') continue;
            if (neighbor.dataset.flagged === 'true') continue;
            openCell(neighbor);
            if (neighbor.textContent === '') {
                revealEmpty(nr, nc);
            }
        }
    }
}

// Funzione gestione tasto destro (bandierina)
function flagCell(el) {
    if (gameOver) return;
    if (el.getAttribute('aria-pressed') === 'true') return; // già aperta
    if (el.dataset.flagged === 'true') {
        el.dataset.flagged = 'false';
        el.innerHTML = '';
        el.style.backgroundColor = '';
        if (el.dataset.bomb === 'true') flaggedBombs--;
    } else {
        el.dataset.flagged = 'true';
        el.innerHTML = '<i class="fa-solid fa-flag text-orange-500"></i>';
        el.style.backgroundColor = '#fef9c3';
        if (el.dataset.bomb === 'true') {
            flaggedBombs++;
            if (flaggedBombs === bombCount) {
                gameOver = true;
                message.innerHTML = "Hai vinto";
                message.classList.add("text-green-600");
                endGame(false);
            }
        }
    }
}

// Funzione gestione click
function toggleCell(el) {
    if (gameOver) return; // blocco click se ho già perso o vinto
    if (el.dataset.flagged === 'true') return; // cella con bandierina: non aprire
    const isPressed = el.getAttribute('aria-pressed') === 'true';
    if (!isPressed) {
        el.setAttribute('aria-pressed', 'true'); // segno la cella come cliccata
        if (el.dataset.bomb === "true") {
            gameOver = true;
            endGame(true);
        } else {
            openCell(el);
            if (el.textContent === '') {
                revealEmpty(parseInt(el.dataset.row), parseInt(el.dataset.col));
            }
        }
    }
    if (counter === totalCells - bombCount) {
        gameOver = true;
        message.innerHTML = "Hai vinto";
        message.classList.add("text-green-600");
        endGame(false);
    }
}

//Disabilita tutte le celle a fine gioco
function endGame(lost) {
    if (lost) {
        message.innerHTML = "Hai perso";
        message.classList.add("text-red-600");
    }
    const allCells = document.querySelectorAll("#game-board button");
    allCells.forEach(cell => {
        cell.classList.remove("cursor-pointer", "text-transparent");
        cell.classList.add("cursor-not-allowed");
        if (cell.dataset.bomb === "true") {
            cell.classList.add("text-red-600");
            cell.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
        } else {
            cell.classList.add("text-black");
        }
    });
}

resetBtn.addEventListener("click", () => {
    location.reload(); // ricarica la pagina e resetta tutto
});
