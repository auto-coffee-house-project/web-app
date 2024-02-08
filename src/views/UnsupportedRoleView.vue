<template>
  <BasicContainer>
    <InlineMessage
      class="w-full h-full"
      severity="warn"
    >
      У вас нет доступа. Пользоваться этим меню могут только клиенты
    </InlineMessage>
  </BasicContainer>
</template>

<script setup>
import InlineMessage from 'primevue/inlinemessage'
import BasicContainer from '../layouts/BasicContainer.vue'
</script>
