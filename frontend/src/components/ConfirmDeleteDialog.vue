<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const props = defineProps<{
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  danger?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "confirm"): void;
}>();

const setOpen = (v: boolean) => emit("update:open", v);
const confirm = () => emit("confirm");
</script>

<template>
  <AlertDialog :open="open" @update:open="setOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title || "¿Estás seguro?" }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ description || "Esta acción no se puede deshacer." }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction :class="danger ? 'bg-red-600 text-white hover:bg-red-700' : ''" @click="confirm">
          {{ confirmLabel || "Confirmar" }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
