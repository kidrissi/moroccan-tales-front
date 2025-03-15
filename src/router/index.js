import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';

const routes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    // If the route requires authentication and no token is found, redirect to login
    next("/login");
  } else {
    next(); // Allow navigation
  }
});

export default router;
