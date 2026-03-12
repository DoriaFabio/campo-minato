/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    safelist: [
        // Aggiunte dinamicamente via JS
        'text-transparent', 'text-black', 'text-red-600', 'text-green-600',
        'bg-gray-200',
        'cursor-pointer', 'cursor-not-allowed',
        'text-orange-500',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
