import { computed } from "vue";
import { cn } from "@/lib/utils";
import { Skeleton } from '@/components/ui/skeleton';
const props = defineProps();
const width = computed(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: (__VLS_ctx.cn('rounded-md h-8 flex gap-2 px-2 items-center', props.class)) },
    'data-sidebar': "menu-skeleton",
});
// @ts-ignore
[cn,];
if (__VLS_ctx.showIcon) {
    // @ts-ignore
    [showIcon,];
    const __VLS_0 = {}.Skeleton;
    /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
    // @ts-ignore
    Skeleton;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "size-4 rounded-md" },
        dataSidebar: "menu-skeleton-icon",
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "size-4 rounded-md" },
        dataSidebar: "menu-skeleton-icon",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
const __VLS_5 = {}.Skeleton;
/** @type {[typeof __VLS_components.Skeleton, ]} */ ;
// @ts-ignore
Skeleton;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ style: ({ '--skeleton-width': __VLS_ctx.width }) },
    ...{ class: "h-4 flex-1 max-w-[--skeleton-width]" },
    dataSidebar: "menu-skeleton-text",
}));
const __VLS_7 = __VLS_6({
    ...{ style: ({ '--skeleton-width': __VLS_ctx.width }) },
    ...{ class: "h-4 flex-1 max-w-[--skeleton-width]" },
    dataSidebar: "menu-skeleton-text",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
// @ts-ignore
[width,];
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[--skeleton-width]']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        cn: cn,
        Skeleton: Skeleton,
        width: width,
    }),
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
