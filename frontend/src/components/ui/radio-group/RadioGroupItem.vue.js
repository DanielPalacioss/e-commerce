import { RadioGroupIndicator, RadioGroupItem, useForwardProps, } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { Check } from "lucide-vue-next";
import { cn } from "@/lib/utils";
const props = defineProps();
const delegatedProps = reactiveOmit(props, "class");
const forwardedProps = useForwardProps(delegatedProps);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.RadioGroupItem;
/** @type {[typeof __VLS_components.RadioGroupItem, typeof __VLS_components.RadioGroupItem, ]} */ ;
// @ts-ignore
RadioGroupItem;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: (__VLS_ctx.cn('peer aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', props.class)) },
    ...(__VLS_ctx.forwardedProps),
}));
const __VLS_2 = __VLS_1({
    ...{ class: (__VLS_ctx.cn('peer aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', props.class)) },
    ...(__VLS_ctx.forwardedProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[cn, forwardedProps,];
const __VLS_6 = {}.RadioGroupIndicator;
/** @type {[typeof __VLS_components.RadioGroupIndicator, typeof __VLS_components.RadioGroupIndicator, ]} */ ;
// @ts-ignore
RadioGroupIndicator;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    ...{ class: "flex items-center justify-center" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "flex items-center justify-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
const __VLS_11 = {}.Check;
/** @type {[typeof __VLS_components.Check, ]} */ ;
// @ts-ignore
Check;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ class: "h-3.5 w-3.5 text-primary" },
}));
const __VLS_13 = __VLS_12({
    ...{ class: "h-3.5 w-3.5 text-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        RadioGroupIndicator: RadioGroupIndicator,
        RadioGroupItem: RadioGroupItem,
        Check: Check,
        cn: cn,
        forwardedProps: forwardedProps,
    }),
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
