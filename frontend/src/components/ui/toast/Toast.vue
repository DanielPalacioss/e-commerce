<script lang="ts" setup>
import type {ToastRootEmits} from "reka-ui"
import {ToastRoot, useForwardPropsEmits} from "reka-ui"
import type {ToastProps} from "."
import {toastVariants} from "."
import {reactiveOmit} from "@vueuse/core"
import {cn} from "@/lib/utils"

const props = defineProps<ToastProps>()

const emits = defineEmits<ToastRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
      :class="cn(toastVariants({ variant }), props.class)"
      v-bind="forwarded"
      @update:open="onOpenChange"
  >
    <slot/>
  </ToastRoot>
</template>
