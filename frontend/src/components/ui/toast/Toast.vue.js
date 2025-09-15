import { ToastRoot, useForwardPropsEmits } from "reka-ui";
import { toastVariants } from ".";
import { reactiveOmit } from "@vueuse/core";
import { cn } from "@/lib/utils";
const props = defineProps();
const emits = defineEmits();
const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ToastRoot;
/** @type {[typeof __VLS_components.ToastRoot, typeof __VLS_components.ToastRoot, ]} */ ;
// @ts-ignore
ToastRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:open': {} },
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.toastVariants({ variant: __VLS_ctx.variant }), props.class)) },
    ...(__VLS_ctx.forwarded),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:open': {} },
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.toastVariants({ variant: __VLS_ctx.variant }), props.class)) },
    ...(__VLS_ctx.forwarded),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ 'update:open': {} },
    { 'onUpdate:open': (__VLS_ctx.onOpenChange) });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
// @ts-ignore
[cn, toastVariants, variant, forwarded, onOpenChange,];
var __VLS_9 = {};
var __VLS_3;
// @ts-ignore
var __VLS_10 = __VLS_9;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        ToastRoot: ToastRoot,
        toastVariants: toastVariants,
        cn: cn,
        forwarded: forwarded,
    }),
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
