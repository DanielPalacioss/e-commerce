<script setup lang="ts">
import { computed } from "vue";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { UserAddressResponse } from "@/types/userAddress";

const props = defineProps<{
  address: UserAddressResponse;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "edit", address: UserAddressResponse): void;
  (e: "delete", address: UserAddressResponse): void;
}>();

const onEdit = () => emit("edit", props.address);
const onDelete = () => emit("delete", props.address);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon-sm" :disabled="disabled">
        <MoreHorizontal class="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="onEdit">
        <Pencil class="h-4 w-4 mr-2" />
        Editar dirección
      </DropdownMenuItem>
      <DropdownMenuItem class="text-red-600" @click="onDelete">
        <Trash2 class="h-4 w-4 mr-2" />
        Eliminar dirección
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
