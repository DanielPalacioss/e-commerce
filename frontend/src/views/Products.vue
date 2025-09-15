<script lang="ts" setup>
import {computed, onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import Cart from "@/components/Cart.vue"
import ProductCard from "@/components/ProductCart.vue"
import Pagination from "@/components/Pagination.vue"
import {productService} from "@/api/productService"
import {orderService} from "@/api/orderService"
import type {ProductCategories, ProductPageResponseDTO, ProductResponseDTO, ProductSortForField} from "@/types/product"
import type {OrderResponse} from "@/types/order"
import {SortDirection} from "@/types/share";
import {useToast} from "@/components/ui/toast";

export interface CartItem {
  product: ProductResponseDTO
  quantity: number
}

const router = useRouter()
const {toast} = useToast()

const pageData = ref<ProductPageResponseDTO>({
  products: [],
  page: 0,
  size: 8,
  totalElements: 0,
  totalPages: 0,
})

// Filtros reactivos
const filters = ref({
  field: "name" as ProductSortForField,
  direction: "asc" as SortDirection,
  category: undefined as ProductCategories | undefined,
  active: true,
})

async function loadPage(page = 0, size = 8) {
  try {
    const data = await productService.getProducts(
        page,
        size,
        filters.value.field,
        filters.value.direction,
        filters.value.category,
        filters.value.active
    )
    pageData.value = data
  } catch (err) {
    console.error("Error al cargar productos:", err)
  }
}

const CART_KEY = "shopping_cart"
const cart = ref<CartItem[]>([])

function loadCart() {
  const saved = localStorage.getItem(CART_KEY)
  if (saved) cart.value = JSON.parse(saved)
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart.value))
}

function addToCart(product: ProductResponseDTO) {
  const existing = cart.value.find(item => item.product.id === product.id)
  if (existing) {
    if (existing.product.quantity == existing.quantity) {
      toast({
        title: "Error",
        description: `The ${existing.product.name} product does not have more quantity`,
        variant: "destructive", // "default" o "destructive"
      })
      return
    }
    existing.quantity++
  } else {
    cart.value.push({product, quantity: 1})
  }
  saveCart()
}

function removeFromCart(index: number) {
  cart.value.splice(index, 1)
  saveCart()
}

function increaseQuantity(index: number) {
  if (cart.value[index].product.quantity == cart.value[index].quantity) {
    toast({
      title: "Error",
      description: `The ${cart.value[index].product.name} product does not have more quantity`,
      variant: "destructive",
    })
    return
  }
  cart.value[index].quantity++
  saveCart()
}

function decreaseQuantity(index: number) {
  if (cart.value[index].quantity > 1) {
    // Si la cantidad es mayor a 1, disminuirla en 1
    cart.value[index].quantity--
  } else {
    // Si la cantidad es 1, eliminar el producto del carrito
    cart.value.splice(index, 1)
  }
  saveCart()
}

const total = computed(() =>
    Number(
        cart.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)
    )
)

// Finalizar compra → crear orden, limpiar carrito y redirigir
async function finalizarCompra(orderResponse: OrderResponse) {
  try {
    // Limpiar carrito
    cart.value = []
    localStorage.removeItem(CART_KEY)

    // Redirigir a billing
    router.push({path: "/billing", query: {orderId: orderResponse.id}})
  } catch (err) {
  }
}

onMounted(() => {
  loadCart()
  loadPage(0, pageData.value.size)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Car -->
    <Cart
        :cart="cart"
        :total="total"
        @checkout="finalizarCompra"
        @decrease="decreaseQuantity"
        @increase="increaseQuantity"
        @remove="removeFromCart"
    />

    <!-- Product -->
    <section class="py-16 px-6 w-full">
      <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">
        Our Products
      </h2>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <ProductCard
            v-for="product in pageData.products"
            :key="product.id"
            :product="product"
            @add="addToCart"
        />
      </div>

      <!-- 🔄 Page -->
      <Pagination
          :page="pageData.page"
          :totalPages="pageData.totalPages"
          @next="loadPage(pageData.page + 1, pageData.size)"
          @prev="loadPage(pageData.page - 1, pageData.size)"
      />
    </section>
  </div>
</template>

