import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import AdminHomePage from '../components/AdminHomePage.vue'
import UserHomePage from '../components/UserHomePage.vue'
import { auth } from '../firebaseConfig';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/user-home',
    name: 'UserHome',
    component: UserHomePage,
    meta: { requiresAuth: true, allowedRoles: ['elderly'] }
  },
  {
    path: '/admin-home',
    name: 'AdminHome',
    component: AdminHomePage,
    meta: { requiresAuth: true, allowedRoles: ['admin'] }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const allowedRoles = to.meta.allowedRoles;
  const userRole = localStorage.getItem('userRole');
  
  // Check wwheter to verify
  if (requiresAuth) {
    const user = auth.currentUser;
    if (!user) {
      return next('/');
    }
  
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return next(userRole === 'admin' ? '/admin-home' : '/user-home');
    }
  }
  
  next();
});

export default router