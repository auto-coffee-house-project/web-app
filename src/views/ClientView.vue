<template>
  <main class="p-6">
    <Description
      :user-id="user.id"
      :user-first-name="user.first_name"
      :bot-id="botId"
    />
    <SaleTemporaryCode
      :bot-id="botId"
      :user-id="user.id"
    />
  </main>
</template>

<script setup>
import Description from "../components/CupRequirementsInfo.vue";
import SaleTemporaryCode from "../components/SaleTemporaryCode.vue";
import { inject } from "vue";
import { useTitle } from '@vueuse/core'

useTitle('Клиент | Coffee House Bot')

const user = inject('user')
const botId = inject('botId')
</script>
