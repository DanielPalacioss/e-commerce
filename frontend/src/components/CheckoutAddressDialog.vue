<script lang="ts" setup>
import {computed, ref, watch} from "vue";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";

// Servicios y tipos
import {userAddressService} from "@/api/userAddressService";
import {orderService} from "@/api/orderService";
import type {UserAddressResponse} from "@/types/userAddress";
import type {OrderItemRequest, OrderRequest, OrderResponse} from "@/types/order";
import {CartItem} from "@/views/Products.vue";

// Estado del diálogo
const open = defineModel<boolean>('open', {default: false})

const props = defineProps<{
  items?: CartItem[]
}>();

// Estado de direcciones y selección
const addresses = ref<UserAddressResponse[]>([]);
const selectedAddressId = ref<string | null>(null);
const loadingAddresses = ref(false);
const creatingOrder = ref(false);
const errorMsg = ref<string | null>(null);

// Carga de direcciones cuando se abre el diálogo
watch(open, async (val) => {
  if (!val) return;
  await fetchAddresses();
});

async function fetchAddresses() {
  loadingAddresses.value = true;
  errorMsg.value = null;
  try {
    addresses.value = await userAddressService.getAll();
    // si ya hay direcciones, por UX podemos preseleccionar la primera
    if (addresses.value.length > 0 && !selectedAddressId.value) {
      selectedAddressId.value = addresses.value[0].id;
    }
  } catch (e) {
    console.error(e);
    errorMsg.value = "No pudimos cargar tus direcciones. Intenta nuevamente.";
  } finally {
    loadingAddresses.value = false;
  }
}

// Items Request
const orderItems = computed<OrderItemRequest[]>(() => {
  try {
    let cart: CartItem[] = [];

    if (props.items && props.items.length > 0) {
      cart = props.items;
    }

    return cart.map((it) => ({
      productId: it.product.id,
      quantity: it.quantity,
    }));
  } catch {
    return [];
  }
});

const canSubmit = computed(() => {
  return (
      !!selectedAddressId.value &&
      orderItems.value.length > 0 &&
      !creatingOrder.value &&
      !loadingAddresses.value
  );
});

const creatingText = computed(() =>
    creatingOrder.value ? "Creating order..." : "Finalize order"
);

// Crear orden
async function finalizeOrder() {
  if (!selectedAddressId.value) return;
  const payload: OrderRequest = {
    shippingAddressId: selectedAddressId.value,
    items: orderItems.value,
  };

  creatingOrder.value = true;
  errorMsg.value = null;

  try {
    const res: OrderResponse = await orderService.createMyOrder(payload);
    emit("orderCreated", res);
    // Cierra el diálogo
    open.value = false;
  } catch (e) {
    console.error(e);
    errorMsg.value = "No pudimos crear tu pedido. Revisa tu conexión e inténtalo otra vez.";
  } finally {
    creatingOrder.value = false;
  }
}

const emit = defineEmits<{
  (e: "orderCreated", order: OrderResponse): void;
}>();
</script>

<template>
  <Dialog v-model:open="open">

    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Select the shipping address</DialogTitle>
        <DialogDescription>
          Choose one of your saved addresses to send your order.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Address</label>

          <div v-if="loadingAddresses" class="text-sm text-muted-foreground">
            Loading addresses...
          </div>

          <div v-else>
            <Select v-model="selectedAddressId">
              <SelectTrigger class="w-full">
                <SelectValue
                    placeholder="Select an address"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                    v-for="addr in addresses"
                    :key="addr.id"
                    :value="addr.id"
                    class="max-w-full truncate"
                >
                  <span
                      :title="`${addr.fullName} — ${addr.addressLine}, ${addr.city}, ${addr.state} ${addr.postalCode}, ${addr.country}`"
                      class="block max-w-[400px] truncate"
                  >
                    {{ addr.fullName }} — {{ addr.addressLine }}, {{ addr.city }},
                    {{ addr.state }} {{ addr.postalCode }}, {{ addr.country }}
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>

            <p v-if="addresses.length === 0" class="text-sm text-muted-foreground mt-2">
              You don't have any saved addresses yet.
            </p>
          </div>
        </div>

        <div class="space-y-1">
          <p class="text-sm">
            Items in the order: <strong>{{ orderItems.length }}</strong>
          </p>
          <p v-if="orderItems.length === 0" class="text-xs text-muted-foreground">
            Your cart is empty.
          </p>
        </div>

        <p v-if="errorMsg" class="text-sm text-red-600">
          {{ errorMsg }}
        </p>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="open = false">Cancelar</Button>
        <Button :disabled="!canSubmit" @click="finalizeOrder">
          {{ creatingText }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
</style>
