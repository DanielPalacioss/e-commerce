<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { UserAddressRequest, UserAddressResponse } from "@/types/userAddress";
import { userAddressService } from "@/api/userAddressService";
import UserAddressForm from "./UserAddressForm.vue";

const props = defineProps<{
  open: boolean;
  currentCount: number;
  max: number;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "created", value: UserAddressResponse): void;
}>();

const loading = ref(false);
const error = ref<string | null>(null);

const model = ref<UserAddressRequest>({
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
});

watch(
    () => props.open,
    (o) => {
      if (o) {
        // reset form al abrir
        model.value = {
          fullName: "",
          phone: "",
          addressLine: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        };
        error.value = null;
      }
    }
);

const setOpen = (v: boolean) => emit("update:open", v);

const submit = async () => {
  if (props.currentCount >= props.max) {
    error.value = `Límite de ${props.max} direcciones alcanzado.`;
    return;
  }

  loading.value = true;
  error.value = null;
  try {
    const created = await userAddressService.create(model.value);
    emit("created", created);
    setOpen(false);
  } catch (e: any) {
    // si el backend también valida el límite, podría devolver 400/409
    error.value = e?.message ?? "No se pudo crear la dirección";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Sheet :open="open" @update:open="setOpen">
    <SheetContent side="right" class="w-full sm:max-w-xl">
      <SheetHeader class="mb-4">
        <SheetTitle>Nueva dirección</SheetTitle>
        <SheetDescription>Agrega una dirección de envío (máximo {{ max }}).</SheetDescription>
      </SheetHeader>

      <div v-if="currentCount >= max" class="mb-3 text-sm text-red-600">
        Alcanzaste el límite de direcciones. Elimina o edita una existente.
      </div>

      <UserAddressForm
          v-model="model"
          :loading="loading || currentCount >= max"
          submit-label="Crear"
          @submit="submit"
      />

      <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>
    </SheetContent>
  </Sheet>
</template>
