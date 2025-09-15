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

const props = defineProps<{ open: boolean; product: ProductResponseDTO | null }>();
const emit = defineEmits<{ (e: "update:open", v: boolean): void; (e: "updated"): void }>();

const file = ref<File | null>(null);
const preview = ref<string | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

watch(() => props.open, (val) => {
  if (val) {
    file.value = null;
    preview.value = null;
    error.value = null;
  }
});

const onPick = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const f = input.files?.[0] ?? null;
  file.value = f;
  if (f) {
    preview.value = URL.createObjectURL(f);
  } else {
    preview.value = null;
  }
};

const close = () => emit("update:open", false);

const upload = async () => {
  if (!props.product || !file.value) {
    error.value = "Selecciona un archivo de imagen";
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    await productService.uploadImageProduct(props.product.id, file.value);
    emit("updated");
    close();
  } catch (e: any) {
    error.value = e?.message ?? "Error subiendo imagen";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Dialog :open="open" @update:open="v => emit('update:open', v)">
    <DialogContent class="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Subir imagen</DialogTitle>
        <DialogDescription>
          Producto: <b>{{ product?.name }}</b>
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-3">
        <div class="grid gap-1">
          <Label for="file">Imagen (JPG/PNG)</Label>
          <Input id="file" accept="image/*" type="file" @change="onPick"/>
        </div>

        <div v-if="preview" class="mt-2 h-40 w-full overflow-hidden rounded-md border">
          <img :src="preview" alt="preview" class="h-full w-full object-cover"/>
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      </div>

      <DialogFooter class="mt-2">
        <Button :disabled="loading" variant="outline" @click="close">Cancelar</Button>
        <Button :disabled="loading" class="ml-2" @click="upload">
          {{ loading ? 'Subiendo…' : 'Subir' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
