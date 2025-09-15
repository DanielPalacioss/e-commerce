import Button from "./ui/button/Button.vue";
const __VLS_props = defineProps({
    page: Number,
    totalPages: Number
});
const __VLS_emit = defineEmits(["prev", "next"]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-center mt-8 space-x-2" },
});
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page === 0),
    variant: "outline",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page === 0),
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.$emit('prev');
            // @ts-ignore
            [page, $emit,];
        } });
const { default: __VLS_6 } = __VLS_2.slots;
var __VLS_2;
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "px-4 py-2 font-medium" },
});
(__VLS_ctx.page + 1);
(__VLS_ctx.totalPages);
// @ts-ignore
[page, totalPages,];
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page + 1 >= __VLS_ctx.totalPages),
    variant: "outline",
}));
const __VLS_8 = __VLS_7({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page + 1 >= __VLS_ctx.totalPages),
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
const __VLS_12 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.$emit('next');
            // @ts-ignore
            [page, $emit, totalPages,];
        } });
const { default: __VLS_13 } = __VLS_9.slots;
var __VLS_9;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Button: Button,
    }),
    emits: {},
    props: {
        page: Number,
        totalPages: Number
    },
});
export default (await import('vue')).defineComponent({
    emits: {},
    props: {
        page: Number,
        totalPages: Number
    },
});
; /* PartiallyEnd: #4569/main.vue */
