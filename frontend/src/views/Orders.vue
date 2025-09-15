<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, RotateCcw} from "lucide-vue-next";

import Button from "@/components/ui/button/Button.vue";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

import router from "@/routes";
import {useToast} from "@/components/ui/toast";

// Tipos
import type {SortDirection} from "@/types/share";
import type {OrderPageResponse, OrderResponse, OrderSortForField, OrderStatuses,} from "@/types/order";

// Servicio (ajusta el path a tu implementación)
import {orderService} from "@/api/orderService";

// Componentes locales
import OrderStatusBadge from "@/components/OrderStatusBadge.vue";
import OrderActionsDropdown from "@/components/OrderActionsDropdown.vue";
import CancelOrderDialog from "@/components/CancelOrderDialog.vue";

// Controles tabla
const page = ref(0);
const size = ref(10);
const field = ref<OrderSortForField>("createdAt");
const direction = ref<SortDirection>("asc");
const statusFilter = ref<OrderStatuses | undefined>(undefined);

const {toast} = useToast();

const loading = ref(false);
const error = ref<string | null>(null);
const data = ref<OrderPageResponse>({
  orders: [],
  page: 0,
  size: 10,
  totalElements: 0,
  totalPages: 0,
});

const sortOn = (f: OrderSortForField) => {
  if (field.value === f) {
    direction.value = direction.value === "asc" ? "desc" : "asc";
  } else {
    field.value = f;
    direction.value = "asc";
  }
  fetchOrders();
};

const fetchOrders = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await orderService.getMyOrders(
        page.value,
        size.value,
        statusFilter.value,
        field.value,
        direction.value,
    );
    data.value = res;
  } catch (e: any) {
    error.value = e?.message ?? "Error cargando órdenes";
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (page.value + 1 < data.value.totalPages) {
    page.value += 1;
    fetchOrders();
  }
};
const prevPage = () => {
  if (page.value > 0) {
    page.value -= 1;
    fetchOrders();
  }
};
const reload = () => fetchOrders();

watch([size, statusFilter, field, direction], () => {
  page.value = 0;
  fetchOrders();
});

onMounted(fetchOrders);

// Navegación a billing cuando la orden está PENDING
const onRowClick = (order: OrderResponse, e?: MouseEvent) => {
  // si el click viene desde la celda de acciones, no navegues
  const target = e?.target as HTMLElement | undefined;
  if (target?.closest('[data-row-actions]')) return;

  if (order.status === "PENDING") {
    router.push({path: "/billing", query: {orderId: order.id}});
  }
};

// Control de modales/hojas
const selectedOrder = ref<OrderResponse | null>(null);
const openUpdate = ref(false);
const openCancel = ref(false);

const openUpdateFor = (o: OrderResponse) => {
  selectedOrder.value = o;
  openUpdate.value = true;
};
const openCancelFor = (o: OrderResponse) => {
  selectedOrder.value = o;
  openCancel.value = true;
};

// Helpers
const fMoney = (n: number) => new Intl.NumberFormat(undefined, {style: "currency", currency: "USD"}).format(n);
const fDate = (iso: string) => new Date(iso).toLocaleString();
</script>

<template>
  <div class="min-h-screen p-6">
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">My orders</h1>
        <p class="text-sm text-muted-foreground">Lista, filtra y administra tus pedidos.</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="grid gap-1">
          <Label class="text-xs">Estado</Label>
          <Select v-model="statusFilter">
            <SelectTrigger class="w-40">
              <SelectValue placeholder="Todos"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem :value="undefined">Todos</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="grid gap-1">
          <Label class="text-xs">Tamaño de página</Label>
          <Select v-model="size">
            <SelectTrigger class="w-36">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="5">5</SelectItem>
              <SelectItem :value="10">10</SelectItem>
              <SelectItem :value="20">20</SelectItem>
              <SelectItem :value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button :disabled="loading" variant="outline" @click="reload">
          <RotateCcw class="w-4 h-4 mr-2"/>
          Recargar
        </Button>
      </div>
    </header>

    <div class="rounded-xl border bg-card">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-2">
          <Badge variant="secondary">Orden: {{ field }} ({{ direction }})</Badge>
          <span class="text-xs text-muted-foreground">Total: {{ data.totalElements }}</span>
        </div>

        <div class="flex items-center gap-2">
          <Button :disabled="page===0 || loading" size="sm" variant="outline" @click="prevPage">
            <ChevronLeft class="h-4 w-4 mr-1"/>
            Prev
          </Button>
          <div class="text-sm tabular-nums">Página {{ page + 1 }} / {{ Math.max(data.totalPages, 1) }}</div>
          <Button :disabled="page+1 >= data.totalPages || loading" size="sm" variant="outline" @click="nextPage">
            Next
            <ChevronRight class="h-4 w-4 ml-1"/>
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>
          <span v-if="loading">Cargando órdenes…</span>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead class="cursor-pointer select-none" @click="sortOn('createdAt')">
              Fecha
              <ArrowUpDown class="inline h-4 w-4 ml-1"/>
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead class="cursor-pointer select-none" @click="sortOn('totalPrice')">
              Total
              <ArrowUpDown class="inline h-4 w-4 ml-1"/>
            </TableHead>
            <TableHead class="cursor-pointer select-none" @click="sortOn('status')">
              Estado
              <ArrowUpDown class="inline h-4 w-4 ml-1"/>
            </TableHead>
            <TableHead class="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-if="!loading && data.orders.length===0">
            <TableCell class="text-center text-sm text-muted-foreground" colspan="7">
              No hay órdenes para mostrar.
            </TableCell>
          </TableRow>

          <TableRow
              v-for="o in data.orders"
              :key="o.id"
              :class="[
              'hover:bg-muted/50 transition',
              o.status==='PENDING' ? 'cursor-pointer' : 'cursor-default'
            ]"
              @click="onRowClick(o, $event)"
          >
            <TableCell class="tabular-nums">{{ fDate(o.createdAt) }}</TableCell>
            <TableCell class="font-mono text-xs">{{ o.id }}</TableCell>
            <TableCell>{{ o.user }}</TableCell>
            <TableCell class="max-w-[280px]">
              <div class="truncate text-xs text-muted-foreground">
                {{ o.shippingAddress.fullName }} — {{ o.shippingAddress.addressLine }}, {{ o.shippingAddress.city }}
              </div>
            </TableCell>
            <TableCell class="tabular-nums font-medium">{{ fMoney(o.totalPrice) }}</TableCell>
            <TableCell>
              <OrderStatusBadge :status="o.status"/>
            </TableCell>
            <TableCell class="text-right" data-row-actions @click.stop>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button :disabled="loading" size="icon-sm" variant="ghost" @click.stop>
                    <MoreHorizontal class="h-5 w-5"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-56">
                  <OrderActionsDropdown
                      :order="o"
                      @cancel="openCancelFor(o)"
                      @update="openUpdateFor(o)"
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>

    <!-- Acciones -->
    <CancelOrderDialog
        v-model:open="openCancel"
        :order="selectedOrder"
        @updated="reload"
    />
  </div>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
