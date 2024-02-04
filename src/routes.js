import SettingsBotPhrasesView from "./views/SettingsBotPhrasesView.vue";
import SettingsStaffView from "./views/SettingsStaffView.vue";
import SettingsGiftView from "./views/SettingsGiftView.vue";
import SettingsShopOptions from "./views/SettingsShopOptions.vue";

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
]