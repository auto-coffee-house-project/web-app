<template>
  <ClientNavbar/>
  <main class="px-3 py-4">
    <Description
      :user-id="bot.id"
      :user-first-name="user.first_name"
      :bot-id="bot.id"
    />
    <SaleTemporaryCode
      :bot-id="bot.id"
      :bot-username="bot.username"
      :user-id="user.id"
    />
  </main>
</template>

<script setup>
import ClientNavbar from '../components/ClientNavbar.vue';
import Description from "../components/Description.vue";
import SaleTemporaryCode from "../components/SaleTemporaryCode.vue";
import { inject } from "vue";
import { useTitle } from '@vueuse/core'

useTitle('Клиент | Coffee House Bot')

const user = inject('user')
const bot = inject('bot')
</script>
