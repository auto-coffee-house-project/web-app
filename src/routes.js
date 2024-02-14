import SettingsBotPhrasesView from './views/admin/SettingsBotPhrasesView.vue';
import SettingsStaffView from './views/admin/SettingsStaffView.vue';
import SettingsGiftView from './views/admin/SettingsGiftView.vue';
import SettingsShopOptions from './views/admin/SettingsShopOptions.vue';
import ClientGiftView from './views/client/ClientGiftView.vue'
import ClientShopMenu from './views/client/ClientShopMenu.vue'
import SettingsShopMenuView from './views/admin/SettingsShopMenuView.vue'
import UnsupportedRoleView from "./views/UnsupportedRoleView.vue";
import UserDoesNotExistView from './views/UserDoesNotExistView.vue'

export default [
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
    component: SettingsBotPhrasesView,
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