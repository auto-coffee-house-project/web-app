<template>
  <h3>Привет {{ userFirstName }}</h3>
  <p>
    Мы с удовольствием угостим бесплатным кофе, приходи к нам почаще и копи свои бонусы, ведь каждая {{ eachNthCup }}-я
    кружка кофе в подарок!
  </p>
  <p v-if="userStatistics">
    Бесплатный напиток {{ userStatistics.current_cups_count }}/{{ userStatistics.each_nth_cup_free }}
  </p>
  <p v-else>
    Загрузка...
  </p>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useFetch, useIntervalFn } from "@vueuse/core";

const props = defineProps({
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

const bot = inject('bot')
const user = inject('user')
const userStatistics = ref()

const fetchUserStatistics = async () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/shops/clients/statistics/?bot_id=${bot.id}&user_id=${user.id}`
  const {data} = await useFetch(url).json()
  userStatistics.value = data.value?.result
}

onMounted(fetchUserStatistics)

useIntervalFn(fetchUserStatistics, 30 * 1000)

</script>
