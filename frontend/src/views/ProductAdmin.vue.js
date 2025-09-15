import { onMounted, ref, watch } from "vue";
import { ArrowUp, ChevronLeft, ChevronRight, MoreHorizontal, Power, Upload, Pencil, Plus } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { productService } from "@/api/productService";
// Componentes de acciones
import IncreaseStockDialog from "@/components/IncreaseStockDialog.vue";
import ActivateProductDialog from "@/components/ActivateProductDialog.vue";
import DeactivateProductDialog from "@/components/DeactivateProductDialog.vue";
import UploadImageDialog from "@/components/UploadImageDialog.vue";
import CreateProductSheet from "@/components/CreateProductSheet.vue";
import UpdateProductSheet from "@/components/UpdateProductSheet.vue";
// Controles de tabla
const page = ref(0);
const size = ref(10);
const field = ref("name");
const direction = ref("asc");
const category = ref(undefined);
const active = ref(true);
const loading = ref(false);
const error = ref(null);
const data = ref({
    products: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
});
// cat enum para el filtro
const categories = [
    "ELECTRONICS", "FASHION", "HOME", "BEAUTY", "SPORTS", "BOOKS", "GROCERY",
];
const sortOn = (f) => {
    if (field.value === f) {
        direction.value = direction.value === "asc" ? "desc" : "asc";
    }
    else {
        field.value = f;
        direction.value = "asc";
    }
    fetchProducts();
};
const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
        const res = await productService.getProducts(page.value, size.value, field.value, direction.value, category.value, active.value);
        data.value = res;
    }
    catch (e) {
        error.value = e?.message ?? "Error cargando productos";
    }
    finally {
        loading.value = false;
    }
};
const nextPage = () => {
    if (page.value + 1 < data.value.totalPages) {
        page.value += 1;
        fetchProducts();
    }
};
const prevPage = () => {
    if (page.value > 0) {
        page.value -= 1;
        fetchProducts();
    }
};
// recargar tras acciones hijas
const reload = () => fetchProducts();
// selección para acciones
const selectedProduct = ref(null);
const openIncrease = ref(false);
const openActivate = ref(false);
const openDeactivate = ref(false);
const openUpload = ref(false);
const openCreate = ref(false);
const openUpdate = ref(false);
const openUpdateFor = (p) => {
    selectedProduct.value = p;
    openUpdate.value = true;
};
const openIncreaseFor = (p) => {
    selectedProduct.value = p;
    openIncrease.value = true;
};
const openActivateFor = (p) => {
    selectedProduct.value = p;
    openActivate.value = true;
};
const openDeactivateFor = (p) => {
    selectedProduct.value = p;
    openDeactivate.value = true;
};
const openUploadFor = (p) => {
    selectedProduct.value = p;
    openUpload.value = true;
};
// Cuando cambie tamaño/filtros orden, resetea a página 0 y trae
watch([size, category, active, field, direction], () => {
    page.value = 0;
    fetchProducts();
});
onMounted(fetchProducts);
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
    modelValue: (__VLS_ctx.category),
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.category),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
// @ts-ignore
[category,];
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
    placeholder: "Todas",
}));
const __VLS_17 = __VLS_16({
    placeholder: "Todas",
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
for (const [cat] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
    // @ts-ignore
    [categories,];
    const __VLS_35 = {}.SelectItem;
    /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
    // @ts-ignore
    SelectItem;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        key: (cat),
        value: (cat),
    }));
    const __VLS_37 = __VLS_36({
        key: (cat),
        value: (cat),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    const { default: __VLS_39 } = __VLS_38.slots;
    (cat);
    var __VLS_38;
}
var __VLS_28;
var __VLS_23;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-1" },
});
const __VLS_40 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    ...{ class: "text-xs" },
}));
const __VLS_42 = __VLS_41({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const { default: __VLS_44 } = __VLS_43.slots;
var __VLS_43;
const __VLS_45 = {}.Select;
/** @type {[typeof __VLS_components.Select, typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
Select;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    modelValue: (__VLS_ctx.active),
}));
const __VLS_47 = __VLS_46({
    modelValue: (__VLS_ctx.active),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_49 } = __VLS_48.slots;
// @ts-ignore
[active,];
const __VLS_50 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
SelectTrigger;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    ...{ class: "w-36" },
}));
const __VLS_52 = __VLS_51({
    ...{ class: "w-36" },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_54 } = __VLS_53.slots;
const __VLS_55 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
SelectValue;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    placeholder: "Estado",
}));
const __VLS_57 = __VLS_56({
    placeholder: "Estado",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
var __VLS_53;
const __VLS_60 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
SelectContent;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_64 } = __VLS_63.slots;
const __VLS_65 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    value: (true),
}));
const __VLS_67 = __VLS_66({
    value: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const { default: __VLS_69 } = __VLS_68.slots;
var __VLS_68;
const __VLS_70 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    value: (false),
}));
const __VLS_72 = __VLS_71({
    value: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
const { default: __VLS_74 } = __VLS_73.slots;
var __VLS_73;
var __VLS_63;
var __VLS_48;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-1" },
});
const __VLS_75 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    ...{ class: "text-xs" },
}));
const __VLS_77 = __VLS_76({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_79 } = __VLS_78.slots;
var __VLS_78;
const __VLS_80 = {}.Select;
/** @type {[typeof __VLS_components.Select, typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
Select;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    modelValue: (__VLS_ctx.size),
}));
const __VLS_82 = __VLS_81({
    modelValue: (__VLS_ctx.size),
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
const { default: __VLS_84 } = __VLS_83.slots;
// @ts-ignore
[size,];
const __VLS_85 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
SelectTrigger;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
    ...{ class: "w-36" },
}));
const __VLS_87 = __VLS_86({
    ...{ class: "w-36" },
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
const { default: __VLS_89 } = __VLS_88.slots;
const __VLS_90 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
SelectValue;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({}));
const __VLS_92 = __VLS_91({}, ...__VLS_functionalComponentArgsRest(__VLS_91));
var __VLS_88;
const __VLS_95 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
SelectContent;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({}));
const __VLS_97 = __VLS_96({}, ...__VLS_functionalComponentArgsRest(__VLS_96));
const { default: __VLS_99 } = __VLS_98.slots;
const __VLS_100 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
    value: (5),
}));
const __VLS_102 = __VLS_101({
    value: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
const { default: __VLS_104 } = __VLS_103.slots;
var __VLS_103;
const __VLS_105 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    value: (10),
}));
const __VLS_107 = __VLS_106({
    value: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
const { default: __VLS_109 } = __VLS_108.slots;
var __VLS_108;
const __VLS_110 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    value: (20),
}));
const __VLS_112 = __VLS_111({
    value: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
const { default: __VLS_114 } = __VLS_113.slots;
var __VLS_113;
const __VLS_115 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
SelectItem;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    value: (50),
}));
const __VLS_117 = __VLS_116({
    value: (50),
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
const { default: __VLS_119 } = __VLS_118.slots;
var __VLS_118;
var __VLS_98;
var __VLS_83;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
}));
const __VLS_121 = __VLS_120({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
let __VLS_123;
let __VLS_124;
const __VLS_125 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.openCreate = true;
            // @ts-ignore
            [openCreate,];
        } });
const { default: __VLS_126 } = __VLS_122.slots;
const __VLS_127 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
Plus;
// @ts-ignore
const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({
    ...{ class: "w-4 h-4 mr-2" },
}));
const __VLS_129 = __VLS_128({
    ...{ class: "w-4 h-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_128));
var __VLS_122;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "rounded-xl border bg-card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center justify-between px-4 py-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-2" },
});
const __VLS_132 = {}.Badge;
/** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
// @ts-ignore
Badge;
// @ts-ignore
const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({
    variant: "secondary",
}));
const __VLS_134 = __VLS_133({
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_133));
const { default: __VLS_136 } = __VLS_135.slots;
(__VLS_ctx.field);
(__VLS_ctx.direction);
// @ts-ignore
[field, direction,];
var __VLS_135;
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
const __VLS_137 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page === 0 || __VLS_ctx.loading),
    size: "sm",
    variant: "outline",
}));
const __VLS_138 = __VLS_137({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page === 0 || __VLS_ctx.loading),
    size: "sm",
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
let __VLS_140;
let __VLS_141;
const __VLS_142 = ({ click: {} },
    { onClick: (__VLS_ctx.prevPage) });
const { default: __VLS_143 } = __VLS_139.slots;
// @ts-ignore
[page, loading, prevPage,];
const __VLS_144 = {}.ChevronLeft;
/** @type {[typeof __VLS_components.ChevronLeft, ]} */ ;
// @ts-ignore
ChevronLeft;
// @ts-ignore
const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({
    ...{ class: "h-4 w-4 mr-1" },
}));
const __VLS_146 = __VLS_145({
    ...{ class: "h-4 w-4 mr-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_145));
var __VLS_139;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-sm tabular-nums" },
});
(__VLS_ctx.page + 1);
(Math.max(__VLS_ctx.data.totalPages, 1));
// @ts-ignore
[data, page,];
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page + 1 >= __VLS_ctx.data.totalPages || __VLS_ctx.loading),
    size: "sm",
    variant: "outline",
}));
const __VLS_150 = __VLS_149({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.page + 1 >= __VLS_ctx.data.totalPages || __VLS_ctx.loading),
    size: "sm",
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_149));
let __VLS_152;
let __VLS_153;
const __VLS_154 = ({ click: {} },
    { onClick: (__VLS_ctx.nextPage) });
