import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from '@/components/ui/sidebar';
import { Home, MapPin, Receipt, Settings2, ShoppingCart, } from "lucide-vue-next";
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import HeaderSidebar from '@/components/HeaderSidebar.vue';
import { getRoles } from "@/api/authService";
const props = withDefaults(defineProps(), {
    collapsible: "icon",
});
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
const roles = getRoles();
const data = {
    user: {
        name: user?.name ?? "name",
        email: user?.email ?? "m@example.com",
        avatar: user?.profilePictureUrl ?? "",
        isLoggedIn: !!user,
    },
    navMain: [
        {
            title: "Home",
            url: "/home",
            icon: Home,
            isActive: true,
            items: [],
        },
        {
            title: "Orders",
            url: "/orders",
            icon: ShoppingCart,
            isActive: roles?.includes("ROLE_CLIENT"),
            items: [],
        },
        {
            title: "Invoices",
            url: "/invoices",
            icon: Receipt,
            isActive: roles?.includes("ROLE_CLIENT"),
            items: [],
        },
        {
            title: "UserAddresses",
            url: "/user-addresses",
            icon: MapPin,
            isActive: roles?.includes("ROLE_CLIENT"),
            items: [],
        },
        {
            title: "Products",
            url: "/product-admin",
            icon: Settings2,
            isActive: roles?.includes("ROLE_ADMIN"),
            items: [],
        },
    ],
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    collapsible: "icon",
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Sidebar;
/** @type {[typeof __VLS_components.Sidebar, typeof __VLS_components.Sidebar, ]} */ ;
// @ts-ignore
Sidebar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...(props),
}));
const __VLS_2 = __VLS_1({
    ...(props),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.SidebarHeader;
/** @type {[typeof __VLS_components.SidebarHeader, typeof __VLS_components.SidebarHeader, ]} */ ;
// @ts-ignore
SidebarHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
/** @type {[typeof HeaderSidebar, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(HeaderSidebar, new HeaderSidebar({}));
const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
var __VLS_9;
const __VLS_15 = {}.SidebarContent;
/** @type {[typeof __VLS_components.SidebarContent, typeof __VLS_components.SidebarContent, ]} */ ;
// @ts-ignore
SidebarContent;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
/** @type {[typeof NavMain, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(NavMain, new NavMain({
    items: (__VLS_ctx.data.navMain),
}));
const __VLS_21 = __VLS_20({
    items: (__VLS_ctx.data.navMain),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
// @ts-ignore
[data,];
var __VLS_18;
const __VLS_24 = {}.SidebarFooter;
/** @type {[typeof __VLS_components.SidebarFooter, typeof __VLS_components.SidebarFooter, ]} */ ;
// @ts-ignore
SidebarFooter;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_28 } = __VLS_27.slots;
/** @type {[typeof NavUser, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(NavUser, new NavUser({
    user: (__VLS_ctx.data.user),
}));
const __VLS_30 = __VLS_29({
    user: (__VLS_ctx.data.user),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
// @ts-ignore
[data,];
var __VLS_27;
const __VLS_33 = {}.SidebarRail;
/** @type {[typeof __VLS_components.SidebarRail, ]} */ ;
// @ts-ignore
SidebarRail;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({}));
const __VLS_35 = __VLS_34({}, ...__VLS_functionalComponentArgsRest(__VLS_34));
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Sidebar: Sidebar,
        SidebarContent: SidebarContent,
        SidebarFooter: SidebarFooter,
        SidebarHeader: SidebarHeader,
        SidebarRail: SidebarRail,
        NavMain: NavMain,
        NavUser: NavUser,
        HeaderSidebar: HeaderSidebar,
        data: data,
    }),
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
