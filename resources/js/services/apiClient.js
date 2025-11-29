import axios from 'axios';

// 1. Crear una instancia de Axios
const apiClient = axios.create({
    // Asegúrate de que esta URL base coincida con tu configuración de Laragon
    // Debe apuntar a la base de tu API, no al puerto de Vite (5173).
    baseURL: 'http://akedda.test/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// 2. Interceptor: Añadir el Token JWT a cada solicitud
apiClient.interceptors.request.use(config => {
    // Obtener el token del almacenamiento local (LocalStorage)
    const token = localStorage.getItem('jwt_token');

    if (token) {
        // Establecer el encabezado de autorización en formato Bearer
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;