import { reactiveOmit } from "@vueuse/core";
import { cn } from "@/lib/utils";
import TableCell from "./TableCell.vue";
import TableRow from "./TableRow.vue";
const props = withDefaults(defineProps(), {
    colspan: 1,
});
const delegatedProps = reactiveOmit(props, "class");
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    colspan: 1,
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {[typeof TableRow, typeof TableRow, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(TableRow, new TableRow({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
const { default: __VLS_4 } = __VLS_2.slots;
/** @type {[typeof TableCell, typeof TableCell, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(TableCell, new TableCell({
    ...{ class: (__VLS_ctx.cn('p-4 whitespace-nowrap align-middle text-sm text-foreground', props.class)) },
    ...(__VLS_ctx.delegatedProps),
}));
const __VLS_6 = __VLS_5({
    ...{ class: (__VLS_ctx.cn('p-4 whitespace-nowrap align-middle text-sm text-foreground', props.class)) },
    ...(__VLS_ctx.delegatedProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const { default: __VLS_8 } = __VLS_7.slots;
// @ts-ignore
[cn, delegatedProps,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center justify-center py-10" },
});
var __VLS_9 = {};
var __VLS_7;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
// @ts-ignore
var __VLS_10 = __VLS_9;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        cn: cn,
        TableCell: TableCell,
        TableRow: TableRow,
        delegatedProps: delegatedProps,
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
