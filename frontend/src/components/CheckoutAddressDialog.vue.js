import { computed, ref, watch } from "vue";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
// Servicios y tipos
import { userAddressService } from "@/api/userAddressService";
import { orderService } from "@/api/orderService";
// Estado del diálogo
const open = defineModel('open', { default: false });
const props = defineProps();
// Estado de direcciones y selección
const addresses = ref([]);
const selectedAddressId = ref(null);
const loadingAddresses = ref(false);
const creatingOrder = ref(false);
const errorMsg = ref(null);
// Carga de direcciones cuando se abre el diálogo
watch(open, async (val) => {
    if (!val)
        return;
    await fetchAddresses();
});
async function fetchAddresses() {
    loadingAddresses.value = true;
    errorMsg.value = null;
    try {
        addresses.value = await userAddressService.getAll();
        // si ya hay direcciones, por UX podemos preseleccionar la primera
        if (addresses.value.length > 0 && !selectedAddressId.value) {
            selectedAddressId.value = addresses.value[0].id;
        }
    }
    catch (e) {
        console.error(e);
        errorMsg.value = "No pudimos cargar tus direcciones. Intenta nuevamente.";
    }
    finally {
        loadingAddresses.value = false;
    }
}
// Items Request
const orderItems = computed(() => {
    try {
        let cart = [];
        if (props.items && props.items.length > 0) {
            cart = props.items;
        }
        return cart.map((it) => ({
            productId: it.product.id,
            quantity: it.quantity,
        }));
    }
    catch {
        return [];
    }
});
const canSubmit = computed(() => {
    return (!!selectedAddressId.value &&
        orderItems.value.length > 0 &&
        !creatingOrder.value &&
        !loadingAddresses.value);
});
const creatingText = computed(() => creatingOrder.value ? "Creating order..." : "Finalize order");
// Crear orden
async function finalizeOrder() {
    if (!selectedAddressId.value)
        return;
    const payload = {
        shippingAddressId: selectedAddressId.value,
        items: orderItems.value,
    };
    creatingOrder.value = true;
    errorMsg.value = null;
    try {
        const res = await orderService.createMyOrder(payload);
        emit("orderCreated", res);
        // Cierra el diálogo
        open.value = false;
    }
    catch (e) {
        console.error(e);
        errorMsg.value = "No pudimos crear tu pedido. Revisa tu conexión e inténtalo otra vez.";
    }
    finally {
        creatingOrder.value = false;
    }
}
const emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    'open': false,
};
const __VLS_modelEmit = defineEmits();
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
Dialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    open: (__VLS_ctx.open),
}));
const __VLS_2 = __VLS_1({
    open: (__VLS_ctx.open),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[open,];
const __VLS_6 = {}.DialogContent;
/** @type {[typeof __VLS_components.DialogContent, typeof __VLS_components.DialogContent, ]} */ ;
// @ts-ignore
DialogContent;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    ...{ class: "sm:max-w-[600px]" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "sm:max-w-[600px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
const __VLS_11 = {}.DialogHeader;
/** @type {[typeof __VLS_components.DialogHeader, typeof __VLS_components.DialogHeader, ]} */ ;
// @ts-ignore
DialogHeader;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
const __VLS_16 = {}.DialogTitle;
/** @type {[typeof __VLS_components.DialogTitle, typeof __VLS_components.DialogTitle, ]} */ ;
// @ts-ignore
DialogTitle;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_20 } = __VLS_19.slots;
var __VLS_19;
const __VLS_21 = {}.DialogDescription;
/** @type {[typeof __VLS_components.DialogDescription, typeof __VLS_components.DialogDescription, ]} */ ;
// @ts-ignore
DialogDescription;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_25 } = __VLS_24.slots;
var __VLS_24;
var __VLS_14;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-2" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "text-sm font-medium" },
});
if (__VLS_ctx.loadingAddresses) {
    // @ts-ignore
    [loadingAddresses,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-sm text-muted-foreground" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    const __VLS_26 = {}.Select;
    /** @type {[typeof __VLS_components.Select, typeof __VLS_components.Select, ]} */ ;
    // @ts-ignore
    Select;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        modelValue: (__VLS_ctx.selectedAddressId),
    }));
    const __VLS_28 = __VLS_27({
        modelValue: (__VLS_ctx.selectedAddressId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    const { default: __VLS_30 } = __VLS_29.slots;
    // @ts-ignore
    [selectedAddressId,];
    const __VLS_31 = {}.SelectTrigger;
    /** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
    // @ts-ignore
    SelectTrigger;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        ...{ class: "w-full" },
    }));
    const __VLS_33 = __VLS_32({
        ...{ class: "w-full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const { default: __VLS_35 } = __VLS_34.slots;
    const __VLS_36 = {}.SelectValue;
    /** @type {[typeof __VLS_components.SelectValue, ]} */ ;
    // @ts-ignore
    SelectValue;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        placeholder: "Select an address",
    }));
    const __VLS_38 = __VLS_37({
        placeholder: "Select an address",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_34;
    const __VLS_41 = {}.SelectContent;
    /** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
    // @ts-ignore
    SelectContent;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
    const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
    const { default: __VLS_45 } = __VLS_44.slots;
    for (const [addr] of __VLS_getVForSourceType((__VLS_ctx.addresses))) {
        // @ts-ignore
        [addresses,];
        const __VLS_46 = {}.SelectItem;
        /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
        // @ts-ignore
        SelectItem;
        // @ts-ignore
        const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
            key: (addr.id),
            value: (addr.id),
            ...{ class: "max-w-full truncate" },
        }));
        const __VLS_48 = __VLS_47({
            key: (addr.id),
            value: (addr.id),
            ...{ class: "max-w-full truncate" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_47));
        const { default: __VLS_50 } = __VLS_49.slots;
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            title: (`${addr.fullName} — ${addr.addressLine}, ${addr.city}, ${addr.state} ${addr.postalCode}, ${addr.country}`),
            ...{ class: "block max-w-[400px] truncate" },
        });
        (addr.fullName);
        (addr.addressLine);
        (addr.city);
        (addr.state);
        (addr.postalCode);
        (addr.country);
        var __VLS_49;
    }
    var __VLS_44;
    var __VLS_29;
    if (__VLS_ctx.addresses.length === 0) {
        // @ts-ignore
        [addresses,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-muted-foreground mt-2" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-1" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-sm" },
});
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
(__VLS_ctx.orderItems.length);
// @ts-ignore
[orderItems,];
if (__VLS_ctx.orderItems.length === 0) {
    // @ts-ignore
    [orderItems,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-xs text-muted-foreground" },
    });
}
if (__VLS_ctx.errorMsg) {
    // @ts-ignore
    [errorMsg,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-red-600" },
    });
    (__VLS_ctx.errorMsg);
    // @ts-ignore
    [errorMsg,];
}
const __VLS_51 = {}.DialogFooter;
/** @type {[typeof __VLS_components.DialogFooter, typeof __VLS_components.DialogFooter, ]} */ ;
// @ts-ignore
DialogFooter;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({}));
const __VLS_53 = __VLS_52({}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_55 } = __VLS_54.slots;
const __VLS_56 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
Button;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_58 = __VLS_57({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
let __VLS_60;
let __VLS_61;
const __VLS_62 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.open = false;
            // @ts-ignore
            [open,];
        } });
