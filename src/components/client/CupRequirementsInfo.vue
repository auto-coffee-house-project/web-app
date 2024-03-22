<template>
  <CupDescription
    :start-text="startText"
    :user-first-name="firstName"
  />
  <div class="flex gap-x-3">
    <CupIcon :gift-photo-url="giftPhoto"/>
    <CupProgress
      :current-progress="currentProgress"
      :each-nth-sale-free="eachNthSaleFree"
    />
  </div>
</template>

<script setup>
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import CupIcon from './CupIcon.vue'
import CupProgress from './CupProgress.vue'
import CupDescription from './CupDescription.vue'
import useClientStore from '../../stores/useClientStore.js'
import useUserStore from '../../stores/useUserStore.js'
import useShopStore from '../../stores/useShopStore.js'

const userStore = useUserStore()
const clientStore = useClientStore()
const shopStore = useShopStore()

const { firstName } = storeToRefs(userStore)
const { startText, eachNthSaleFree, giftPhoto } = storeToRefs(shopStore)
const { currentProgress } = storeToRefs(clientStore)

useIntervalFn(async () => {
  await clientStore.fetch({ userId: userStore.id })
}, 5 * 1000)
</script>
