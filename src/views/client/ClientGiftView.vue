<template>
  <ClientNavbar/>
  <BasicContainer>
    <CupRequirementsInfo/>
    <SaleCode v-if="!hasMainGift"/>
    <MainGiftDisplay v-else :gift="mainGift"/>

    <BirthdayRequestOffer/>

    <template v-if="hasNonMainGifts">
      <Divider align="center">
        <span class="font-semibold">Дополнительные подарки</span>
      </Divider>
      <NonMainGiftDisplay v-for="gift in nonMainGifts" :gift="gift"/>
    </template>

  </BasicContainer>
</template>

<script setup>
import { onMounted } from 'vue'
import MainGiftDisplay from '../../components/client/MainGiftDisplay.vue'
import CupRequirementsInfo from '../../components/client/CupRequirementsInfo.vue'
import ClientNavbar from '../../components/client/ClientNavbar.vue'
import SaleCode from '../../components/client/SaleCode.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import { storeToRefs } from 'pinia'
import Divider from 'primevue/divider'
import useClientStore from '../../stores/useClientStore.js'
import useUserStore from '../../stores/useUserStore.js'
import NonMainGiftDisplay from '../../components/client/NonMainGiftDisplay.vue'
import BirthdayRequestOffer from '../../components/client/BirthdayRequestOffer.vue'


const clientStore = useClientStore()
const userStore = useUserStore()

const {
  nonMainGifts,
  mainGift,
  hasMainGift,
  hasNonMainGifts,
} = storeToRefs(clientStore)

onMounted(async () => {
  if (!clientStore.id) {
    await clientStore.fetch({ userId: userStore.id })
  }
})
</script>
