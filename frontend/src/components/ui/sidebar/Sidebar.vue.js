import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./utils";
defineOptions({
    inheritAttrs: false,
});
const props = withDefaults(defineProps(), {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
});
const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.collapsible === 'none') {
    // @ts-ignore
    [collapsible,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: (__VLS_ctx.cn('flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground', props.class)) },
    });
    // @ts-ignore
    [cn,];
    var __VLS_0 = {};
}
else if (__VLS_ctx.isMobile) {
    // @ts-ignore
    [isMobile,];
    const __VLS_2 = {}.Sheet;
    /** @type {[typeof __VLS_components.Sheet, typeof __VLS_components.Sheet, ]} */ ;
    // @ts-ignore
    Sheet;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(__VLS_2, new __VLS_2({
        ...{ 'onUpdate:open': {} },
        open: (__VLS_ctx.openMobile),
    }));
    const __VLS_4 = __VLS_3({
        ...{ 'onUpdate:open': {} },
        open: (__VLS_ctx.openMobile),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    let __VLS_6;
    let __VLS_7;
    const __VLS_8 = ({ 'update:open': {} },
        { 'onUpdate:open': (__VLS_ctx.setOpenMobile) });
    var __VLS_9 = {};
    const { default: __VLS_10 } = __VLS_5.slots;
    // @ts-ignore
    [openMobile, setOpenMobile,];
    const __VLS_11 = {}.SheetContent;
    /** @type {[typeof __VLS_components.SheetContent, typeof __VLS_components.SheetContent, ]} */ ;
    // @ts-ignore
    SheetContent;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        side: (__VLS_ctx.side),
        ...{ style: ({
                '--sidebar-width': __VLS_ctx.SIDEBAR_WIDTH_MOBILE,
            }) },
        ...{ class: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden" },
        dataMobile: "true",
        dataSidebar: "sidebar",
    }));
    const __VLS_13 = __VLS_12({
        side: (__VLS_ctx.side),
        ...{ style: ({
                '--sidebar-width': __VLS_ctx.SIDEBAR_WIDTH_MOBILE,
            }) },
        ...{ class: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden" },
        dataMobile: "true",
        dataSidebar: "sidebar",
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    const { default: __VLS_15 } = __VLS_14.slots;
    // @ts-ignore
    [side, SIDEBAR_WIDTH_MOBILE,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex h-full w-full flex-col" },
    });
    var __VLS_16 = {};
    var __VLS_14;
    var __VLS_5;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        'data-collapsible': (__VLS_ctx.state === 'collapsed' ? __VLS_ctx.collapsible : ''),
        'data-side': (__VLS_ctx.side),
        'data-state': (__VLS_ctx.state),
        'data-variant': (__VLS_ctx.variant),
        ...{ class: "group peer hidden md:block" },
    });
    // @ts-ignore
    [collapsible, side, state, state, variant,];
    __VLS_asFunctionalElement(__VLS_elements.div)({
        ...{ class: (__VLS_ctx.cn('duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear', 'group-data-[collapsible=offcanvas]:w-0', 'group-data-[side=right]:rotate-180', __VLS_ctx.variant === 'floating' || __VLS_ctx.variant === 'inset'
                ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
                : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]')) },
    });
    // @ts-ignore
    [cn, variant, variant,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: (__VLS_ctx.cn('duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex', __VLS_ctx.side === 'left'
                ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]', 
            // Adjust the padding for floating and inset variants.
            __VLS_ctx.variant === 'floating' || __VLS_ctx.variant === 'inset'
                ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+_2px)]'
                : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l', props.class)) },
    });
    // @ts-ignore
    [cn, side, variant, variant,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex h-full w-full flex-col text-sidebar-foreground bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow" },
        'data-sidebar': "sidebar",
    });
    var __VLS_18 = {};
}
/** @type {__VLS_StyleScopedClasses['w-[--sidebar-width]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sidebar-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['[&>button]:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['peer']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:block']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sidebar-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['group-data-[variant=floating]:rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['group-data-[variant=floating]:border']} */ ;
/** @type {__VLS_StyleScopedClasses['group-data-[variant=floating]:border-sidebar-border']} */ ;
/** @type {__VLS_StyleScopedClasses['group-data-[variant=floating]:shadow']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_17 = __VLS_16, __VLS_19 = __VLS_18;
[__VLS_dollars.$attrs, __VLS_dollars.$attrs, __VLS_dollars.$attrs,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        cn: cn,
        Sheet: Sheet,
        SheetContent: SheetContent,
        SIDEBAR_WIDTH_MOBILE: SIDEBAR_WIDTH_MOBILE,
        isMobile: isMobile,
        state: state,
        openMobile: openMobile,
        setOpenMobile: setOpenMobile,
    }),
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
