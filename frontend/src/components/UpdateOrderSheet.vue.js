import { computed, reactive, ref, watch } from "vue";
import { Sheet, SheetContent, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import Button from "@/components/ui/button/Button.vue";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Save, Trash2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast";
import { orderService } from "@/api/orderService";
const props = defineProps();
const emit = defineEmits();
const internalOpen = ref(props.open);
watch(() => props.open, (v) => (internalOpen.value = v));
watch(internalOpen, (v) => emit("update:open", v));
const { toast } = useToast();
const form = reactive(() => ({
    shippingAddressId: "",
    items: [],
}));
watch(() => props.order, (o) => {
    if (!o)
        return;
    form.shippingAddressId = o.shippingAddress.id;
    form.items = o.items.map((it) => ({
        productId: it.productId,
        quantity: it.quantity,
        price: it.price,
    }));
}, { immediate: true });
const addItem = () => form.items.push({ productId: "", quantity: 1 });
const removeItem = (idx) => form.items.splice(idx, 1);
const inc = (idx) => form.items[idx].quantity++;
const dec = (idx) => {
    if (form.items[idx].quantity > 1)
        form.items[idx].quantity--;
};
const canSubmit = computed(() => {
    if (!props.order)
        return false;
    if (!form.shippingAddressId)
        return false;
    if (form.items.length === 0)
        return false;
    return form.items.every(it => it.productId && it.quantity > 0);
});
const loading = ref(false);
const submit = async () => {
    if (!props.order)
        return;
    if (!canSubmit.value) {
        toast({ title: "Formulario incompleto", description: "Revisa los campos", variant: "destructive" });
        return;
    }
    loading.value = true;
    try {
        const payload = {
            shippingAddressId: form.shippingAddressId,
            items: form.items.map(({ productId, quantity }) => ({ productId, quantity })),
        };
        await orderService.updateMyOrder(props.order.id, payload);
        toast({ title: "Pedido actualizado", description: `Orden ${props.order.id} actualizada` });
        internalOpen.value = false;
        emit("updated");
    }
    catch (e) {
        toast({
            title: "Error al actualizar",
            description: e?.message ?? "No se pudo actualizar la orden",
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
const __VLS_0 = {}.Sheet;
/** @type {[typeof __VLS_components.Sheet, typeof __VLS_components.Sheet, ]} */ ;
// @ts-ignore
Sheet;
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
const __VLS_9 = {}.SheetContent;
/** @type {[typeof __VLS_components.SheetContent, typeof __VLS_components.SheetContent, ]} */ ;
// @ts-ignore
SheetContent;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ class: "w-[520px]" },
    side: "right",
}));
const __VLS_11 = __VLS_10({
    ...{ class: "w-[520px]" },
    side: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
const { default: __VLS_13 } = __VLS_12.slots;
const __VLS_14 = {}.SheetHeader;
/** @type {[typeof __VLS_components.SheetHeader, typeof __VLS_components.SheetHeader, ]} */ ;
// @ts-ignore
SheetHeader;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_18 } = __VLS_17.slots;
const __VLS_19 = {}.SheetTitle;
/** @type {[typeof __VLS_components.SheetTitle, typeof __VLS_components.SheetTitle, ]} */ ;
// @ts-ignore
SheetTitle;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_23 } = __VLS_22.slots;
var __VLS_22;
var __VLS_17;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mt-6 space-y-6" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-2" },
});
const __VLS_24 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    for: "addr",
}));
const __VLS_26 = __VLS_25({
    for: "addr",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_28 } = __VLS_27.slots;
var __VLS_27;
const __VLS_29 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    id: "addr",
    modelValue: (__VLS_ctx.form.shippingAddressId),
    placeholder: "address-id-123",
}));
const __VLS_31 = __VLS_30({
    id: "addr",
    modelValue: (__VLS_ctx.form.shippingAddressId),
    placeholder: "address-id-123",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-xs text-muted-foreground" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center justify-between" },
});
const __VLS_34 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({}));
const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_38 } = __VLS_37.slots;
var __VLS_37;
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
    { onClick: (__VLS_ctx.addItem) });
