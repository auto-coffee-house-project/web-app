<template>
  <CupDescription
    :start-text="startText"
    :user-first-name="userFirstName"
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
import { onMounted, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import CupIcon from './CupIcon.vue'
import CupProgress from './CupProgress.vue'
import CupDescription from './CupDescription.vue'
import { getBot } from '../../services/api.js'
import useClientStatistics from '../../stores/useClientStatistics.js'

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
const startText = ref('')

const clientStatisticsStore = useClientStatistics()

const fetchUserStatistics = async () => {
  await clientStatisticsStore.fetchClientStatistics({ botId: props.botId, userId: props.userId })
}

onMounted(async () => {
  if (!clientStatisticsStore.data) {
    await fetchUserStatistics()
  }
  const { data } = await getBot({ botId: props.botId })
  startText.value = data.value?.result?.start_text_client_web_app
})

useIntervalFn(fetchUserStatistics, 5 * 1000)
</script>
