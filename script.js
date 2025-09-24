const board = document.getElementById("game-board");  // Seleziono la tabella tramite l'id
const point = document.getElementById("count-point");
const row = 7;  // numero di righe
const cols = 7;  // numero di colonne
const totalCells = row * cols;  // Totale numero di celle
const bombCount = 16;  // numero bombe

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
            'bg-white', 'text-gray-800',
            'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-400', 'focus:ring-offset-2',
            'transition-colors', 'duration-150', "text-white"
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

let counter = 0;
const message = document.getElementById("message");
function toggleCell(el) {
    const isPressed = el.getAttribute('aria-pressed') === 'true';
    if (!isPressed) {
        el.setAttribute('aria-pressed', 'true'); // segno la cella come cliccata
        if (el.dataset.bomb === "true") {
            // gestione bomba
            el.classList.add("bg-red-600", "text-white");
            el.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
            el.removeEventListener('click', () => toggleCell(el));
            message.innerHTML = "Hai perso";
        } else {
            el.classList.add("bg-gray-400", "text-white");
            counter = counter + 1;
            point.innerHTML = counter;
        }
    }
    if(counter === totalCells - bombCount) {
        message.innerHTML = "Hai vinto";
    }
}