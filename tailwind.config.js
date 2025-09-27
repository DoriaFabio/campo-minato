/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    safelist: [
        // Dimensioni bottoni e layout
        'w-12', 'h-12', 'sm:w-14', 'sm:h-14',
        'flex', 'items-center', 'justify-center',
        'border', 'border-gray-400', 'rounded',
        'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-400', 'focus:ring-offset-2',
        'transition-colors', 'duration-150',

        // Stati dinamici
        'text-transparent',     // numeri nascosti
        'bg-gray-400', 'bg-red-600', 'bg-white', 'bg-blue-400', 'bg-blue-500',
        'text-white', 'text-red-600', 'text-green-600', 'text-gray-800',
        'cursor-pointer', 'cursor-not-allowed',
        'rounded-2xl', 'shadow-md', 'hover:shadow-2xl', 'hover:scale-105',
        'hover:bg-blue-500', 'transition', 'duration-300', 'font-semibold'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
