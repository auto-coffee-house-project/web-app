import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/admin/clients/:id',
    name: 'admin-client',
    component: () => import('./views/admin/ClientDetailView.vue'),
  },
  {
    path: '/admin/clients',
    name: 'admin-clients',
    component: () => import('./views/admin/ClientListView.vue'),
  },
  {
    path: '/admin/mailing',
    name: 'admin-mailing',
    component: () => import('./views/admin/MailingView.vue'),
  },
  {
    path: '/admin/products/create',
    name: 'admin-product-create',
    component: () => import('./views/admin/ProductCreateFormView.vue'),
  },
  {
    path: '/admin/products/:id',
    name: 'admin-product',
    component: () => import('./views/admin/ProductView.vue'),
  },
  {
    path: '/admin/menu',
    name: 'admin-shop-menu',
    component: () => import('./views/admin/SettingsShopMenuView.vue'),
  },
  {
    path: '/admin/staff',
    name: 'staff',
    component: () => import('./views/admin/EmployeesView.vue'),
  },
  {
    path: '/admin/phrases',
    name: 'phrases',
    component: () => import('./views/admin/PhrasesView.vue'),
  },
  {
    path: '/admin/gift',
    name: 'gift',
    component: () => import('./views/admin/SettingsGiftView.vue'),
  },
  {
    path: '/admin/options',
    name: 'options',
    component: () => import('./views/admin/ShopOptionsView.vue'),
  },
  {
    path: '/client/gift',
    name: 'client-gift',
    component: () => import('./views/client/ClientGiftView.vue'),
  },
  {
    path: '/client/menu',
    name: 'client-shop-menu',
    component: () => import('./views/client/ClientShopMenu.vue'),
  },
  {
    path: '/unsupported',
    name: 'unsupported',
    component: () => import('./views/UnsupportedRoleView.vue'),
  },
  {
    path: '/no-user',
    name: 'user-does-not-exist',
    component: () => import('./views/UserDoesNotExistView.vue'),
  },
  {
    path: '/bot-not-identified',
    name: 'bot-not-identified',
    component: () => import('./views/BotNotIdentifiedView.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
