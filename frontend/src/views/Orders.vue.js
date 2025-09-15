import { onMounted, ref, watch } from "vue";
import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, RotateCcw } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import router from "@/routes";
import { useToast } from "@/components/ui/toast";
// Servicio (ajusta el path a tu implementación)
import { orderService } from "@/api/orderService";
// Componentes locales
import OrderStatusBadge from "@/components/OrderStatusBadge.vue";
import OrderActionsDropdown from "@/components/OrderActionsDropdown.vue";
import CancelOrderDialog from "@/components/CancelOrderDialog.vue";
// Controles tabla
const page = ref(0);
const size = ref(10);
const field = ref("createdAt");
const direction = ref("asc");
const statusFilter = ref(undefined);
const { toast } = useToast();
const loading = ref(false);
const error = ref(null);
const data = ref({
    orders: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
});
const sortOn = (f) => {
    if (field.value === f) {
        direction.value = direction.value === "asc" ? "desc" : "asc";
    }
    else {
        field.value = f;
        direction.value = "asc";
    }
    fetchOrders();
};
const fetchOrders = async () => {
    loading.value = true;
    error.value = null;
    try {
        const res = await orderService.getMyOrders(page.value, size.value, statusFilter.value, field.value, direction.value);
        data.value = res;
    }
    catch (e) {
        error.value = e?.message ?? "Error cargando órdenes";
    }
    finally {
        loading.value = false;
    }
};
const nextPage = () => {
    if (page.value + 1 < data.value.totalPages) {
        page.value += 1;
        fetchOrders();
    }
};
const prevPage = () => {
    if (page.value > 0) {
        page.value -= 1;
        fetchOrders();
    }
};
const reload = () => fetchOrders();
watch([size, statusFilter, field, direction], () => {
    page.value = 0;
    fetchOrders();
});
onMounted(fetchOrders);
// Navegación a billing cuando la orden está PENDING
const onRowClick = (order, e) => {
    // si el click viene desde la celda de acciones, no navegues
    const target = e?.target;
    if (target?.closest('[data-row-actions]'))
        return;
    if (order.status === "PENDING") {
        router.push({ path: "/billing", query: { orderId: order.id } });
    }
};
// Control de modales/hojas
const selectedOrder = ref(null);
const openUpdate = ref(false);
const openCancel = ref(false);
const openUpdateFor = (o) => {
    selectedOrder.value = o;
    openUpdate.value = true;
};
const openCancelFor = (o) => {
    selectedOrder.value = o;
    openCancel.value = true;
};
// Helpers
const fMoney = (n) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
const fDate = (iso) => new Date(iso).toLocaleString();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "min-h-screen p-6" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "mb-6 flex flex-wrap items-end justify-between gap-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-2xl font-bold tracking-tight" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-sm text-muted-foreground" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-1" },
});
const __VLS_0 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "text-xs" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
var __VLS_3;
const __VLS_5 = {}.Select;
/** @type {[typeof __VLS_components.Select, typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
Select;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    modelValue: (__VLS_ctx.statusFilter),
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.statusFilter),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
// @ts-ignore
[statusFilter,];
const __VLS_10 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
SelectTrigger;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ class: "w-40" },
}));
const __VLS_12 = __VLS_11({
    ...{ class: "w-40" },
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
const __VLS_15 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
SelectValue;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    placeholder: "Todos",
}));
const __VLS_17 = __VLS_16({
    placeholder: "Todos",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
var __VLS_13;
const __VLS_20 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
SelectContent;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_24 } = __VLS_23.slots;
const __VLS_25 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
SelectGroup;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_29 } = __VLS_28.slots;
const __VLS_30 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    value: (undefined),
}));
const __VLS_32 = __VLS_31({
    value: (undefined),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_34 } = __VLS_33.slots;
var __VLS_33;
const __VLS_35 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    value: "PENDING",
}));
const __VLS_37 = __VLS_36({
    value: "PENDING",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_39 } = __VLS_38.slots;
var __VLS_38;
const __VLS_40 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    value: "CONFIRMED",
}));
const __VLS_42 = __VLS_41({
    value: "CONFIRMED",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const { default: __VLS_44 } = __VLS_43.slots;
var __VLS_43;
const __VLS_45 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    value: "CANCELLED",
}));
const __VLS_47 = __VLS_46({
    value: "CANCELLED",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_49 } = __VLS_48.slots;
var __VLS_48;
var __VLS_28;
var __VLS_23;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-1" },
});
const __VLS_50 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    ...{ class: "text-xs" },
}));
const __VLS_52 = __VLS_51({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_54 } = __VLS_53.slots;
var __VLS_53;
const __VLS_55 = {}.Select;
/** @type {[typeof __VLS_components.Select, typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
Select;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    modelValue: (__VLS_ctx.size),
}));
const __VLS_57 = __VLS_56({
    modelValue: (__VLS_ctx.size),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_59 } = __VLS_58.slots;
// @ts-ignore
[size,];
const __VLS_60 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
SelectTrigger;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ class: "w-36" },
}));
const __VLS_62 = __VLS_61({
    ...{ class: "w-36" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_64 } = __VLS_63.slots;
const __VLS_65 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
SelectValue;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
const __VLS_67 = __VLS_66({}, ...__VLS_functionalComponentArgsRest(__VLS_66));
var __VLS_63;
const __VLS_70 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
SelectContent;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({}));
const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
const { default: __VLS_74 } = __VLS_73.slots;
const __VLS_75 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    value: (5),
}));
const __VLS_77 = __VLS_76({
    value: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_79 } = __VLS_78.slots;
var __VLS_78;
const __VLS_80 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    value: (10),
}));
const __VLS_82 = __VLS_81({
    value: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
const { default: __VLS_84 } = __VLS_83.slots;
var __VLS_83;
const __VLS_85 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
    value: (20),
}));
const __VLS_87 = __VLS_86({
    value: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
const { default: __VLS_89 } = __VLS_88.slots;
var __VLS_88;
const __VLS_90 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
    value: (50),
}));
const __VLS_92 = __VLS_91({
    value: (50),
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
const { default: __VLS_94 } = __VLS_93.slots;
var __VLS_93;
var __VLS_73;
var __VLS_58;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "outline",
}));
const __VLS_96 = __VLS_95({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.loading),
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_98;
let __VLS_99;
const __VLS_100 = ({ click: {} },
    { onClick: (__VLS_ctx.reload) });
const { default: __VLS_101 } = __VLS_97.slots;
// @ts-ignore
[loading, reload,];
const __VLS_102 = {}.RotateCcw;
/** @type {[typeof __VLS_components.RotateCcw, ]} */ ;
// @ts-ignore
RotateCcw;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    ...{ class: "w-4 h-4 mr-2" },
}));
const __VLS_104 = __VLS_103({
    ...{ class: "w-4 h-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
var __VLS_97;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "rounded-xl border bg-card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center justify-between px-4 py-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-2" },
});
const __VLS_107 = {}.Badge;
/** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
// @ts-ignore
Badge;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({
    variant: "secondary",
}));
const __VLS_109 = __VLS_108({
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
const { default: __VLS_111 } = __VLS_110.slots;
(__VLS_ctx.field);
(__VLS_ctx.direction);
// @ts-ignore
[field, direction,];
var __VLS_110;
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
(__VLS_ctx.data.totalElements);
// @ts-ignore
[data,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page === 0 || __VLS_ctx.loading),
    size: "sm",
    variant: "outline",
}));
const __VLS_113 = __VLS_112({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page === 0 || __VLS_ctx.loading),
    size: "sm",
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
let __VLS_115;
let __VLS_116;
const __VLS_117 = ({ click: {} },
    { onClick: (__VLS_ctx.prevPage) });
const { default: __VLS_118 } = __VLS_114.slots;
// @ts-ignore
[loading, page, prevPage,];
const __VLS_119 = {}.ChevronLeft;
/** @type {[typeof __VLS_components.ChevronLeft, ]} */ ;
// @ts-ignore
ChevronLeft;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
    ...{ class: "h-4 w-4 mr-1" },
}));
const __VLS_121 = __VLS_120({
    ...{ class: "h-4 w-4 mr-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
var __VLS_114;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-sm tabular-nums" },
});
(__VLS_ctx.page + 1);
(Math.max(__VLS_ctx.data.totalPages, 1));
// @ts-ignore
[data, page,];
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page + 1 >= __VLS_ctx.data.totalPages || __VLS_ctx.loading),
    size: "sm",
    variant: "outline",
}));
const __VLS_125 = __VLS_124({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page + 1 >= __VLS_ctx.data.totalPages || __VLS_ctx.loading),
    size: "sm",
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
let __VLS_127;
let __VLS_128;
const __VLS_129 = ({ click: {} },
    { onClick: (__VLS_ctx.nextPage) });
const { default: __VLS_130 } = __VLS_126.slots;
// @ts-ignore
[loading, data, page, nextPage,];
const __VLS_131 = {}.ChevronRight;
/** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
// @ts-ignore
ChevronRight;
// @ts-ignore
const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
    ...{ class: "h-4 w-4 ml-1" },
}));
const __VLS_133 = __VLS_132({
    ...{ class: "h-4 w-4 ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_132));
var __VLS_126;
const __VLS_136 = {}.Table;
/** @type {[typeof __VLS_components.Table, typeof __VLS_components.Table, ]} */ ;
// @ts-ignore
Table;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({}));
const __VLS_138 = __VLS_137({}, ...__VLS_functionalComponentArgsRest(__VLS_137));
const { default: __VLS_140 } = __VLS_139.slots;
const __VLS_141 = {}.TableCaption;
/** @type {[typeof __VLS_components.TableCaption, typeof __VLS_components.TableCaption, ]} */ ;
// @ts-ignore
TableCaption;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({}));
const __VLS_143 = __VLS_142({}, ...__VLS_functionalComponentArgsRest(__VLS_142));
const { default: __VLS_145 } = __VLS_144.slots;
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
var __VLS_144;
const __VLS_146 = {}.TableHeader;
/** @type {[typeof __VLS_components.TableHeader, typeof __VLS_components.TableHeader, ]} */ ;
// @ts-ignore
TableHeader;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({}));
const __VLS_148 = __VLS_147({}, ...__VLS_functionalComponentArgsRest(__VLS_147));
const { default: __VLS_150 } = __VLS_149.slots;
const __VLS_151 = {}.TableRow;
/** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
// @ts-ignore
TableRow;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({}));
const __VLS_153 = __VLS_152({}, ...__VLS_functionalComponentArgsRest(__VLS_152));
const { default: __VLS_155 } = __VLS_154.slots;
const __VLS_156 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}));
const __VLS_158 = __VLS_157({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_157));
let __VLS_160;
let __VLS_161;
const __VLS_162 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.sortOn('createdAt');
            // @ts-ignore
            [sortOn,];
        } });
const { default: __VLS_163 } = __VLS_159.slots;
const __VLS_164 = {}.ArrowUpDown;
/** @type {[typeof __VLS_components.ArrowUpDown, ]} */ ;
// @ts-ignore
ArrowUpDown;
// @ts-ignore
const __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({
    ...{ class: "inline h-4 w-4 ml-1" },
}));
const __VLS_166 = __VLS_165({
    ...{ class: "inline h-4 w-4 ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_165));
var __VLS_159;
const __VLS_169 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({}));
const __VLS_171 = __VLS_170({}, ...__VLS_functionalComponentArgsRest(__VLS_170));
const { default: __VLS_173 } = __VLS_172.slots;
var __VLS_172;
const __VLS_174 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({}));
const __VLS_176 = __VLS_175({}, ...__VLS_functionalComponentArgsRest(__VLS_175));
const { default: __VLS_178 } = __VLS_177.slots;
var __VLS_177;
const __VLS_179 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179({}));
const __VLS_181 = __VLS_180({}, ...__VLS_functionalComponentArgsRest(__VLS_180));
const { default: __VLS_183 } = __VLS_182.slots;
var __VLS_182;
const __VLS_184 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}));
const __VLS_186 = __VLS_185({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_185));
let __VLS_188;
let __VLS_189;
const __VLS_190 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.sortOn('totalPrice');
            // @ts-ignore
            [sortOn,];
        } });
