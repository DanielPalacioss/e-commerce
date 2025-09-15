<script lang="ts" setup>
import {DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {Ban, Pencil} from "lucide-vue-next";
import type {OrderResponse} from "@/types/order";

const props = defineProps<{ order: OrderResponse }>();
const emit = defineEmits<{
  (e: "update"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
  <DropdownMenuSeparator/>

  <DropdownMenuItem
      :disabled="props.order.status !== 'PENDING'"
      @click="emit('update')"
  >
    <Pencil class="h-4 w-4 mr-2"/>
    Actualizar pedido
  </DropdownMenuItem>

  <DropdownMenuItem
      :disabled="props.order.status !== 'PENDING'"
      class="text-red-600"
      @click="emit('cancel')"
  >
    <Ban class="h-4 w-4 mr-2"/>
    Cancelar pedido
  </DropdownMenuItem>
</template>
