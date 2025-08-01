import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import AdminHomePage from '../components/AdminHomePage.vue'
import UserHomePage from '../components/UserHomePage.vue'
import ResourceLibraryManagementPage from '../components/ResourceLibraryManagementPage.vue'
import ResourceLibraryPage from '../components/ResourceLibraryPage.vue';
import { auth } from '../firebaseConfig';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
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
  },
  {
    path: '/resource-management', 
    name: 'ResourceManagement',
    component: ResourceLibraryManagementPage,
    meta: { requiresAuth: true, allowedRoles: ['admin'] }
  },
  {
    path: '/resource',
    name: 'ResourceLibrary',
    component: ResourceLibraryPage,
    meta: { requiresAuth: true, allowedRoles: ['elderly'] }
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