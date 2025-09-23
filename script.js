const board = document.getElementById("game-board");
const row = 7;
const cols = 7;

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
        // Comportamento al click: selezione
        btn.addEventListener('click', () => toggleCell(btn));
        board.appendChild(btn);
    }
}

function toggleCell(el) {
    const isPressed = el.getAttribute('aria-pressed') === 'true';
    if (!isPressed) {
        el.classList.add('bg-gray-400', 'text-white');
        el.setAttribute('aria-pressed', 'true');
    }
}