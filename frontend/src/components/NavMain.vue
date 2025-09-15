<script lang="ts" setup>
import {Collapsible,} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {computed} from "vue"
import {useRouter} from "vue-router";

const props = defineProps<{
  items: {
    title: string
    url: string
    icon?: any
    isActive?: boolean
    items?: { title: string; url: string }[]
  }[]
}>()

const router = useRouter()

function goTo(url: string) {
  router.push(url)
}

const activeItems = computed(() => props.items.filter(i => i.isActive))
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Menu</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
          v-for="item in activeItems"
          :key="item.title"
          :default-open="item.isActive"
          as-child
          class="group/collapsible"
      >
        <SidebarMenuItem>
          <SidebarMenuButton :tooltip="item.title" @click="goTo(item.url)">
            <component :is="item.icon" v-if="item.icon"/>
            <span>{{ item.title }}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
