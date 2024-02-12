<template>
  <AdminNavbar/>
  <BasicContainer>
    <Message
      v-for="message in messages"
      :key="message.id"
      :severity="message.severity"
      :life="message.life"
      :sticky="message.sticky"
    >
      {{ message.content }}
    </Message>
    <form @submit.prevent class="flex flex-col gap-y-4">
      <div class="flex flex-col">
        <label for="gift-name">Название</label>
        <InputText id="gift-name" v-model="giftName"/>
      </div>
      <!--    <div class="flex flex-col">-->
      <!--      <img v-if="photoUrl" width="128rem" :src="photoUrl" alt="logo photo"/>-->
      <!--      <label for="gift-photo">Фото</label>-->
      <!--      <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="customBase64Uploader" />-->
      <!--    </div>-->
      <div class="flex flex-col">
        <label for="each-nth-cup-free">Необходимо чашек</label>
        <InputNumber id="each-nth-cup-free" :min="2" :max="100" v-model="eachNthCupFree" :use-grouping="false"/>
      </div>
      <Button type="submit" @click="onSubmit" label="Сохранить" class="w-full"/>
    </form>
  </BasicContainer>

</template>

<script setup>
import AdminNavbar from '../../components/admin/AdminNavbar.vue';
import BasicContainer from '../../layouts/BasicContainer.vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Message from 'primevue/message';
import useShopGroupStore from '../../stores/useShopGroupStore.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue';

const shopGroupStore = useShopGroupStore()

const { giftName, giftPhotoUrl, eachNthCupFree, isMenuShown } = storeToRefs(shopGroupStore)

const messages = ref([])

// const customBase64Uploader = async (event) => {
//   const file = event.files[0];
//   const reader = new FileReader();
//   let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
//
//   reader.readAsDataURL(blob);
//
//   reader.onloadend = function () {
//     const {onFetchResponse, data} = useFetch(
//       'http://localhost:8000'
//     ).post({data: reader.result}).json()
//     onFetchResponse(() => {
//       photoUrl.value = data.value.url
//     })
//   };
// };


const onSubmit = async () => {
  await shopGroupStore.update({
    giftName: giftName.value,
    giftPhotoUrl: giftPhotoUrl.value,
    eachNthCupFree: eachNthCupFree.value,
    isMenuShown: isMenuShown.value,
  })
  messages.value = [
    {
      id: Date.now(),
      content: 'Изменения сохранены',
      severity: 'success',
      life: 2000,
      sticky: false,
    },
  ]
}
</script>
