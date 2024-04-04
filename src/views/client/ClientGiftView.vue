<template>
  <ClientNavbar/>
  <BasicContainer>
    <CupRequirementsInfo/>
    <SaleCode v-if="!hasGift"/>
    <Gift v-else/>
  </BasicContainer>
</template>

<script setup>
import { onMounted } from 'vue'
import Gift from '../../components/client/GiftCode.vue'
import CupRequirementsInfo from '../../components/client/CupRequirementsInfo.vue'
import ClientNavbar from '../../components/client/ClientNavbar.vue'
import SaleCode from '../../components/client/SaleCode.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import { storeToRefs } from 'pinia'
import useClientStore from '../../stores/useClientStore.js'
import useUserStore from '../../stores/useUserStore.js'

const clientStore = useClientStore()
const userStore = useUserStore()

const { hasGift } = storeToRefs(clientStore)

onMounted(async () => {
  if (!clientStore.id) {
    await clientStore.fetch({ userId: userStore.id })
  }
})
</script>
