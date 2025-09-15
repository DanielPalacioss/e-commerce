import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from "@/lib/utils";
import SignupModal from "@/components/SignupModal.vue";
import { ref } from "vue";
import { login, saveAuth } from "@/api/authService";
import { userService } from "@/api/userService";
import router from "@/routes";
import { useToast } from "@/components/ui/toast";
const form = ref({
    username: "",
    password: ""
});
const error = ref(null);
const { toast } = useToast();
const submit = async () => {
    error.value = null;
    try {
        const auth = await login(form.value);
        saveAuth(auth);
        const user = await userService.getCurrent();
        localStorage.setItem("user", JSON.stringify(user));
        toast({
            title: "Successful login",
            description: "Welcome",
            variant: "default",
        });
        router.push("/home");
    }
    catch (problem) {
        const err = problem;
        error.value = err.detail || "Error inesperado";
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.submit) },
    ...{ class: (__VLS_ctx.cn('flex flex-col gap-6')) },
});
// @ts-ignore
[submit, cn,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex flex-col items-center gap-2 text-center" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-2xl font-bold" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-balance text-sm text-muted-foreground" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-6" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-2" },
});
const __VLS_0 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    for: "username",
}));
const __VLS_2 = __VLS_1({
    for: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
var __VLS_3;
const __VLS_5 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    id: "username",
    modelValue: (__VLS_ctx.form.username),
    placeholder: "@username",
    required: true,
    type: "username",
}));
const __VLS_7 = __VLS_6({
    id: "username",
    modelValue: (__VLS_ctx.form.username),
    placeholder: "@username",
    required: true,
    type: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-2" },
});
const __VLS_10 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    for: "email",
}));
const __VLS_12 = __VLS_11({
    for: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
var __VLS_13;
const __VLS_15 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    id: "password",
    modelValue: (__VLS_ctx.form.password),
    required: true,
    type: "password",
}));
const __VLS_17 = __VLS_16({
    id: "password",
    modelValue: (__VLS_ctx.form.password),
    required: true,
    type: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
// @ts-ignore
[form,];
const __VLS_20 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
Button;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ class: "w-full" },
    type: "submit",
}));
const __VLS_22 = __VLS_21({
    ...{ class: "w-full" },
    type: "submit",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_24 } = __VLS_23.slots;
var __VLS_23;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-center text-sm" },
});
/** @type {[typeof SignupModal, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(SignupModal, new SignupModal({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-balance']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Button: Button,
        Input: Input,
        Label: Label,
        cn: cn,
        SignupModal: SignupModal,
        form: form,
        submit: submit,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
