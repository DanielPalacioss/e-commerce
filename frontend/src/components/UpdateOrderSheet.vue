<script lang="ts" setup>
import {computed, reactive, ref, watch} from "vue";
import {Sheet, SheetContent, SheetHeader, SheetTitle,} from "@/components/ui/sheet";
import Button from "@/components/ui/button/Button.vue";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Minus, Plus, Save, Trash2} from "lucide-vue-next";
import {useToast} from "@/components/ui/toast";

import type {OrderRequest, OrderResponse} from "@/types/order";
import {orderService} from "@/api/orderService";

const props = defineProps<{
  open: boolean;
  order: OrderResponse | null;
}>();

const emit = defineEmits<{
  (e: "update:open", v: boolean): void;
  (e: "updated"): void;
}>();

const internalOpen = ref(props.open);
watch(() => props.open, (v) => (internalOpen.value = v));
watch(internalOpen, (v) => emit("update:open", v));

const {toast} = useToast();

// Estado editable
type EditableItem = { productId: string; quantity: number; name?: string; price?: number };
const form = reactive<{
  shippingAddressId: string;
  items: EditableItem[];
}>(() => ({
  shippingAddressId: "",
  items: [],
}));

watch(
    () => props.order,
    (o) => {
      if (!o) return;
      form.shippingAddressId = o.shippingAddress.id;
      form.items = o.items.map((it) => ({
        productId: it.productId,
        quantity: it.quantity,
        price: it.price,
      }));
    },
    {immediate: true},
);

const addItem = () => form.items.push({productId: "", quantity: 1});
const removeItem = (idx: number) => form.items.splice(idx, 1);
const inc = (idx: number) => form.items[idx].quantity++;
const dec = (idx: number) => {
  if (form.items[idx].quantity > 1) form.items[idx].quantity--;
};

const canSubmit = computed(() => {
  if (!props.order) return false;
  if (!form.shippingAddressId) return false;
  if (form.items.length === 0) return false;
  return form.items.every(it => it.productId && it.quantity > 0);
});

const loading = ref(false);

const submit = async () => {
  if (!props.order) return;
  if (!canSubmit.value) {
    toast({title: "Formulario incompleto", description: "Revisa los campos", variant: "destructive"});
    return;
  }
  loading.value = true;
  try {
    const payload: OrderRequest = {
      shippingAddressId: form.shippingAddressId,
      items: form.items.map(({productId, quantity}) => ({productId, quantity})),
    };
    await orderService.updateMyOrder(props.order.id, payload);
    toast({title: "Pedido actualizado", description: `Orden ${props.order.id} actualizada`});
    internalOpen.value = false;
    emit("updated");
  } catch (e: any) {
    toast({
      title: "Error al actualizar",
      description: e?.message ?? "No se pudo actualizar la orden",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Sheet :open="internalOpen" @update:open="(v:boolean)=>internalOpen=v">
    <SheetContent class="w-[520px]" side="right">
      <SheetHeader>
        <SheetTitle>Actualizar pedido</SheetTitle>
      </SheetHeader>

      <div class="mt-6 space-y-6">
        <div class="grid gap-2">
          <Label for="addr">Shipping Address ID</Label>
          <Input id="addr" v-model="form.shippingAddressId" placeholder="address-id-123"/>
          <p class="text-xs text-muted-foreground">
            Usa el ID de la dirección a aplicar.
          </p>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <Label>Items</Label>
            <Button size="sm" variant="outline" @click="addItem">
              <Plus class="w-4 h-4 mr-2"/>
              Agregar
            </Button>
          </div>

          <div v-if="form.items.length === 0" class="text-sm text-muted-foreground">
            No hay items. Agrega productos para actualizar la orden.
          </div>

          <div v-for="(it, idx) in form.items" :key="idx" class="rounded-md border p-3">
            <div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <div class="grid gap-2">
                <Label :for="`prod-${idx}`">Product ID</Label>
                <Input :id="`prod-${idx}`" v-model="it.productId" placeholder="product-id"/>
              </div>

              <div class="flex items-center gap-2">
                <Button size="icon" variant="outline" @click="dec(idx)">
                  <Minus class="w-4 h-4"/>
                </Button>
                <Input v-model.number="it.quantity" class="w-16 text-center" min="1" type="number"/>
                <Button size="icon" variant="outline" @click="inc(idx)">
                  <Plus class="w-4 h-4"/>
                </Button>
              </div>
            </div>

            <div class="mt-2 flex justify-end">
              <Button size="sm" variant="destructive" @click="removeItem(idx)">
                <Trash2 class="w-4 h-4 mr-2"/>
                Quitar
              </Button>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <Button :disabled="loading" variant="outline" @click="internalOpen=false">Cerrar</Button>
          <Button :disabled="!canSubmit || loading" @click="submit">
            <Save class="w-4 h-4 mr-2"/>
            Guardar cambios
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
