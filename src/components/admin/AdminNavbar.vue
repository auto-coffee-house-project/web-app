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
import Menubar from "primevue/menubar";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const items = ref([
  {
    label: 'Сотрудники',
    icon: 'pi pi-users',
    routeName: 'staff',
  },
  {
    label: 'Настройки',
    icon: 'pi pi-cog',
    // routeName: 'settings',
    items: [
      {
        label: 'Опции',
        icon: 'pi pi-th-large',
        routeName: 'options',
      },
      {
        label: 'Подарок',
        icon: 'pi pi-gift',
        routeName: 'gift',
      },
      {
        label: 'Фразы',
        icon: 'pi pi-comment',
        routeName: 'phrases',
      },
    ],
  },
]);
</script>
