import { ref, watch } from "vue";
import { productService } from "@/api/productService";
import Button from "@/components/ui/button/Button.vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
const props = defineProps();
const emit = defineEmits();
const categories = [
    "ELECTRONICS", "FASHION", "HOME", "BEAUTY", "SPORTS", "BOOKS", "GROCERY",
];
const form = ref({
    name: "",
    description: "",
    price: null,
    category: null,
});
const loading = ref(false);
const error = ref(null);
const hydrate = () => {
    if (!props.product)
        return;
    form.value = {
        name: props.product.name ?? "",
        description: props.product.description ?? "",
        price: props.product.price ?? null,
        category: props.product.category ?? null,
    };
    error.value = null;
};
watch(() => props.open, (v) => v && hydrate());
watch(() => props.product?.id, hydrate);
const close = () => emit("update:open", false);
const save = async () => {
    if (!props.product)
        return;
    error.value = null;
    if (!form.value.name.trim()) {
        error.value = "El nombre es obligatorio";
        return;
    }
    if (!form.value.price || form.value.price <= 0) {
        error.value = "Precio debe ser mayor a 0";
        return;
    }
    if (!form.value.category) {
        error.value = "Selecciona una categoría";
        return;
    }
    const payload = {
        name: form.value.name.trim(),
        price: form.value.price,
        category: form.value.category,
        ...(form.value.description.trim() ? { description: form.value.description.trim() } : {}),
    };
    loading.value = true;
    try {
        await productService.updateProduct(props.product.id, payload);
        emit("updated");
        close();
    }
    catch (e) {
        error.value = e?.message ?? "No se pudo actualizar el producto";
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
    open: (__VLS_ctx.open),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.open),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ 'update:open': {} },
    { 'onUpdate:open': (v => __VLS_ctx.emit('update:open', v)) });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
