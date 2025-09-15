import { avatarVariant } from ".";
import { AvatarRoot } from "reka-ui";
import { cn } from "@/lib/utils";
const props = withDefaults(defineProps(), {
    size: "sm",
    shape: "circle",
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    size: "sm",
    shape: "circle",
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.AvatarRoot;
/** @type {[typeof __VLS_components.AvatarRoot, typeof __VLS_components.AvatarRoot, ]} */ ;
// @ts-ignore
AvatarRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.avatarVariant({ size: __VLS_ctx.size, shape: __VLS_ctx.shape }), props.class)) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.avatarVariant({ size: __VLS_ctx.size, shape: __VLS_ctx.shape }), props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[cn, avatarVariant, size, shape,];
var __VLS_6 = {};
var __VLS_3;
// @ts-ignore
var __VLS_7 = __VLS_6;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        avatarVariant: avatarVariant,
        AvatarRoot: AvatarRoot,
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
