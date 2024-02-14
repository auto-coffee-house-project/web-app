<template>
  <Card
    class="my-4"
  >
    <template
      #header
      v-if="product.photo"
    >
      <img
        :src="product.photo"
        alt="product photo"
        class="rounded-t"
      />
    </template>
    <template #subtitle>
      <span class="font-semibold text-xl">
        {{ product.name }}
      </span>
    </template>
    <template #content>Цена: {{ product.price }}</template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
