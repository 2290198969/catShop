import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const Home = () => import('../views/HomeView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category',
      component: () => import('../views/CategoryView.vue'),
    },
    {
      path: '/cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/user',
      component: () => import('../views/UserView.vue'),
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/coupons',
      component: () => import('../views/CouponsView.vue'),
    },
    {
      path: '/orders',
      component: () => import('../views/OrdersView.vue'),
    },
    {
      path: '/favorites',
      component: () => import('../views/FavoritesView.vue'),
    },
    {
      path: '/settings',
      component: () => import('../views/SettingView.vue'),
    },
  ],
})

export default router
