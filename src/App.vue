<template>
  <ClientView v-if="userType === 'client'" :user-first-name="user.firstName" :bot="bot" :each-nth-cup="eachNthCup"
    :nth-cup-progress-current="nthCupProgressCurrent" />
  <p v-else>Undefined user type</p>
</template>

<script setup>
import { provide } from 'vue';
import ClientView from './views/ClientView.vue';


const user = {
  id: 896678539,
  firstName: 'Eldos',
}

provide('userId', user.id)

const bot = {
  id: 6887092432,
  username: 'coffeeShopBot',
}

const eachNthCup = 6
const nthCupProgressCurrent = 1

const userType = 'client'
</script>
