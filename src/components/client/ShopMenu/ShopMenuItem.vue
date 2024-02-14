<template>
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
        v-for="category in product.categories"
        :id="category.id"
        :label="category.name"
      />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Image from 'primevue/image'
import Chip from 'primevue/chip'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
