import { ref, watch } from "vue";
import { productService } from "@/api/productService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Button from "@/components/ui/button/Button.vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const props = defineProps();
const emit = defineEmits();
const file = ref(null);
const preview = ref(null);
const loading = ref(false);
const error = ref(null);
watch(() => props.open, (val) => {
    if (val) {
        file.value = null;
        preview.value = null;
        error.value = null;
    }
});
const onPick = (e) => {
    const input = e.target;
    const f = input.files?.[0] ?? null;
    file.value = f;
    if (f) {
        preview.value = URL.createObjectURL(f);
    }
    else {
        preview.value = null;
    }
};
const close = () => emit("update:open", false);
const upload = async () => {
    if (!props.product || !file.value) {
        error.value = "Selecciona un archivo de imagen";
        return;
    }
    loading.value = true;
    error.value = null;
    try {
        await productService.uploadImageProduct(props.product.id, file.value);
        emit("updated");
        close();
    }
    catch (e) {
        error.value = e?.message ?? "Error subiendo imagen";
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
const __VLS_0 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
Dialog;
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
const __VLS_9 = {}.DialogContent;
/** @type {[typeof __VLS_components.DialogContent, typeof __VLS_components.DialogContent, ]} */ ;
// @ts-ignore
DialogContent;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ class: "sm:max-w-[480px]" },
}));
const __VLS_11 = __VLS_10({
    ...{ class: "sm:max-w-[480px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
const { default: __VLS_13 } = __VLS_12.slots;
const __VLS_14 = {}.DialogHeader;
/** @type {[typeof __VLS_components.DialogHeader, typeof __VLS_components.DialogHeader, ]} */ ;
// @ts-ignore
DialogHeader;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_18 } = __VLS_17.slots;
const __VLS_19 = {}.DialogTitle;
/** @type {[typeof __VLS_components.DialogTitle, typeof __VLS_components.DialogTitle, ]} */ ;
// @ts-ignore
DialogTitle;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_23 } = __VLS_22.slots;
var __VLS_22;
const __VLS_24 = {}.DialogDescription;
/** @type {[typeof __VLS_components.DialogDescription, typeof __VLS_components.DialogDescription, ]} */ ;
// @ts-ignore
DialogDescription;
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
    ...{ class: "grid gap-3" },
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
    for: "file",
}));
const __VLS_31 = __VLS_30({
    for: "file",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_33 } = __VLS_32.slots;
var __VLS_32;
const __VLS_34 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    ...{ 'onChange': {} },
    id: "file",
    accept: "image/*",
    type: "file",
}));
const __VLS_36 = __VLS_35({
    ...{ 'onChange': {} },
    id: "file",
    accept: "image/*",
    type: "file",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_38;
let __VLS_39;
const __VLS_40 = ({ change: {} },
    { onChange: (__VLS_ctx.onPick) });
// @ts-ignore
[onPick,];
var __VLS_37;
if (__VLS_ctx.preview) {
    // @ts-ignore
    [preview,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mt-2 h-40 w-full overflow-hidden rounded-md border" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: (__VLS_ctx.preview),
        alt: "preview",
        ...{ class: "h-full w-full object-cover" },
    });
    // @ts-ignore
    [preview,];
}
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
const __VLS_42 = {}.DialogFooter;
/** @type {[typeof __VLS_components.DialogFooter, typeof __VLS_components.DialogFooter, ]} */ ;
// @ts-ignore
DialogFooter;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    ...{ class: "mt-2" },
}));
const __VLS_44 = __VLS_43({
    ...{ class: "mt-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const { default: __VLS_46 } = __VLS_45.slots;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "outline",
}));
const __VLS_48 = __VLS_47({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_50;
let __VLS_51;
const __VLS_52 = ({ click: {} },
    { onClick: (__VLS_ctx.close) });
const { default: __VLS_53 } = __VLS_49.slots;
// @ts-ignore
[loading, close,];
var __VLS_49;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    ...{ class: "ml-2" },
}));
const __VLS_55 = __VLS_54({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    ...{ class: "ml-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_57;
let __VLS_58;
const __VLS_59 = ({ click: {} },
    { onClick: (__VLS_ctx.upload) });
const { default: __VLS_60 } = __VLS_56.slots;
// @ts-ignore
[loading, upload,];
(__VLS_ctx.loading ? 'Subiendo…' : 'Subir');
// @ts-ignore
[loading,];
var __VLS_56;
var __VLS_45;
var __VLS_12;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['sm:max-w-[480px]']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-40']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
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
        Input: Input,
        Label: Label,
        emit: emit,
        preview: preview,
        loading: loading,
        error: error,
        onPick: onPick,
        close: close,
        upload: upload,
    }),
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
