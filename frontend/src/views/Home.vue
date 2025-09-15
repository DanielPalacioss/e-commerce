<script lang="ts" setup>

import {Headphones, ShieldCheck, ShoppingCart, Truck} from "lucide-vue-next";
import Button from "../components/ui/button/Button.vue";
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <section class="relative bg-gradient-to-r from-gray-200 to-white text-gray-900 py-20 text-center">
      <h1 class="text-4xl md:text-6xl font-extrabold mb-4">
        Welcome to <span class="text-emerald-600">MiTienda</span>
      </h1>
      <p class="text-lg md:text-xl mb-6">
        The best products in technology, fashion, home and more
      </p>
      <Button class="bg-emerald-600 text-white hover:bg-emerald-700" @click="router.push('/products')">
        <ShoppingCart class="w-5 h-5 mr-2"/>
        See Products
      </Button>
    </section>

    <section class="bg-white py-12">
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        <div class="flex flex-col items-center">
          <Truck class="w-10 h-10 text-emerald-600 mb-2"/>
          <p class="font-semibold">Fast shipping</p>
          <p class="text-sm text-gray-500">Receive your order in record time</p>
        </div>
        <div class="flex flex-col items-center">
          <ShieldCheck class="w-10 h-10 text-emerald-600 mb-2"/>
          <p class="font-semibold">Secure payments</p>
          <p class="text-sm text-gray-500">Your purchases are protected</p>
        </div>
        <div class="flex flex-col items-center">
          <Headphones class="w-10 h-10 text-emerald-600 mb-2"/>
          <p class="font-semibold">24/7 Support</p>
          <p class="text-sm text-gray-500">Always ready to help you</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 MiTienda. Todos los derechos reservados.</p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <a class="hover:text-white" href="#">Facebook</a>
          <a class="hover:text-white" href="#">Instagram</a>
          <a class="hover:text-white" href="#">Twitter</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>