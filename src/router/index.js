import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import AdminHomePage from '../components/AdminHomePage.vue'
import UserHomePage from '../components/UserHomePage.vue'

const routes = [
  {
    path: '/user-home',
    name: 'UserHome',
    component: UserHomePage
  },
  {
    path: '/admin-home',
    name: 'AdminHome',
    component: AdminHomePage
  },
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router