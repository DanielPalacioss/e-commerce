import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, } from "lucide-vue-next";
import { Avatar, AvatarFallback, AvatarImage, } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from '@/components/ui/sidebar';
import { logout } from "@/api/authService";
import { useRouter } from "vue-router";
const props = defineProps();
const { isMobile } = useSidebar();
const router = useRouter();
const goToManageAccount = () => {
    router.push("/manage-account");
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.SidebarMenu;
/** @type {[typeof __VLS_components.SidebarMenu, typeof __VLS_components.SidebarMenu, ]} */ ;
// @ts-ignore
SidebarMenu;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.SidebarMenuItem;
/** @type {[typeof __VLS_components.SidebarMenuItem, typeof __VLS_components.SidebarMenuItem, ]} */ ;
// @ts-ignore
SidebarMenuItem;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
const __VLS_11 = {}.DropdownMenu;
/** @type {[typeof __VLS_components.DropdownMenu, typeof __VLS_components.DropdownMenu, ]} */ ;
// @ts-ignore
DropdownMenu;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
const __VLS_16 = {}.DropdownMenuTrigger;
/** @type {[typeof __VLS_components.DropdownMenuTrigger, typeof __VLS_components.DropdownMenuTrigger, ]} */ ;
// @ts-ignore
DropdownMenuTrigger;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    asChild: true,
}));
const __VLS_18 = __VLS_17({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_20 } = __VLS_19.slots;
const __VLS_21 = {}.SidebarMenuButton;
/** @type {[typeof __VLS_components.SidebarMenuButton, typeof __VLS_components.SidebarMenuButton, ]} */ ;
// @ts-ignore
SidebarMenuButton;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" },
    size: "lg",
}));
const __VLS_23 = __VLS_22({
    ...{ class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" },
    size: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_25 } = __VLS_24.slots;
const __VLS_26 = {}.Avatar;
/** @type {[typeof __VLS_components.Avatar, typeof __VLS_components.Avatar, ]} */ ;
// @ts-ignore
Avatar;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    ...{ class: "h-8 w-8 rounded-lg" },
}));
const __VLS_28 = __VLS_27({
    ...{ class: "h-8 w-8 rounded-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const { default: __VLS_30 } = __VLS_29.slots;
const __VLS_31 = {}.AvatarImage;
/** @type {[typeof __VLS_components.AvatarImage, ]} */ ;
// @ts-ignore
AvatarImage;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    alt: (__VLS_ctx.user.name),
    src: (__VLS_ctx.user.avatar),
}));
const __VLS_33 = __VLS_32({
    alt: (__VLS_ctx.user.name),
    src: (__VLS_ctx.user.avatar),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
// @ts-ignore
[user, user,];
const __VLS_36 = {}.AvatarFallback;
/** @type {[typeof __VLS_components.AvatarFallback, typeof __VLS_components.AvatarFallback, ]} */ ;
// @ts-ignore
AvatarFallback;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ class: "rounded-lg" },
}));
const __VLS_38 = __VLS_37({
    ...{ class: "rounded-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_40 } = __VLS_39.slots;
(props.user.name.substring(0, 2).toUpperCase() ?? "");
var __VLS_39;
var __VLS_29;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid flex-1 text-left text-sm leading-tight" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "truncate font-semibold" },
});
(__VLS_ctx.user.name);
// @ts-ignore
[user,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "truncate text-xs" },
});
(__VLS_ctx.user.email);
// @ts-ignore
[user,];
const __VLS_41 = {}.ChevronsUpDown;
/** @type {[typeof __VLS_components.ChevronsUpDown, ]} */ ;
// @ts-ignore
ChevronsUpDown;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    ...{ class: "ml-auto size-4" },
}));
const __VLS_43 = __VLS_42({
    ...{ class: "ml-auto size-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
var __VLS_24;
var __VLS_19;
const __VLS_46 = {}.DropdownMenuContent;
/** @type {[typeof __VLS_components.DropdownMenuContent, typeof __VLS_components.DropdownMenuContent, ]} */ ;
// @ts-ignore
DropdownMenuContent;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    side: (__VLS_ctx.isMobile ? 'bottom' : 'right'),
    sideOffset: (4),
    align: "end",
    ...{ class: "w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg" },
}));
const __VLS_48 = __VLS_47({
    side: (__VLS_ctx.isMobile ? 'bottom' : 'right'),
    sideOffset: (4),
    align: "end",
    ...{ class: "w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const { default: __VLS_50 } = __VLS_49.slots;
// @ts-ignore
[isMobile,];
const __VLS_51 = {}.DropdownMenuLabel;
/** @type {[typeof __VLS_components.DropdownMenuLabel, typeof __VLS_components.DropdownMenuLabel, ]} */ ;
// @ts-ignore
DropdownMenuLabel;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    ...{ class: "p-0 font-normal" },
}));
const __VLS_53 = __VLS_52({
    ...{ class: "p-0 font-normal" },
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_55 } = __VLS_54.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" },
});
const __VLS_56 = {}.Avatar;
/** @type {[typeof __VLS_components.Avatar, typeof __VLS_components.Avatar, ]} */ ;
// @ts-ignore
Avatar;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    ...{ class: "h-8 w-8 rounded-lg" },
}));
const __VLS_58 = __VLS_57({
    ...{ class: "h-8 w-8 rounded-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_60 } = __VLS_59.slots;
const __VLS_61 = {}.AvatarImage;
/** @type {[typeof __VLS_components.AvatarImage, ]} */ ;
// @ts-ignore
AvatarImage;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    alt: (__VLS_ctx.user.name),
    src: (__VLS_ctx.user.avatar),
}));
const __VLS_63 = __VLS_62({
    alt: (__VLS_ctx.user.name),
    src: (__VLS_ctx.user.avatar),
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
// @ts-ignore
[user, user,];
const __VLS_66 = {}.AvatarFallback;
/** @type {[typeof __VLS_components.AvatarFallback, typeof __VLS_components.AvatarFallback, ]} */ ;
// @ts-ignore
AvatarFallback;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    ...{ class: "rounded-lg" },
}));
const __VLS_68 = __VLS_67({
    ...{ class: "rounded-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_70 } = __VLS_69.slots;
(props.user.name.substring(0, 2).toUpperCase() ?? "");
var __VLS_69;
var __VLS_59;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid flex-1 text-left text-sm leading-tight" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "truncate font-semibold" },
});
(__VLS_ctx.user.name);
// @ts-ignore
[user,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "truncate text-xs" },
});
(__VLS_ctx.user.email);
// @ts-ignore
[user,];
var __VLS_54;
const __VLS_71 = {}.DropdownMenuSeparator;
/** @type {[typeof __VLS_components.DropdownMenuSeparator, ]} */ ;
// @ts-ignore
DropdownMenuSeparator;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({}));
const __VLS_73 = __VLS_72({}, ...__VLS_functionalComponentArgsRest(__VLS_72));
const __VLS_76 = {}.DropdownMenuGroup;
/** @type {[typeof __VLS_components.DropdownMenuGroup, typeof __VLS_components.DropdownMenuGroup, ]} */ ;
// @ts-ignore
DropdownMenuGroup;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({}));
const __VLS_78 = __VLS_77({}, ...__VLS_functionalComponentArgsRest(__VLS_77));
const { default: __VLS_80 } = __VLS_79.slots;
const __VLS_81 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
DropdownMenuItem;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    ...{ 'onClick': {} },
}));
const __VLS_83 = __VLS_82({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
let __VLS_85;
let __VLS_86;
const __VLS_87 = ({ click: {} },
    { onClick: (__VLS_ctx.goToManageAccount) });
const { default: __VLS_88 } = __VLS_84.slots;
// @ts-ignore
[goToManageAccount,];
const __VLS_89 = {}.BadgeCheck;
/** @type {[typeof __VLS_components.BadgeCheck, ]} */ ;
// @ts-ignore
BadgeCheck;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({}));
const __VLS_91 = __VLS_90({}, ...__VLS_functionalComponentArgsRest(__VLS_90));
var __VLS_84;
const __VLS_94 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
DropdownMenuItem;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({}));
const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
const { default: __VLS_98 } = __VLS_97.slots;
const __VLS_99 = {}.CreditCard;
/** @type {[typeof __VLS_components.CreditCard, ]} */ ;
// @ts-ignore
CreditCard;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({}));
const __VLS_101 = __VLS_100({}, ...__VLS_functionalComponentArgsRest(__VLS_100));
var __VLS_97;
const __VLS_104 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
DropdownMenuItem;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({}));
const __VLS_106 = __VLS_105({}, ...__VLS_functionalComponentArgsRest(__VLS_105));
const { default: __VLS_108 } = __VLS_107.slots;
const __VLS_109 = {}.Bell;
/** @type {[typeof __VLS_components.Bell, ]} */ ;
// @ts-ignore
Bell;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({}));
const __VLS_111 = __VLS_110({}, ...__VLS_functionalComponentArgsRest(__VLS_110));
var __VLS_107;
var __VLS_79;
const __VLS_114 = {}.DropdownMenuSeparator;
/** @type {[typeof __VLS_components.DropdownMenuSeparator, ]} */ ;
// @ts-ignore
DropdownMenuSeparator;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({}));
const __VLS_116 = __VLS_115({}, ...__VLS_functionalComponentArgsRest(__VLS_115));
const __VLS_119 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
DropdownMenuItem;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
    ...{ 'onClick': {} },
}));
const __VLS_121 = __VLS_120({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
let __VLS_123;
let __VLS_124;
const __VLS_125 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.logout();
            // @ts-ignore
            [logout,];
        } });
