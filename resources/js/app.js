import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router'; 
import App from './App.vue'; // <-- Necesitamos un componente App.vue para contener el router-view

const pinia = createPinia();
const app = createApp(App); // Crea la aplicación usando el componente App.vue

// Instalar Pinia y Router
app.use(pinia);
app.use(router);

// Montar la aplicación
app.mount("#app");

// Opcional: Ejecutar la función de carga de usuario al iniciar (para refrescar el token)
// import { useAuthStore } from './stores/AuthStore';
// const authStore = useAuthStore(pinia);
// authStore.fetchUser();