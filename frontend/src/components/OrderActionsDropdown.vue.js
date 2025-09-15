import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Ban, Pencil } from "lucide-vue-next";
const props = defineProps();
const emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.DropdownMenuLabel;
/** @type {[typeof __VLS_components.DropdownMenuLabel, typeof __VLS_components.DropdownMenuLabel, ]} */ ;
// @ts-ignore
DropdownMenuLabel;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
var __VLS_3;
const __VLS_5 = {}.DropdownMenuSeparator;
/** @type {[typeof __VLS_components.DropdownMenuSeparator, ]} */ ;
// @ts-ignore
DropdownMenuSeparator;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const __VLS_10 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
DropdownMenuItem;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ 'onClick': {} },
    disabled: (props.order.status !== 'PENDING'),
}));
const __VLS_12 = __VLS_11({
    ...{ 'onClick': {} },
    disabled: (props.order.status !== 'PENDING'),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
const __VLS_16 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('update');
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_17 } = __VLS_13.slots;
const __VLS_18 = {}.Pencil;
/** @type {[typeof __VLS_components.Pencil, ]} */ ;
// @ts-ignore
Pencil;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    ...{ class: "h-4 w-4 mr-2" },
}));
const __VLS_20 = __VLS_19({
    ...{ class: "h-4 w-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
var __VLS_13;
const __VLS_23 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
DropdownMenuItem;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    ...{ 'onClick': {} },
    disabled: (props.order.status !== 'PENDING'),
    ...{ class: "text-red-600" },
}));
const __VLS_25 = __VLS_24({
    ...{ 'onClick': {} },
    disabled: (props.order.status !== 'PENDING'),
    ...{ class: "text-red-600" },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_27;
let __VLS_28;
const __VLS_29 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('cancel');
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_30 } = __VLS_26.slots;
const __VLS_31 = {}.Ban;
/** @type {[typeof __VLS_components.Ban, ]} */ ;
// @ts-ignore
Ban;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    ...{ class: "h-4 w-4 mr-2" },
}));
const __VLS_33 = __VLS_32({
    ...{ class: "h-4 w-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
var __VLS_26;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        DropdownMenuItem: DropdownMenuItem,
        DropdownMenuLabel: DropdownMenuLabel,
        DropdownMenuSeparator: DropdownMenuSeparator,
        Ban: Ban,
        Pencil: Pencil,
        emit: emit,
    }),
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
