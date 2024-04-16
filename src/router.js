import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/admin',
    children: [
      {
        path: '/clients/:id',
        name: 'admin-client',
        component: () => import('./views/admin/ClientDetailView.vue'),
      },
      {
        path: '/clients',
        name: 'admin-clients',
        component: () => import('./views/admin/ClientListView.vue'),
      },
      {
        path: '/mailing',
        name: 'admin-mailing',
        component: () => import('./views/admin/MailingView.vue'),
      },
      {
        path: '/products/create',
        name: 'admin-product-create',
        component: () => import('./views/admin/ProductCreateFormView.vue'),
      },
      {
        path: '/products/:id',
        name: 'admin-product',
        component: () => import('./views/admin/ProductView.vue'),
      },
      {
        path: '/menu',
        name: 'admin-shop-menu',
        component: () => import('./views/admin/SettingsShopMenuView.vue'),
      },
      {
        path: '/staff',
        name: 'staff',
        component: () => import('./views/admin/EmployeesView.vue'),
      },
      {
        path: '/phrases',
        name: 'phrases',
        component: () => import('./views/admin/PhrasesView.vue'),
      },
      {
        path: '/gift',
        name: 'gift',
        component: () => import('./views/admin/SettingsGiftView.vue'),
      },
      {
        path: '/options',
        name: 'options',
        component: () => import('./views/admin/SettingsShopOptions.vue'),
      },
    ],
  },
  {
    path: '/client',
    children: [
      {
        path: '/gift',
        name: 'client-gift',
        component: () => import('./views/client/ClientGiftView.vue'),
      },
      {
        path: '/menu',
        name: 'client-shop-menu',
        component: () => import('./views/client/ClientShopMenu.vue'),
      },
    ],
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
