import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-vue-next";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Button from "./ui/button/Button.vue";
import { ref } from "vue";
import CheckoutAddressDialog from "@/components/CheckoutAddressDialog.vue";
import { getToken } from "@/api/authService";
import router from "@/routes";
import { useToast } from "@/components/ui/toast";
const props = defineProps();
// Eventos al padre
const emit = defineEmits(["increase", "decrease", "remove", "checkout"]);
const { toast } = useToast();
// Estado para abrir/cerrar el dialog
const addressDialogOpen = ref(false);
// Abre el dialog y guarda el carrito en localStorage
function openAddressDialog() {
    const token = getToken();
    if (!token) {
        toast({
            title: "Error",
            description: "You must log in",
            variant: "destructive",
        });
        // Cerrar el sheet
        document.body.click();
        router.push("/login");
        return;
    }
    addressDialogOpen.value = true;
}
// Cuando se crea la orden en el dialog
function handleOrderCreated(order) {
    localStorage.removeItem("actualItems");
    // Notifica al padre que se hizo checkout
    emit("checkout", order);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "fixed top-4 right-4 z-50" },
});
const __VLS_0 = {}.Sheet;
/** @type {[typeof __VLS_components.Sheet, typeof __VLS_components.Sheet, ]} */ ;
// @ts-ignore
Sheet;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
const __VLS_5 = {}.SheetTrigger;
/** @type {[typeof __VLS_components.SheetTrigger, typeof __VLS_components.SheetTrigger, ]} */ ;
// @ts-ignore
SheetTrigger;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    asChild: true,
}));
const __VLS_7 = __VLS_6({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ class: "relative shadow-md" },
}));
const __VLS_11 = __VLS_10({
    ...{ class: "relative shadow-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
const { default: __VLS_13 } = __VLS_12.slots;
const __VLS_14 = {}.ShoppingCart;
/** @type {[typeof __VLS_components.ShoppingCart, ]} */ ;
// @ts-ignore
ShoppingCart;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    ...{ class: "w-5 h-5" },
}));
const __VLS_16 = __VLS_15({
    ...{ class: "w-5 h-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
if (props.cart.length > 0) {
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full" },
    });
    (props.cart.length);
}
var __VLS_12;
var __VLS_8;
const __VLS_19 = {}.SheetContent;
/** @type {[typeof __VLS_components.SheetContent, typeof __VLS_components.SheetContent, ]} */ ;
// @ts-ignore
SheetContent;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    ...{ class: "w-96 flex flex-col h-full" },
    side: "right",
}));
const __VLS_21 = __VLS_20({
    ...{ class: "w-96 flex flex-col h-full" },
    side: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_23 } = __VLS_22.slots;
const __VLS_24 = {}.SheetHeader;
/** @type {[typeof __VLS_components.SheetHeader, typeof __VLS_components.SheetHeader, ]} */ ;
// @ts-ignore
SheetHeader;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_28 } = __VLS_27.slots;
const __VLS_29 = {}.SheetTitle;
/** @type {[typeof __VLS_components.SheetTitle, typeof __VLS_components.SheetTitle, ]} */ ;
// @ts-ignore
SheetTitle;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_33 } = __VLS_32.slots;
var __VLS_32;
const __VLS_34 = {}.SheetDescription;
/** @type {[typeof __VLS_components.SheetDescription, typeof __VLS_components.SheetDescription, ]} */ ;
// @ts-ignore
SheetDescription;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({}));
const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_38 } = __VLS_37.slots;
var __VLS_37;
var __VLS_27;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex-1 mt-4 overflow-y-auto pr-2" },
});
if (props.cart.length > 0) {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "space-y-4" },
    });
    for (const [item, index] of __VLS_getVForSourceType((props.cart))) {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            key: (item.product.id),
            ...{ class: "flex items-center justify-between border-b pb-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-semibold" },
        });
        (item.product.name);
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-gray-500" },
        });
        (item.product.price.toFixed(2));
        (item.quantity);
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm font-bold text-emerald-600" },
        });
        ((item.product.price * item.quantity).toFixed(2));
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center gap-2" },
        });
        /** @type {[typeof Button, typeof Button, ]} */ ;
        // @ts-ignore
        const __VLS_39 = __VLS_asFunctionalComponent(Button, new Button({
            ...{ 'onClick': {} },
            size: "sm",
            variant: "outline",
        }));
        const __VLS_40 = __VLS_39({
            ...{ 'onClick': {} },
            size: "sm",
            variant: "outline",
        }, ...__VLS_functionalComponentArgsRest(__VLS_39));
        let __VLS_42;
        let __VLS_43;
        const __VLS_44 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(props.cart.length > 0))
                        return;
                    __VLS_ctx.$emit('decrease', index);
                    // @ts-ignore
                    [$emit,];
                } });
        const { default: __VLS_45 } = __VLS_41.slots;
        const __VLS_46 = {}.Minus;
        /** @type {[typeof __VLS_components.Minus, ]} */ ;
        // @ts-ignore
        Minus;
        // @ts-ignore
        const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
            ...{ class: "w-4 h-4" },
        }));
        const __VLS_48 = __VLS_47({
            ...{ class: "w-4 h-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_47));
        var __VLS_41;
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "w-6 text-center" },
        });
        (item.quantity);
        /** @type {[typeof Button, typeof Button, ]} */ ;
        // @ts-ignore
        const __VLS_51 = __VLS_asFunctionalComponent(Button, new Button({
            ...{ 'onClick': {} },
            size: "sm",
            variant: "outline",
        }));
        const __VLS_52 = __VLS_51({
            ...{ 'onClick': {} },
            size: "sm",
            variant: "outline",
        }, ...__VLS_functionalComponentArgsRest(__VLS_51));
        let __VLS_54;
        let __VLS_55;
        const __VLS_56 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(props.cart.length > 0))
                        return;
                    __VLS_ctx.$emit('increase', index);
                    // @ts-ignore
                    [$emit,];
                } });
        const { default: __VLS_57 } = __VLS_53.slots;
        const __VLS_58 = {}.Plus;
        /** @type {[typeof __VLS_components.Plus, ]} */ ;
        // @ts-ignore
        Plus;
        // @ts-ignore
        const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
            ...{ class: "w-4 h-4" },
        }));
        const __VLS_60 = __VLS_59({
            ...{ class: "w-4 h-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_59));
        var __VLS_53;
        /** @type {[typeof Button, typeof Button, ]} */ ;
        // @ts-ignore
        const __VLS_63 = __VLS_asFunctionalComponent(Button, new Button({
            ...{ 'onClick': {} },
            size: "sm",
            variant: "destructive",
        }));
        const __VLS_64 = __VLS_63({
            ...{ 'onClick': {} },
            size: "sm",
            variant: "destructive",
        }, ...__VLS_functionalComponentArgsRest(__VLS_63));
        let __VLS_66;
        let __VLS_67;
        const __VLS_68 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(props.cart.length > 0))
                        return;
                    __VLS_ctx.$emit('remove', index);
                    // @ts-ignore
                    [$emit,];
                } });
        const { default: __VLS_69 } = __VLS_65.slots;
        const __VLS_70 = {}.Trash2;
        /** @type {[typeof __VLS_components.Trash2, ]} */ ;
        // @ts-ignore
        Trash2;
        // @ts-ignore
        const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
            ...{ class: "w-4 h-4" },
        }));
        const __VLS_72 = __VLS_71({
            ...{ class: "w-4 h-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_71));
        var __VLS_65;
    }
}
else {
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-500 mt-6" },
    });
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "border-t pt-4 bg-white sticky bottom-0" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-between items-center font-bold text-lg mb-4" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
(props.total);
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-end space-x-2" },
});
const __VLS_75 = {}.SheetClose;
/** @type {[typeof __VLS_components.SheetClose, typeof __VLS_components.SheetClose, ]} */ ;
// @ts-ignore
SheetClose;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    asChild: true,
}));
const __VLS_77 = __VLS_76({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_79 } = __VLS_78.slots;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(Button, new Button({
    variant: "outline",
}));
const __VLS_81 = __VLS_80({
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
const { default: __VLS_83 } = __VLS_82.slots;
var __VLS_82;
var __VLS_78;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (props.cart.length === 0),
    ...{ class: "bg-emerald-600 text-white hover:bg-emerald-700" },
}));
const __VLS_85 = __VLS_84({
    ...{ 'onClick': {} },
    disabled: (props.cart.length === 0),
    ...{ class: "bg-emerald-600 text-white hover:bg-emerald-700" },
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
let __VLS_87;
let __VLS_88;
const __VLS_89 = ({ click: {} },
    { onClick: (__VLS_ctx.openAddressDialog) });
const { default: __VLS_90 } = __VLS_86.slots;
// @ts-ignore
[openAddressDialog,];
var __VLS_86;
var __VLS_22;
var __VLS_3;
/** @type {[typeof CheckoutAddressDialog, ]} */ ;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(CheckoutAddressDialog, new CheckoutAddressDialog({
    ...{ 'onOrderCreated': {} },
    open: (__VLS_ctx.addressDialogOpen),
    items: (props.cart),
}));
const __VLS_92 = __VLS_91({
    ...{ 'onOrderCreated': {} },
    open: (__VLS_ctx.addressDialogOpen),
    items: (props.cart),
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
let __VLS_94;
let __VLS_95;
const __VLS_96 = ({ orderCreated: {} },
    { onOrderCreated: (__VLS_ctx.handleOrderCreated) });
// @ts-ignore
[addressDialogOpen, handleOrderCreated,];
var __VLS_93;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-4']} */ ;
/** @type {__VLS_StyleScopedClasses['right-4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['-top-2']} */ ;
/** @type {__VLS_StyleScopedClasses['-right-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-96']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-emerald-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-emerald-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-emerald-700']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Minus: Minus,
        Plus: Plus,
        ShoppingCart: ShoppingCart,
        Trash2: Trash2,
        Sheet: Sheet,
        SheetClose: SheetClose,
        SheetContent: SheetContent,
        SheetDescription: SheetDescription,
        SheetHeader: SheetHeader,
        SheetTitle: SheetTitle,
        SheetTrigger: SheetTrigger,
        Button: Button,
        CheckoutAddressDialog: CheckoutAddressDialog,
        addressDialogOpen: addressDialogOpen,
        openAddressDialog: openAddressDialog,
        handleOrderCreated: handleOrderCreated,
    }),
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
