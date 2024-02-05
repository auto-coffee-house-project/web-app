<template>
  <AdminNavbar/>
  <BasicContainer>
    <ShopDetail
      :salesmans-count="salesmans.length"
      :shop-name="shopName"
    />
    <CardSalesmanList
      :salesmans="salesmans"
      @load-salesmans="loadSalesmans"
    />
  </BasicContainer>
</template>

<script setup>
import AdminNavbar from '../components/admin/AdminNavbar.vue'
import BasicContainer from '../layouts/BasicContainer.vue'
import CardSalesmanList from '../components/admin/CardSalesman/CardSalesmanList.vue'
import ShopDetail from '../components/admin/ShopDetail.vue'
import { useFetch } from '@vueuse/core'
import { inject, onMounted, ref } from 'vue'

const botId = inject('botId')
const user = inject('user')


const salesmans = ref([])
const shopName = ref('')

const loadSalesmans = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/shops/salesmans/?admin_user_id=${user.id}&bot_id=${botId}`
  const { onFetchResponse, data } = useFetch(url).json()

  onFetchResponse(() => {
    shopName.value = data.value.result.shop_name
    salesmans.value = data.value.result.salesmans
  })
}

onMounted(loadSalesmans)
</script>
