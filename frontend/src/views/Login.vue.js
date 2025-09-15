import LoginForm from "@/components/LoginForm.vue";
export const description = "A two column login page with a cover image.";
debugger; /* PartiallyEnd: #3632/both.vue */
export default await (async () => {
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_elements;
    let __VLS_components;
    let __VLS_directives;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid min-h-svh lg:grid-cols-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex flex-col gap-4 p-6 md:p-10" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex flex-1 items-center justify-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "w-full max-w-xs" },
    });
    /** @type {[typeof LoginForm, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(LoginForm, new LoginForm({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "relative hidden bg-muted lg:block lg:border-l lg:border-gray-200 dark:lg:border-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        alt: "Image",
        ...{ class: "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" },
        src: "/e-commerce_login.png",
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-svh']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:block']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:border-l']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:border-gray-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['dark:lg:border-gray-700']} */ ;
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
    /** @type {__VLS_StyleScopedClasses['dark:brightness-[0.2]']} */ ;
    /** @type {__VLS_StyleScopedClasses['dark:grayscale']} */ ;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup: () => ({
            LoginForm: LoginForm,
        }),
    });
    return (await import('vue')).defineComponent({});
})(); /* PartiallyEnd: #4569/main.vue */
