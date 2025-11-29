import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/AuthStore';

// Vistas que debes tener creadas:
import LoginView from '../views/LoginView.vue';
import DashboardLayout from '../views/DashboardLayout.vue'; // <-- Importamos el nuevo Layout
import DashboardView from '../views/DashboardView.vue';
// Importamos una vista de placeholder para las rutas anidadas
import PlaceholderView from '../views/PlaceholderView.vue'; 

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/login', 
            name: 'Login', 
            component: LoginView 
        },
        // --- RUTA DEL LAYOUT PRINCIPAL Y RUTAS ANIDADAS ---
        {
            path: '/', // La ruta principal usará el layout
            component: DashboardLayout,
            meta: { requiresAuth: true }, // Todas las rutas hijas estarán protegidas por este meta
            children: [
                {
                    path: 'dashboard', // Ruta completa: /dashboard
                    name: 'Dashboard',
                    component: DashboardView,
                },
                {
                    path: 'users', // Ruta completa: /users
                    name: 'Users',
                    component: PlaceholderView, // Usamos un placeholder
                },
                {
                    path: 'products', // Ruta completa: /products
                    name: 'Products',
                    component: PlaceholderView, // Usamos un placeholder
                },
                {
                    path: '', // Redirige / a /dashboard
                    redirect: '/dashboard'
                }
            ]
        }
        // Eliminamos la ruta /dashboard anterior, ahora está anidada
    ]
});

// --- GUARD DE RUTA (Lógica de Protección) ---
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    // Si la ruta requiere autenticación Y el usuario NO está logueado
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        // Redirige al login
        next('/login');
    } 
    // Si el usuario está logueado e intenta ir a /login
    else if (authStore.isLoggedIn && to.name === 'Login') {
        // Redirige al dashboard (o la ruta raíz que es /dashboard)
        next('/');
    }
    // En cualquier otro caso, permite el acceso a la ruta
    else {
        next();
    }
});

export default router;