<script lang="ts" setup>
import {ref} from "vue";
import {productService} from "@/api/productService";
import type {ProductResponseDTO} from "@/types/product";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Button from "@/components/ui/button/Button.vue";

const props = defineProps<{ open: boolean; product: ProductResponseDTO | null }>();
const emit = defineEmits<{ (e: "update:open", v: boolean): void; (e: "updated"): void }>();

const loading = ref(false);
const error = ref<string | null>(null);

const close = () => emit("update:open", false);

const confirmActivate = async () => {
  if (!props.product) return;
  loading.value = true;
  error.value = null;
  try {
    await productService.activateProduct(props.product.id);
    emit("updated");
    close();
  } catch (e: any) {
    error.value = e?.message ?? "No se pudo activar el producto";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Dialog :open="open" @update:open="v => emit('update:open', v)">
    <DialogContent class="sm:max-w-[420px]">
      <DialogHeader>
        <DialogTitle>Activar producto</DialogTitle>
        <DialogDescription>
          ¿Confirmas activar <b>{{ product?.name }}</b>?
        </DialogDescription>
      </DialogHeader>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <DialogFooter class="mt-2">
        <Button :disabled="loading" variant="outline" @click="close">Cancelar</Button>
        <Button :disabled="loading" class="ml-2" @click="confirmActivate">
          {{ loading ? 'Activando…' : 'Activar' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
