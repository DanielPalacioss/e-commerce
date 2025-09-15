import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits, } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { cn } from "@/lib/utils";
import { SelectScrollDownButton, SelectScrollUpButton } from ".";
defineOptions({
    inheritAttrs: false,
});
const props = withDefaults(defineProps(), {
    position: "popper",
});
const emits = defineEmits();
const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    position: "popper",
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
SelectPortal;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
SelectContent;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    ...{ class: (__VLS_ctx.cn('relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', __VLS_ctx.position === 'popper'
            && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', props.class)) },
    ...({ ...__VLS_ctx.forwarded, ...__VLS_ctx.$attrs }),
}));
const __VLS_8 = __VLS_7({
    ...{ class: (__VLS_ctx.cn('relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', __VLS_ctx.position === 'popper'
            && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', props.class)) },
    ...({ ...__VLS_ctx.forwarded, ...__VLS_ctx.$attrs }),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
// @ts-ignore
[cn, position, forwarded, $attrs,];
const __VLS_11 = {}.SelectScrollUpButton;
/** @type {[typeof __VLS_components.SelectScrollUpButton, ]} */ ;
// @ts-ignore
SelectScrollUpButton;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const __VLS_16 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
SelectViewport;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: (__VLS_ctx.cn('p-1', __VLS_ctx.position === 'popper' && 'h-[--reka-select-trigger-height] w-full min-w-[--reka-select-trigger-width]')) },
}));
const __VLS_18 = __VLS_17({
    ...{ class: (__VLS_ctx.cn('p-1', __VLS_ctx.position === 'popper' && 'h-[--reka-select-trigger-height] w-full min-w-[--reka-select-trigger-width]')) },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_20 } = __VLS_19.slots;
// @ts-ignore
[cn, position,];
var __VLS_21 = {};
var __VLS_19;
const __VLS_23 = {}.SelectScrollDownButton;
/** @type {[typeof __VLS_components.SelectScrollDownButton, ]} */ ;
// @ts-ignore
SelectScrollDownButton;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
var __VLS_9;
var __VLS_3;
// @ts-ignore
var __VLS_22 = __VLS_21;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        SelectContent: SelectContent,
        SelectPortal: SelectPortal,
        SelectViewport: SelectViewport,
        cn: cn,
        SelectScrollDownButton: SelectScrollDownButton,
        SelectScrollUpButton: SelectScrollUpButton,
        forwarded: forwarded,
    }),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
