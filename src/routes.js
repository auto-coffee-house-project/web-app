import SettingsBotPhrasesView from './views/SettingsBotPhrasesView.vue';
import SettingsStaffView from './views/SettingsStaffView.vue';
import SettingsGiftView from './views/SettingsGiftView.vue';
import SettingsShopOptions from './views/SettingsShopOptions.vue';
import ClientGiftView from './views/client/ClientGiftView.vue'
import ClientShopMenu from './views/client/ClientShopMenu.vue'

export default [
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
    path: '/client',
    name: 'client-shop-menu',
    component: ClientShopMenu,
  },
]