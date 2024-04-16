<template>
  <div ref="parent">
    <template v-if="isOfferVisible">
      <Divider align="center">
        <span class="font-semibold">Специальное предложение</span>
      </Divider>
      <p class="mb-3">Укажите ваш день рождения и получите подарок!</p>
      <div class="flex gap-x-2 mb-3">
        <Button
          label="Указать"
          size="small"
          icon="pi pi-calendar"
          text
          rounded
          @click="isBirthdayDialogVisible = true"/>
        <Button
          label="Позже"
          size="small"
          icon="pi pi-times"
          text
          rounded
          severity="secondary"
          @click="isOfferTemporaryDismissedByClient = true"
        />
      </div>
    </template>
    <ClientProfileUpdateFormDialog v-model:is-visible="isBirthdayDialogVisible"/>
  </div>
</template>

<script setup>
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import ClientProfileUpdateFormDialog from '../../components/client/ClientProfileUpdateFormDialog.vue'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useClientStore from '../../stores/useClientStore.js'
import useShopStore from '../../stores/useShopStore.js'

const clientStore = useClientStore()
const shopStore = useShopStore()

const { birthdayOfferAfterNthSale } = storeToRefs(shopStore)
const { totalPurchasesCount, bornOn } = storeToRefs(clientStore)

const [parent] = useAutoAnimate()

const isOfferTemporaryDismissedByClient = ref(false)
const isBirthdayDialogVisible = ref(false)

const isOfferVisible = computed(() => {
  const hasClientEnoughPurchases = totalPurchasesCount.value >= birthdayOfferAfterNthSale.value

  const isBirthdayAlreadySet = bornOn.value !== null
  return hasClientEnoughPurchases && !isBirthdayAlreadySet && !isOfferTemporaryDismissedByClient.value
})
</script>