const { default: __VLS_155 } = __VLS_151.slots;
// @ts-ignore
[data, page, loading, nextPage,];
const __VLS_156 = {}.ChevronRight;
/** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
// @ts-ignore
ChevronRight;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
    ...{ class: "h-4 w-4 ml-1" },
}));
const __VLS_158 = __VLS_157({
    ...{ class: "h-4 w-4 ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_157));
var __VLS_151;
const __VLS_161 = {}.Table;
/** @type {[typeof __VLS_components.Table, typeof __VLS_components.Table, ]} */ ;
// @ts-ignore
Table;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({}));
const __VLS_163 = __VLS_162({}, ...__VLS_functionalComponentArgsRest(__VLS_162));
const { default: __VLS_165 } = __VLS_164.slots;
const __VLS_166 = {}.TableCaption;
/** @type {[typeof __VLS_components.TableCaption, typeof __VLS_components.TableCaption, ]} */ ;
// @ts-ignore
TableCaption;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({}));
const __VLS_168 = __VLS_167({}, ...__VLS_functionalComponentArgsRest(__VLS_167));
const { default: __VLS_170 } = __VLS_169.slots;
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
var __VLS_169;
const __VLS_171 = {}.TableHeader;
/** @type {[typeof __VLS_components.TableHeader, typeof __VLS_components.TableHeader, ]} */ ;
// @ts-ignore
TableHeader;
// @ts-ignore
const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({}));
const __VLS_173 = __VLS_172({}, ...__VLS_functionalComponentArgsRest(__VLS_172));
const { default: __VLS_175 } = __VLS_174.slots;
const __VLS_176 = {}.TableRow;
/** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
// @ts-ignore
TableRow;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({}));
const __VLS_178 = __VLS_177({}, ...__VLS_functionalComponentArgsRest(__VLS_177));
const { default: __VLS_180 } = __VLS_179.slots;
const __VLS_181 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_182 = __VLS_asFunctionalComponent(__VLS_181, new __VLS_181({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer" },
}));
const __VLS_183 = __VLS_182({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer" },
}, ...__VLS_functionalComponentArgsRest(__VLS_182));
let __VLS_185;
let __VLS_186;
const __VLS_187 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.sortOn('name');
            // @ts-ignore
            [sortOn,];
        } });
const { default: __VLS_188 } = __VLS_184.slots;
var __VLS_184;
const __VLS_189 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent(__VLS_189, new __VLS_189({}));
const __VLS_191 = __VLS_190({}, ...__VLS_functionalComponentArgsRest(__VLS_190));
const { default: __VLS_193 } = __VLS_192.slots;
var __VLS_192;
const __VLS_194 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_195 = __VLS_asFunctionalComponent(__VLS_194, new __VLS_194({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer" },
}));
const __VLS_196 = __VLS_195({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer" },
}, ...__VLS_functionalComponentArgsRest(__VLS_195));
let __VLS_198;
let __VLS_199;
const __VLS_200 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.sortOn('price');
            // @ts-ignore
            [sortOn,];
        } });
const { default: __VLS_201 } = __VLS_197.slots;
var __VLS_197;
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
const __VLS_212 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({}));
const __VLS_214 = __VLS_213({}, ...__VLS_functionalComponentArgsRest(__VLS_213));
const { default: __VLS_216 } = __VLS_215.slots;
var __VLS_215;
const __VLS_217 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({
    ...{ class: "text-right" },
}));
const __VLS_219 = __VLS_218({
    ...{ class: "text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_218));
const { default: __VLS_221 } = __VLS_220.slots;
var __VLS_220;
var __VLS_179;
var __VLS_174;
const __VLS_222 = {}.TableBody;
/** @type {[typeof __VLS_components.TableBody, typeof __VLS_components.TableBody, ]} */ ;
// @ts-ignore
TableBody;
// @ts-ignore
const __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({}));
const __VLS_224 = __VLS_223({}, ...__VLS_functionalComponentArgsRest(__VLS_223));
const { default: __VLS_226 } = __VLS_225.slots;
if (!__VLS_ctx.loading && __VLS_ctx.data.products.length === 0) {
    // @ts-ignore
    [data, loading,];
    const __VLS_227 = {}.TableRow;
    /** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
    // @ts-ignore
    TableRow;
    // @ts-ignore
    const __VLS_228 = __VLS_asFunctionalComponent(__VLS_227, new __VLS_227({}));
    const __VLS_229 = __VLS_228({}, ...__VLS_functionalComponentArgsRest(__VLS_228));
    const { default: __VLS_231 } = __VLS_230.slots;
    const __VLS_232 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
        ...{ class: "text-center text-sm text-muted-foreground" },
        colspan: "7",
    }));
    const __VLS_234 = __VLS_233({
        ...{ class: "text-center text-sm text-muted-foreground" },
        colspan: "7",
    }, ...__VLS_functionalComponentArgsRest(__VLS_233));
    const { default: __VLS_236 } = __VLS_235.slots;
    var __VLS_235;
    var __VLS_230;
}
for (const [p] of __VLS_getVForSourceType((__VLS_ctx.data.products))) {
    // @ts-ignore
    [data,];
    const __VLS_237 = {}.TableRow;
    /** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
    // @ts-ignore
    TableRow;
    // @ts-ignore
    const __VLS_238 = __VLS_asFunctionalComponent(__VLS_237, new __VLS_237({
        key: (p.id),
    }));
    const __VLS_239 = __VLS_238({
        key: (p.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_238));
    const { default: __VLS_241 } = __VLS_240.slots;
    const __VLS_242 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({
        ...{ class: "font-medium" },
    }));
    const __VLS_244 = __VLS_243({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_243));
    const { default: __VLS_246 } = __VLS_245.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex flex-col" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (p.name);
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-xs text-muted-foreground line-clamp-1" },
    });
    (p.description);
    var __VLS_245;
    const __VLS_247 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_248 = __VLS_asFunctionalComponent(__VLS_247, new __VLS_247({}));
    const __VLS_249 = __VLS_248({}, ...__VLS_functionalComponentArgsRest(__VLS_248));
    const { default: __VLS_251 } = __VLS_250.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "h-10 w-10 overflow-hidden rounded-md border bg-muted" },
    });
    if (p.imageUrl) {
        __VLS_asFunctionalElement(__VLS_elements.img)({
            src: (p.imageUrl),
            alt: "",
            ...{ class: "h-full w-full object-cover" },
        });
    }
    var __VLS_250;
    const __VLS_252 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
        ...{ class: "tabular-nums" },
    }));
    const __VLS_254 = __VLS_253({
        ...{ class: "tabular-nums" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_253));
    const { default: __VLS_256 } = __VLS_255.slots;
    (p.price.toFixed(2));
    var __VLS_255;
    const __VLS_257 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_258 = __VLS_asFunctionalComponent(__VLS_257, new __VLS_257({
        ...{ class: "tabular-nums" },
    }));
    const __VLS_259 = __VLS_258({
        ...{ class: "tabular-nums" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_258));
    const { default: __VLS_261 } = __VLS_260.slots;
    (p.quantity);
    var __VLS_260;
    const __VLS_262 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({}));
    const __VLS_264 = __VLS_263({}, ...__VLS_functionalComponentArgsRest(__VLS_263));
    const { default: __VLS_266 } = __VLS_265.slots;
    const __VLS_267 = {}.Badge;
    /** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
    // @ts-ignore
    Badge;
    // @ts-ignore
    const __VLS_268 = __VLS_asFunctionalComponent(__VLS_267, new __VLS_267({}));
    const __VLS_269 = __VLS_268({}, ...__VLS_functionalComponentArgsRest(__VLS_268));
    const { default: __VLS_271 } = __VLS_270.slots;
    (p.category);
    var __VLS_270;
    var __VLS_265;
    const __VLS_272 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({}));
    const __VLS_274 = __VLS_273({}, ...__VLS_functionalComponentArgsRest(__VLS_273));
    const { default: __VLS_276 } = __VLS_275.slots;
    const __VLS_277 = {}.Badge;
    /** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
    // @ts-ignore
    Badge;
    // @ts-ignore
    const __VLS_278 = __VLS_asFunctionalComponent(__VLS_277, new __VLS_277({
        variant: (p.active ? 'default' : 'destructive'),
    }));
    const __VLS_279 = __VLS_278({
        variant: (p.active ? 'default' : 'destructive'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_278));
    const { default: __VLS_281 } = __VLS_280.slots;
    (p.active ? 'Sí' : 'No');
    var __VLS_280;
    var __VLS_275;
    const __VLS_282 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_283 = __VLS_asFunctionalComponent(__VLS_282, new __VLS_282({
        ...{ class: "text-right" },
    }));
    const __VLS_284 = __VLS_283({
        ...{ class: "text-right" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_283));
    const { default: __VLS_286 } = __VLS_285.slots;
    const __VLS_287 = {}.DropdownMenu;
    /** @type {[typeof __VLS_components.DropdownMenu, typeof __VLS_components.DropdownMenu, ]} */ ;
    // @ts-ignore
    DropdownMenu;
    // @ts-ignore
    const __VLS_288 = __VLS_asFunctionalComponent(__VLS_287, new __VLS_287({}));
    const __VLS_289 = __VLS_288({}, ...__VLS_functionalComponentArgsRest(__VLS_288));
    const { default: __VLS_291 } = __VLS_290.slots;
    const __VLS_292 = {}.DropdownMenuTrigger;
    /** @type {[typeof __VLS_components.DropdownMenuTrigger, typeof __VLS_components.DropdownMenuTrigger, ]} */ ;
    // @ts-ignore
    DropdownMenuTrigger;
    // @ts-ignore
    const __VLS_293 = __VLS_asFunctionalComponent(__VLS_292, new __VLS_292({
        asChild: true,
    }));
    const __VLS_294 = __VLS_293({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_293));
    const { default: __VLS_296 } = __VLS_295.slots;
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_297 = __VLS_asFunctionalComponent(Button, new Button({
        disabled: (__VLS_ctx.loading),
        size: "icon-sm",
        variant: "ghost",
    }));
    const __VLS_298 = __VLS_297({
        disabled: (__VLS_ctx.loading),
        size: "icon-sm",
        variant: "ghost",
    }, ...__VLS_functionalComponentArgsRest(__VLS_297));
    const { default: __VLS_300 } = __VLS_299.slots;
    // @ts-ignore
    [loading,];
    const __VLS_301 = {}.MoreHorizontal;
    /** @type {[typeof __VLS_components.MoreHorizontal, ]} */ ;
    // @ts-ignore
    MoreHorizontal;
    // @ts-ignore
    const __VLS_302 = __VLS_asFunctionalComponent(__VLS_301, new __VLS_301({
        ...{ class: "h-5 w-5" },
    }));
    const __VLS_303 = __VLS_302({
        ...{ class: "h-5 w-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_302));
    var __VLS_299;
    var __VLS_295;
    const __VLS_306 = {}.DropdownMenuContent;
    /** @type {[typeof __VLS_components.DropdownMenuContent, typeof __VLS_components.DropdownMenuContent, ]} */ ;
    // @ts-ignore
    DropdownMenuContent;
    // @ts-ignore
    const __VLS_307 = __VLS_asFunctionalComponent(__VLS_306, new __VLS_306({
        align: "end",
        ...{ class: "w-56" },
    }));
    const __VLS_308 = __VLS_307({
        align: "end",
        ...{ class: "w-56" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_307));
    const { default: __VLS_310 } = __VLS_309.slots;
    const __VLS_311 = {}.DropdownMenuLabel;
    /** @type {[typeof __VLS_components.DropdownMenuLabel, typeof __VLS_components.DropdownMenuLabel, ]} */ ;
    // @ts-ignore
    DropdownMenuLabel;
    // @ts-ignore
    const __VLS_312 = __VLS_asFunctionalComponent(__VLS_311, new __VLS_311({}));
    const __VLS_313 = __VLS_312({}, ...__VLS_functionalComponentArgsRest(__VLS_312));
    const { default: __VLS_315 } = __VLS_314.slots;
    var __VLS_314;
    const __VLS_316 = {}.DropdownMenuSeparator;
    /** @type {[typeof __VLS_components.DropdownMenuSeparator, ]} */ ;
    // @ts-ignore
    DropdownMenuSeparator;
    // @ts-ignore
    const __VLS_317 = __VLS_asFunctionalComponent(__VLS_316, new __VLS_316({}));
    const __VLS_318 = __VLS_317({}, ...__VLS_functionalComponentArgsRest(__VLS_317));
    const __VLS_321 = {}.DropdownMenuItem;
    /** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
    // @ts-ignore
    DropdownMenuItem;
    // @ts-ignore
    const __VLS_322 = __VLS_asFunctionalComponent(__VLS_321, new __VLS_321({
        ...{ 'onClick': {} },
    }));
    const __VLS_323 = __VLS_322({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_322));
    let __VLS_325;
    let __VLS_326;
    const __VLS_327 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.openUpdateFor(p);
                // @ts-ignore
                [openUpdateFor,];
            } });
    const { default: __VLS_328 } = __VLS_324.slots;
    const __VLS_329 = {}.Pencil;
    /** @type {[typeof __VLS_components.Pencil, ]} */ ;
    // @ts-ignore
    Pencil;
    // @ts-ignore
    const __VLS_330 = __VLS_asFunctionalComponent(__VLS_329, new __VLS_329({
        ...{ class: "h-4 w-4 mr-2" },
    }));
    const __VLS_331 = __VLS_330({
        ...{ class: "h-4 w-4 mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_330));
    var __VLS_324;
    const __VLS_334 = {}.DropdownMenuItem;
    /** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
    // @ts-ignore
    DropdownMenuItem;
    // @ts-ignore
    const __VLS_335 = __VLS_asFunctionalComponent(__VLS_334, new __VLS_334({
        ...{ 'onClick': {} },
    }));
    const __VLS_336 = __VLS_335({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_335));
    let __VLS_338;
    let __VLS_339;
    const __VLS_340 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.openIncreaseFor(p);
                // @ts-ignore
                [openIncreaseFor,];
            } });
    const { default: __VLS_341 } = __VLS_337.slots;
    const __VLS_342 = {}.ArrowUp;
    /** @type {[typeof __VLS_components.ArrowUp, ]} */ ;
    // @ts-ignore
    ArrowUp;
    // @ts-ignore
    const __VLS_343 = __VLS_asFunctionalComponent(__VLS_342, new __VLS_342({
        ...{ class: "h-4 w-4 mr-2" },
    }));
    const __VLS_344 = __VLS_343({
        ...{ class: "h-4 w-4 mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_343));
    var __VLS_337;
    if (!p.active) {
        const __VLS_347 = {}.DropdownMenuItem;
        /** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
        // @ts-ignore
        DropdownMenuItem;
        // @ts-ignore
        const __VLS_348 = __VLS_asFunctionalComponent(__VLS_347, new __VLS_347({
            ...{ 'onClick': {} },
            ...{ class: "text-green-600" },
        }));
        const __VLS_349 = __VLS_348({
            ...{ 'onClick': {} },
            ...{ class: "text-green-600" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_348));
        let __VLS_351;
        let __VLS_352;
        const __VLS_353 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(!p.active))
                        return;
                    __VLS_ctx.openActivateFor(p);
                    // @ts-ignore
                    [openActivateFor,];
                } });
        const { default: __VLS_354 } = __VLS_350.slots;
        const __VLS_355 = {}.Power;
        /** @type {[typeof __VLS_components.Power, ]} */ ;
        // @ts-ignore
        Power;
        // @ts-ignore
        const __VLS_356 = __VLS_asFunctionalComponent(__VLS_355, new __VLS_355({
            ...{ class: "h-4 w-4 mr-2" },
        }));
        const __VLS_357 = __VLS_356({
            ...{ class: "h-4 w-4 mr-2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_356));
        var __VLS_350;
    }
    else {
        const __VLS_360 = {}.DropdownMenuItem;
        /** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
        // @ts-ignore
        DropdownMenuItem;
        // @ts-ignore
        const __VLS_361 = __VLS_asFunctionalComponent(__VLS_360, new __VLS_360({
            ...{ 'onClick': {} },
            ...{ class: "text-red-600" },
        }));
        const __VLS_362 = __VLS_361({
            ...{ 'onClick': {} },
            ...{ class: "text-red-600" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_361));
        let __VLS_364;
        let __VLS_365;
        const __VLS_366 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(!p.active))
                        return;
                    __VLS_ctx.openDeactivateFor(p);
                    // @ts-ignore
                    [openDeactivateFor,];
                } });
        const { default: __VLS_367 } = __VLS_363.slots;
        const __VLS_368 = {}.Power;
        /** @type {[typeof __VLS_components.Power, ]} */ ;
        // @ts-ignore
        Power;
        // @ts-ignore
        const __VLS_369 = __VLS_asFunctionalComponent(__VLS_368, new __VLS_368({
            ...{ class: "h-4 w-4 mr-2" },
        }));
        const __VLS_370 = __VLS_369({
            ...{ class: "h-4 w-4 mr-2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_369));
        var __VLS_363;
    }
    const __VLS_373 = {}.DropdownMenuItem;
    /** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
    // @ts-ignore
    DropdownMenuItem;
    // @ts-ignore
    const __VLS_374 = __VLS_asFunctionalComponent(__VLS_373, new __VLS_373({
        ...{ 'onClick': {} },
    }));
    const __VLS_375 = __VLS_374({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_374));
    let __VLS_377;
    let __VLS_378;
    const __VLS_379 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.openUploadFor(p);
                // @ts-ignore
                [openUploadFor,];
            } });
    const { default: __VLS_380 } = __VLS_376.slots;
    const __VLS_381 = {}.Upload;
    /** @type {[typeof __VLS_components.Upload, ]} */ ;
    // @ts-ignore
    Upload;
    // @ts-ignore
    const __VLS_382 = __VLS_asFunctionalComponent(__VLS_381, new __VLS_381({
        ...{ class: "h-4 w-4 mr-2" },
    }));
    const __VLS_383 = __VLS_382({
        ...{ class: "h-4 w-4 mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_382));
    var __VLS_376;
    var __VLS_309;
    var __VLS_290;
    var __VLS_285;
    var __VLS_240;
}
var __VLS_225;
var __VLS_164;
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
/** @type {[typeof IncreaseStockDialog, ]} */ ;
// @ts-ignore
const __VLS_386 = __VLS_asFunctionalComponent(IncreaseStockDialog, new IncreaseStockDialog({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openIncrease),
    product: (__VLS_ctx.selectedProduct),
}));
const __VLS_387 = __VLS_386({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openIncrease),
    product: (__VLS_ctx.selectedProduct),
}, ...__VLS_functionalComponentArgsRest(__VLS_386));
let __VLS_389;
let __VLS_390;
const __VLS_391 = ({ updated: {} },
    { onUpdated: (__VLS_ctx.reload) });
// @ts-ignore
[openIncrease, selectedProduct, reload,];
var __VLS_388;
/** @type {[typeof ActivateProductDialog, ]} */ ;
// @ts-ignore
const __VLS_393 = __VLS_asFunctionalComponent(ActivateProductDialog, new ActivateProductDialog({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openActivate),
    product: (__VLS_ctx.selectedProduct),
}));
const __VLS_394 = __VLS_393({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openActivate),
    product: (__VLS_ctx.selectedProduct),
}, ...__VLS_functionalComponentArgsRest(__VLS_393));
let __VLS_396;
let __VLS_397;
const __VLS_398 = ({ updated: {} },
    { onUpdated: (__VLS_ctx.reload) });
// @ts-ignore
[selectedProduct, reload, openActivate,];
var __VLS_395;
/** @type {[typeof DeactivateProductDialog, ]} */ ;
// @ts-ignore
const __VLS_400 = __VLS_asFunctionalComponent(DeactivateProductDialog, new DeactivateProductDialog({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openDeactivate),
    product: (__VLS_ctx.selectedProduct),
}));
const __VLS_401 = __VLS_400({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openDeactivate),
    product: (__VLS_ctx.selectedProduct),
}, ...__VLS_functionalComponentArgsRest(__VLS_400));
let __VLS_403;
let __VLS_404;
const __VLS_405 = ({ updated: {} },
    { onUpdated: (__VLS_ctx.reload) });
// @ts-ignore
[selectedProduct, reload, openDeactivate,];
var __VLS_402;
/** @type {[typeof UploadImageDialog, ]} */ ;
// @ts-ignore
const __VLS_407 = __VLS_asFunctionalComponent(UploadImageDialog, new UploadImageDialog({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openUpload),
    product: (__VLS_ctx.selectedProduct),
}));
const __VLS_408 = __VLS_407({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openUpload),
    product: (__VLS_ctx.selectedProduct),
}, ...__VLS_functionalComponentArgsRest(__VLS_407));
let __VLS_410;
let __VLS_411;
const __VLS_412 = ({ updated: {} },
    { onUpdated: (__VLS_ctx.reload) });
// @ts-ignore
[selectedProduct, reload, openUpload,];
var __VLS_409;
/** @type {[typeof CreateProductSheet, ]} */ ;
// @ts-ignore
const __VLS_414 = __VLS_asFunctionalComponent(CreateProductSheet, new CreateProductSheet({
    ...{ 'onCreated': {} },
    open: (__VLS_ctx.openCreate),
}));
const __VLS_415 = __VLS_414({
    ...{ 'onCreated': {} },
    open: (__VLS_ctx.openCreate),
}, ...__VLS_functionalComponentArgsRest(__VLS_414));
let __VLS_417;
let __VLS_418;
const __VLS_419 = ({ created: {} },
    { onCreated: (__VLS_ctx.reload) });
// @ts-ignore
[openCreate, reload,];
var __VLS_416;
/** @type {[typeof UpdateProductSheet, ]} */ ;
// @ts-ignore
const __VLS_421 = __VLS_asFunctionalComponent(UpdateProductSheet, new UpdateProductSheet({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openUpdate),
    product: (__VLS_ctx.selectedProduct),
}));
const __VLS_422 = __VLS_421({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.openUpdate),
    product: (__VLS_ctx.selectedProduct),
}, ...__VLS_functionalComponentArgsRest(__VLS_421));
let __VLS_424;
let __VLS_425;
const __VLS_426 = ({ updated: {} },
    { onUpdated: (__VLS_ctx.reload) });
// @ts-ignore
[selectedProduct, reload, openUpdate,];
var __VLS_423;
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
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-56']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        ArrowUp: ArrowUp,
        ChevronLeft: ChevronLeft,
        ChevronRight: ChevronRight,
        MoreHorizontal: MoreHorizontal,
        Power: Power,
        Upload: Upload,
        Pencil: Pencil,
        Plus: Plus,
        Button: Button,
        Table: Table,
        TableBody: TableBody,
        TableCaption: TableCaption,
        TableCell: TableCell,
        TableHead: TableHead,
        TableHeader: TableHeader,
        TableRow: TableRow,
        DropdownMenu: DropdownMenu,
        DropdownMenuContent: DropdownMenuContent,
        DropdownMenuItem: DropdownMenuItem,
        DropdownMenuLabel: DropdownMenuLabel,
        DropdownMenuSeparator: DropdownMenuSeparator,
        DropdownMenuTrigger: DropdownMenuTrigger,
        Select: Select,
        SelectContent: SelectContent,
        SelectGroup: SelectGroup,
        SelectItem: SelectItem,
        SelectTrigger: SelectTrigger,
        SelectValue: SelectValue,
        Label: Label,
        Badge: Badge,
        IncreaseStockDialog: IncreaseStockDialog,
        ActivateProductDialog: ActivateProductDialog,
        DeactivateProductDialog: DeactivateProductDialog,
        UploadImageDialog: UploadImageDialog,
        CreateProductSheet: CreateProductSheet,
        UpdateProductSheet: UpdateProductSheet,
        page: page,
        size: size,
        field: field,
        direction: direction,
        category: category,
        active: active,
        loading: loading,
        error: error,
        data: data,
        categories: categories,
        sortOn: sortOn,
        nextPage: nextPage,
        prevPage: prevPage,
        reload: reload,
        selectedProduct: selectedProduct,
        openIncrease: openIncrease,
        openActivate: openActivate,
        openDeactivate: openDeactivate,
        openUpload: openUpload,
        openCreate: openCreate,
        openUpdate: openUpdate,
        openUpdateFor: openUpdateFor,
        openIncreaseFor: openIncreaseFor,
        openActivateFor: openActivateFor,
        openDeactivateFor: openDeactivateFor,
        openUploadFor: openUploadFor,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
