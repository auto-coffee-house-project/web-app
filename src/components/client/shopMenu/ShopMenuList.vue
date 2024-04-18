<template>
  <ProgressSpinner v-if="isLoading"/>
  <template v-else>
    <TabView :scrollable="true">
      <TabPanel
        header="Все"
        class="flex flex-col"
      >
        <ShopMenuItem
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </TabPanel>
      <TabPanel
        v-for="{category, products} in categoryProducts"
        :key="category.id"
        :header="category.name"
        class="flex flex-col"
      >
        <ShopMenuItem
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </TabPanel>
    </TabView>
  </template>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductListStore } from '../../../stores'
import ProgressSpinner from 'primevue/progressspinner'
import { storeToRefs } from 'pinia'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ShopMenuItem from './ShopMenuItem.vue'

const productListStore = useProductListStore()

const { categoryProducts, isLoading, products } = storeToRefs(productListStore)

onMounted(productListStore.fetch)
</script>
