<template>
  <ClientNavbar/>
  <BasicContainer>
    <CupRequirementsInfo
      :user-id="user.id"
      :user-first-name="user.first_name"
      :bot-id="botId"
    />
    <SaleTemporaryCode
      v-if="isCodeSown"
      :bot-id="botId"
      :user-id="user.id"
    />
    <Button
      class="w-full my-4"
      label="Получить код"
      v-if="!isCodeSown"
      @click="isCodeSown = true"
    />
  </BasicContainer>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useTitle } from '@vueuse/core'
import CupRequirementsInfo from '../../components/client/CupRequirementsInfo.vue'
import ClientNavbar from '../../components/client/ClientNavbar.vue'
import SaleTemporaryCode from '../../components/client/SaleTemporaryCode.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import Button from 'primevue/button'

const isCodeSown = ref(false)

useTitle('Подарок | Coffeconnect')

const user = inject('user')
const botId = inject('botId')
</script>
