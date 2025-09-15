<script lang="ts" setup>

import {Card, CardContent} from "@/components/ui/card";
import Button from "./ui/button/Button.vue";
import {ProductResponseDTO} from "@/types/product";

defineProps<{
  product: ProductResponseDTO
}>()

defineEmits<{
  (e: "add", product: ProductResponseDTO): void
}>()


</script>

<template>
  <Card class="overflow-hidden flex flex-col h-full hover:shadow-xl hover:scale-105 transition-transform">
    <img
        :alt="product.name"
        :src="product.imageUrl || '/image-not-found.png'"
        class="h-48 w-full object-cover"
    />

    <CardContent class="flex flex-col flex-grow p-4 space-y-3 text-left">
      <h2 class="text-lg font-semibold truncate">{{ product.name }}</h2>
      <p class="text-sm text-gray-500 line-clamp-2 flex-grow">{{ product.description }}</p>
      <span class="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-600 w-fit">
        {{ product.category }}
      </span>
      <p class="text-xl font-bold text-emerald-600">${{ product.price.toFixed(2) }}</p>

      <div class="flex items-center justify-between mt-auto pt-2">
        <span
            :class="product.active ? 'text-green-600' : 'text-red-500'"
            class="font-semibold text-sm"
        >
          <template v-if="product.quantity === 0">Sold out</template>
          <template v-else-if="product.quantity > 1 && product.quantity < 3">Few units</template>
          <template v-else>Available</template>
        </span>
        <Button :disabled="product.quantity == 0" class="ml-2" @click="$emit('add', product)">
          Agregar
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>