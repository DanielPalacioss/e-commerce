<script lang="ts" setup>

import {ShoppingCart} from "lucide-vue-next"

import {SidebarMenuButton,} from '@/components/ui/sidebar'
</script>

<template>
  <SidebarMenuButton
      size="lg">
    <div
        class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
      <ShoppingCart class="w-5 h-5"/>
    </div>
    <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-semibold">
          E-COMMERCE
        </span>
      <span class="truncate text-xs">Shopping store</span>
    </div>
  </SidebarMenuButton>
</template>
