<script lang="ts" setup>
import {ref, watch} from "vue";
import {productService} from "@/api/productService";
import type {ProductCategories, ProductRequestDTO, ProductResponseDTO} from "@/types/product";

import Button from "@/components/ui/button/Button.vue";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,} from "@/components/ui/sheet";

const props = defineProps<{ open: boolean; product: ProductResponseDTO | null }>();
const emit = defineEmits<{ (e: "update:open", v: boolean): void; (e: "updated"): void }>();

const categories: ProductCategories[] = [
  "ELECTRONICS", "FASHION", "HOME", "BEAUTY", "SPORTS", "BOOKS", "GROCERY",
];

type FormState = {
  name: string;
  description: string;
  price: number | null;
  category: ProductCategories | null;
};
const form = ref<FormState>({
  name: "",
  description: "",
  price: null,
  category: null,
});

const loading = ref(false);
const error = ref<string | null>(null);

const hydrate = () => {
  if (!props.product) return;
  form.value = {
    name: props.product.name ?? "",
    description: props.product.description ?? "",
    price: props.product.price ?? null,
    category: props.product.category ?? null,
  };
  error.value = null;
};

watch(() => props.open, (v) => v && hydrate());
watch(() => props.product?.id, hydrate);

const close = () => emit("update:open", false);

const save = async () => {
  if (!props.product) return;

  error.value = null;
  if (!form.value.name.trim()) {
    error.value = "El nombre es obligatorio";
    return;
  }
  if (!form.value.price || form.value.price <= 0) {
    error.value = "Precio debe ser mayor a 0";
    return;
  }
  if (!form.value.category) {
    error.value = "Selecciona una categoría";
    return;
  }

  const payload: ProductRequestDTO = {
    name: form.value.name.trim(),
    price: form.value.price,
    category: form.value.category,
    ...(form.value.description.trim() ? {description: form.value.description.trim()} : {}),
  };

  loading.value = true;
  try {
    await productService.updateProduct(props.product.id, payload);
    emit("updated");
    close();
  } catch (e: any) {
    error.value = e?.message ?? "No se pudo actualizar el producto";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Sheet :open="open" @update:open="v => emit('update:open', v)">
    <SheetContent class="w-[480px]" side="right">
      <SheetHeader>
        <SheetTitle>Editar producto</SheetTitle>
        <SheetDescription>Actualiza los datos de <b>{{ product?.name }}</b>.</SheetDescription>
      </SheetHeader>

      <div class="mt-4 grid gap-3">
        <div class="grid gap-1">
          <Label for="name">Nombre</Label>
          <Input id="name" v-model="form.name" :disabled="loading"/>
        </div>

        <div class="grid gap-1">
          <Label for="desc">Descripción</Label>
          <textarea id="desc" v-model="form.description" :disabled="loading"
                    class="w-full rounded-md border px-3 py-2 text-sm"
                    rows="3"/>
        </div>

        <div class="grid gap-1">
          <Label for="price">Precio</Label>
          <Input id="price" v-model.number="form.price" :disabled="loading" min="0" step="0.01" type="number"/>
        </div>

        <div class="grid gap-1">
          <Label>Categoría</Label>
          <Select v-model="form.category">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Selecciona categoría"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <div class="mt-2 flex justify-end gap-2">
          <Button :disabled="loading" variant="outline" @click="close">Cancelar</Button>
          <Button :disabled="loading" @click="save">{{ loading ? "Guardando…" : "Actualizar" }}</Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
