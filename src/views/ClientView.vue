<template>
  <ClientNavbar/>
  <main class="px-3 py-4">
    <Description
      :nth-cup-progress-current="shop.nth_cup_progress_current"
      :each-nth-cup="shop.each_nth_cup"
      :user-first-name="user.first_name"
    />
    <SaleTemporaryCode :user="user" :bot="bot"/>
  </main>
</template>

<script setup>
import ClientNavbar from '../components/ClientNavbar.vue';
import { useTitle } from '@vueuse/core'
import Description from "../components/Description.vue";
import SaleTemporaryCode from "../components/SaleTemporaryCode.vue";
import { inject } from "vue";

useTitle('Клиент | Coffee House Bot')

const user = inject('user')
const bot = inject('bot')
const shop = inject('shop')
</script>
