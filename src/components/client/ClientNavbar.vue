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
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useShopStore } from '../../stores'
import { storeToRefs } from 'pinia'

const shopStore = useShopStore()

const { isMenuShown } = storeToRefs(shopStore)

const items = ref([
  {
    label: 'Подарок',
    icon: 'pi pi-gift',
    routeName: 'client-gift',
  },
])

onMounted(() => {
  if (isMenuShown.value) {
    items.value.push({
      label: 'Каталог',
      icon: 'pi pi-th-large',
      routeName: 'client-shop-menu',
    })
  }
})
</script>
