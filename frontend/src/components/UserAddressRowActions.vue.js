import { MoreHorizontal, Pencil, Trash2 } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
const props = defineProps();
const emit = defineEmits();
const onEdit = () => emit("edit", props.address);
const onDelete = () => emit("delete", props.address);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.DropdownMenu;
/** @type {[typeof __VLS_components.DropdownMenu, typeof __VLS_components.DropdownMenu, ]} */ ;
// @ts-ignore
DropdownMenu;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.DropdownMenuTrigger;
/** @type {[typeof __VLS_components.DropdownMenuTrigger, typeof __VLS_components.DropdownMenuTrigger, ]} */ ;
// @ts-ignore
DropdownMenuTrigger;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    asChild: true,
}));
const __VLS_8 = __VLS_7({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(Button, new Button({
    variant: "ghost",
    size: "icon-sm",
    disabled: (__VLS_ctx.disabled),
}));
const __VLS_12 = __VLS_11({
    variant: "ghost",
    size: "icon-sm",
    disabled: (__VLS_ctx.disabled),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
// @ts-ignore
[disabled,];
const __VLS_15 = {}.MoreHorizontal;
/** @type {[typeof __VLS_components.MoreHorizontal, ]} */ ;
// @ts-ignore
MoreHorizontal;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    ...{ class: "h-5 w-5" },
}));
const __VLS_17 = __VLS_16({
    ...{ class: "h-5 w-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
var __VLS_13;
var __VLS_9;
const __VLS_20 = {}.DropdownMenuContent;
/** @type {[typeof __VLS_components.DropdownMenuContent, typeof __VLS_components.DropdownMenuContent, ]} */ ;
// @ts-ignore
DropdownMenuContent;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    align: "end",
    ...{ class: "w-56" },
}));
const __VLS_22 = __VLS_21({
    align: "end",
    ...{ class: "w-56" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_24 } = __VLS_23.slots;
const __VLS_25 = {}.DropdownMenuLabel;
/** @type {[typeof __VLS_components.DropdownMenuLabel, typeof __VLS_components.DropdownMenuLabel, ]} */ ;
// @ts-ignore
DropdownMenuLabel;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_29 } = __VLS_28.slots;
var __VLS_28;
const __VLS_30 = {}.DropdownMenuSeparator;
/** @type {[typeof __VLS_components.DropdownMenuSeparator, ]} */ ;
// @ts-ignore
DropdownMenuSeparator;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const __VLS_35 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
DropdownMenuItem;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    ...{ 'onClick': {} },
}));
const __VLS_37 = __VLS_36({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_39;
let __VLS_40;
const __VLS_41 = ({ click: {} },
    { onClick: (__VLS_ctx.onEdit) });
const { default: __VLS_42 } = __VLS_38.slots;
// @ts-ignore
[onEdit,];
const __VLS_43 = {}.Pencil;
/** @type {[typeof __VLS_components.Pencil, ]} */ ;
// @ts-ignore
Pencil;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    ...{ class: "h-4 w-4 mr-2" },
}));
const __VLS_45 = __VLS_44({
    ...{ class: "h-4 w-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
var __VLS_38;
const __VLS_48 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
DropdownMenuItem;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    ...{ 'onClick': {} },
    ...{ class: "text-red-600" },
}));
const __VLS_50 = __VLS_49({
    ...{ 'onClick': {} },
    ...{ class: "text-red-600" },
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_52;
let __VLS_53;
const __VLS_54 = ({ click: {} },
    { onClick: (__VLS_ctx.onDelete) });
const { default: __VLS_55 } = __VLS_51.slots;
// @ts-ignore
[onDelete,];
const __VLS_56 = {}.Trash2;
/** @type {[typeof __VLS_components.Trash2, ]} */ ;
// @ts-ignore
Trash2;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    ...{ class: "h-4 w-4 mr-2" },
}));
const __VLS_58 = __VLS_57({
    ...{ class: "h-4 w-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
var __VLS_51;
var __VLS_23;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-56']} */ ;
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
        MoreHorizontal: MoreHorizontal,
        Pencil: Pencil,
        Trash2: Trash2,
        Button: Button,
        DropdownMenu: DropdownMenu,
        DropdownMenuContent: DropdownMenuContent,
        DropdownMenuItem: DropdownMenuItem,
        DropdownMenuLabel: DropdownMenuLabel,
        DropdownMenuSeparator: DropdownMenuSeparator,
        DropdownMenuTrigger: DropdownMenuTrigger,
        onEdit: onEdit,
        onDelete: onDelete,
    }),
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
