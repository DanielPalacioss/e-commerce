<script lang="ts" setup>
import type {AlertDialogDescriptionProps} from "reka-ui"
import {AlertDialogDescription,} from "reka-ui"
import type {HTMLAttributes} from "vue"
import {reactiveOmit} from "@vueuse/core"
import {cn} from "@/lib/utils"

const props = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AlertDialogDescription
      :class="cn('text-sm text-muted-foreground', props.class)"
      v-bind="delegatedProps"
  >
    <slot/>
  </AlertDialogDescription>
</template>
