<template>
  <template v-if="userStatistics">
    <h3>Привет {{ userFirstName }}</h3>
    <p>
      Мы с удовольствием угостим бесплатным кофе, приходи к нам почаще и копи свои бонусы,
      ведь каждая {{ userStatistics.each_nth_cup_free }}-я кружка кофе в подарок!
    </p>
    <div class="flex justify-between">
      <p>Бесплатный напиток</p>
      <p>{{ userStatistics.current_cups_count }}/{{ userStatistics.each_nth_cup_free }}</p>
    </div>
    <div class="flex h-full w-full">
      <div
        class="w-5 h-4 bg-white border-black border first:rounded-l-md last:rounded-r-md"
        :class="{'bg-sky-500': index <= userStatistics.current_cups_count}"
        v-for="index in userStatistics.each_nth_cup_free"
      >
      </div>
    </div>
  </template>
  <p v-else>Loading</p>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useFetch, useIntervalFn } from "@vueuse/core";

const props = defineProps({
  botId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  userFirstName: {
    type: String,
    required: true,
  },
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
