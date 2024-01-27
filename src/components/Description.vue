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
import { onMounted, ref } from "vue";
import { useFetch, useIntervalFn } from "@vueuse/core";

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
  userFirstName: {
    type: String,
    required: true,
  },
  botId: {
    type: Number,
    required: true,
  }
})

const userStatistics = ref()

const fetchUserStatistics = async () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/shops/clients/statistics/?bot_id=${props.botId}&user_id=${props.userId}`
  const {data} = await useFetch(url).json()
  userStatistics.value = data.value?.result
}

onMounted(fetchUserStatistics)

useIntervalFn(fetchUserStatistics, 30 * 1000)

</script>
