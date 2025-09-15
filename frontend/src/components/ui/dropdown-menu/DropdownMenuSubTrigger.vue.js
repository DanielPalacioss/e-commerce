import { DropdownMenuSubTrigger, useForwardProps, } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { ChevronRight } from "lucide-vue-next";
import { cn } from "@/lib/utils";
const props = defineProps();
const delegatedProps = reactiveOmit(props, "class");
const forwardedProps = useForwardProps(delegatedProps);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.DropdownMenuSubTrigger;
/** @type {[typeof __VLS_components.DropdownMenuSubTrigger, typeof __VLS_components.DropdownMenuSubTrigger, ]} */ ;
// @ts-ignore
DropdownMenuSubTrigger;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: (__VLS_ctx.cn('flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent', props.class)) },
    ...(__VLS_ctx.forwardedProps),
}));
const __VLS_2 = __VLS_1({
    ...{ class: (__VLS_ctx.cn('flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent', props.class)) },
    ...(__VLS_ctx.forwardedProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[cn, forwardedProps,];
var __VLS_6 = {};
const __VLS_8 = {}.ChevronRight;
/** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
// @ts-ignore
ChevronRight;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "ml-auto h-4 w-4" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "ml-auto h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
// @ts-ignore
var __VLS_7 = __VLS_6;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        DropdownMenuSubTrigger: DropdownMenuSubTrigger,
        ChevronRight: ChevronRight,
        cn: cn,
        forwardedProps: forwardedProps,
    }),
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
