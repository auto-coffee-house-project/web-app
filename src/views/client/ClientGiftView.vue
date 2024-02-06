<template>
  <ClientNavbar/>
  <BasicContainer>
    <CupRequirementsInfo
      :user-id="user.id"
      :user-first-name="user.first_name"
      :bot-id="botId"
    />
    <SaleTemporaryCode
      :bot-id="botId"
      :user-id="user.id"
    />
  </BasicContainer>
</template>

<script setup>
import { inject } from 'vue';
import { useTitle } from '@vueuse/core'
import CupRequirementsInfo from '../../components/client/CupRequirementsInfo.vue'
import ClientNavbar from '../../components/client/ClientNavbar.vue'
import SaleTemporaryCode from '../../components/client/SaleTemporaryCode.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'

useTitle('Клиент | Coffee House Bot')

const user = inject('user')
const botId = inject('botId')
</script>
