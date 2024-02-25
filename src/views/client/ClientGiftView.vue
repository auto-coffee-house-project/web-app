<template>
  <ClientNavbar/>
  <BasicContainer>
    <CupRequirementsInfo/>
    <SaleTemporaryCode v-if="isCodeSown"/>
    <Button
      class="w-full my-4"
      label="Получить код"
      v-if="!isCodeSown && !hasGift"
      @click="isCodeSown = true"
    />
    <Button
      class="w-full my-4"
      label="Получить подарок"
      v-if="hasGift"
    />
  </BasicContainer>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTitle } from '@vueuse/core'
import CupRequirementsInfo from '../../components/client/CupRequirementsInfo.vue'
import ClientNavbar from '../../components/client/ClientNavbar.vue'
import SaleTemporaryCode from '../../components/client/SaleCode.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import Button from 'primevue/button'
import { storeToRefs } from 'pinia'
import useClientStore from '../../stores/useClientStore.js'

const isCodeSown = ref(false)

const clientStore = useClientStore()

const { hasGift } = storeToRefs(clientStore)

onMounted(clientStore.fetch)

useTitle('Подарок | Coffeconnect')
</script>
