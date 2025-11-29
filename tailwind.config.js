/** @type {import('tailwindcss').Config} */
export default {
    // La propiedad 'content' es crucial. Define las rutas de los archivos donde
    // Tailwind debe buscar las clases que estás usando (Blade, JS y Vue).
    content: [
        './resources/**/*.blade.php', 
        './resources/**/*.js',        
        './resources/**/*.vue',       
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}