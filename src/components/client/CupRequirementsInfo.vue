<template>
  <template v-if="userStatistics">
    <CupDescription
      :start-text="startText"
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
import { onMounted, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import LoadingSpinner from './LoadingSpinner.vue'
import CupIcon from './CupIcon.vue'
import CupProgress from './CupProgress.vue'
import CupDescription from './CupDescription.vue'
import { getBot, getClientStatistics } from '../../services/api.js'

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
const startText = ref('')

const fetchUserStatistics = async () => {
  const { data } = await getClientStatistics({ userId: props.userId, botId: props.botId })
  userStatistics.value = data.value?.result
}

onMounted(async () => {
  await fetchUserStatistics()
  const {data} = await getBot({botId: props.botId})
  startText.value = data.value?.result?.start_text_client_web_app
})

useIntervalFn(fetchUserStatistics, 5 * 1000)
</script>