const { default: __VLS_45 } = __VLS_41.slots;
// @ts-ignore
[addItem,];
const __VLS_46 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
Plus;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    ...{ class: "w-4 h-4 mr-2" },
}));
const __VLS_48 = __VLS_47({
    ...{ class: "w-4 h-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
var __VLS_41;
if (__VLS_ctx.form.items.length === 0) {
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-sm text-muted-foreground" },
    });
}
for (const [it, idx] of __VLS_getVForSourceType((__VLS_ctx.form.items))) {
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (idx),
        ...{ class: "rounded-md border p-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid gap-2" },
    });
    const __VLS_51 = {}.Label;
    /** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
    // @ts-ignore
    Label;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        for: (`prod-${idx}`),
    }));
    const __VLS_53 = __VLS_52({
        for: (`prod-${idx}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    const { default: __VLS_55 } = __VLS_54.slots;
    var __VLS_54;
    const __VLS_56 = {}.Input;
    /** @type {[typeof __VLS_components.Input, ]} */ ;
    // @ts-ignore
    Input;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        id: (`prod-${idx}`),
        modelValue: (it.productId),
        placeholder: "product-id",
    }));
    const __VLS_58 = __VLS_57({
        id: (`prod-${idx}`),
        modelValue: (it.productId),
        placeholder: "product-id",
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        size: "icon",
        variant: "outline",
    }));
    const __VLS_62 = __VLS_61({
        ...{ 'onClick': {} },
        size: "icon",
        variant: "outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    let __VLS_64;
    let __VLS_65;
    const __VLS_66 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dec(idx);
                // @ts-ignore
                [dec,];
            } });
    const { default: __VLS_67 } = __VLS_63.slots;
    const __VLS_68 = {}.Minus;
    /** @type {[typeof __VLS_components.Minus, ]} */ ;
    // @ts-ignore
    Minus;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        ...{ class: "w-4 h-4" },
    }));
    const __VLS_70 = __VLS_69({
        ...{ class: "w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    var __VLS_63;
    const __VLS_73 = {}.Input;
    /** @type {[typeof __VLS_components.Input, ]} */ ;
    // @ts-ignore
    Input;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
        modelValue: (it.quantity),
        modelModifiers: { number: true, },
        ...{ class: "w-16 text-center" },
        min: "1",
        type: "number",
    }));
    const __VLS_75 = __VLS_74({
        modelValue: (it.quantity),
        modelModifiers: { number: true, },
        ...{ class: "w-16 text-center" },
        min: "1",
        type: "number",
    }, ...__VLS_functionalComponentArgsRest(__VLS_74));
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        size: "icon",
        variant: "outline",
    }));
    const __VLS_79 = __VLS_78({
        ...{ 'onClick': {} },
        size: "icon",
        variant: "outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    let __VLS_81;
    let __VLS_82;
    const __VLS_83 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.inc(idx);
                // @ts-ignore
                [inc,];
            } });
    const { default: __VLS_84 } = __VLS_80.slots;
    const __VLS_85 = {}.Plus;
    /** @type {[typeof __VLS_components.Plus, ]} */ ;
    // @ts-ignore
    Plus;
    // @ts-ignore
    const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
        ...{ class: "w-4 h-4" },
    }));
    const __VLS_87 = __VLS_86({
        ...{ class: "w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_86));
    var __VLS_80;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mt-2 flex justify-end" },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        size: "sm",
        variant: "destructive",
    }));
    const __VLS_91 = __VLS_90({
        ...{ 'onClick': {} },
        size: "sm",
        variant: "destructive",
    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
    let __VLS_93;
    let __VLS_94;
    const __VLS_95 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.removeItem(idx);
                // @ts-ignore
                [removeItem,];
            } });
    const { default: __VLS_96 } = __VLS_92.slots;
    const __VLS_97 = {}.Trash2;
    /** @type {[typeof __VLS_components.Trash2, ]} */ ;
    // @ts-ignore
    Trash2;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        ...{ class: "w-4 h-4 mr-2" },
    }));
    const __VLS_99 = __VLS_98({
        ...{ class: "w-4 h-4 mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    var __VLS_92;
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-end gap-2" },
});
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "outline",
}));
const __VLS_103 = __VLS_102({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
let __VLS_105;
let __VLS_106;
const __VLS_107 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.internalOpen = false;
            // @ts-ignore
            [internalOpen, loading,];
        } });
const { default: __VLS_108 } = __VLS_104.slots;
var __VLS_104;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.canSubmit || __VLS_ctx.loading),
}));
const __VLS_110 = __VLS_109({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.canSubmit || __VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
let __VLS_112;
let __VLS_113;
const __VLS_114 = ({ click: {} },
    { onClick: (__VLS_ctx.submit) });
const { default: __VLS_115 } = __VLS_111.slots;
// @ts-ignore
[loading, canSubmit, submit,];
const __VLS_116 = {}.Save;
/** @type {[typeof __VLS_components.Save, ]} */ ;
// @ts-ignore
Save;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
    ...{ class: "w-4 h-4 mr-2" },
}));
const __VLS_118 = __VLS_117({
    ...{ class: "w-4 h-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
var __VLS_111;
var __VLS_12;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['w-[520px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-[1fr_auto]']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Sheet: Sheet,
        SheetContent: SheetContent,
        SheetHeader: SheetHeader,
        SheetTitle: SheetTitle,
        Button: Button,
        Label: Label,
        Input: Input,
        Minus: Minus,
        Plus: Plus,
        Save: Save,
        Trash2: Trash2,
        internalOpen: internalOpen,
        form: form,
        addItem: addItem,
        removeItem: removeItem,
        inc: inc,
        dec: dec,
        canSubmit: canSubmit,
        loading: loading,
        submit: submit,
    }),
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
