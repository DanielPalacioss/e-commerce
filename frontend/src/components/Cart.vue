<script lang="ts" setup>

import {Minus, Plus, ShoppingCart, Trash2} from "lucide-vue-next";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Button from "./ui/button/Button.vue";
import {CartItem} from "@/views/Products.vue"
import {ref} from "vue";
import CheckoutAddressDialog from "@/components/CheckoutAddressDialog.vue";
import {getToken} from "@/api/authService";
import router from "@/routes";
import {useToast} from "@/components/ui/toast";

const props = defineProps<{
  cart: CartItem[]
  total: number
}>()

// Eventos al padre
const emit = defineEmits(["increase", "decrease", "remove", "checkout"]);
const {toast} = useToast()

// Estado para abrir/cerrar el dialog
const addressDialogOpen = ref(false);

// Abre el dialog y guarda el carrito en localStorage
function openAddressDialog() {
  const token = getToken();
  if (!token) {
    toast({
      title: "Error",
      description: "You must log in",
      variant: "destructive",
    })
    // Cerrar el sheet
    document.body.click();
    router.push("/login");
    return;
  }
  addressDialogOpen.value = true;
}

// Cuando se crea la orden en el dialog
function handleOrderCreated(order: any) {

  localStorage.removeItem("actualItems");
  // Notifica al padre que se hizo checkout
  emit("checkout", order);
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50">
    <Sheet>
      <SheetTrigger as-child>
        <Button class="relative shadow-md">
          <ShoppingCart class="w-5 h-5"/>
          <span
              v-if="props.cart.length > 0"
              class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {{ props.cart.length }}
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent class="w-96 flex flex-col h-full" side="right">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>Review what you've added.</SheetDescription>
        </SheetHeader>

        <!-- Lista -->
        <div class="flex-1 mt-4 overflow-y-auto pr-2">
          <div v-if="props.cart.length > 0" class="space-y-4">
            <div
                v-for="(item, index) in props.cart"
                :key="item.product.id"
                class="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p class="font-semibold">{{ item.product.name }}</p>
                <p class="text-sm text-gray-500">
                  ${{ item.product.price.toFixed(2) }} x {{ item.quantity }}
                </p>
                <p class="text-sm font-bold text-emerald-600">
                  Subtotal: ${{ (item.product.price * item.quantity).toFixed(2) }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <Button size="sm" variant="outline" @click="$emit('decrease', index)">
                  <Minus class="w-4 h-4"/>
                </Button>
                <span class="w-6 text-center">{{ item.quantity }}</span>
                <Button size="sm" variant="outline" @click="$emit('increase', index)">
                  <Plus class="w-4 h-4"/>
                </Button>
                <Button size="sm" variant="destructive" @click="$emit('remove', index)">
                  <Trash2 class="w-4 h-4"/>
                </Button>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500 mt-6">El carrito está vacío.</p>
        </div>

        <!-- Total -->
        <div class="border-t pt-4 bg-white sticky bottom-0">
          <div class="flex justify-between items-center font-bold text-lg mb-4">
            <span>Total:</span>
            <span>${{ props.total }}</span>
          </div>
          <div class="flex justify-end space-x-2">
            <SheetClose as-child>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button
                :disabled="props.cart.length === 0"
                class="bg-emerald-600 text-white hover:bg-emerald-700"
                @click="openAddressDialog"
            >
              Place order
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
    <CheckoutAddressDialog
        v-model:open="addressDialogOpen"
        :items="props.cart"
        @orderCreated="handleOrderCreated"
    />
  </div>
</template>

<style scoped>

</style>