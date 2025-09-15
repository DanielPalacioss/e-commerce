<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/button/Button.vue";
import type { UserAddressRequest } from "@/types/userAddress";

const props = defineProps<{
  modelValue: UserAddressRequest;
  loading?: boolean;
  submitLabel?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: UserAddressRequest): void;
  (e: "submit"): void;
}>();

const form = reactive<UserAddressRequest>({ ...props.modelValue });

watch(
    () => props.modelValue,
    (v) => {
      Object.assign(form, v);
    },
    { deep: true }
);

const updateField = (k: keyof UserAddressRequest, v: string) => {
  (form[k] as string) = v;
  emit("update:modelValue", { ...form });
};

const errors = reactive<Record<keyof UserAddressRequest, string | null>>({
  fullName: null,
  phone: null,
  addressLine: null,
  city: null,
  state: null,
  postalCode: null,
  country: null,
});

const validate = () => {
  let ok = true;
  for (const key of Object.keys(errors) as (keyof UserAddressRequest)[]) {
    errors[key] = null;
  }

  if (!form.fullName?.trim()) { errors.fullName = "Requerido"; ok = false; }
  if (!form.phone?.trim()) { errors.phone = "Requerido"; ok = false; }
  if (!form.addressLine?.trim()) { errors.addressLine = "Requerido"; ok = false; }
  if (!form.city?.trim()) { errors.city = "Requerido"; ok = false; }
  if (!form.state?.trim()) { errors.state = "Requerido"; ok = false; }
  if (!form.postalCode?.trim()) { errors.postalCode = "Requerido"; ok = false; }
  if (!form.country?.trim()) { errors.country = "Requerido"; ok = false; }

  if (form.phone && form.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Teléfono inválido";
    ok = false;
  }
  return ok;
};

const onSubmit = () => {
  if (!validate()) return;
  emit("submit");
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid gap-4">
    <!-- Nombre -->
    <div class="grid gap-1.5">
      <Label for="fullName">Nombre completo</Label>
      <input
          id="fullName"
          type="text"
          :value="form.fullName"
          @input="updateField('fullName', ($event.target as HTMLInputElement).value)"
          class="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Ej: Juan Pérez"
      />
      <p v-if="errors.fullName" class="text-xs text-red-600">{{ errors.fullName }}</p>
    </div>

    <!-- Teléfono -->
    <div class="grid gap-1.5">
      <Label for="phone">Teléfono</Label>
      <input
          id="phone"
          type="tel"
          :value="form.phone"
          @input="updateField('phone', ($event.target as HTMLInputElement).value)"
          class="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="+57 300 000 0000"
      />
      <p v-if="errors.phone" class="text-xs text-red-600">{{ errors.phone }}</p>
    </div>

    <!-- Dirección -->
    <div class="grid gap-1.5">
      <Label for="addressLine">Dirección</Label>
      <input
          id="addressLine"
          type="text"
          :value="form.addressLine"
          @input="updateField('addressLine', ($event.target as HTMLInputElement).value)"
          class="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Calle 123 #45-67, Apto 101"
      />
      <p v-if="errors.addressLine" class="text-xs text-red-600">{{ errors.addressLine }}</p>
    </div>

    <!-- Ciudad / Estado -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="grid gap-1.5">
        <Label for="city">Ciudad</Label>
        <input
            id="city"
            type="text"
            :value="form.city"
            @input="updateField('city', ($event.target as HTMLInputElement).value)"
            class="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Bogotá"
        />
        <p v-if="errors.city" class="text-xs text-red-600">{{ errors.city }}</p>
      </div>
      <div class="grid gap-1.5">
        <Label for="state">Estado / Provincia</Label>
        <input
            id="state"
            type="text"
            :value="form.state"
            @input="updateField('state', ($event.target as HTMLInputElement).value)"
            class="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Cundinamarca"
        />
        <p v-if="errors.state" class="text-xs text-red-600">{{ errors.state }}</p>
      </div>
    </div>

    <!-- Postal / País -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="grid gap-1.5">
        <Label for="postalCode">Código Postal</Label>
        <input
            id="postalCode"
            type="text"
            :value="form.postalCode"
            @input="updateField('postalCode', ($event.target as HTMLInputElement).value)"
            class="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="110111"
        />
        <p v-if="errors.postalCode" class="text-xs text-red-600">{{ errors.postalCode }}</p>
      </div>
      <div class="grid gap-1.5">
        <Label for="country">País</Label>
        <input
            id="country"
            type="text"
            :value="form.country"
            @input="updateField('country', ($event.target as HTMLInputElement).value)"
            class="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Colombia"
        />
        <p v-if="errors.country" class="text-xs text-red-600">{{ errors.country }}</p>
      </div>
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <Button type="submit" :disabled="loading">
        {{ submitLabel ?? 'Guardar' }}
      </Button>
    </div>
  </form>
</template>
