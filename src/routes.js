import PhrasesView from './views/admin/PhrasesView.vue';
import SettingsStaffView from './views/admin/EmployeesView.vue';
import SettingsGiftView from './views/admin/SettingsGiftView.vue';
import SettingsShopOptions from './views/admin/SettingsShopOptions.vue';
import ClientGiftView from './views/client/ClientGiftView.vue'
import ClientShopMenu from './views/client/ClientShopMenu.vue'
import SettingsShopMenuView from './views/admin/SettingsShopMenuView.vue'
import UnsupportedRoleView from "./views/UnsupportedRoleView.vue";
import UserDoesNotExistView from './views/UserDoesNotExistView.vue'
import ProductView from './views/admin/ProductView.vue'
import ProductCreateFormView from './views/admin/ProductCreateFormView.vue'
import MailingView from './views/admin/MailingView.vue'

export default [
  {
    path: '/admin/mailing',
    name: 'admin-mailing',
    component: MailingView,
  },
  {
    path: '/admin/products/create',
    name: 'admin-product-create',
    component: ProductCreateFormView,
  },
  {
    path: '/admin/products/:id',
    name: 'admin-product',
    component: ProductView,
  },
  {
    path: '/admin/menu',
    name: 'admin-shop-menu',
    component: SettingsShopMenuView,
  },
  {
    path: '/admin/staff',
    name: 'staff',
    component: SettingsStaffView,
  },
  {
    path: '/admin/phrases',
    name: 'phrases',
    component: PhrasesView,
  },
  {
    path: '/admin/gift',
    name: 'gift',
    component: SettingsGiftView,
  },
  {
    path: '/admin/options',
    name: 'options',
    component: SettingsShopOptions,
  },
  {
    path: '/client/gift',
    name: 'client-gift',
    component: ClientGiftView,
  },
  {
    path: '/client/menu',
    name: 'client-shop-menu',
    component: ClientShopMenu,
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
  }
]