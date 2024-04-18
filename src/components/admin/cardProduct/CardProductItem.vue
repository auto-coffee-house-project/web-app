<template>
  <RouterLink :to="{ name: 'admin-product', params: { id: product.id } }">
    <Card
      class="my-4"
    >
      <template
        #header
        v-if="product.photo"
      >
        <Image
          :src="product.photo"
          alt="product photo"
          class="rounded-t-lg"
          preview
        />
      </template>
      <template #subtitle>
      <span class="font-semibold text-xl">
        {{ product.name }}
      </span>
      </template>
      <template #content>Цена: {{ product.price }}</template>
      <template #footer>
        <Chip
          v-for="categoryName in product.category_names"
          :id="categoryName"
          :label="categoryName"
          class="mr-2"
        />
      </template>
    </Card>
  </RouterLink>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Image from 'primevue/image'
import Chip from 'primevue/chip'

defineProps<{
  product: {
    id: number,
    name: string,
    price: number,
    photo: string,
    category_names: string[],
  },
}>()
</script>
