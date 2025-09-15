<script lang="ts" setup>

import Button from "./ui/button/Button.vue";

defineProps({
  page: Number,
  totalPages: Number
})

defineEmits(["prev", "next"])
</script>

<template>
  <div class="flex justify-center mt-8 space-x-2">
    <Button :disabled="page === 0" variant="outline" @click="$emit('prev')">
      ⬅ Anterior
    </Button>

    <span class="px-4 py-2 font-medium">
      Página {{ page + 1 }} de {{ totalPages }}
    </span>

    <Button :disabled="page + 1 >= totalPages" variant="outline" @click="$emit('next')">
      Siguiente ➡
    </Button>
  </div>
</template>

<style scoped>

</style>