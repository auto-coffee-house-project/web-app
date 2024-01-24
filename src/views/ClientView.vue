<template>
  <ClientNavbar />
  <main class="px-3 py-4">
    <h3>Привет {{ userFirstName }}</h3>
    <p>
      Мы с удовольствием угостим бесплатным кофе, приходи к нам почаще и копи свои бонусы, ведь каждая {{ eachNthCup }}-я
      кружка кофе в подарок!
    </p>
    <p>
      Бесплатный напиток {{ nthCupProgressCurrent }}/{{ eachNthCup }}
    </p>
    <SaleTemporaryCodeContainer :bot="bot" />
  </main>
</template>

<script setup>
import ClientNavbar from '../components/ClientNavbar.vue';
import SaleTemporaryCodeContainer from '../components/SaleTemporaryCodeContainer.vue';
import { useTitle } from '@vueuse/core'

useTitle('Клиент | Coffee House Bot')


const props = defineProps({
  bot: {
    type: Object,
    required: true,
  },
  userFirstName: {
    type: String,
    required: true,
  },
  eachNthCup: {
    type: Number,
    required: true,
  },
  nthCupProgressCurrent: {
    type: Number,
    required: true,
  },
})

</script>
