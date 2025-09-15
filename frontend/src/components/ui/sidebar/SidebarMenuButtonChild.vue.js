import { Primitive } from "reka-ui";
import { sidebarMenuButtonVariants } from ".";
import { cn } from "@/lib/utils";
const props = withDefaults(defineProps(), {
    as: "button",
    variant: "default",
    size: "default",
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    as: "button",
    variant: "default",
    size: "default",
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Primitive;
/** @type {[typeof __VLS_components.Primitive, typeof __VLS_components.Primitive, ]} */ ;
// @ts-ignore
Primitive;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    as: (__VLS_ctx.as),
    asChild: (__VLS_ctx.asChild),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.sidebarMenuButtonVariants({ variant: __VLS_ctx.variant, size: __VLS_ctx.size }), props.class)) },
    dataActive: (__VLS_ctx.isActive),
    dataSize: (__VLS_ctx.size),
    dataSidebar: "menu-button",
}));
const __VLS_2 = __VLS_1({
    as: (__VLS_ctx.as),
    asChild: (__VLS_ctx.asChild),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.sidebarMenuButtonVariants({ variant: __VLS_ctx.variant, size: __VLS_ctx.size }), props.class)) },
    dataActive: (__VLS_ctx.isActive),
    dataSize: (__VLS_ctx.size),
    dataSidebar: "menu-button",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[as, asChild, cn, sidebarMenuButtonVariants, variant, size, size, isActive,];
var __VLS_6 = {};
var __VLS_3;
// @ts-ignore
var __VLS_7 = __VLS_6;
[__VLS_dollars.$attrs,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Primitive: Primitive,
        sidebarMenuButtonVariants: sidebarMenuButtonVariants,
        cn: cn,
    }),
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
