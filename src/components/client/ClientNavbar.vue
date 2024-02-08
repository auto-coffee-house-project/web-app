<template>
  <div class="card">
    <Menubar :model="items" breakpoint="0px">
      <template #item="{ item, props }">
        <RouterLink v-slot="{ href, navigate }" :to="{ name: item.routeName }" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon"/>
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import Menubar from 'primevue/menubar'
import { inject, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getShopGroup } from '../../services/api.js'

const botId = inject('botId')

const { onFetchResponse, data } = getShopGroup(botId)

const items = ref([
  {
    label: 'Подарок',
    icon: 'pi pi-gift',
    routeName: 'client-gift',
  },
])

onFetchResponse(() => {
  if (data.value?.result?.is_menu_shown) {
    items.value.push({
      label: 'Каталог',
      icon: 'pi pi-th-large',
      routeName: 'client-shop-menu',
    })
  }
})

</script>
