import { ref, watch } from "vue";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, } from "@/components/ui/sheet";
import { userAddressService } from "@/api/userAddressService";
import UserAddressForm from "./UserAddressForm.vue";
const props = defineProps();
const emit = defineEmits();
const loading = ref(false);
const error = ref(null);
const model = ref({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
});
watch(() => props.open, (o) => {
    if (o && props.address) {
        const { fullName, phone, addressLine, city, state, postalCode, country } = props.address;
        model.value = { fullName, phone, addressLine, city, state, postalCode, country };
        error.value = null;
    }
});
const setOpen = (v) => emit("update:open", v);
const submit = async () => {
    if (!props.address)
        return;
    loading.value = true;
    error.value = null;
    try {
        const updated = await userAddressService.update(props.address.id, model.value);
        emit("updated", updated);
        setOpen(false);
    }
    catch (e) {
        error.value = e?.message ?? "No se pudo actualizar la dirección";
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
    { 'onUpdate:open': (__VLS_ctx.setOpen) });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
// @ts-ignore
[open, setOpen,];
const __VLS_9 = {}.SheetContent;
/** @type {[typeof __VLS_components.SheetContent, typeof __VLS_components.SheetContent, ]} */ ;
// @ts-ignore
SheetContent;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    side: "right",
    ...{ class: "w-full sm:max-w-xl" },
}));
const __VLS_11 = __VLS_10({
    side: "right",
    ...{ class: "w-full sm:max-w-xl" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
const { default: __VLS_13 } = __VLS_12.slots;
const __VLS_14 = {}.SheetHeader;
/** @type {[typeof __VLS_components.SheetHeader, typeof __VLS_components.SheetHeader, ]} */ ;
// @ts-ignore
SheetHeader;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    ...{ class: "mb-4" },
}));
const __VLS_16 = __VLS_15({
    ...{ class: "mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
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
var __VLS_27;
var __VLS_17;
/** @type {[typeof UserAddressForm, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(UserAddressForm, new UserAddressForm({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.model),
    loading: (__VLS_ctx.loading || !__VLS_ctx.address),
    submitLabel: "Actualizar",
}));
const __VLS_30 = __VLS_29({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.model),
    loading: (__VLS_ctx.loading || !__VLS_ctx.address),
    submitLabel: "Actualizar",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
const __VLS_34 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.submit) });
// @ts-ignore
[model, loading, address, submit,];
var __VLS_31;
if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "mt-3 text-sm text-red-600" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
var __VLS_12;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Sheet: Sheet,
        SheetContent: SheetContent,
        SheetHeader: SheetHeader,
        SheetTitle: SheetTitle,
        SheetDescription: SheetDescription,
        UserAddressForm: UserAddressForm,
        loading: loading,
        error: error,
        model: model,
        setOpen: setOpen,
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
