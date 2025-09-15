import { onMounted, ref, watch } from "vue";
import { ChevronLeft, ChevronRight, ArrowUpDown, RotateCcw, CreditCard } from "lucide-vue-next";
// UI
import Button from "@/components/ui/button/Button.vue";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
// Servicio
import { invoiceService } from "@/api/invoiceService";
// Controles tabla
const page = ref(0);
const size = ref(10);
const field = ref("createdAt");
const direction = ref("asc");
const paymentMethodFilter = ref(undefined);
const { toast } = useToast();
const loading = ref(false);
const error = ref(null);
const data = ref({
    invoices: [],
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
    fetchInvoices();
};
const fetchInvoices = async () => {
    loading.value = true;
    error.value = null;
    try {
        const res = await invoiceService.getInvoicesMe(page.value, size.value, field.value, direction.value, paymentMethodFilter.value);
        data.value = res;
    }
    catch (e) {
        error.value = e?.message ?? "Error cargando invoices";
        toast({
            title: "No se pudieron cargar las invoices",
            description: error.value,
            variant: "destructive",
        });
    }
    finally {
        loading.value = false;
    }
};
const nextPage = () => {
    if (page.value + 1 < data.value.totalPages) {
        page.value += 1;
        fetchInvoices();
    }
};
const prevPage = () => {
    if (page.value > 0) {
        page.value -= 1;
        fetchInvoices();
    }
};
const reload = () => fetchInvoices();
const clearFilters = () => {
    paymentMethodFilter.value = undefined;
    field.value = "createdAt";
    direction.value = "asc";
    page.value = 0;
    fetchInvoices();
};
watch([size, paymentMethodFilter, field, direction], () => {
    page.value = 0;
    fetchInvoices();
});
onMounted(fetchInvoices);
// Helpers
const fMoney = (n) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
const fDate = (iso) => new Date(iso).toLocaleString();
const pmLabel = (pm) => (pm === "CREDIT_CARD" ? "Credit card" : "Debit card");
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
    modelValue: (__VLS_ctx.paymentMethodFilter),
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.paymentMethodFilter),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
// @ts-ignore
[paymentMethodFilter,];
const __VLS_10 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
SelectTrigger;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ class: "w-44" },
}));
const __VLS_12 = __VLS_11({
    ...{ class: "w-44" },
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
    value: "CREDIT_CARD",
}));
const __VLS_37 = __VLS_36({
    value: "CREDIT_CARD",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_39 } = __VLS_38.slots;
var __VLS_38;
const __VLS_40 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    value: "DEBIT_CARD",
}));
const __VLS_42 = __VLS_41({
    value: "DEBIT_CARD",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const { default: __VLS_44 } = __VLS_43.slots;
var __VLS_43;
var __VLS_28;
var __VLS_23;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-1" },
});
const __VLS_45 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    ...{ class: "text-xs" },
}));
const __VLS_47 = __VLS_46({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_49 } = __VLS_48.slots;
var __VLS_48;
const __VLS_50 = {}.Select;
/** @type {[typeof __VLS_components.Select, typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
Select;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    modelValue: (__VLS_ctx.size),
}));
const __VLS_52 = __VLS_51({
    modelValue: (__VLS_ctx.size),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_54 } = __VLS_53.slots;
// @ts-ignore
[size,];
const __VLS_55 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
SelectTrigger;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    ...{ class: "w-36" },
}));
const __VLS_57 = __VLS_56({
    ...{ class: "w-36" },
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_59 } = __VLS_58.slots;
const __VLS_60 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
SelectValue;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
var __VLS_58;
const __VLS_65 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
SelectContent;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
const __VLS_67 = __VLS_66({}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const { default: __VLS_69 } = __VLS_68.slots;
const __VLS_70 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    value: (5),
}));
const __VLS_72 = __VLS_71({
    value: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
const { default: __VLS_74 } = __VLS_73.slots;
var __VLS_73;
const __VLS_75 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    value: (10),
}));
const __VLS_77 = __VLS_76({
    value: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_79 } = __VLS_78.slots;
var __VLS_78;
const __VLS_80 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    value: (20),
}));
const __VLS_82 = __VLS_81({
    value: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
const { default: __VLS_84 } = __VLS_83.slots;
var __VLS_83;
const __VLS_85 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
    value: (50),
}));
const __VLS_87 = __VLS_86({
    value: (50),
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
const { default: __VLS_89 } = __VLS_88.slots;
var __VLS_88;
var __VLS_68;
var __VLS_53;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "outline",
    disabled: (__VLS_ctx.loading),
}));
const __VLS_91 = __VLS_90({
    ...{ 'onClick': {} },
    variant: "outline",
    disabled: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
let __VLS_93;
let __VLS_94;
const __VLS_95 = ({ click: {} },
    { onClick: (__VLS_ctx.reload) });
const { default: __VLS_96 } = __VLS_92.slots;
// @ts-ignore
[loading, reload,];
const __VLS_97 = {}.RotateCcw;
/** @type {[typeof __VLS_components.RotateCcw, ]} */ ;
// @ts-ignore
RotateCcw;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
    ...{ class: "w-4 h-4 mr-2" },
}));
const __VLS_99 = __VLS_98({
    ...{ class: "w-4 h-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_98));
var __VLS_92;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "secondary",
    disabled: (__VLS_ctx.loading),
}));
const __VLS_103 = __VLS_102({
    ...{ 'onClick': {} },
    variant: "secondary",
    disabled: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
let __VLS_105;
let __VLS_106;
const __VLS_107 = ({ click: {} },
    { onClick: (__VLS_ctx.clearFilters) });
const { default: __VLS_108 } = __VLS_104.slots;
// @ts-ignore
[loading, clearFilters,];
var __VLS_104;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "rounded-xl border bg-card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center justify-between px-4 py-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex flex-wrap items-center gap-2" },
});
const __VLS_109 = {}.Badge;
/** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
// @ts-ignore
Badge;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
    variant: "secondary",
}));
const __VLS_111 = __VLS_110({
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_110));
const { default: __VLS_113 } = __VLS_112.slots;
(__VLS_ctx.field);
(__VLS_ctx.direction);
// @ts-ignore
[field, direction,];
var __VLS_112;
if (__VLS_ctx.paymentMethodFilter) {
    // @ts-ignore
    [paymentMethodFilter,];
    const __VLS_114 = {}.Badge;
    /** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
    // @ts-ignore
    Badge;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
        variant: "secondary",
    }));
    const __VLS_116 = __VLS_115({
        variant: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    const { default: __VLS_118 } = __VLS_117.slots;
    (__VLS_ctx.paymentMethodFilter);
    // @ts-ignore
    [paymentMethodFilter,];
    var __VLS_117;
}
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
const __VLS_119 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.page === 0 || __VLS_ctx.loading),
}));
const __VLS_120 = __VLS_119({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.page === 0 || __VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
let __VLS_122;
let __VLS_123;
const __VLS_124 = ({ click: {} },
    { onClick: (__VLS_ctx.prevPage) });
const { default: __VLS_125 } = __VLS_121.slots;
// @ts-ignore
[loading, page, prevPage,];
const __VLS_126 = {}.ChevronLeft;
/** @type {[typeof __VLS_components.ChevronLeft, ]} */ ;
// @ts-ignore
ChevronLeft;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    ...{ class: "h-4 w-4 mr-1" },
}));
const __VLS_128 = __VLS_127({
    ...{ class: "h-4 w-4 mr-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
var __VLS_121;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-sm tabular-nums" },
});
(__VLS_ctx.page + 1);
(Math.max(__VLS_ctx.data.totalPages, 1));
// @ts-ignore
[data, page,];
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.page + 1 >= __VLS_ctx.data.totalPages || __VLS_ctx.loading),
}));
const __VLS_132 = __VLS_131({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.page + 1 >= __VLS_ctx.data.totalPages || __VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
let __VLS_134;
let __VLS_135;
const __VLS_136 = ({ click: {} },
    { onClick: (__VLS_ctx.nextPage) });
const { default: __VLS_137 } = __VLS_133.slots;
// @ts-ignore
[loading, data, page, nextPage,];
const __VLS_138 = {}.ChevronRight;
/** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
// @ts-ignore
ChevronRight;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    ...{ class: "h-4 w-4 ml-1" },
}));
const __VLS_140 = __VLS_139({
    ...{ class: "h-4 w-4 ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
var __VLS_133;
const __VLS_143 = {}.Table;
/** @type {[typeof __VLS_components.Table, typeof __VLS_components.Table, ]} */ ;
// @ts-ignore
Table;
// @ts-ignore
const __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({}));
const __VLS_145 = __VLS_144({}, ...__VLS_functionalComponentArgsRest(__VLS_144));
const { default: __VLS_147 } = __VLS_146.slots;
const __VLS_148 = {}.TableCaption;
/** @type {[typeof __VLS_components.TableCaption, typeof __VLS_components.TableCaption, ]} */ ;
// @ts-ignore
TableCaption;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({}));
const __VLS_150 = __VLS_149({}, ...__VLS_functionalComponentArgsRest(__VLS_149));
const { default: __VLS_152 } = __VLS_151.slots;
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
var __VLS_151;
const __VLS_153 = {}.TableHeader;
/** @type {[typeof __VLS_components.TableHeader, typeof __VLS_components.TableHeader, ]} */ ;
// @ts-ignore
TableHeader;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({}));
const __VLS_155 = __VLS_154({}, ...__VLS_functionalComponentArgsRest(__VLS_154));
const { default: __VLS_157 } = __VLS_156.slots;
const __VLS_158 = {}.TableRow;
/** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
// @ts-ignore
TableRow;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({}));
const __VLS_160 = __VLS_159({}, ...__VLS_functionalComponentArgsRest(__VLS_159));
const { default: __VLS_162 } = __VLS_161.slots;
const __VLS_163 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}));
const __VLS_165 = __VLS_164({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_164));
let __VLS_167;
let __VLS_168;
const __VLS_169 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.sortOn('createdAt');
            // @ts-ignore
            [sortOn,];
        } });
const { default: __VLS_170 } = __VLS_166.slots;
const __VLS_171 = {}.ArrowUpDown;
/** @type {[typeof __VLS_components.ArrowUpDown, ]} */ ;
// @ts-ignore
ArrowUpDown;
// @ts-ignore
const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({
    ...{ class: "inline h-4 w-4 ml-1" },
}));
const __VLS_173 = __VLS_172({
    ...{ class: "inline h-4 w-4 ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_172));
var __VLS_166;
const __VLS_176 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}));
const __VLS_178 = __VLS_177({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_177));
let __VLS_180;
let __VLS_181;
const __VLS_182 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.sortOn('totalAmount');
            // @ts-ignore
            [sortOn,];
        } });
