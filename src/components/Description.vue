<template>
  <template v-if="userStatistics">
    <CupDescription
      :each-nth-cup-free="userStatistics.each_nth_cup_free"
      :user-first-name="userFirstName"
    />
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
import CupDescription from "./CupDescription.vue";

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
