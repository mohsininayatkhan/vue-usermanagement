import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login'
import Signup from '../views/auth/Signup'
import Myprofile from '../views/profile/Myprofile'
import Users from '../views/Users.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/my-profile',
    name: 'Myprofile',
    component: Myprofile
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
