import PhrasesView from './views/admin/PhrasesView.vue'
import SettingsStaffView from './views/admin/EmployeesView.vue'
import SettingsGiftView from './views/admin/SettingsGiftView.vue'
import SettingsShopOptions from './views/admin/SettingsShopOptions.vue'
import ClientGiftView from './views/client/ClientGiftView.vue'
import ClientShopMenu from './views/client/ClientShopMenu.vue'
import SettingsShopMenuView from './views/admin/SettingsShopMenuView.vue'
import UnsupportedRoleView from './views/UnsupportedRoleView.vue'
import UserDoesNotExistView from './views/UserDoesNotExistView.vue'
import ProductView from './views/admin/ProductView.vue'
import ProductCreateFormView from './views/admin/ProductCreateFormView.vue'
import MailingView from './views/admin/MailingView.vue'
import ClientListView from './views/admin/ClientListView.vue'
import ClientDetailView from './views/admin/ClientDetailView.vue'
import BotNotIdentifiedView from './views/BotNotIdentifiedView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/admin',
    children: [
      {
        path: '/clients/:id',
        name: 'admin-client',
        component: ClientDetailView,
      },
      {
        path: '/clients',
        name: 'admin-clients',
        component: ClientListView,
      },
      {
        path: '/mailing',
        name: 'admin-mailing',
        component: MailingView,
      },
      {
        path: '/products/create',
        name: 'admin-product-create',
        component: ProductCreateFormView,
      },
      {
        path: '/products/:id',
        name: 'admin-product',
        component: ProductView,
      },
      {
        path: '/menu',
        name: 'admin-shop-menu',
        component: SettingsShopMenuView,
      },
      {
        path: '/staff',
        name: 'staff',
        component: SettingsStaffView,
      },
      {
        path: '/phrases',
        name: 'phrases',
        component: PhrasesView,
      },
      {
        path: '/gift',
        name: 'gift',
        component: SettingsGiftView,
      },
      {
        path: '/options',
        name: 'options',
        component: SettingsShopOptions,
      },
    ],
  },
  {
    path: '/client',
    children: [
      {
        path: '/gift',
        name: 'client-gift',
        component: ClientGiftView,
      },
      {
        path: '/menu',
        name: 'client-shop-menu',
        component: ClientShopMenu,
      },
      {
        path: '/profile',
        name: 'client-profile',
        component: () => import('./views/client/ClientProfileView.vue'),
      },
    ],
  },
  {
    path: '/unsupported',
    name: 'unsupported',
    component: UnsupportedRoleView,
  },
  {
    path: '/no-user',
    name: 'user-does-not-exist',
    component: UserDoesNotExistView,
  },
  {
    path: '/bot-not-identified',
    name: 'bot-not-identified',
    component: BotNotIdentifiedView,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
