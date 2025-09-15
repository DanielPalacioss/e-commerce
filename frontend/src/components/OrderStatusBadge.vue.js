import { Badge } from "@/components/ui/badge";
const props = defineProps();
const mapVariant = (s) => {
    if (s === "PENDING")
        return "secondary";
    if (s === "CONFIRMED")
        return "default";
    return "destructive";
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Badge;
/** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
// @ts-ignore
Badge;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    variant: (__VLS_ctx.mapVariant(props.status)),
}));
const __VLS_2 = __VLS_1({
    variant: (__VLS_ctx.mapVariant(props.status)),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[mapVariant,];
(props.status);
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Badge: Badge,
        mapVariant: mapVariant,
    }),
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
