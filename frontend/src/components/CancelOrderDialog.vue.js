import { ref, watch } from "vue";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import Button from "@/components/ui/button/Button.vue";
import { useToast } from "@/components/ui/toast";
import { orderService } from "@/api/orderService";
const props = defineProps();
const emit = defineEmits();
const internalOpen = ref(props.open);
watch(() => props.open, (v) => (internalOpen.value = v));
watch(internalOpen, (v) => emit("update:open", v));
const { toast } = useToast();
const loading = ref(false);
const confirmCancel = async () => {
    if (!props.order)
        return;
    loading.value = true;
    try {
        await orderService.cancelMyOrder(props.order.id);
        toast({ title: "Pedido cancelado", description: `Se canceló la orden ${props.order.id}` });
        internalOpen.value = false;
        emit("updated");
    }
    catch (e) {
        toast({
            title: "Error al cancelar",
            description: e?.message ?? "No se pudo cancelar la orden",
            variant: "destructive",
        });
    }
    finally {
        loading.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.AlertDialog;
/** @type {[typeof __VLS_components.AlertDialog, typeof __VLS_components.AlertDialog, ]} */ ;
// @ts-ignore
AlertDialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.internalOpen),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.internalOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => __VLS_ctx.internalOpen = v) });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
// @ts-ignore
[internalOpen, internalOpen,];
const __VLS_9 = {}.AlertDialogContent;
/** @type {[typeof __VLS_components.AlertDialogContent, typeof __VLS_components.AlertDialogContent, ]} */ ;
// @ts-ignore
AlertDialogContent;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
const { default: __VLS_13 } = __VLS_12.slots;
const __VLS_14 = {}.AlertDialogHeader;
/** @type {[typeof __VLS_components.AlertDialogHeader, typeof __VLS_components.AlertDialogHeader, ]} */ ;
// @ts-ignore
AlertDialogHeader;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_18 } = __VLS_17.slots;
const __VLS_19 = {}.AlertDialogTitle;
/** @type {[typeof __VLS_components.AlertDialogTitle, typeof __VLS_components.AlertDialogTitle, ]} */ ;
// @ts-ignore
AlertDialogTitle;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_23 } = __VLS_22.slots;
var __VLS_22;
const __VLS_24 = {}.AlertDialogDescription;
/** @type {[typeof __VLS_components.AlertDialogDescription, typeof __VLS_components.AlertDialogDescription, ]} */ ;
// @ts-ignore
AlertDialogDescription;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_28 } = __VLS_27.slots;
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-mono" },
});
(__VLS_ctx.order?.id);
// @ts-ignore
[order,];
var __VLS_27;
var __VLS_17;
const __VLS_29 = {}.AlertDialogFooter;
/** @type {[typeof __VLS_components.AlertDialogFooter, typeof __VLS_components.AlertDialogFooter, ]} */ ;
// @ts-ignore
AlertDialogFooter;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_33 } = __VLS_32.slots;
const __VLS_34 = {}.AlertDialogCancel;
/** @type {[typeof __VLS_components.AlertDialogCancel, typeof __VLS_components.AlertDialogCancel, ]} */ ;
// @ts-ignore
AlertDialogCancel;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    disabled: (__VLS_ctx.loading),
}));
const __VLS_36 = __VLS_35({
    disabled: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_38 } = __VLS_37.slots;
// @ts-ignore
[loading,];
var __VLS_37;
const __VLS_39 = {}.AlertDialogAction;
/** @type {[typeof __VLS_components.AlertDialogAction, typeof __VLS_components.AlertDialogAction, ]} */ ;
// @ts-ignore
AlertDialogAction;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    asChild: true,
}));
const __VLS_41 = __VLS_40({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_43 } = __VLS_42.slots;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "destructive",
}));
const __VLS_45 = __VLS_44({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "destructive",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
let __VLS_47;
let __VLS_48;
const __VLS_49 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmCancel) });
const { default: __VLS_50 } = __VLS_46.slots;
// @ts-ignore
[loading, confirmCancel,];
var __VLS_46;
var __VLS_42;
var __VLS_32;
var __VLS_12;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        AlertDialog: AlertDialog,
        AlertDialogAction: AlertDialogAction,
        AlertDialogCancel: AlertDialogCancel,
        AlertDialogContent: AlertDialogContent,
        AlertDialogDescription: AlertDialogDescription,
        AlertDialogFooter: AlertDialogFooter,
        AlertDialogHeader: AlertDialogHeader,
        AlertDialogTitle: AlertDialogTitle,
        Button: Button,
        internalOpen: internalOpen,
        loading: loading,
        confirmCancel: confirmCancel,
    }),
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
