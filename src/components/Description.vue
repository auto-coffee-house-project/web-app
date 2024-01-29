<template>
  <template v-if="userStatistics">
    <h3 class="text-2xl font-semibold tg-text-primary">Привет {{ userFirstName }}!</h3>
    <p class="mt-2 my-4 tg-text-primary">
      Мы с удовольствием угостим бесплатным кофе, приходи к нам почаще и копи свои бонусы,
      ведь каждая {{ userStatistics.each_nth_cup_free + 1 }}-я кружка кофе в подарок!
    </p>
    <div class="flex gap-x-3">
      <CupIcon/>
      <CupProgress
        :current-cups-count="userStatistics.current_cups_count"
        :each-nth-cup-free="userStatistics.each_nth_cup_free"
      />
    </div>
  </template>
  <LoadingSpinner v-else/>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useFetch, useIntervalFn } from "@vueuse/core";
import LoadingSpinner from "./LoadingSpinner.vue";
import CupIcon from "./CupIcon.vue";
import CupProgress from "./CupProgress.vue";

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
