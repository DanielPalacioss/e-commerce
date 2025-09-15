import AppSidebar from "@/components/AppSidebar.vue";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
export const description = "A sidebar that collapses to icons.";
export const iframeHeight = "800px";
export const containerClass = "w-full h-full";
debugger; /* PartiallyEnd: #3632/both.vue */
export default await (async () => {
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_elements;
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.SidebarProvider;
    /** @type {[typeof __VLS_components.SidebarProvider, typeof __VLS_components.SidebarProvider, ]} */ ;
    // @ts-ignore
    SidebarProvider;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    const { default: __VLS_5 } = __VLS_3.slots;
    /** @type {[typeof AppSidebar, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(AppSidebar, new AppSidebar({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const __VLS_10 = {}.SidebarInset;
    /** @type {[typeof __VLS_components.SidebarInset, typeof __VLS_components.SidebarInset, ]} */ ;
    // @ts-ignore
    SidebarInset;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
    const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const { default: __VLS_14 } = __VLS_13.slots;
    __VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
        ...{ class: "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-center gap-2 px-4" },
    });
    const __VLS_15 = {}.SidebarTrigger;
    /** @type {[typeof __VLS_components.SidebarTrigger, ]} */ ;
    // @ts-ignore
    SidebarTrigger;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        ...{ class: "-ml-1" },
    }));
    const __VLS_17 = __VLS_16({
        ...{ class: "-ml-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const __VLS_20 = {}.Separator;
    /** @type {[typeof __VLS_components.Separator, ]} */ ;
    // @ts-ignore
    Separator;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ class: "mr-2 h-4" },
        orientation: "vertical",
    }));
    const __VLS_22 = __VLS_21({
        ...{ class: "mr-2 h-4" },
        orientation: "vertical",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const __VLS_25 = {}.Breadcrumb;
    /** @type {[typeof __VLS_components.Breadcrumb, typeof __VLS_components.Breadcrumb, ]} */ ;
    // @ts-ignore
    Breadcrumb;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_29 } = __VLS_28.slots;
    const __VLS_30 = {}.BreadcrumbList;
    /** @type {[typeof __VLS_components.BreadcrumbList, typeof __VLS_components.BreadcrumbList, ]} */ ;
    // @ts-ignore
    BreadcrumbList;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
    const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const { default: __VLS_34 } = __VLS_33.slots;
    const __VLS_35 = {}.BreadcrumbItem;
    /** @type {[typeof __VLS_components.BreadcrumbItem, typeof __VLS_components.BreadcrumbItem, ]} */ ;
    // @ts-ignore
    BreadcrumbItem;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        ...{ class: "hidden md:block" },
    }));
    const __VLS_37 = __VLS_36({
        ...{ class: "hidden md:block" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    const { default: __VLS_39 } = __VLS_38.slots;
    const __VLS_40 = {}.BreadcrumbLink;
    /** @type {[typeof __VLS_components.BreadcrumbLink, typeof __VLS_components.BreadcrumbLink, ]} */ ;
    // @ts-ignore
    BreadcrumbLink;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        href: "#",
    }));
    const __VLS_42 = __VLS_41({
        href: "#",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    const { default: __VLS_44 } = __VLS_43.slots;
    var __VLS_43;
    var __VLS_38;
    const __VLS_45 = {}.BreadcrumbSeparator;
    /** @type {[typeof __VLS_components.BreadcrumbSeparator, ]} */ ;
    // @ts-ignore
    BreadcrumbSeparator;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ class: "hidden md:block" },
    }));
    const __VLS_47 = __VLS_46({
        ...{ class: "hidden md:block" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    const __VLS_50 = {}.BreadcrumbItem;
    /** @type {[typeof __VLS_components.BreadcrumbItem, typeof __VLS_components.BreadcrumbItem, ]} */ ;
    // @ts-ignore
    BreadcrumbItem;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({}));
    const __VLS_52 = __VLS_51({}, ...__VLS_functionalComponentArgsRest(__VLS_51));
    const { default: __VLS_54 } = __VLS_53.slots;
    const __VLS_55 = {}.BreadcrumbPage;
    /** @type {[typeof __VLS_components.BreadcrumbPage, typeof __VLS_components.BreadcrumbPage, ]} */ ;
    // @ts-ignore
    BreadcrumbPage;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
    const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
    const { default: __VLS_59 } = __VLS_58.slots;
    var __VLS_58;
    var __VLS_53;
    var __VLS_33;
    var __VLS_28;
    const __VLS_60 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    RouterView;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
    const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
    var __VLS_13;
    var __VLS_3;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-16']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-[width,height]']} */ ;
    /** @type {__VLS_StyleScopedClasses['ease-linear']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['-ml-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:block']} */ ;
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:block']} */ ;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup: () => ({
            AppSidebar: AppSidebar,
            Breadcrumb: Breadcrumb,
            BreadcrumbItem: BreadcrumbItem,
            BreadcrumbLink: BreadcrumbLink,
            BreadcrumbList: BreadcrumbList,
            BreadcrumbPage: BreadcrumbPage,
            BreadcrumbSeparator: BreadcrumbSeparator,
            Separator: Separator,
            SidebarInset: SidebarInset,
            SidebarProvider: SidebarProvider,
            SidebarTrigger: SidebarTrigger,
        }),
    });
    return (await import('vue')).defineComponent({});
})(); /* PartiallyEnd: #4569/main.vue */
