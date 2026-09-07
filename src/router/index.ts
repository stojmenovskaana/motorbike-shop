import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },

  {
    path: '/helmets',
    name: 'Helmets',
    component: () => import('../views/HelmetListView.vue'),
  },

  {
    path: '/motorcycles',
    name: 'Motorcycles',
    component: () => import('../views/MotorcyclesView.vue'),
  },

  {
    path: '/apparel',
    name: 'Apparel',
    component: () => import('../views/ApparelView.vue'),
  },

  {
    path: '/brands',
    name: 'Brands',
    component: () => import('../views/BrandsView.vue'),
  },

  {
    path: '/brands/:brand',
    name: 'BrandProducts',
    component: () => import('../views/BrandProductsView.vue'),
  },

  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
  },

  {
  path: '/product/:id',
  name: 'ProductDetails',
  component: () => import('../views/ProductDetailsView.vue'),
  },

  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/FavoritesView.vue'),
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
  path: '/gadgets',
  name: 'Gadgets',
  component: () => import('../views/GadgetsView.vue'),
},
{
  path: '/products',
  name: 'AllProducts',
  component: () => import('../views/AllProductsView.vue'),
},
{
  path: '/support',
  name: 'Support',
  component: () => import('../views/SupportView.vue'),
},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router