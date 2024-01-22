<template>
  <h3>Привет {{ userFirstName }}</h3>
  <p>
    Мы с удовольствием угостим бесплатным кофе, приходи к нам почаще и копи свои бонусы, ведь каждая {{ eachNthCup }}-я
    кружка кофе в подарок!
  </p>
  <p>
    Бесплатный напиток {{ nthCupProgressCurrent }}/{{ eachNthCup }}
  </p>
  <SaleTemporaryCodeContainer :bot="bot"/>
</template>

<script setup>
import SaleTemporaryCodeContainer from '../components/SaleTemporaryCodeContainer.vue';


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
