import { Collapsible, } from '@/components/ui/collapsible';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from '@/components/ui/sidebar';
import { computed } from "vue";
import { useRouter } from "vue-router";
const props = defineProps();
const router = useRouter();
function goTo(url) {
    router.push(url);
}
const activeItems = computed(() => props.items.filter(i => i.isActive));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.SidebarGroup;
/** @type {[typeof __VLS_components.SidebarGroup, typeof __VLS_components.SidebarGroup, ]} */ ;
// @ts-ignore
SidebarGroup;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.SidebarGroupLabel;
/** @type {[typeof __VLS_components.SidebarGroupLabel, typeof __VLS_components.SidebarGroupLabel, ]} */ ;
// @ts-ignore
SidebarGroupLabel;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
var __VLS_9;
const __VLS_11 = {}.SidebarMenu;
/** @type {[typeof __VLS_components.SidebarMenu, typeof __VLS_components.SidebarMenu, ]} */ ;
// @ts-ignore
SidebarMenu;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.activeItems))) {
    // @ts-ignore
    [activeItems,];
    const __VLS_16 = {}.Collapsible;
    /** @type {[typeof __VLS_components.Collapsible, typeof __VLS_components.Collapsible, ]} */ ;
    // @ts-ignore
    Collapsible;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        key: (item.title),
        defaultOpen: (item.isActive),
        asChild: true,
        ...{ class: "group/collapsible" },
    }));
    const __VLS_18 = __VLS_17({
        key: (item.title),
        defaultOpen: (item.isActive),
        asChild: true,
        ...{ class: "group/collapsible" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    const { default: __VLS_20 } = __VLS_19.slots;
    const __VLS_21 = {}.SidebarMenuItem;
    /** @type {[typeof __VLS_components.SidebarMenuItem, typeof __VLS_components.SidebarMenuItem, ]} */ ;
    // @ts-ignore
    SidebarMenuItem;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
    const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
    const { default: __VLS_25 } = __VLS_24.slots;
    const __VLS_26 = {}.SidebarMenuButton;
    /** @type {[typeof __VLS_components.SidebarMenuButton, typeof __VLS_components.SidebarMenuButton, ]} */ ;
    // @ts-ignore
    SidebarMenuButton;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        ...{ 'onClick': {} },
        tooltip: (item.title),
    }));
    const __VLS_28 = __VLS_27({
        ...{ 'onClick': {} },
        tooltip: (item.title),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    let __VLS_30;
    let __VLS_31;
    const __VLS_32 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.goTo(item.url);
                // @ts-ignore
                [goTo,];
            } });
    const { default: __VLS_33 } = __VLS_29.slots;
    if (item.icon) {
        const __VLS_34 = ((item.icon));
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({}));
        const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
    }
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (item.title);
    var __VLS_29;
    var __VLS_24;
    var __VLS_19;
}
var __VLS_14;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['group/collapsible']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Collapsible: Collapsible,
        SidebarGroup: SidebarGroup,
        SidebarGroupLabel: SidebarGroupLabel,
        SidebarMenu: SidebarMenu,
        SidebarMenuButton: SidebarMenuButton,
        SidebarMenuItem: SidebarMenuItem,
        goTo: goTo,
        activeItems: activeItems,
    }),
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