const { default: __VLS_126 } = __VLS_122.slots;
const __VLS_127 = {}.LogOut;
/** @type {[typeof __VLS_components.LogOut, ]} */ ;
// @ts-ignore
LogOut;
// @ts-ignore
const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({}));
const __VLS_129 = __VLS_128({}, ...__VLS_functionalComponentArgsRest(__VLS_128));
var __VLS_122;
var __VLS_49;
var __VLS_14;
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['data-[state=open]:bg-sidebar-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[state=open]:text-sidebar-accent-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[--reka-dropdown-menu-trigger-width]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-56']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        BadgeCheck: BadgeCheck,
        Bell: Bell,
        ChevronsUpDown: ChevronsUpDown,
        CreditCard: CreditCard,
        LogOut: LogOut,
        Avatar: Avatar,
        AvatarFallback: AvatarFallback,
        AvatarImage: AvatarImage,
        DropdownMenu: DropdownMenu,
        DropdownMenuContent: DropdownMenuContent,
        DropdownMenuGroup: DropdownMenuGroup,
        DropdownMenuItem: DropdownMenuItem,
        DropdownMenuLabel: DropdownMenuLabel,
        DropdownMenuSeparator: DropdownMenuSeparator,
        DropdownMenuTrigger: DropdownMenuTrigger,
        SidebarMenu: SidebarMenu,
        SidebarMenuButton: SidebarMenuButton,
        SidebarMenuItem: SidebarMenuItem,
        logout: logout,
        isMobile: isMobile,
        goToManageAccount: goToManageAccount,
    }),
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