const { default: __VLS_63 } = __VLS_59.slots;
var __VLS_59;
const __VLS_64 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
Button;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.canSubmit),
}));
const __VLS_66 = __VLS_65({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.canSubmit),
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
const __VLS_70 = ({ click: {} },
    { onClick: (__VLS_ctx.finalizeOrder) });
const { default: __VLS_71 } = __VLS_67.slots;
// @ts-ignore
[canSubmit, finalizeOrder,];
(__VLS_ctx.creatingText);
// @ts-ignore
[creatingText,];
var __VLS_67;
var __VLS_54;
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['sm:max-w-[600px]']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Dialog: Dialog,
        DialogContent: DialogContent,
        DialogDescription: DialogDescription,
        DialogFooter: DialogFooter,
        DialogHeader: DialogHeader,
        DialogTitle: DialogTitle,
        Button: Button,
        Select: Select,
        SelectContent: SelectContent,
        SelectItem: SelectItem,
        SelectTrigger: SelectTrigger,
        SelectValue: SelectValue,
        open: open,
        addresses: addresses,
        selectedAddressId: selectedAddressId,
        loadingAddresses: loadingAddresses,
        errorMsg: errorMsg,
        orderItems: orderItems,
        canSubmit: canSubmit,
        creatingText: creatingText,
        finalizeOrder: finalizeOrder,
    }),
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
