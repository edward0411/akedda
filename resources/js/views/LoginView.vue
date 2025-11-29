<template>
  <!-- Contenedor principal que abarca toda la pantalla -->
  <div class="full-screen-container">
    
    <!-- Sección de la Izquierda: Imagen de Fondo -->
    <div class="image-section">
      <!-- El fondo se aplica vía CSS -->
    </div>

    <!-- Sección de la Derecha: Formulario de Login -->
    <div class="form-section">
      <div class="login-box">
        <h2>Akedda</h2>
        
        <!-- Muestra el mensaje de error si existe -->
        <div v-if="authStore.error" class="error-message">{{ authStore.error }}</div>

        <form @submit.prevent="handleLogin">
          <!-- Campo de Correo Electrónico -->
          <input type="email" v-model="email" placeholder="Correo Electrónico" required>
          
          <!-- Campo de Contraseña con control de visibilidad -->
          <div class="password-container">
            <input 
              :type="passwordFieldType" 
              v-model="password" 
              placeholder="Contraseña" 
              required
            >
            <!-- Botón de alternancia de visibilidad (Icono de Ojo) -->
            <button 
              type="button" 
              @click="togglePasswordVisibility" 
              class="password-toggle"
              aria-label="Alternar visibilidad de contraseña"
            >
              <!-- Ojo TACHADO (Contraseña OCULTA) -->
              <svg 
                v-if="!passwordVisible" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="icon-eye-slash"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.02 18.02 0 0 1 3.2-3.8l.68.68"/>
                <path d="M22 12c-3.18 4.38-6.9 6-10 6-1.57 0-3.08-.34-4.43-1.01l1.41-1.41"/>
                <path d="M12 12a3 3 0 1 1-3-3l-2-2"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>

              <!-- Ojo ABIERTO (Contraseña VISIBLE) -->
              <svg 
                v-else 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="icon-eye"
              >
                <path d="M12 4.5c-4.42 0-8.2 2.8-10 7.5 1.8 4.7 5.58 7.5 10 7.5s8.2-2.8 10-7.5c-1.8-4.7-5.58-7.5-10-7.5z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
          
          <button type="submit" :disabled="authStore.loading">
            {{ authStore.loading ? 'Cargando...' : 'Entrar' }}
          </button>
        </form>
        
        <p class="register-link">¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/AuthStore';
import { useRouter } from 'vue-router'; 

const router = useRouter();
const authStore = useAuthStore(); 

// Inicialización con las credenciales de prueba
const email = ref('alex.prueba@akedda.com'); 
const password = ref('password123'); 

// Lógica de visibilidad de contraseña
const passwordVisible = ref(false);

// Propiedad computada para determinar el 'type' del input
const passwordFieldType = computed(() => 
  passwordVisible.value ? 'text' : 'password'
);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogin = async () => {
    // La lógica de login llama a la acción de Pinia
    await authStore.login(email.value, password.value);

    // Si no hay error después de intentar el login, redirigir
    if (!authStore.error) {
        router.push('/dashboard');
    }
};
</script>

<style scoped>
/* -------------------------------------- */
/* 1. Estructura Principal (Pantalla Completa) */
/* -------------------------------------- */

.full-screen-container {
    display: flex; /* Por defecto, usa flex (columnas) */
    height: 100vh; 
    margin: 0;
    padding: 0;
}

/* -------------------------------------- */
/* 2. Sección de la Imagen (Izquierda - Desktop First) */
/* -------------------------------------- */
.image-section {
    width: 60%; /* Por defecto, ocupa 60% en pantallas grandes */
    /* Nota: Asumo que la imagen 'login-background.jpg' existe en la carpeta 'public' o es accesible por esta ruta. */
    background-image: url('/login-background.png'); 
    background-size: cover; 
    background-position: center center;
    filter: brightness(0.7);
}

/* -------------------------------------- */
/* 3. Sección del Formulario (Derecha - Desktop First) */
/* -------------------------------------- */
.form-section {
    width: 40%; /* Por defecto, ocupa 40% en pantallas grandes */
    display: flex;
    justify-content: center; 
    align-items: center; 
    background-color: #f7f9fc; 
    z-index: 10;
    position: relative; 
}

.login-box {
    width: 80%;
    max-width: 400px;
    padding: 30px; 
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* ================================================= */
/* 5. RESPONSIVE DESIGN (Media Queries) */
/* ================================================= */

/* Transición a diseño móvil/tablet (Max-width 768px) */
@media (max-width: 768px) {
    .full-screen-container {
        flex-direction: column;
        position: relative;
    }

    .image-section {
        width: 100%; 
        height: 100%; 
        position: absolute; 
        top: 0;
        left: 0;
        filter: brightness(0.6); 
    }

    .form-section {
        width: 100%; 
        height: 100%; 
        position: absolute; 
        top: 0;
        left: 0;
        background-color: rgba(247, 249, 252, 0); 
        z-index: 20; 
    }

    .login-box {
        width: 90%; 
        padding: 30px;
        background: rgba(255, 255, 255, 0.95);
    }
}


/* -------------------------------------- */
/* 4. Estilos del Formulario y Contraseña */
/* -------------------------------------- */
h2 {
    color: #34495e;
    margin-bottom: 20px; 
    font-size: 1.6rem; 
    font-weight: 600;
}

/* Contenedor para el campo de contraseña y el icono de ojo */
.password-container {
  position: relative;
  margin-bottom: 15px; 
}

/* El input dentro del contenedor de contraseña */
.password-container input {
    margin-bottom: 0; 
    padding-right: 40px; /* Espacio para el icono del ojo */
}

/* Botón de alternancia de visibilidad */
.password-toggle {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    color: #7f8c8d; /* Color del icono */
    transition: color 0.2s;
}

.password-toggle:hover {
    color: #34495e;
}

.icon-eye, .icon-eye-slash {
    width: 100%;
    height: 100%;
}


/* Estilo global para Input */
input {
    display: block;
    width: 100%;
    padding: 10px; 
    margin-bottom: 15px; 
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    font-size: 0.95rem; 
    box-sizing: border-box; 
}

/* El input dentro de .password-container sobrescribe el margin-bottom */
.password-container input {
  margin-bottom: 0; 
}


button {
    width: 100%;
    padding: 10px; 
    background-color: #007bff; /* Color primario */
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem; 
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: 500;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}

button:disabled {
    background-color: #a0c4ff;
    cursor: not-allowed;
}

.error-message {
    color: #e74c3c;
    background-color: #fceae9;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 15px; 
    border: 1px solid #e74c3c;
}

.register-link {
    margin-top: 15px; 
    color: #7f8c8d;
    font-size: 0.9rem;
}

.register-link a {
    color: #007bff;
    text-decoration: none;
    font-weight: 600;
}
</style>