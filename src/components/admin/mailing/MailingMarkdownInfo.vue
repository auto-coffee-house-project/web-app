<template>
  <Accordion>
    <AccordionTab header="Как использовать Markdown разметку?">
      <DataTable :value="markdownInfo">
        <Column field="markdownText" header="Разметка"/>
        <Column field="formattedText" header="Результат">
          <template #body="slotProps">
            <div v-html="slotProps.data.formattedText"/>
          </template>
        </Column>
      </DataTable>
    </AccordionTab>
  </Accordion>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import Column from 'primevue/column'
import AccordionTab from 'primevue/accordiontab'
import DataTable from 'primevue/datatable'

const markdownInfo = [
  {
    markdownText: '*жирный текст*',
    formattedText: '<b>жирный текст</b>',
  },
  {
    markdownText: '_курсивный текст_',
    formattedText: '<i>курсивный текст</i>',
  },
  {
    markdownText: '[ссылка](https://google.com)',
    formattedText: '<a class="underline text-blue-700" href="https://google.com">ссылка</a>',
  },
  {
    markdownText: '__нижнее подчёркивание__',
    formattedText: '<u>нижнее подчёркивание</u>',
  },
  {
    markdownText: '~зачёркнутый текст~',
    formattedText: '<del>зачёркнутый текст</del>',
  },
  {
    markdownText: '||спойлер||',
    formattedText: 'спойлер в телеграме',
  },
  {
    markdownText: '`моноширинный текст`',
    formattedText: '<code>моноширинный текст</code>',
  },
]
</script>
