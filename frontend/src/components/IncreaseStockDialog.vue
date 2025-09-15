<script lang="ts" setup>
import {ref, watch} from "vue";
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
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

const props = defineProps<{
  open: boolean
  product: ProductResponseDTO | null
}>();
const emit = defineEmits<{
  (e: "update:open", value: boolean): void
  (e: "updated"): void
}>();

const qty = ref<number>(0);
const loading = ref(false);
const error = ref<string | null>(null);

watch(() => props.open, (val) => {
  if (val) {
    qty.value = 0;
    error.value = null;
  }
});

const close = () => emit("update:open", false);

const save = async () => {
  if (!props.product) return;
  if (!Number.isFinite(qty.value) || qty.value <= 0) {
    error.value = "Ingresa una cantidad mayor a 0";
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    await productService.increaseProductStock(props.product.id, qty.value);
    emit("updated");
    close();
  } catch (e: any) {
    error.value = e?.message ?? "No se pudo incrementar el stock";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Dialog :open="open" @update:open="val => emit('update:open', val)">
    <DialogContent class="sm:max-w-[420px]">
      <DialogHeader>
        <DialogTitle>Incrementar stock</DialogTitle>
        <DialogDescription>
          Producto: <b>{{ product?.name }}</b> — Stock actual: {{ product?.quantity }}
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-2 pt-2">
        <Label for="qty">Cantidad a incrementar</Label>
        <Input id="qty" v-model.number="qty" min="1" placeholder="0" type="number"/>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      </div>

      <DialogFooter class="mt-4">
        <Button :disabled="loading" variant="outline" @click="close">Cancelar</Button>
        <Button :disabled="loading" class="ml-2" @click="save">
          {{ loading ? 'Guardando…' : 'Guardar' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
