import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveAuth, signUp } from "@/api/authService";
const form = ref({
    name: "",
    username: "",
    email: "",
    password: ""
});
const confirmPassword = ref("");
const errors = ref({});
const generalError = ref(null);
const handleRegister = async () => {
    errors.value = {};
    generalError.value = null;
    if (form.value.password !== confirmPassword.value) {
        errors.value.confirmPassword = "Passwords do not match";
        return;
    }
    try {
        const auth = await signUp(form.value);
        saveAuth(auth);
        alert("✅ Account created successfully");
    }
    catch (problem) {
        const err = problem;
        generalError.value = err.detail;
        if (err.invalid_params) {
            err.invalid_params.forEach(param => {
                errors.value[param.name] = param.reason;
            });
        }
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
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
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.DialogTrigger;
/** @type {[typeof __VLS_components.DialogTrigger, typeof __VLS_components.DialogTrigger, ]} */ ;
// @ts-ignore
DialogTrigger;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    asChild: true,
}));
const __VLS_8 = __VLS_7({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
const __VLS_11 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
Button;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ class: "p-0 h-auto text-sm" },
    variant: "link",
}));
const __VLS_13 = __VLS_12({
    ...{ class: "p-0 h-auto text-sm" },
    variant: "link",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
var __VLS_14;
var __VLS_9;
const __VLS_16 = {}.DialogContent;
/** @type {[typeof __VLS_components.DialogContent, typeof __VLS_components.DialogContent, ]} */ ;
// @ts-ignore
DialogContent;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: "sm:max-w-[425px]" },
}));
const __VLS_18 = __VLS_17({
    ...{ class: "sm:max-w-[425px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_20 } = __VLS_19.slots;
const __VLS_21 = {}.DialogHeader;
/** @type {[typeof __VLS_components.DialogHeader, typeof __VLS_components.DialogHeader, ]} */ ;
// @ts-ignore
DialogHeader;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_25 } = __VLS_24.slots;
const __VLS_26 = {}.DialogTitle;
/** @type {[typeof __VLS_components.DialogTitle, typeof __VLS_components.DialogTitle, ]} */ ;
// @ts-ignore
DialogTitle;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const { default: __VLS_30 } = __VLS_29.slots;
var __VLS_29;
const __VLS_31 = {}.DialogDescription;
/** @type {[typeof __VLS_components.DialogDescription, typeof __VLS_components.DialogDescription, ]} */ ;
// @ts-ignore
DialogDescription;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({}));
const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
const { default: __VLS_35 } = __VLS_34.slots;
var __VLS_34;
var __VLS_24;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-4 pt-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-2" },
});
const __VLS_36 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    for: "name",
}));
const __VLS_38 = __VLS_37({
    for: "name",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_40 } = __VLS_39.slots;
var __VLS_39;
const __VLS_41 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    id: "name",
    modelValue: (__VLS_ctx.form.name),
    required: true,
}));
const __VLS_43 = __VLS_42({
    id: "name",
    modelValue: (__VLS_ctx.form.name),
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
// @ts-ignore
[form,];
if (__VLS_ctx.errors.name) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-red-500 text-sm" },
    });
    (__VLS_ctx.errors.name);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-2" },
});
const __VLS_46 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    for: "username",
}));
const __VLS_48 = __VLS_47({
    for: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const { default: __VLS_50 } = __VLS_49.slots;
var __VLS_49;
const __VLS_51 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    id: "username",
    modelValue: (__VLS_ctx.form.username),
    required: true,
}));
const __VLS_53 = __VLS_52({
    id: "username",
    modelValue: (__VLS_ctx.form.username),
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
// @ts-ignore
[form,];
if (__VLS_ctx.errors.username) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-red-500 text-sm" },
    });
    (__VLS_ctx.errors.username);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-2" },
});
const __VLS_56 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    for: "email",
}));
const __VLS_58 = __VLS_57({
    for: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_60 } = __VLS_59.slots;
var __VLS_59;
const __VLS_61 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    id: "email",
    modelValue: (__VLS_ctx.form.email),
    required: true,
    type: "email",
}));
const __VLS_63 = __VLS_62({
    id: "email",
    modelValue: (__VLS_ctx.form.email),
    required: true,
    type: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
// @ts-ignore
[form,];
if (__VLS_ctx.errors.email) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-red-500 text-sm" },
    });
    (__VLS_ctx.errors.email);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-2" },
});
const __VLS_66 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    for: "password",
}));
const __VLS_68 = __VLS_67({
    for: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_70 } = __VLS_69.slots;
var __VLS_69;
const __VLS_71 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
    id: "password",
    modelValue: (__VLS_ctx.form.password),
    required: true,
    type: "password",
}));
const __VLS_73 = __VLS_72({
    id: "password",
    modelValue: (__VLS_ctx.form.password),
    required: true,
    type: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
// @ts-ignore
[form,];
if (__VLS_ctx.errors.password) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-red-500 text-sm" },
    });
    (__VLS_ctx.errors.password);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-2" },
});
const __VLS_76 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    for: "confirmPassword",
}));
const __VLS_78 = __VLS_77({
    for: "confirmPassword",
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
const { default: __VLS_80 } = __VLS_79.slots;
var __VLS_79;
const __VLS_81 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    id: "confirmPassword",
    modelValue: (__VLS_ctx.confirmPassword),
    required: true,
    type: "password",
}));
const __VLS_83 = __VLS_82({
    id: "confirmPassword",
    modelValue: (__VLS_ctx.confirmPassword),
    required: true,
    type: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
// @ts-ignore
[confirmPassword,];
if (__VLS_ctx.errors.confirmPassword) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-red-500 text-sm" },
    });
    (__VLS_ctx.errors.confirmPassword);
    // @ts-ignore
    [errors,];
}
if (__VLS_ctx.generalError) {
    // @ts-ignore
    [generalError,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-red-600 text-sm" },
    });
    (__VLS_ctx.generalError);
    // @ts-ignore
    [generalError,];
}
const __VLS_86 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
Button;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    ...{ 'onClick': {} },
    ...{ class: "w-full" },
    type: "button",
}));
const __VLS_88 = __VLS_87({
    ...{ 'onClick': {} },
    ...{ class: "w-full" },
    type: "button",
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
let __VLS_90;
let __VLS_91;
const __VLS_92 = ({ click: {} },
    { onClick: (__VLS_ctx.handleRegister) });
const { default: __VLS_93 } = __VLS_89.slots;
// @ts-ignore
[handleRegister,];
var __VLS_89;
var __VLS_19;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:max-w-[425px]']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Button: Button,
        Dialog: Dialog,
        DialogContent: DialogContent,
        DialogDescription: DialogDescription,
        DialogHeader: DialogHeader,
        DialogTitle: DialogTitle,
        DialogTrigger: DialogTrigger,
        Input: Input,
        Label: Label,
        form: form,
        confirmPassword: confirmPassword,
        errors: errors,
        generalError: generalError,
        handleRegister: handleRegister,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
