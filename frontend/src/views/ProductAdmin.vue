<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {ArrowUp, ChevronLeft, ChevronRight, MoreHorizontal, Power, Upload, Pencil, Plus} from "lucide-vue-next";

import Button from "@/components/ui/button/Button.vue";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";

import {productService} from "@/api/productService";
import type {
  ProductCategories,
  ProductPageResponseDTO,
  ProductResponseDTO,
  ProductSortForField,
} from "@/types/product";
import type {SortDirection} from "@/types/share";

// Componentes de acciones
import IncreaseStockDialog from "@/components/IncreaseStockDialog.vue";
import ActivateProductDialog from "@/components/ActivateProductDialog.vue";
import DeactivateProductDialog from "@/components/DeactivateProductDialog.vue";
import UploadImageDialog from "@/components/UploadImageDialog.vue";
import CreateProductSheet from "@/components/CreateProductSheet.vue";
import UpdateProductSheet from "@/components/UpdateProductSheet.vue";

// Controles de tabla
const page = ref(0);
const size = ref(10);
const field = ref<ProductSortForField>("name");
const direction = ref<SortDirection>("asc");
const category = ref<ProductCategories | undefined>(undefined);
const active = ref<boolean>(true);

const loading = ref(false);
const error = ref<string | null>(null);
const data = ref<ProductPageResponseDTO>({
  products: [],
  page: 0,
  size: 10,
  totalElements: 0,
  totalPages: 0,
});

// cat enum para el filtro
const categories: ProductCategories[] = [
  "ELECTRONICS", "FASHION", "HOME", "BEAUTY", "SPORTS", "BOOKS", "GROCERY",
];

const sortOn = (f: ProductSortForField) => {
  if (field.value === f) {
    direction.value = direction.value === "asc" ? "desc" : "asc";
  } else {
    field.value = f;
    direction.value = "asc";
  }
  fetchProducts();
};

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await productService.getProducts(
        page.value, size.value, field.value, direction.value, category.value, active.value
    );
    data.value = res;
  } catch (e: any) {
    error.value = e?.message ?? "Error cargando productos";
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (page.value + 1 < data.value.totalPages) {
    page.value += 1;
    fetchProducts();
  }
};
const prevPage = () => {
  if (page.value > 0) {
    page.value -= 1;
    fetchProducts();
  }
};

// recargar tras acciones hijas
const reload = () => fetchProducts();

// selección para acciones
const selectedProduct = ref<ProductResponseDTO | null>(null);
const openIncrease = ref(false);
const openActivate = ref(false);
const openDeactivate = ref(false);
const openUpload = ref(false);
const openCreate = ref(false);
const openUpdate = ref(false);

const openUpdateFor = (p: ProductResponseDTO) => {
  selectedProduct.value = p;
  openUpdate.value = true;
};

const openIncreaseFor = (p: ProductResponseDTO) => {
  selectedProduct.value = p;
  openIncrease.value = true;
};
const openActivateFor = (p: ProductResponseDTO) => {
  selectedProduct.value = p;
  openActivate.value = true;
};
const openDeactivateFor = (p: ProductResponseDTO) => {
  selectedProduct.value = p;
  openDeactivate.value = true;
};
const openUploadFor = (p: ProductResponseDTO) => {
  selectedProduct.value = p;
  openUpload.value = true;
};

// Cuando cambie tamaño/filtros orden, resetea a página 0 y trae
watch([size, category, active, field, direction], () => {
  page.value = 0;
  fetchProducts();
});

onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen p-6">
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Product administrative panel</h1>
        <p class="text-sm text-muted-foreground">Lista, filtra y administra productos del backend.</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="grid gap-1">
          <Label class="text-xs">Categoría</Label>
          <Select v-model="category">
            <SelectTrigger class="w-44">
              <SelectValue placeholder="Todas"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem :value="undefined">Todas</SelectItem>
                <SelectItem v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="grid gap-1">
          <Label class="text-xs">Estado</Label>
          <Select v-model="active">
            <SelectTrigger class="w-36">
              <SelectValue placeholder="Estado"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="true">Activos</SelectItem>
              <SelectItem :value="false">Inactivos</SelectItem>
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
      </div>

      <Button @click="openCreate = true">
        <Plus class="w-4 h-4 mr-2"/>
        New Product
      </Button>
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
          <span v-if="loading">Cargando productos…</span>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="cursor-pointer" @click="sortOn('name')">
              Nombre
            </TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead class="cursor-pointer" @click="sortOn('price')">
              Precio
            </TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Activo</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="!loading && data.products.length===0">
            <TableCell class="text-center text-sm text-muted-foreground" colspan="7">
              No hay productos para mostrar.
            </TableCell>
          </TableRow>

          <TableRow v-for="p in data.products" :key="p.id">
            <TableCell class="font-medium">
              <div class="flex flex-col">
                <span>{{ p.name }}</span>
                <span class="text-xs text-muted-foreground line-clamp-1">{{ p.description }}</span>
              </div>
            </TableCell>

            <TableCell>
              <div class="h-10 w-10 overflow-hidden rounded-md border bg-muted">
                <img v-if="p.imageUrl" :src="p.imageUrl" alt="" class="h-full w-full object-cover"/>
              </div>
            </TableCell>

            <TableCell class="tabular-nums">$ {{ p.price.toFixed(2) }}</TableCell>
            <TableCell class="tabular-nums">{{ p.quantity }}</TableCell>
            <TableCell>
              <Badge>{{ p.category }}</Badge>
            </TableCell>
            <TableCell>
              <Badge :variant="p.active ? 'default' : 'destructive'">
                {{ p.active ? 'Sí' : 'No' }}
              </Badge>
            </TableCell>

            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button :disabled="loading" size="icon-sm" variant="ghost">
                    <MoreHorizontal class="h-5 w-5"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-56">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuSeparator/>

                  <DropdownMenuItem @click="openUpdateFor(p)">
                    <Pencil class="h-4 w-4 mr-2"/>
                    Editar producto
                  </DropdownMenuItem>

                  <DropdownMenuItem @click="openIncreaseFor(p)">
                    <ArrowUp class="h-4 w-4 mr-2"/>
                    Incrementar stock
                  </DropdownMenuItem>

                  <DropdownMenuItem v-if="!p.active" class="text-green-600" @click="openActivateFor(p)">
                    <Power class="h-4 w-4 mr-2"/>
                    Activar producto
                  </DropdownMenuItem>

                  <DropdownMenuItem v-else class="text-red-600" @click="openDeactivateFor(p)">
                    <Power class="h-4 w-4 mr-2"/>
                    Desactivar producto
                  </DropdownMenuItem>

                  <DropdownMenuItem @click="openUploadFor(p)">
                    <Upload class="h-4 w-4 mr-2"/>
                    Upload image
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>

    <!-- Modales de acción (controlados desde el padre) -->
    <IncreaseStockDialog
        v-model:open="openIncrease"
        :product="selectedProduct"
        @updated="reload"
    />

    <ActivateProductDialog
        v-model:open="openActivate"
        :product="selectedProduct"
        @updated="reload"
    />

    <DeactivateProductDialog
        v-model:open="openDeactivate"
        :product="selectedProduct"
        @updated="reload"
    />

    <UploadImageDialog
        v-model:open="openUpload"
        :product="selectedProduct"
        @updated="reload"
    />

    <CreateProductSheet
        v-model:open="openCreate"
        @created="reload"
    />

    <UpdateProductSheet
        v-model:open="openUpdate"
        :product="selectedProduct"
        @updated="reload"
    />
  </div>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
