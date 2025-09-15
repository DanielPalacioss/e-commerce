<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { ChevronLeft, ChevronRight, ArrowUpDown, RotateCcw, CreditCard } from "lucide-vue-next";

// UI
import Button from "@/components/ui/button/Button.vue";
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

// Tipos
import type { SortDirection } from "@/types/share";
import type {
  InvoiceResponseDTO,
  InvoicePageResponseDTO,
  InvoiceSortForField,
  PaymentMethod,
} from "@/types/invoice";

// Servicio
import { invoiceService } from "@/api/invoiceService";

// Controles tabla
const page = ref(0);
const size = ref(10);
const field = ref<InvoiceSortForField>("createdAt");
const direction = ref<SortDirection>("asc");
const paymentMethodFilter = ref<PaymentMethod | undefined>(undefined);

const { toast } = useToast();

const loading = ref(false);
const error = ref<string | null>(null);
const data = ref<InvoicePageResponseDTO>({
  invoices: [],
  page: 0,
  size: 10,
  totalElements: 0,
  totalPages: 0,
});

const sortOn = (f: InvoiceSortForField) => {
  if (field.value === f) {
    direction.value = direction.value === "asc" ? "desc" : "asc";
  } else {
    field.value = f;
    direction.value = "asc";
  }
  fetchInvoices();
};

const fetchInvoices = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await invoiceService.getInvoicesMe(
        page.value,
        size.value,
        field.value,
        direction.value,
        paymentMethodFilter.value
    );
    data.value = res;
  } catch (e: any) {
    error.value = e?.message ?? "Error cargando invoices";
    toast({
      title: "No se pudieron cargar las invoices",
      description: error.value,
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (page.value + 1 < data.value.totalPages) {
    page.value += 1;
    fetchInvoices();
  }
};
const prevPage = () => {
  if (page.value > 0) {
    page.value -= 1;
    fetchInvoices();
  }
};
const reload = () => fetchInvoices();
const clearFilters = () => {
  paymentMethodFilter.value = undefined;
  field.value = "createdAt";
  direction.value = "asc";
  page.value = 0;
  fetchInvoices();
};

watch([size, paymentMethodFilter, field, direction], () => {
  page.value = 0;
  fetchInvoices();
});

onMounted(fetchInvoices);

// Helpers
const fMoney = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
const fDate = (iso: string) => new Date(iso).toLocaleString();
const pmLabel = (pm: PaymentMethod) => (pm === "CREDIT_CARD" ? "Credit card" : "Debit card");
</script>

<template>
  <div class="min-h-screen p-6">
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">My invoices</h1>
        <p class="text-sm text-muted-foreground">Consulta y filtra tus facturas.</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="grid gap-1">
          <Label class="text-xs">Método de pago</Label>
          <Select v-model="paymentMethodFilter">
            <SelectTrigger class="w-44">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem :value="undefined">Todos</SelectItem>
                <SelectItem value="CREDIT_CARD">CREDIT_CARD</SelectItem>
                <SelectItem value="DEBIT_CARD">DEBIT_CARD</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="grid gap-1">
          <Label class="text-xs">Tamaño de página</Label>
          <Select v-model="size">
            <SelectTrigger class="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="5">5</SelectItem>
              <SelectItem :value="10">10</SelectItem>
              <SelectItem :value="20">20</SelectItem>
              <SelectItem :value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" :disabled="loading" @click="reload">
          <RotateCcw class="w-4 h-4 mr-2" /> Recargar
        </Button>
        <Button variant="secondary" :disabled="loading" @click="clearFilters">
          Limpiar filtros
        </Button>
      </div>
    </header>

    <div class="rounded-xl border bg-card">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Orden: {{ field }} ({{ direction }})</Badge>
          <Badge v-if="paymentMethodFilter" variant="secondary">PM: {{ paymentMethodFilter }}</Badge>
          <span class="text-xs text-muted-foreground">Total: {{ data.totalElements }}</span>
        </div>

        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" @click="prevPage" :disabled="page===0 || loading">
            <ChevronLeft class="h-4 w-4 mr-1" /> Prev
          </Button>
          <div class="text-sm tabular-nums">Página {{ page + 1 }} / {{ Math.max(data.totalPages, 1) }}</div>
          <Button variant="outline" size="sm" @click="nextPage" :disabled="page+1 >= data.totalPages || loading">
            Next <ChevronRight class="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>
          <span v-if="loading">Cargando invoices…</span>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead class="cursor-pointer select-none" @click="sortOn('createdAt')">
              Fecha <ArrowUpDown class="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead class="cursor-pointer select-none" @click="sortOn('totalAmount')">
              Total <ArrowUpDown class="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead class="cursor-pointer select-none" @click="sortOn('paymentMethod')">
              Método de pago <ArrowUpDown class="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Order ID</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-if="!loading && data.invoices.length===0">
            <TableCell colspan="5" class="text-center text-sm text-muted-foreground">
              No hay invoices para mostrar.
            </TableCell>
          </TableRow>

          <TableRow
              v-for="inv in data.invoices"
              :key="inv.id"
              class="hover:bg-muted/50 transition"
          >
            <TableCell class="tabular-nums">{{ fDate(inv.createdAt) }}</TableCell>
            <TableCell class="tabular-nums font-medium">{{ fMoney(inv.totalAmount) }}</TableCell>
            <TableCell>
              <Badge class="gap-1">
                <CreditCard class="h-3.5 w-3.5" />
                {{ pmLabel(inv.paymentMethod) }}
              </Badge>
            </TableCell>
            <TableCell class="font-mono text-xs">{{ inv.id }}</TableCell>
            <TableCell class="font-mono text-xs">{{ inv.orderId }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<style scoped>
.tabular-nums { font-variant-numeric: tabular-nums; }
</style>
