import { Separator } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { cn } from "@/lib/utils";
const props = withDefaults(defineProps(), {
    orientation: "horizontal",
    decorative: true,
});
const delegatedProps = reactiveOmit(props, "class");
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    orientation: "horizontal",
    decorative: true,
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Separator;
/** @type {[typeof __VLS_components.Separator, ]} */ ;
// @ts-ignore
Separator;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: (__VLS_ctx.cn('shrink-0 bg-border', props.orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full', props.class)) },
    ...(__VLS_ctx.delegatedProps),
}));
const __VLS_2 = __VLS_1({
    ...{ class: (__VLS_ctx.cn('shrink-0 bg-border', props.orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full', props.class)) },
    ...(__VLS_ctx.delegatedProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
// @ts-ignore
[cn, delegatedProps,];
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Separator: Separator,
        cn: cn,
        delegatedProps: delegatedProps,
    }),
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
