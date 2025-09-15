import SidebarMenuButtonChild from "./SidebarMenuButtonChild.vue";
import { reactiveOmit } from "@vueuse/core";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from "./utils";
defineOptions({
    inheritAttrs: false,
});
const props = withDefaults(defineProps(), {
    as: "button",
    variant: "default",
    size: "default",
});
const { isMobile, state } = useSidebar();
const delegatedProps = reactiveOmit(props, "tooltip");
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    as: "button",
    variant: "default",
    size: "default",
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
if (!__VLS_ctx.tooltip) {
    // @ts-ignore
    [tooltip,];
    /** @type {[typeof SidebarMenuButtonChild, typeof SidebarMenuButtonChild, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SidebarMenuButtonChild, new SidebarMenuButtonChild({
        ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }),
    }));
    const __VLS_1 = __VLS_0({
        ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    var __VLS_3 = {};
    const { default: __VLS_4 } = __VLS_2.slots;
    // @ts-ignore
    [delegatedProps, $attrs,];
    var __VLS_5 = {};
    var __VLS_2;
}
else {
    const __VLS_7 = {}.Tooltip;
    /** @type {[typeof __VLS_components.Tooltip, typeof __VLS_components.Tooltip, ]} */ ;
    // @ts-ignore
    Tooltip;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    var __VLS_11 = {};
    const { default: __VLS_12 } = __VLS_10.slots;
    const __VLS_13 = {}.TooltipTrigger;
    /** @type {[typeof __VLS_components.TooltipTrigger, typeof __VLS_components.TooltipTrigger, ]} */ ;
    // @ts-ignore
    TooltipTrigger;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        asChild: true,
    }));
    const __VLS_15 = __VLS_14({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const { default: __VLS_17 } = __VLS_16.slots;
    /** @type {[typeof SidebarMenuButtonChild, typeof SidebarMenuButtonChild, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(SidebarMenuButtonChild, new SidebarMenuButtonChild({
        ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }),
    }));
    const __VLS_19 = __VLS_18({
        ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    const { default: __VLS_21 } = __VLS_20.slots;
    // @ts-ignore
    [delegatedProps, $attrs,];
    var __VLS_22 = {};
    var __VLS_20;
    var __VLS_16;
    const __VLS_24 = {}.TooltipContent;
    /** @type {[typeof __VLS_components.TooltipContent, typeof __VLS_components.TooltipContent, ]} */ ;
    // @ts-ignore
    TooltipContent;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        hidden: (__VLS_ctx.state !== 'collapsed' || __VLS_ctx.isMobile),
        align: "center",
        side: "right",
    }));
    const __VLS_26 = __VLS_25({
        hidden: (__VLS_ctx.state !== 'collapsed' || __VLS_ctx.isMobile),
        align: "center",
        side: "right",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    const { default: __VLS_28 } = __VLS_27.slots;
    // @ts-ignore
    [state, isMobile,];
    if (typeof __VLS_ctx.tooltip === 'string') {
        // @ts-ignore
        [tooltip,];
        (__VLS_ctx.tooltip);
        // @ts-ignore
        [tooltip,];
    }
    else {
        const __VLS_29 = ((__VLS_ctx.tooltip));
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
        const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
        // @ts-ignore
        [tooltip,];
    }
    var __VLS_27;
    var __VLS_10;
}
// @ts-ignore
var __VLS_6 = __VLS_5, __VLS_23 = __VLS_22;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        SidebarMenuButtonChild: SidebarMenuButtonChild,
        Tooltip: Tooltip,
        TooltipContent: TooltipContent,
        TooltipTrigger: TooltipTrigger,
        isMobile: isMobile,
        state: state,
        delegatedProps: delegatedProps,
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
