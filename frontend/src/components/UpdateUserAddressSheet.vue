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
  address: UserAddressResponse | null;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "updated", value: UserAddressResponse): void;
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
      if (o && props.address) {
        const { fullName, phone, addressLine, city, state, postalCode, country } = props.address;
        model.value = { fullName, phone, addressLine, city, state, postalCode, country };
        error.value = null;
      }
    }
);

const setOpen = (v: boolean) => emit("update:open", v);

const submit = async () => {
  if (!props.address) return;
  loading.value = true;
  error.value = null;
  try {
    const updated = await userAddressService.update(props.address.id, model.value);
    emit("updated", updated);
    setOpen(false);
  } catch (e: any) {
    error.value = e?.message ?? "No se pudo actualizar la dirección";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Sheet :open="open" @update:open="setOpen">
    <SheetContent side="right" class="w-full sm:max-w-xl">
      <SheetHeader class="mb-4">
        <SheetTitle>Editar dirección</SheetTitle>
        <SheetDescription>Actualiza los datos de la dirección seleccionada.</SheetDescription>
      </SheetHeader>

      <UserAddressForm
          v-model="model"
          :loading="loading || !address"
          submit-label="Actualizar"
          @submit="submit"
      />

      <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>
    </SheetContent>
  </Sheet>
</template>
