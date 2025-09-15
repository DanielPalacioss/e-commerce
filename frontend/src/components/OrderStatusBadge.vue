<script lang="ts" setup>
import {Badge} from "@/components/ui/badge";
import type {OrderStatuses} from "@/types/order";

const props = defineProps<{ status: OrderStatuses }>();

const mapVariant = (s: OrderStatuses) => {
  if (s === "PENDING") return "secondary";
  if (s === "CONFIRMED") return "default";
  return "destructive";
};
</script>

<template>
  <Badge :variant="mapVariant(props.status)">{{ props.status }}</Badge>
</template>