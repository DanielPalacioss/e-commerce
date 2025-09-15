import { isVNode } from "vue";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from ".";
import { useToast } from "./use-toast";
const { toasts } = useToast();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ToastProvider;
/** @type {[typeof __VLS_components.ToastProvider, typeof __VLS_components.ToastProvider, ]} */ ;
// @ts-ignore
ToastProvider;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
for (const [toast] of __VLS_getVForSourceType((__VLS_ctx.toasts))) {
    // @ts-ignore
    [toasts,];
    const __VLS_6 = {}.Toast;
    /** @type {[typeof __VLS_components.Toast, typeof __VLS_components.Toast, ]} */ ;
    // @ts-ignore
    Toast;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        key: (toast.id),
        ...(toast),
    }));
    const __VLS_8 = __VLS_7({
        key: (toast.id),
        ...(toast),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const { default: __VLS_10 } = __VLS_9.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid gap-1" },
    });
    if (toast.title) {
        const __VLS_11 = {}.ToastTitle;
        /** @type {[typeof __VLS_components.ToastTitle, typeof __VLS_components.ToastTitle, ]} */ ;
        // @ts-ignore
        ToastTitle;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
        const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
        const { default: __VLS_15 } = __VLS_14.slots;
        (toast.title);
        var __VLS_14;
    }
    if (toast.description) {
        if (__VLS_ctx.isVNode(toast.description)) {
            // @ts-ignore
            [isVNode,];
            const __VLS_16 = {}.ToastDescription;
            /** @type {[typeof __VLS_components.ToastDescription, typeof __VLS_components.ToastDescription, ]} */ ;
            // @ts-ignore
            ToastDescription;
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
            const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
            const { default: __VLS_20 } = __VLS_19.slots;
            const __VLS_21 = ((toast.description));
            // @ts-ignore
            const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
            const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
            var __VLS_19;
        }
        else {
            const __VLS_26 = {}.ToastDescription;
            /** @type {[typeof __VLS_components.ToastDescription, typeof __VLS_components.ToastDescription, ]} */ ;
            // @ts-ignore
            ToastDescription;
            // @ts-ignore
            const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({}));
            const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
            const { default: __VLS_30 } = __VLS_29.slots;
            (toast.description);
            var __VLS_29;
        }
    }
    const __VLS_31 = {}.ToastClose;
    /** @type {[typeof __VLS_components.ToastClose, ]} */ ;
    // @ts-ignore
    ToastClose;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({}));
    const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const __VLS_36 = ((toast.action));
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_9;
}
const __VLS_41 = {}.ToastViewport;
/** @type {[typeof __VLS_components.ToastViewport, ]} */ ;
// @ts-ignore
ToastViewport;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        isVNode: isVNode,
        Toast: Toast,
        ToastClose: ToastClose,
        ToastDescription: ToastDescription,
        ToastProvider: ToastProvider,
        ToastTitle: ToastTitle,
        ToastViewport: ToastViewport,
        toasts: toasts,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
