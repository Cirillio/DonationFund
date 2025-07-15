<script lang="ts" setup>
import { ref, computed } from 'vue'

const descVariants = ['Можете указать пожелания', 'Укажите список участников']

const groupCheck = ref()
const placeholder = computed(() => (groupCheck.value ? descVariants[1] : descVariants[0]))
</script>

<template>
  <CardTitledContent title="Доп. информация" icon="f7--captions-bubble">
    <section class="flex flex-col flex-1 gap-2">
      <CheckBlock v-model="groupCheck" :icon="'f7--person-2'" label="От лица Группы" />
      <Textarea class="resize-none min-h-24 text-sm" id="desc" :placeholder="placeholder" />
    </section>
  </CardTitledContent>
</template>
