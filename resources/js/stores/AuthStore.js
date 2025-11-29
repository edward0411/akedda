import { defineStore } from 'pinia';
import axios from 'axios';

// Definimos la URL base de tu API (ajusta si es necesario)
// Si estás usando Vite, asegúrate de que esto apunta a tu servidor Laravel/API
const API_URL = 'http://akedda.test/api'; 

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // Inicializa el token con null o el valor de localStorage si existe
        token: localStorage.getItem('auth_token') || null, 
        user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
        loading: false,
        error: null,
    }),

    getters: {
        isLoggedIn: (state) => !!state.token,
        userName: (state) => state.user ? state.user.name : 'Invitado',
    },

    actions: {
        
        // --- FUNCIÓN CRÍTICA DE LOGIN ---
        async login(email, password) {
            this.loading = true;
            this.error = null;

            try {
                // 1. La URL debe coincidir con la de tu router de Laravel: /api/login
                const response = await axios.post(`${API_URL}/login`, { 
                    email: email, 
                    password: password 
                });

                // 2. Extraer el token y los datos del usuario de la respuesta
                const { access_token, user } = response.data;

                // 3. Guardar estado
                this.token = access_token;
                this.user = user;
                localStorage.setItem('auth_token', access_token);
                localStorage.setItem('auth_user', JSON.stringify(user));

                // 4. Configurar el header de Axios para futuras peticiones
                axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

            } catch (err) {
                // 5. Manejo de errores 401 (Credenciales inválidas)
                if (err.response && err.response.status === 401) {
                    this.error = 'Credenciales inválidas. Por favor, revisa tu correo y contraseña.';
                } else if (err.response) {
                    // Otros errores del backend (e.g., 422, 500)
                    this.error = `Error de conexión: ${err.response.data.error || err.response.statusText}`;
                } else {
                    // Errores de red
                    this.error = 'No se pudo conectar al servidor API.';
                }
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            this.loading = true;
            try {
                // Llama al endpoint de logout para invalidar el token en el backend
                if (this.token) {
                    await axios.post(`${API_URL}/logout`);
                }
            } catch (error) {
                // Manejar errores de logout si es necesario
            } finally {
                // Limpiar estado y almacenamiento local
                this.token = null;
                this.user = null;
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
                delete axios.defaults.headers.common['Authorization'];
                this.loading = false;
                
                // Redirigir al usuario al login después de cerrar sesión
                // Nota: Necesitarás acceso al router si lo haces en un store. 
                // Si tienes un router hook, úsalo allí, o inyéctalo.
            }
        }
        
        // ... otras acciones como 'register' o 'fetchUser'
    }
});