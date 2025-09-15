<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-vue-next";

import Button from "@/components/ui/button/Button.vue";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { userAddressService } from "@/api/userAddressService";
import type { UserAddressResponse } from "@/types/userAddress";

// Componentes hijos
import UserAddressRowActions from "@/components/UserAddressRowActions.vue";
import CreateUserAddressSheet from "@/components/CreateUserAddressSheet.vue";
import UpdateUserAddressSheet from "@/components/UpdateUserAddressSheet.vue";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog.vue";

const MAX_ADDRESSES = 3;

const loading = ref(false);
const error = ref<string | null>(null);
const addresses = ref<UserAddressResponse[]>([]);

const createOpen = ref(false);
const updateOpen = ref(false);
const deleteOpen = ref(false);

const selectedAddress = ref<UserAddressResponse | null>(null);

const canCreateMore = computed(() => addresses.value.length < MAX_ADDRESSES);

const fetchAddresses = async () => {
  loading.value = true;
  error.value = null;
  try {
    addresses.value = await userAddressService.getAll();
  } catch (e: any) {
    error.value = e?.message ?? "Error cargando direcciones";
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  if (canCreateMore.value) createOpen.value = true;
};

const openUpdateFor = (addr: UserAddressResponse) => {
  selectedAddress.value = addr;
  updateOpen.value = true;
};

const openDeleteFor = (addr: UserAddressResponse) => {
  selectedAddress.value = addr;
  deleteOpen.value = true;
};

const deleteSelected = async () => {
  if (!selectedAddress.value) return;
  loading.value = true;
  error.value = null;
  try {
    await userAddressService.delete(selectedAddress.value.id);
    await fetchAddresses();
  } catch (e: any) {
    error.value = e?.message ?? "No se pudo eliminar la dirección";
  } finally {
    loading.value = false;
    deleteOpen.value = false;
    selectedAddress.value = null;
  }
};

const reload = () => fetchAddresses();

onMounted(fetchAddresses);
</script>

<template>
  <div class="min-h-screen p-6">
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Direcciones del usuario</h1>
        <p class="text-sm text-muted-foreground">
          Administra tus direcciones de envío. Máximo {{ MAX_ADDRESSES }} por usuario.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <Badge variant="secondary">Total: {{ addresses.length }}</Badge>
        <Button :disabled="!canCreateMore || loading" @click="openCreate">
          <Plus class="w-4 h-4 mr-2" />
          Nueva dirección
        </Button>
      </div>
    </header>

    <div
        v-if="!canCreateMore"
        class="mb-4 rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground"
    >
      Alcanzaste el límite de {{ MAX_ADDRESSES }} direcciones. Elimina o edita una existente para poder agregar otra.
    </div>

    <div class="rounded-xl border bg-card">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-2">
          <Badge variant="secondary">Direcciones: {{ addresses.length }}</Badge>
        </div>
      </div>

      <Table>
        <TableCaption>
          <span v-if="loading">Cargando direcciones…</span>
          <span v-else-if="addresses.length === 0">No hay direcciones para mostrar.</span>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Estado/Provincia</TableHead>
            <TableHead>Código Postal</TableHead>
            <TableHead>País</TableHead>
            <TableHead class="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="a in addresses" :key="a.id">
            <TableCell class="font-medium">{{ a.fullName }}</TableCell>
            <TableCell class="tabular-nums">{{ a.phone }}</TableCell>
            <TableCell class="max-w-[280px]">
              <div class="line-clamp-2">{{ a.addressLine }}</div>
            </TableCell>
            <TableCell>{{ a.city }}</TableCell>
            <TableCell>{{ a.state }}</TableCell>
            <TableCell class="tabular-nums">{{ a.postalCode }}</TableCell>
            <TableCell>{{ a.country }}</TableCell>
            <TableCell class="text-right">
              <UserAddressRowActions
                  :address="a"
                  :disabled="loading"
                  @edit="openUpdateFor"
                  @delete="openDeleteFor"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>

    <!-- Crear -->
    <CreateUserAddressSheet
        v-model:open="createOpen"
        :current-count="addresses.length"
        :max="MAX_ADDRESSES"
        @created="reload"
    />

    <!-- Actualizar -->
    <UpdateUserAddressSheet
        v-model:open="updateOpen"
        :address="selectedAddress"
        @updated="reload"
    />

    <!-- Confirmar eliminación -->
    <ConfirmDeleteDialog
        v-model:open="deleteOpen"
        title="Eliminar dirección"
        :description="selectedAddress ? `¿Seguro que deseas eliminar la dirección de ${selectedAddress.fullName}?` : ''"
        confirm-label="Eliminar"
        danger
        @confirm="deleteSelected"
    />
  </div>
</template>

<style scoped>
.tabular-nums { font-variant-numeric: tabular-nums; }
</style>