const { default: __VLS_191 } = __VLS_187.slots;
const __VLS_192 = {}.ArrowUpDown;
/** @type {[typeof __VLS_components.ArrowUpDown, ]} */ ;
// @ts-ignore
ArrowUpDown;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({
    ...{ class: "inline h-4 w-4 ml-1" },
}));
const __VLS_194 = __VLS_193({
    ...{ class: "inline h-4 w-4 ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_193));
var __VLS_187;
const __VLS_197 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_198 = __VLS_asFunctionalComponent(__VLS_197, new __VLS_197({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}));
const __VLS_199 = __VLS_198({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_198));
let __VLS_201;
let __VLS_202;
const __VLS_203 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.sortOn('status');
            // @ts-ignore
            [sortOn,];
        } });
const { default: __VLS_204 } = __VLS_200.slots;
const __VLS_205 = {}.ArrowUpDown;
/** @type {[typeof __VLS_components.ArrowUpDown, ]} */ ;
// @ts-ignore
ArrowUpDown;
// @ts-ignore
const __VLS_206 = __VLS_asFunctionalComponent(__VLS_205, new __VLS_205({
    ...{ class: "inline h-4 w-4 ml-1" },
}));
const __VLS_207 = __VLS_206({
    ...{ class: "inline h-4 w-4 ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_206));
var __VLS_200;
const __VLS_210 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({
    ...{ class: "text-right" },
}));
const __VLS_212 = __VLS_211({
    ...{ class: "text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_211));
const { default: __VLS_214 } = __VLS_213.slots;
var __VLS_213;
var __VLS_154;
var __VLS_149;
const __VLS_215 = {}.TableBody;
/** @type {[typeof __VLS_components.TableBody, typeof __VLS_components.TableBody, ]} */ ;
// @ts-ignore
TableBody;
// @ts-ignore
const __VLS_216 = __VLS_asFunctionalComponent(__VLS_215, new __VLS_215({}));
const __VLS_217 = __VLS_216({}, ...__VLS_functionalComponentArgsRest(__VLS_216));
const { default: __VLS_219 } = __VLS_218.slots;
if (!__VLS_ctx.loading && __VLS_ctx.data.orders.length === 0) {
    // @ts-ignore
    [loading, data,];
    const __VLS_220 = {}.TableRow;
    /** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
    // @ts-ignore
    TableRow;
    // @ts-ignore
    const __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({}));
    const __VLS_222 = __VLS_221({}, ...__VLS_functionalComponentArgsRest(__VLS_221));
    const { default: __VLS_224 } = __VLS_223.slots;
    const __VLS_225 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_226 = __VLS_asFunctionalComponent(__VLS_225, new __VLS_225({
        ...{ class: "text-center text-sm text-muted-foreground" },
        colspan: "7",
    }));
    const __VLS_227 = __VLS_226({
        ...{ class: "text-center text-sm text-muted-foreground" },
        colspan: "7",
    }, ...__VLS_functionalComponentArgsRest(__VLS_226));
    const { default: __VLS_229 } = __VLS_228.slots;
    var __VLS_228;
    var __VLS_223;
}
for (const [o] of __VLS_getVForSourceType((__VLS_ctx.data.orders))) {
    // @ts-ignore
    [data,];
    const __VLS_230 = {}.TableRow;
    /** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
    // @ts-ignore
    TableRow;
    // @ts-ignore
    const __VLS_231 = __VLS_asFunctionalComponent(__VLS_230, new __VLS_230({
        ...{ 'onClick': {} },
        key: (o.id),
        ...{ class: ([
                'hover:bg-muted/50 transition',
                o.status === 'PENDING' ? 'cursor-pointer' : 'cursor-default'
            ]) },
    }));
    const __VLS_232 = __VLS_231({
        ...{ 'onClick': {} },
        key: (o.id),
        ...{ class: ([
                'hover:bg-muted/50 transition',
                o.status === 'PENDING' ? 'cursor-pointer' : 'cursor-default'
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_231));
    let __VLS_234;
    let __VLS_235;
    const __VLS_236 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.onRowClick(o, $event);
                // @ts-ignore
                [onRowClick,];
            } });
    const { default: __VLS_237 } = __VLS_233.slots;
    const __VLS_238 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_239 = __VLS_asFunctionalComponent(__VLS_238, new __VLS_238({
        ...{ class: "tabular-nums" },
    }));
    const __VLS_240 = __VLS_239({
        ...{ class: "tabular-nums" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_239));
    const { default: __VLS_242 } = __VLS_241.slots;
    (__VLS_ctx.fDate(o.createdAt));
    // @ts-ignore
    [fDate,];
    var __VLS_241;
    const __VLS_243 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_244 = __VLS_asFunctionalComponent(__VLS_243, new __VLS_243({
        ...{ class: "font-mono text-xs" },
    }));
    const __VLS_245 = __VLS_244({
        ...{ class: "font-mono text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_244));
    const { default: __VLS_247 } = __VLS_246.slots;
    (o.id);
    var __VLS_246;
    const __VLS_248 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({}));
    const __VLS_250 = __VLS_249({}, ...__VLS_functionalComponentArgsRest(__VLS_249));
    const { default: __VLS_252 } = __VLS_251.slots;
    (o.user);
    var __VLS_251;
    const __VLS_253 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_254 = __VLS_asFunctionalComponent(__VLS_253, new __VLS_253({
        ...{ class: "max-w-[280px]" },
    }));
    const __VLS_255 = __VLS_254({
        ...{ class: "max-w-[280px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_254));
    const { default: __VLS_257 } = __VLS_256.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "truncate text-xs text-muted-foreground" },
    });
    (o.shippingAddress.fullName);
    (o.shippingAddress.addressLine);
    (o.shippingAddress.city);
    var __VLS_256;
    const __VLS_258 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_259 = __VLS_asFunctionalComponent(__VLS_258, new __VLS_258({
        ...{ class: "tabular-nums font-medium" },
    }));
    const __VLS_260 = __VLS_259({
        ...{ class: "tabular-nums font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_259));
    const { default: __VLS_262 } = __VLS_261.slots;
    (__VLS_ctx.fMoney(o.totalPrice));
    // @ts-ignore
    [fMoney,];
    var __VLS_261;
    const __VLS_263 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_264 = __VLS_asFunctionalComponent(__VLS_263, new __VLS_263({}));
    const __VLS_265 = __VLS_264({}, ...__VLS_functionalComponentArgsRest(__VLS_264));
    const { default: __VLS_267 } = __VLS_266.slots;
    /** @type {[typeof OrderStatusBadge, ]} */ ;
    // @ts-ignore
    const __VLS_268 = __VLS_asFunctionalComponent(OrderStatusBadge, new OrderStatusBadge({
        status: (o.status),
    }));
    const __VLS_269 = __VLS_268({
        status: (o.status),
    }, ...__VLS_functionalComponentArgsRest(__VLS_268));
    var __VLS_266;
    const __VLS_272 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({
        ...{ 'onClick': {} },
        ...{ class: "text-right" },
        dataRowActions: true,
    }));
    const __VLS_274 = __VLS_273({
        ...{ 'onClick': {} },
        ...{ class: "text-right" },
        dataRowActions: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_273));
    let __VLS_276;
    let __VLS_277;
    const __VLS_278 = ({ click: {} },
        { onClick: () => { } });
    const { default: __VLS_279 } = __VLS_275.slots;
    const __VLS_280 = {}.DropdownMenu;
    /** @type {[typeof __VLS_components.DropdownMenu, typeof __VLS_components.DropdownMenu, ]} */ ;
    // @ts-ignore
    DropdownMenu;
    // @ts-ignore
    const __VLS_281 = __VLS_asFunctionalComponent(__VLS_280, new __VLS_280({}));
    const __VLS_282 = __VLS_281({}, ...__VLS_functionalComponentArgsRest(__VLS_281));
    const { default: __VLS_284 } = __VLS_283.slots;
    const __VLS_285 = {}.DropdownMenuTrigger;
    /** @type {[typeof __VLS_components.DropdownMenuTrigger, typeof __VLS_components.DropdownMenuTrigger, ]} */ ;
    // @ts-ignore
    DropdownMenuTrigger;
    // @ts-ignore
    const __VLS_286 = __VLS_asFunctionalComponent(__VLS_285, new __VLS_285({
        asChild: true,
    }));
    const __VLS_287 = __VLS_286({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_286));
    const { default: __VLS_289 } = __VLS_288.slots;
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_290 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        disabled: (__VLS_ctx.loading),
        size: "icon-sm",
        variant: "ghost",
    }));
    const __VLS_291 = __VLS_290({
        ...{ 'onClick': {} },
        disabled: (__VLS_ctx.loading),
        size: "icon-sm",
        variant: "ghost",
    }, ...__VLS_functionalComponentArgsRest(__VLS_290));
    let __VLS_293;
    let __VLS_294;
    const __VLS_295 = ({ click: {} },
        { onClick: () => { } });
    const { default: __VLS_296 } = __VLS_292.slots;
    // @ts-ignore
    [loading,];
    const __VLS_297 = {}.MoreHorizontal;
    /** @type {[typeof __VLS_components.MoreHorizontal, ]} */ ;
    // @ts-ignore
    MoreHorizontal;
    // @ts-ignore
    const __VLS_298 = __VLS_asFunctionalComponent(__VLS_297, new __VLS_297({
        ...{ class: "h-5 w-5" },
    }));
    const __VLS_299 = __VLS_298({
        ...{ class: "h-5 w-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_298));
    var __VLS_292;
    var __VLS_288;
    const __VLS_302 = {}.DropdownMenuContent;
    /** @type {[typeof __VLS_components.DropdownMenuContent, typeof __VLS_components.DropdownMenuContent, ]} */ ;
    // @ts-ignore
    DropdownMenuContent;
    // @ts-ignore
    const __VLS_303 = __VLS_asFunctionalComponent(__VLS_302, new __VLS_302({
        align: "end",
        ...{ class: "w-56" },
    }));
    const __VLS_304 = __VLS_303({
        align: "end",
        ...{ class: "w-56" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_303));
    const { default: __VLS_306 } = __VLS_305.slots;
    /** @type {[typeof OrderActionsDropdown, ]} */ ;
    // @ts-ignore
    const __VLS_307 = __VLS_asFunctionalComponent(OrderActionsDropdown, new OrderActionsDropdown({
        ...{ 'onCancel': {} },
        ...{ 'onUpdate': {} },
        order: (o),
    }));
    const __VLS_308 = __VLS_307({
        ...{ 'onCancel': {} },
        ...{ 'onUpdate': {} },
        order: (o),
    }, ...__VLS_functionalComponentArgsRest(__VLS_307));
    let __VLS_310;
    let __VLS_311;
    const __VLS_312 = ({ cancel: {} },
        { onCancel: (...[$event]) => {
                __VLS_ctx.openCancelFor(o);
                // @ts-ignore
                [openCancelFor,];
            } });
    const __VLS_313 = ({ update: {} },
        { onUpdate: (...[$event]) => {
                __VLS_ctx.openUpdateFor(o);
                // @ts-ignore
                [openUpdateFor,];
            } });
    var __VLS_309;
    var __VLS_305;
    var __VLS_283;
    var __VLS_275;
    var __VLS_233;
}
var __VLS_218;
var __VLS_139;
if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "mt-3 text-sm text-red-600" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
/** @type {[typeof CancelOrderDialog, ]} */ ;
// @ts-ignore
const __VLS_315 = __VLS_asFunctionalComponent(CancelOrderDialog, new CancelOrderDialog({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openCancel),
    order: (__VLS_ctx.selectedOrder),
}));
const __VLS_316 = __VLS_315({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openCancel),
    order: (__VLS_ctx.selectedOrder),
}, ...__VLS_functionalComponentArgsRest(__VLS_315));
let __VLS_318;
let __VLS_319;
const __VLS_320 = ({ updated: {} },
    { onUpdated: (__VLS_ctx.reload) });
// @ts-ignore
[reload, openCancel, selectedOrder,];
var __VLS_317;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[280px]']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-56']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        ArrowUpDown: ArrowUpDown,
        ChevronLeft: ChevronLeft,
        ChevronRight: ChevronRight,
        MoreHorizontal: MoreHorizontal,
        RotateCcw: RotateCcw,
        Button: Button,
        Table: Table,
        TableBody: TableBody,
        TableCaption: TableCaption,
        TableCell: TableCell,
        TableHead: TableHead,
        TableHeader: TableHeader,
        TableRow: TableRow,
        Select: Select,
        SelectContent: SelectContent,
        SelectGroup: SelectGroup,
        SelectItem: SelectItem,
        SelectTrigger: SelectTrigger,
        SelectValue: SelectValue,
        Label: Label,
        Badge: Badge,
        DropdownMenu: DropdownMenu,
        DropdownMenuContent: DropdownMenuContent,
        DropdownMenuTrigger: DropdownMenuTrigger,
        OrderStatusBadge: OrderStatusBadge,
        OrderActionsDropdown: OrderActionsDropdown,
        CancelOrderDialog: CancelOrderDialog,
        page: page,
        size: size,
        field: field,
        direction: direction,
        statusFilter: statusFilter,
        loading: loading,
        error: error,
        data: data,
        sortOn: sortOn,
        nextPage: nextPage,
        prevPage: prevPage,
        reload: reload,
        onRowClick: onRowClick,
        selectedOrder: selectedOrder,
        openCancel: openCancel,
        openUpdateFor: openUpdateFor,
        openCancelFor: openCancelFor,
        fMoney: fMoney,
        fDate: fDate,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