const { default: __VLS_183 } = __VLS_179.slots;
const __VLS_184 = {}.ArrowUpDown;
/** @type {[typeof __VLS_components.ArrowUpDown, ]} */ ;
// @ts-ignore
ArrowUpDown;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({
    ...{ class: "inline h-4 w-4 ml-1" },
}));
const __VLS_186 = __VLS_185({
    ...{ class: "inline h-4 w-4 ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_185));
var __VLS_179;
const __VLS_189 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent(__VLS_189, new __VLS_189({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}));
const __VLS_191 = __VLS_190({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer select-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_190));
let __VLS_193;
let __VLS_194;
const __VLS_195 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.sortOn('paymentMethod');
            // @ts-ignore
            [sortOn,];
        } });
const { default: __VLS_196 } = __VLS_192.slots;
const __VLS_197 = {}.ArrowUpDown;
/** @type {[typeof __VLS_components.ArrowUpDown, ]} */ ;
// @ts-ignore
ArrowUpDown;
// @ts-ignore
const __VLS_198 = __VLS_asFunctionalComponent(__VLS_197, new __VLS_197({
    ...{ class: "inline h-4 w-4 ml-1" },
}));
const __VLS_199 = __VLS_198({
    ...{ class: "inline h-4 w-4 ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_198));
var __VLS_192;
const __VLS_202 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_203 = __VLS_asFunctionalComponent(__VLS_202, new __VLS_202({}));
const __VLS_204 = __VLS_203({}, ...__VLS_functionalComponentArgsRest(__VLS_203));
const { default: __VLS_206 } = __VLS_205.slots;
var __VLS_205;
const __VLS_207 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_208 = __VLS_asFunctionalComponent(__VLS_207, new __VLS_207({}));
const __VLS_209 = __VLS_208({}, ...__VLS_functionalComponentArgsRest(__VLS_208));
const { default: __VLS_211 } = __VLS_210.slots;
var __VLS_210;
var __VLS_161;
var __VLS_156;
const __VLS_212 = {}.TableBody;
/** @type {[typeof __VLS_components.TableBody, typeof __VLS_components.TableBody, ]} */ ;
// @ts-ignore
TableBody;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({}));
const __VLS_214 = __VLS_213({}, ...__VLS_functionalComponentArgsRest(__VLS_213));
const { default: __VLS_216 } = __VLS_215.slots;
if (!__VLS_ctx.loading && __VLS_ctx.data.invoices.length === 0) {
    // @ts-ignore
    [loading, data,];
    const __VLS_217 = {}.TableRow;
    /** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
    // @ts-ignore
    TableRow;
    // @ts-ignore
    const __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({}));
    const __VLS_219 = __VLS_218({}, ...__VLS_functionalComponentArgsRest(__VLS_218));
    const { default: __VLS_221 } = __VLS_220.slots;
    const __VLS_222 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({
        colspan: "5",
        ...{ class: "text-center text-sm text-muted-foreground" },
    }));
    const __VLS_224 = __VLS_223({
        colspan: "5",
        ...{ class: "text-center text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_223));
    const { default: __VLS_226 } = __VLS_225.slots;
    var __VLS_225;
    var __VLS_220;
}
for (const [inv] of __VLS_getVForSourceType((__VLS_ctx.data.invoices))) {
    // @ts-ignore
    [data,];
    const __VLS_227 = {}.TableRow;
    /** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
    // @ts-ignore
    TableRow;
    // @ts-ignore
    const __VLS_228 = __VLS_asFunctionalComponent(__VLS_227, new __VLS_227({
        key: (inv.id),
        ...{ class: "hover:bg-muted/50 transition" },
    }));
    const __VLS_229 = __VLS_228({
        key: (inv.id),
        ...{ class: "hover:bg-muted/50 transition" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_228));
    const { default: __VLS_231 } = __VLS_230.slots;
    const __VLS_232 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
        ...{ class: "tabular-nums" },
    }));
    const __VLS_234 = __VLS_233({
        ...{ class: "tabular-nums" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_233));
    const { default: __VLS_236 } = __VLS_235.slots;
    (__VLS_ctx.fDate(inv.createdAt));
    // @ts-ignore
    [fDate,];
    var __VLS_235;
    const __VLS_237 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_238 = __VLS_asFunctionalComponent(__VLS_237, new __VLS_237({
        ...{ class: "tabular-nums font-medium" },
    }));
    const __VLS_239 = __VLS_238({
        ...{ class: "tabular-nums font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_238));
    const { default: __VLS_241 } = __VLS_240.slots;
    (__VLS_ctx.fMoney(inv.totalAmount));
    // @ts-ignore
    [fMoney,];
    var __VLS_240;
    const __VLS_242 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({}));
    const __VLS_244 = __VLS_243({}, ...__VLS_functionalComponentArgsRest(__VLS_243));
    const { default: __VLS_246 } = __VLS_245.slots;
    const __VLS_247 = {}.Badge;
    /** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
    // @ts-ignore
    Badge;
    // @ts-ignore
    const __VLS_248 = __VLS_asFunctionalComponent(__VLS_247, new __VLS_247({
        ...{ class: "gap-1" },
    }));
    const __VLS_249 = __VLS_248({
        ...{ class: "gap-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_248));
    const { default: __VLS_251 } = __VLS_250.slots;
    const __VLS_252 = {}.CreditCard;
    /** @type {[typeof __VLS_components.CreditCard, ]} */ ;
    // @ts-ignore
    CreditCard;
    // @ts-ignore
    const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
        ...{ class: "h-3.5 w-3.5" },
    }));
    const __VLS_254 = __VLS_253({
        ...{ class: "h-3.5 w-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_253));
    (__VLS_ctx.pmLabel(inv.paymentMethod));
    // @ts-ignore
    [pmLabel,];
    var __VLS_250;
    var __VLS_245;
    const __VLS_257 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_258 = __VLS_asFunctionalComponent(__VLS_257, new __VLS_257({
        ...{ class: "font-mono text-xs" },
    }));
    const __VLS_259 = __VLS_258({
        ...{ class: "font-mono text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_258));
    const { default: __VLS_261 } = __VLS_260.slots;
    (inv.id);
    var __VLS_260;
    const __VLS_262 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({
        ...{ class: "font-mono text-xs" },
    }));
    const __VLS_264 = __VLS_263({
        ...{ class: "font-mono text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_263));
    const { default: __VLS_266 } = __VLS_265.slots;
    (inv.orderId);
    var __VLS_265;
    var __VLS_230;
}
var __VLS_215;
var __VLS_146;
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
/** @type {__VLS_StyleScopedClasses['w-44']} */ ;
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
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        ChevronLeft: ChevronLeft,
        ChevronRight: ChevronRight,
        ArrowUpDown: ArrowUpDown,
        RotateCcw: RotateCcw,
        CreditCard: CreditCard,
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
        page: page,
        size: size,
        field: field,
        direction: direction,
        paymentMethodFilter: paymentMethodFilter,
        loading: loading,
        error: error,
        data: data,
        sortOn: sortOn,
        nextPage: nextPage,
        prevPage: prevPage,
        reload: reload,
        clearFilters: clearFilters,
        fMoney: fMoney,
        fDate: fDate,
        pmLabel: pmLabel,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
