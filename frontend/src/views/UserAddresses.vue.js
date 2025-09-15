import { onMounted, ref, computed } from "vue";
import { Plus } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { userAddressService } from "@/api/userAddressService";
// Componentes hijos
import UserAddressRowActions from "@/components/UserAddressRowActions.vue";
import CreateUserAddressSheet from "@/components/CreateUserAddressSheet.vue";
import UpdateUserAddressSheet from "@/components/UpdateUserAddressSheet.vue";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog.vue";
const MAX_ADDRESSES = 3;
const loading = ref(false);
const error = ref(null);
const addresses = ref([]);
const createOpen = ref(false);
const updateOpen = ref(false);
const deleteOpen = ref(false);
const selectedAddress = ref(null);
const canCreateMore = computed(() => addresses.value.length < MAX_ADDRESSES);
const fetchAddresses = async () => {
    loading.value = true;
    error.value = null;
    try {
        addresses.value = await userAddressService.getAll();
    }
    catch (e) {
        error.value = e?.message ?? "Error cargando direcciones";
    }
    finally {
        loading.value = false;
    }
};
const openCreate = () => {
    if (canCreateMore.value)
        createOpen.value = true;
};
const openUpdateFor = (addr) => {
    selectedAddress.value = addr;
    updateOpen.value = true;
};
const openDeleteFor = (addr) => {
    selectedAddress.value = addr;
    deleteOpen.value = true;
};
const deleteSelected = async () => {
    if (!selectedAddress.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        await userAddressService.delete(selectedAddress.value.id);
        await fetchAddresses();
    }
    catch (e) {
        error.value = e?.message ?? "No se pudo eliminar la dirección";
    }
    finally {
        loading.value = false;
        deleteOpen.value = false;
        selectedAddress.value = null;
    }
};
const reload = () => fetchAddresses();
onMounted(fetchAddresses);
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
(__VLS_ctx.MAX_ADDRESSES);
// @ts-ignore
[MAX_ADDRESSES,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-3" },
});
const __VLS_0 = {}.Badge;
/** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
// @ts-ignore
Badge;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    variant: "secondary",
}));
const __VLS_2 = __VLS_1({
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
(__VLS_ctx.addresses.length);
// @ts-ignore
[addresses,];
var __VLS_3;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.canCreateMore || __VLS_ctx.loading),
}));
const __VLS_6 = __VLS_5({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.canCreateMore || __VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
const __VLS_10 = ({ click: {} },
    { onClick: (__VLS_ctx.openCreate) });
const { default: __VLS_11 } = __VLS_7.slots;
// @ts-ignore
[canCreateMore, loading, openCreate,];
const __VLS_12 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
Plus;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ class: "w-4 h-4 mr-2" },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "w-4 h-4 mr-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_7;
if (!__VLS_ctx.canCreateMore) {
    // @ts-ignore
    [canCreateMore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4 rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground" },
    });
    (__VLS_ctx.MAX_ADDRESSES);
    // @ts-ignore
    [MAX_ADDRESSES,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "rounded-xl border bg-card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center justify-between px-4 py-3" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-2" },
});
const __VLS_17 = {}.Badge;
/** @type {[typeof __VLS_components.Badge, typeof __VLS_components.Badge, ]} */ ;
// @ts-ignore
Badge;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    variant: "secondary",
}));
const __VLS_19 = __VLS_18({
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const { default: __VLS_21 } = __VLS_20.slots;
(__VLS_ctx.addresses.length);
// @ts-ignore
[addresses,];
var __VLS_20;
const __VLS_22 = {}.Table;
/** @type {[typeof __VLS_components.Table, typeof __VLS_components.Table, ]} */ ;
// @ts-ignore
Table;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({}));
const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
const { default: __VLS_26 } = __VLS_25.slots;
const __VLS_27 = {}.TableCaption;
/** @type {[typeof __VLS_components.TableCaption, typeof __VLS_components.TableCaption, ]} */ ;
// @ts-ignore
TableCaption;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({}));
const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
const { default: __VLS_31 } = __VLS_30.slots;
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
else if (__VLS_ctx.addresses.length === 0) {
    // @ts-ignore
    [addresses,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
var __VLS_30;
const __VLS_32 = {}.TableHeader;
/** @type {[typeof __VLS_components.TableHeader, typeof __VLS_components.TableHeader, ]} */ ;
// @ts-ignore
TableHeader;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_36 } = __VLS_35.slots;
const __VLS_37 = {}.TableRow;
/** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
// @ts-ignore
TableRow;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({}));
const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
const { default: __VLS_41 } = __VLS_40.slots;
const __VLS_42 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({}));
const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const { default: __VLS_46 } = __VLS_45.slots;
var __VLS_45;
const __VLS_47 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({}));
const __VLS_49 = __VLS_48({}, ...__VLS_functionalComponentArgsRest(__VLS_48));
const { default: __VLS_51 } = __VLS_50.slots;
var __VLS_50;
const __VLS_52 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
const { default: __VLS_56 } = __VLS_55.slots;
var __VLS_55;
const __VLS_57 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({}));
const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_61 } = __VLS_60.slots;
var __VLS_60;
const __VLS_62 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({}));
const __VLS_64 = __VLS_63({}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const { default: __VLS_66 } = __VLS_65.slots;
var __VLS_65;
const __VLS_67 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({}));
const __VLS_69 = __VLS_68({}, ...__VLS_functionalComponentArgsRest(__VLS_68));
const { default: __VLS_71 } = __VLS_70.slots;
var __VLS_70;
const __VLS_72 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({}));
const __VLS_74 = __VLS_73({}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_76 } = __VLS_75.slots;
var __VLS_75;
const __VLS_77 = {}.TableHead;
/** @type {[typeof __VLS_components.TableHead, typeof __VLS_components.TableHead, ]} */ ;
// @ts-ignore
TableHead;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    ...{ class: "text-right" },
}));
const __VLS_79 = __VLS_78({
    ...{ class: "text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
const { default: __VLS_81 } = __VLS_80.slots;
var __VLS_80;
var __VLS_40;
var __VLS_35;
const __VLS_82 = {}.TableBody;
/** @type {[typeof __VLS_components.TableBody, typeof __VLS_components.TableBody, ]} */ ;
// @ts-ignore
TableBody;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({}));
const __VLS_84 = __VLS_83({}, ...__VLS_functionalComponentArgsRest(__VLS_83));
const { default: __VLS_86 } = __VLS_85.slots;
for (const [a] of __VLS_getVForSourceType((__VLS_ctx.addresses))) {
    // @ts-ignore
    [addresses,];
    const __VLS_87 = {}.TableRow;
    /** @type {[typeof __VLS_components.TableRow, typeof __VLS_components.TableRow, ]} */ ;
    // @ts-ignore
    TableRow;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
        key: (a.id),
    }));
    const __VLS_89 = __VLS_88({
        key: (a.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    const { default: __VLS_91 } = __VLS_90.slots;
    const __VLS_92 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
        ...{ class: "font-medium" },
    }));
    const __VLS_94 = __VLS_93({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    const { default: __VLS_96 } = __VLS_95.slots;
    (a.fullName);
    var __VLS_95;
    const __VLS_97 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        ...{ class: "tabular-nums" },
    }));
    const __VLS_99 = __VLS_98({
        ...{ class: "tabular-nums" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    const { default: __VLS_101 } = __VLS_100.slots;
    (a.phone);
    var __VLS_100;
    const __VLS_102 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
        ...{ class: "max-w-[280px]" },
    }));
    const __VLS_104 = __VLS_103({
        ...{ class: "max-w-[280px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_103));
    const { default: __VLS_106 } = __VLS_105.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "line-clamp-2" },
    });
    (a.addressLine);
    var __VLS_105;
    const __VLS_107 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({}));
    const __VLS_109 = __VLS_108({}, ...__VLS_functionalComponentArgsRest(__VLS_108));
    const { default: __VLS_111 } = __VLS_110.slots;
    (a.city);
    var __VLS_110;
    const __VLS_112 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({}));
    const __VLS_114 = __VLS_113({}, ...__VLS_functionalComponentArgsRest(__VLS_113));
    const { default: __VLS_116 } = __VLS_115.slots;
    (a.state);
    var __VLS_115;
    const __VLS_117 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
        ...{ class: "tabular-nums" },
    }));
    const __VLS_119 = __VLS_118({
        ...{ class: "tabular-nums" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_118));
    const { default: __VLS_121 } = __VLS_120.slots;
    (a.postalCode);
    var __VLS_120;
    const __VLS_122 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({}));
    const __VLS_124 = __VLS_123({}, ...__VLS_functionalComponentArgsRest(__VLS_123));
    const { default: __VLS_126 } = __VLS_125.slots;
    (a.country);
    var __VLS_125;
    const __VLS_127 = {}.TableCell;
    /** @type {[typeof __VLS_components.TableCell, typeof __VLS_components.TableCell, ]} */ ;
    // @ts-ignore
    TableCell;
    // @ts-ignore
    const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({
        ...{ class: "text-right" },
    }));
    const __VLS_129 = __VLS_128({
        ...{ class: "text-right" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_128));
    const { default: __VLS_131 } = __VLS_130.slots;
    /** @type {[typeof UserAddressRowActions, ]} */ ;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent(UserAddressRowActions, new UserAddressRowActions({
        ...{ 'onEdit': {} },
        ...{ 'onDelete': {} },
        address: (a),
        disabled: (__VLS_ctx.loading),
    }));
    const __VLS_133 = __VLS_132({
        ...{ 'onEdit': {} },
        ...{ 'onDelete': {} },
        address: (a),
        disabled: (__VLS_ctx.loading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    let __VLS_135;
    let __VLS_136;
    const __VLS_137 = ({ edit: {} },
        { onEdit: (__VLS_ctx.openUpdateFor) });
    const __VLS_138 = ({ delete: {} },
        { onDelete: (__VLS_ctx.openDeleteFor) });
    // @ts-ignore
    [loading, openUpdateFor, openDeleteFor,];
    var __VLS_134;
    var __VLS_130;
    var __VLS_90;
}
var __VLS_85;
var __VLS_25;
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
/** @type {[typeof CreateUserAddressSheet, ]} */ ;
// @ts-ignore
const __VLS_140 = __VLS_asFunctionalComponent(CreateUserAddressSheet, new CreateUserAddressSheet({
    ...{ 'onCreated': {} },
    open: (__VLS_ctx.createOpen),
    currentCount: (__VLS_ctx.addresses.length),
    max: (__VLS_ctx.MAX_ADDRESSES),
}));
const __VLS_141 = __VLS_140({
    ...{ 'onCreated': {} },
    open: (__VLS_ctx.createOpen),
    currentCount: (__VLS_ctx.addresses.length),
    max: (__VLS_ctx.MAX_ADDRESSES),
}, ...__VLS_functionalComponentArgsRest(__VLS_140));
let __VLS_143;
let __VLS_144;
const __VLS_145 = ({ created: {} },
    { onCreated: (__VLS_ctx.reload) });
// @ts-ignore
[MAX_ADDRESSES, addresses, createOpen, reload,];
var __VLS_142;
/** @type {[typeof UpdateUserAddressSheet, ]} */ ;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(UpdateUserAddressSheet, new UpdateUserAddressSheet({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.updateOpen),
    address: (__VLS_ctx.selectedAddress),
}));
const __VLS_148 = __VLS_147({
    ...{ 'onUpdated': {} },
    open: (__VLS_ctx.updateOpen),
    address: (__VLS_ctx.selectedAddress),
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
let __VLS_150;
let __VLS_151;
const __VLS_152 = ({ updated: {} },
    { onUpdated: (__VLS_ctx.reload) });
// @ts-ignore
[reload, updateOpen, selectedAddress,];
var __VLS_149;
/** @type {[typeof ConfirmDeleteDialog, ]} */ ;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(ConfirmDeleteDialog, new ConfirmDeleteDialog({
    ...{ 'onConfirm': {} },
    open: (__VLS_ctx.deleteOpen),
    title: "Eliminar dirección",
    description: (__VLS_ctx.selectedAddress ? `¿Seguro que deseas eliminar la dirección de ${__VLS_ctx.selectedAddress.fullName}?` : ''),
    confirmLabel: "Eliminar",
    danger: true,
}));
const __VLS_155 = __VLS_154({
    ...{ 'onConfirm': {} },
    open: (__VLS_ctx.deleteOpen),
    title: "Eliminar dirección",
    description: (__VLS_ctx.selectedAddress ? `¿Seguro que deseas eliminar la dirección de ${__VLS_ctx.selectedAddress.fullName}?` : ''),
    confirmLabel: "Eliminar",
    danger: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
let __VLS_157;
let __VLS_158;
const __VLS_159 = ({ confirm: {} },
    { onConfirm: (__VLS_ctx.deleteSelected) });
// @ts-ignore
[selectedAddress, selectedAddress, deleteOpen, deleteSelected,];
var __VLS_156;
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
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted/30']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[280px]']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp-2']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Plus: Plus,
        Button: Button,
        Badge: Badge,
        Table: Table,
        TableBody: TableBody,
        TableCaption: TableCaption,
        TableCell: TableCell,
        TableHead: TableHead,
        TableHeader: TableHeader,
        TableRow: TableRow,
        UserAddressRowActions: UserAddressRowActions,
        CreateUserAddressSheet: CreateUserAddressSheet,
        UpdateUserAddressSheet: UpdateUserAddressSheet,
        ConfirmDeleteDialog: ConfirmDeleteDialog,
        MAX_ADDRESSES: MAX_ADDRESSES,
        loading: loading,
        error: error,
        addresses: addresses,
        createOpen: createOpen,
        updateOpen: updateOpen,
        deleteOpen: deleteOpen,
        selectedAddress: selectedAddress,
        canCreateMore: canCreateMore,
        openCreate: openCreate,
        openUpdateFor: openUpdateFor,
        openDeleteFor: openDeleteFor,
        deleteSelected: deleteSelected,
        reload: reload,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
