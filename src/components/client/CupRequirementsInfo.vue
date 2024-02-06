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
import { onMounted, ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import LoadingSpinner from './LoadingSpinner.vue';
import CupIcon from './CupIcon.vue';
import CupProgress from './CupProgress.vue';
import CupDescription from './CupDescription.vue';
import useApiFetch from '../../services/useApiFetch.js'

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

const fetchUserStatistics = () => {
  const url = `/shops/clients/statistics/?bot_id=${props.botId}&user_id=${props.userId}`
  const { data, onFetchResponse } = useApiFetch(url).json()
  onFetchResponse(() => {
    userStatistics.value = data.value?.result
  })
}

onMounted(fetchUserStatistics)

useIntervalFn(fetchUserStatistics, 10 * 1000)
</script>