// @ts-ignore
[open, emit,];
const __VLS_9 = {}.SheetContent;
/** @type {[typeof __VLS_components.SheetContent, typeof __VLS_components.SheetContent, ]} */ ;
// @ts-ignore
SheetContent;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ class: "w-[480px]" },
    side: "right",
}));
const __VLS_11 = __VLS_10({
    ...{ class: "w-[480px]" },
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
const __VLS_24 = {}.SheetDescription;
/** @type {[typeof __VLS_components.SheetDescription, typeof __VLS_components.SheetDescription, ]} */ ;
// @ts-ignore
SheetDescription;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_28 } = __VLS_27.slots;
__VLS_asFunctionalElement(__VLS_elements.b, __VLS_elements.b)({});
(__VLS_ctx.product?.name);
// @ts-ignore
[product,];
var __VLS_27;
var __VLS_17;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mt-4 grid gap-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-1" },
});
const __VLS_29 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    for: "name",
}));
const __VLS_31 = __VLS_30({
    for: "name",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_33 } = __VLS_32.slots;
var __VLS_32;
const __VLS_34 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    id: "name",
    modelValue: (__VLS_ctx.form.name),
    disabled: (__VLS_ctx.loading),
}));
const __VLS_36 = __VLS_35({
    id: "name",
    modelValue: (__VLS_ctx.form.name),
    disabled: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
// @ts-ignore
[form, loading,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-1" },
});
const __VLS_39 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    for: "desc",
}));
const __VLS_41 = __VLS_40({
    for: "desc",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_43 } = __VLS_42.slots;
var __VLS_42;
__VLS_asFunctionalElement(__VLS_elements.textarea)({
    id: "desc",
    value: (__VLS_ctx.form.description),
    disabled: (__VLS_ctx.loading),
    ...{ class: "w-full rounded-md border px-3 py-2 text-sm" },
    rows: "3",
});
// @ts-ignore
[form, loading,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-1" },
});
const __VLS_44 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    for: "price",
}));
const __VLS_46 = __VLS_45({
    for: "price",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
const { default: __VLS_48 } = __VLS_47.slots;
var __VLS_47;
const __VLS_49 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    id: "price",
    modelValue: (__VLS_ctx.form.price),
    modelModifiers: { number: true, },
    disabled: (__VLS_ctx.loading),
    min: "0",
    step: "0.01",
    type: "number",
}));
const __VLS_51 = __VLS_50({
    id: "price",
    modelValue: (__VLS_ctx.form.price),
    modelModifiers: { number: true, },
    disabled: (__VLS_ctx.loading),
    min: "0",
    step: "0.01",
    type: "number",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
// @ts-ignore
[form, loading,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-1" },
});
const __VLS_54 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({}));
const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_58 } = __VLS_57.slots;
var __VLS_57;
const __VLS_59 = {}.Select;
/** @type {[typeof __VLS_components.Select, typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
Select;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    modelValue: (__VLS_ctx.form.category),
}));
const __VLS_61 = __VLS_60({
    modelValue: (__VLS_ctx.form.category),
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
const { default: __VLS_63 } = __VLS_62.slots;
// @ts-ignore
[form,];
const __VLS_64 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
SelectTrigger;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ class: "w-full" },
}));
const __VLS_66 = __VLS_65({
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const { default: __VLS_68 } = __VLS_67.slots;
const __VLS_69 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
SelectValue;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
    placeholder: "Selecciona categoría",
}));
const __VLS_71 = __VLS_70({
    placeholder: "Selecciona categoría",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
var __VLS_67;
const __VLS_74 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
SelectContent;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({}));
const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
const { default: __VLS_78 } = __VLS_77.slots;
const __VLS_79 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
SelectGroup;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({}));
const __VLS_81 = __VLS_80({}, ...__VLS_functionalComponentArgsRest(__VLS_80));
const { default: __VLS_83 } = __VLS_82.slots;
for (const [cat] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
    // @ts-ignore
    [categories,];
    const __VLS_84 = {}.SelectItem;
    /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
    // @ts-ignore
    SelectItem;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
        key: (cat),
        value: (cat),
    }));
    const __VLS_86 = __VLS_85({
        key: (cat),
        value: (cat),
    }, ...__VLS_functionalComponentArgsRest(__VLS_85));
    const { default: __VLS_88 } = __VLS_87.slots;
    (cat);
    var __VLS_87;
}
var __VLS_82;
var __VLS_77;
var __VLS_62;
if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-red-600" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mt-2 flex justify-end gap-2" },
});
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "outline",
}));
const __VLS_90 = __VLS_89({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
let __VLS_92;
let __VLS_93;
const __VLS_94 = ({ click: {} },
    { onClick: (__VLS_ctx.close) });
const { default: __VLS_95 } = __VLS_91.slots;
// @ts-ignore
[loading, close,];
var __VLS_91;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
}));
const __VLS_97 = __VLS_96({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
let __VLS_99;
let __VLS_100;
const __VLS_101 = ({ click: {} },
    { onClick: (__VLS_ctx.save) });
const { default: __VLS_102 } = __VLS_98.slots;
// @ts-ignore
[loading, save,];
(__VLS_ctx.loading ? "Guardando…" : "Actualizar");
// @ts-ignore
[loading,];
var __VLS_98;
var __VLS_12;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['w-[480px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Button: Button,
        Input: Input,
        Label: Label,
        Select: Select,
        SelectContent: SelectContent,
        SelectGroup: SelectGroup,
        SelectItem: SelectItem,
        SelectTrigger: SelectTrigger,
        SelectValue: SelectValue,
        Sheet: Sheet,
        SheetContent: SheetContent,
        SheetDescription: SheetDescription,
        SheetHeader: SheetHeader,
        SheetTitle: SheetTitle,
        emit: emit,
        categories: categories,
        form: form,
        loading: loading,
        error: error,
        close: close,
        save: save,
    }),
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
