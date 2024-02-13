<template>
  <CupDescription
    :start-text="botStore.startTextClientWebApp"
    :user-first-name="userStore.firstName"
  />
  <div class="flex gap-x-3">
    <CupIcon/>
    <CupProgress
      :current-cups-count="clientStatisticsStore.data?.current_cups_count"
      :each-nth-cup-free="clientStatisticsStore.data?.each_nth_cup_free"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import CupIcon from './CupIcon.vue'
import CupProgress from './CupProgress.vue'
import CupDescription from './CupDescription.vue'
import useClientStatisticsStore from '../../stores/useClientStatisticsStore.js'
import useUserStore from '../../stores/useUserStore.js'
import useBotStore from '../../stores/useBotStore.js'

const userStore = useUserStore()
const botStore = useBotStore()

const clientStatisticsStore = useClientStatisticsStore()

onMounted(clientStatisticsStore.fetch)

useIntervalFn(clientStatisticsStore.fetch, 5 * 1000)
</script>
