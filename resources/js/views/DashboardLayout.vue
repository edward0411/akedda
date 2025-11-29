<template>
  <div class="flex h-screen bg-gray-100">
    <!-- 1. Barra Lateral (Sidebar) -->
    <div
      :class="[
        'flex-shrink-0 bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden z-20 h-full',
        isDesktop
          ? (isSidebarOpen ? 'w-64 relative' : 'w-20 relative')        // Desktop: layout normal
          : (isSidebarOpen ? 'w-64 fixed' : 'w-0 fixed')               // Mobile: overlay
      ]"
    >
      <div class="p-4 text-xl font-bold border-b border-gray-700 flex items-center justify-between">
        <!-- Título: solo cuando está abierto o en mobile -->
        <span v-if="isSidebarOpen || !isDesktop">Akedda Admin</span>

        <!-- Botón para cerrar (X) cuando el sidebar está abierto -->
        <button
          v-if="isSidebarOpen"
          @click="toggleSidebar"
          class="p-2 text-gray-400 hover:text-white"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Navegación del Sidebar -->
      <nav class="p-2 space-y-1">
        <router-link
          to="/dashboard"
          class="flex items-center p-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition duration-150"
        >
          <!-- Icono: Dashboard (Home) -->
          <svg
            class="w-5 h-5 mr-3 stroke-current text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-10v10a1 1 0 001 1h3m-3 10l-4-4m0 0l-4 4"
            ></path>
          </svg>
          <span v-if="isSidebarOpen || !isDesktop">Dashboard</span>
        </router-link>

        <router-link
          to="/users"
          class="flex items-center p-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition duration-150"
        >
          <!-- Icono: Usuarios (User Group) -->
          <svg
            class="w-5 h-5 mr-3 stroke-current text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20h-5v-2a3 3 0 00-5.356-1.857"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 11V7a4 4 0 10-8 0v4m8 0a4 4 0 11-8 0m8 0h4m-4 0v4m0 0a4 4 0 108 0m-8 0h-4"
            ></path>
          </svg>
          <span v-if="isSidebarOpen || !isDesktop">Usuarios</span>
        </router-link>

        <router-link
          to="/products"
          class="flex items-center p-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition duration-150"
        >
          <!-- Icono: Productos (Box) -->
          <svg
            class="w-5 h-5 mr-3 stroke-current text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0h10"
            ></path>
          </svg>
          <span v-if="isSidebarOpen || !isDesktop">Productos</span>
        </router-link>

        <!-- Más enlaces aquí -->
      </nav>

      <!-- Botón de Logout -->
      <div class="p-4 absolute bottom-0 w-full">
        <button
          @click="logout"
          class="flex items-center w-full p-3 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 transition duration-150"
        >
          <!-- Icono: Cerrar Sesión (Logout) -->
          <svg
            class="w-5 h-5 mr-3 stroke-current text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          <span v-if="isSidebarOpen || !isDesktop">Cerrar Sesión</span>
        </button>
      </div>
    </div>

    <!-- 2. Área Principal (Navbar + Contenido) -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Barra Superior (Navbar) -->
      <header class="flex items-center justify-between p-4 bg-white shadow-md z-10">
        <div class="flex items-center">
          <!-- Botón de alternancia de Sidebar (mobile + desktop) -->
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring transition duration-150"
          >
            <!-- Icono: Menu (Hamburger) -->
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <h1 class="text-xl font-semibold ml-4 hidden sm:block">Dashboard</h1>
        </div>

        <!-- Perfil de Usuario -->
        <div class="flex items-center space-x-4">
          <span class="text-gray-700 hidden sm:block">
            ¡Hola, {{ authStore.userName }}!
          </span>
          <div
            class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
          >
            {{ authStore.userName.charAt(0) }}
          </div>
        </div>
      </header>

      <!-- 3. Contenido Principal -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto p-6">
        <router-view></router-view>
      </main>

      <footer
        class="bg-white border-t border-gray-200 text-xs text-gray-500 px-4 py-2 flex items-center justify-between"
      >
        <span>© {{ currentYear }} Akedda Software Development</span>
        <span class="hidden sm:inline">Panel Admin · v1.0.0</span>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '../stores/AuthStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const currentYear = new Date().getFullYear();

const isSidebarOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 768); // md breakpoint

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const logout = async () => {
  await authStore.logout();
  // Redirección manejada dentro de logout()
};

const handleResize = () => {
  const newIsDesktop = window.innerWidth >= 768;

  // Si pasamos de mobile → desktop, dejamos el sidebar abierto por defecto
  if (!isDesktop.value && newIsDesktop) {
    isSidebarOpen.value = true;
  }

  isDesktop.value = newIsDesktop;
};

onMounted(() => {
  isSidebarOpen.value = isDesktop.value; // Desktop: abierto; Mobile: cerrado
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Comportamiento especial en móvil (overlay) */
@media (max-width: 767px) {
  .flex.h-screen {
    position: relative;
  }

  .flex-shrink-0.fixed {
    /* overlay oscuro cuando el sidebar está abierto */
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  }

  .w-0 {
    transform: translateX(-100%);
    box-shadow: none;
  }

  /* En móvil no usamos sidebar mini */
  .w-20 {
    width: 0 !important;
  }
}

/* RouterLink activo */
.router-link-exact-active {
  background-color: #1f2937;
  color: #3490dc;
}

.router-link-exact-active svg {
  color: #3490dc !important;
  stroke: #3490dc !important;
}
</style>
