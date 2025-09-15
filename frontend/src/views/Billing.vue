<script lang="ts" setup>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {invoiceService} from "@/api/invoiceService"; // ajusta la ruta si tu proyecto la usa distinta
import type {PaymentMethod} from "@/types/invoice";

// shadcn-vue UI
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

const route = useRoute();
const orderId = computed(() => (route.query.orderId ? String(route.query.orderId) : ""));

const holderName = ref("");
const cardNumber = ref("");
const expiryMonth = ref("");
const expiryYear = ref("");
const cvv = ref("");
const paymentMethod = ref<PaymentMethod>("CREDIT_CARD");

const loading = ref(false);
const error = ref<string | null>(null);
const invoiceId = ref<string | null>(null);

const isValid = computed(() => {
  const raw = cardNumber.value.replace(/\s+/g, "");
  const mm = Number(expiryMonth.value);
  const yy = Number(expiryYear.value);
  const mmOk = /^\d{2}$/.test(expiryMonth.value) && mm >= 1 && mm <= 12;
  const yyOk = /^\d{2}$/.test(expiryYear.value);
  return (
      !!orderId.value &&
      holderName.value.trim().length >= 3 &&
      /^\d{13,19}$/.test(raw) &&
      mmOk &&
      yyOk &&
      /^\d{3,4}$/.test(cvv.value)
  );
});

function onCardNumberInput() {
  const digits = cardNumber.value.replace(/\D/g, "").slice(0, 19);
  cardNumber.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

async function pay() {
  error.value = null;
  invoiceId.value = null;
  if (!isValid.value) {
    error.value = "Completa los datos correctamente.";
    return;
  }
  loading.value = true;
  try {
    const id: string = await invoiceService.createInvoice(orderId.value, paymentMethod.value);
    invoiceId.value = id;
  } catch (e: any) {
    error.value = e?.response?.data?.message || "No se pudo crear la factura. Intenta de nuevo.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container mx-auto max-w-xl p-4">
    <Card>
      <CardHeader>
        <CardTitle>Pago del pedido</CardTitle>
        <CardDescription>
          Completa los datos de la tarjeta (simulación) y genera la factura.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="!orderId" class="text-sm text-destructive">
          Falta el parámetro <code>orderId</code> en la URL.
        </div>

        <form v-else class="grid gap-4" @submit.prevent="pay">
          <!-- Simulación de tarjeta -->
          <div class="grid gap-2">
            <Label for="holder">Nombre del titular</Label>
            <Input id="holder" v-model="holderName" autocomplete="cc-name" placeholder="Como aparece en la tarjeta"/>
          </div>

          <div class="grid gap-2">
            <Label for="card">Número de tarjeta</Label>
            <Input id="card" v-model="cardNumber" autocomplete="cc-number" inputmode="numeric"
                   maxlength="19" placeholder="4111 1111 1111 1111"
                   @input="onCardNumberInput"/>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="grid gap-2">
              <Label for="mm">MM</Label>
              <Input id="mm" v-model="expiryMonth" autocomplete="cc-exp-month" inputmode="numeric" maxlength="2"
                     placeholder="MM"/>
            </div>
            <div class="grid gap-2">
              <Label for="yy">YY</Label>
              <Input id="yy" v-model="expiryYear" autocomplete="cc-exp-year" inputmode="numeric" maxlength="2"
                     placeholder="YY"/>
            </div>
            <div class="grid gap-2">
              <Label for="cvv">CVV</Label>
              <Input id="cvv" v-model="cvv" autocomplete="cc-csc" inputmode="numeric" maxlength="4" placeholder="123"
                     type="password"/>
            </div>
          </div>

          <div class="grid gap-2">
            <Label>Método de pago</Label>
            <RadioGroup v-model="paymentMethod" class="grid grid-cols-2 gap-3">
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="pm-credit" value="CREDIT_CARD"/>
                <Label for="pm-credit">Crédito</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="pm-debit" value="DEBIT_CARD"/>
                <Label for="pm-debit">Débito</Label>
              </div>
            </RadioGroup>
          </div>

          <Button :disabled="loading || !isValid" type="submit">
            {{ loading ? "Procesando…" : "Pagar y generar factura" }}
          </Button>
        </form>

        <div class="mt-4 space-y-3">
          <Alert v-if="error" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>

          <Alert v-if="invoiceId">
            <AlertTitle>Factura creada</AlertTitle>
            <AlertDescription>
              <strong>{{ invoiceId }}</strong>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
      <CardFooter class="text-xs text-muted-foreground">
        * Los datos de tarjeta NO se envían al backend. Es solo una simulación visual.
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 4rem);
}
</style>
