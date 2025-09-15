<script lang="ts" setup>
import {ref, watch} from "vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Button from "@/components/ui/button/Button.vue";
import {useToast} from "@/components/ui/toast";
import type {OrderResponse} from "@/types/order";
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
const loading = ref(false);

const confirmCancel = async () => {
  if (!props.order) return;
  loading.value = true;
  try {
    await orderService.cancelMyOrder(props.order.id);
    toast({title: "Pedido cancelado", description: `Se canceló la orden ${props.order.id}`});
    internalOpen.value = false;
    emit("updated");
  } catch (e: any) {
    toast({
      title: "Error al cancelar",
      description: e?.message ?? "No se pudo cancelar la orden",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AlertDialog :open="internalOpen" @update:open="(v:boolean)=>internalOpen=v">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Cancelar pedido</AlertDialogTitle>
        <AlertDialogDescription>
          ¿Seguro que deseas cancelar la orden
          <span class="font-mono">{{ order?.id }}</span>? Esta acción no se puede deshacer.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="loading">Cerrar</AlertDialogCancel>
        <AlertDialogAction as-child>
          <Button :disabled="loading" variant="destructive" @click="confirmCancel">
            Confirmar
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
