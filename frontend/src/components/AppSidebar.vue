<script lang="ts" setup>
import type {SidebarProps} from '@/components/ui/sidebar'
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from '@/components/ui/sidebar'

import {BookOpen, Bot, Home, MapPin, Receipt, Settings2, ShoppingCart, SquareTerminal,} from "lucide-vue-next"
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import HeaderSidebar from '@/components/HeaderSidebar.vue'
import {UserResponse} from "@/types/user";
import {getRoles} from "@/api/authService";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

const storedUser = localStorage.getItem("user")
const user: UserResponse | null = storedUser ? JSON.parse(storedUser) : null
const roles: string[] | null = getRoles()

const data = {
  user: {
    name: user?.name ?? "name",
    email: user?.email ?? "m@example.com",
    avatar: user?.profilePictureUrl ?? "",
    isLoggedIn: !!user,
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ShoppingCart,
      isActive: roles?.includes("ROLE_CLIENT"),
      items: [],
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: Receipt,
      isActive: roles?.includes("ROLE_CLIENT"),
      items: [],
    },
    {
      title: "UserAddresses",
      url: "/user-addresses",
      icon: MapPin,
      isActive: roles?.includes("ROLE_CLIENT"),
      items: [],
    },
    {
      title: "Products",
      url: "/product-admin",
      icon: Settings2,
      isActive: roles?.includes("ROLE_ADMIN"),
      items: [],
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <HeaderSidebar/>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain"/>
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user"/>
    </SidebarFooter>
    <SidebarRail/>
  </Sidebar>
</template>
