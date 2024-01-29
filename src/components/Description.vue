<template>
  <template v-if="userStatistics">
    <h3 class="text-2xl font-semibold tg-text-primary">Привет {{ userFirstName }}!</h3>
    <p class="mt-2 my-4 tg-text-primary">
      Мы с удовольствием угостим бесплатным кофе, приходи к нам почаще и копи свои бонусы,
      ведь каждая {{ userStatistics.each_nth_cup_free }}-я кружка кофе в подарок!
    </p>
    <div class="flex gap-x-3">
      <img width="64" height="64"
           src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-coffee-usa-flatart-icons-lineal-color-flatarticons.png"
           alt="external-coffee-usa-flatart-icons-lineal-color-flatarticons"/>
      <div class="flex flex-col gap-y-2">
        <div class="flex justify-between gap-x-3">
          <p class="tg-text-primary">Бесплатный напиток</p>
          <p class="font-semibold tg-text-primary">{{ userStatistics.current_cups_count}}/{{ userStatistics.each_nth_cup_free }}</p>
        </div>
        <CupProgressBar
          :current-value="userStatistics.current_cups_count"
          :max-value="userStatistics.each_nth_cup_free"
        />
      </div>
    </div>
  </template>
  <LoadingSpinner v-else/>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useFetch, useIntervalFn } from "@vueuse/core";
import CupProgressBar from "./CupProgressBar.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

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
