import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { invoiceService } from "@/api/invoiceService"; // ajusta la ruta si tu proyecto la usa distinta
// shadcn-vue UI
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const route = useRoute();
const orderId = computed(() => (route.query.orderId ? String(route.query.orderId) : ""));
const holderName = ref("");
const cardNumber = ref("");
const expiryMonth = ref("");
const expiryYear = ref("");
const cvv = ref("");
const paymentMethod = ref("CREDIT_CARD");
const loading = ref(false);
const error = ref(null);
const invoiceId = ref(null);
const isValid = computed(() => {
    const raw = cardNumber.value.replace(/\s+/g, "");
    const mm = Number(expiryMonth.value);
    const yy = Number(expiryYear.value);
    const mmOk = /^\d{2}$/.test(expiryMonth.value) && mm >= 1 && mm <= 12;
    const yyOk = /^\d{2}$/.test(expiryYear.value);
    return (!!orderId.value &&
        holderName.value.trim().length >= 3 &&
        /^\d{13,19}$/.test(raw) &&
        mmOk &&
        yyOk &&
        /^\d{3,4}$/.test(cvv.value));
});
function onCardNumberInput() {
    const digits = cardNumber.value.replace(/\D/g, "").slice(0, 19);
    cardNumber.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}
async function pay() {
    error.value = null;
    invoiceId.value = null;
    if (!isValid.value) {
        error.value = "Completa los datos correctamente.";
        return;
    }
    loading.value = true;
    try {
        const id = await invoiceService.createInvoice(orderId.value, paymentMethod.value);
        invoiceId.value = id;
    }
    catch (e) {
        error.value = e?.response?.data?.message || "No se pudo crear la factura. Intenta de nuevo.";
    }
    finally {
        loading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "container mx-auto max-w-xl p-4" },
});
const __VLS_0 = {}.Card;
/** @type {[typeof __VLS_components.Card, typeof __VLS_components.Card, ]} */ ;
// @ts-ignore
Card;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
const __VLS_5 = {}.CardHeader;
/** @type {[typeof __VLS_components.CardHeader, typeof __VLS_components.CardHeader, ]} */ ;
// @ts-ignore
CardHeader;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
const __VLS_10 = {}.CardTitle;
/** @type {[typeof __VLS_components.CardTitle, typeof __VLS_components.CardTitle, ]} */ ;
// @ts-ignore
CardTitle;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
var __VLS_13;
const __VLS_15 = {}.CardDescription;
/** @type {[typeof __VLS_components.CardDescription, typeof __VLS_components.CardDescription, ]} */ ;
// @ts-ignore
CardDescription;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
var __VLS_18;
var __VLS_8;
const __VLS_20 = {}.CardContent;
/** @type {[typeof __VLS_components.CardContent, typeof __VLS_components.CardContent, ]} */ ;
// @ts-ignore
CardContent;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_24 } = __VLS_23.slots;
if (!__VLS_ctx.orderId) {
    // @ts-ignore
    [orderId,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-sm text-destructive" },
    });
    __VLS_asFunctionalElement(__VLS_elements.code, __VLS_elements.code)({});
}
else {
    __VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
        ...{ onSubmit: (__VLS_ctx.pay) },
        ...{ class: "grid gap-4" },
    });
    // @ts-ignore
    [pay,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid gap-2" },
    });
    const __VLS_25 = {}.Label;
    /** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
    // @ts-ignore
    Label;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        for: "holder",
    }));
    const __VLS_27 = __VLS_26({
        for: "holder",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_29 } = __VLS_28.slots;
    var __VLS_28;
    const __VLS_30 = {}.Input;
    /** @type {[typeof __VLS_components.Input, ]} */ ;
    // @ts-ignore
    Input;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        id: "holder",
        modelValue: (__VLS_ctx.holderName),
        autocomplete: "cc-name",
        placeholder: "Como aparece en la tarjeta",
    }));
    const __VLS_32 = __VLS_31({
        id: "holder",
        modelValue: (__VLS_ctx.holderName),
        autocomplete: "cc-name",
        placeholder: "Como aparece en la tarjeta",
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    // @ts-ignore
    [holderName,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid gap-2" },
    });
    const __VLS_35 = {}.Label;
    /** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
    // @ts-ignore
    Label;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        for: "card",
    }));
    const __VLS_37 = __VLS_36({
        for: "card",
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    const { default: __VLS_39 } = __VLS_38.slots;
    var __VLS_38;
    const __VLS_40 = {}.Input;
    /** @type {[typeof __VLS_components.Input, ]} */ ;
    // @ts-ignore
    Input;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onInput': {} },
        id: "card",
        modelValue: (__VLS_ctx.cardNumber),
        autocomplete: "cc-number",
        inputmode: "numeric",
        maxlength: "19",
        placeholder: "4111 1111 1111 1111",
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onInput': {} },
        id: "card",
        modelValue: (__VLS_ctx.cardNumber),
        autocomplete: "cc-number",
        inputmode: "numeric",
        maxlength: "19",
        placeholder: "4111 1111 1111 1111",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    const __VLS_46 = ({ input: {} },
        { onInput: (__VLS_ctx.onCardNumberInput) });
    // @ts-ignore
    [cardNumber, onCardNumberInput,];
    var __VLS_43;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-3 gap-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid gap-2" },
    });
    const __VLS_48 = {}.Label;
    /** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
    // @ts-ignore
    Label;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        for: "mm",
    }));
    const __VLS_50 = __VLS_49({
        for: "mm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    const { default: __VLS_52 } = __VLS_51.slots;
    var __VLS_51;
    const __VLS_53 = {}.Input;
    /** @type {[typeof __VLS_components.Input, ]} */ ;
    // @ts-ignore
    Input;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        id: "mm",
        modelValue: (__VLS_ctx.expiryMonth),
        autocomplete: "cc-exp-month",
        inputmode: "numeric",
        maxlength: "2",
        placeholder: "MM",
    }));
    const __VLS_55 = __VLS_54({
        id: "mm",
        modelValue: (__VLS_ctx.expiryMonth),
        autocomplete: "cc-exp-month",
        inputmode: "numeric",
        maxlength: "2",
        placeholder: "MM",
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    // @ts-ignore
    [expiryMonth,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid gap-2" },
    });
    const __VLS_58 = {}.Label;
    /** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
    // @ts-ignore
    Label;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
        for: "yy",
    }));
    const __VLS_60 = __VLS_59({
        for: "yy",
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    const { default: __VLS_62 } = __VLS_61.slots;
    var __VLS_61;
    const __VLS_63 = {}.Input;
    /** @type {[typeof __VLS_components.Input, ]} */ ;
    // @ts-ignore
    Input;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        id: "yy",
        modelValue: (__VLS_ctx.expiryYear),
        autocomplete: "cc-exp-year",
        inputmode: "numeric",
        maxlength: "2",
        placeholder: "YY",
    }));
    const __VLS_65 = __VLS_64({
        id: "yy",
        modelValue: (__VLS_ctx.expiryYear),
        autocomplete: "cc-exp-year",
        inputmode: "numeric",
        maxlength: "2",
        placeholder: "YY",
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    // @ts-ignore
    [expiryYear,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid gap-2" },
    });
    const __VLS_68 = {}.Label;
    /** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
    // @ts-ignore
    Label;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        for: "cvv",
    }));
    const __VLS_70 = __VLS_69({
        for: "cvv",
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    const { default: __VLS_72 } = __VLS_71.slots;
    var __VLS_71;
    const __VLS_73 = {}.Input;
    /** @type {[typeof __VLS_components.Input, ]} */ ;
    // @ts-ignore
    Input;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
        id: "cvv",
        modelValue: (__VLS_ctx.cvv),
        autocomplete: "cc-csc",
        inputmode: "numeric",
        maxlength: "4",
        placeholder: "123",
        type: "password",
    }));
    const __VLS_75 = __VLS_74({
        id: "cvv",
        modelValue: (__VLS_ctx.cvv),
        autocomplete: "cc-csc",
        inputmode: "numeric",
        maxlength: "4",
        placeholder: "123",
        type: "password",
    }, ...__VLS_functionalComponentArgsRest(__VLS_74));
    // @ts-ignore
    [cvv,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid gap-2" },
    });
    const __VLS_78 = {}.Label;
    /** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
    // @ts-ignore
    Label;
    // @ts-ignore
    const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({}));
    const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
    const { default: __VLS_82 } = __VLS_81.slots;
    var __VLS_81;
    const __VLS_83 = {}.RadioGroup;
    /** @type {[typeof __VLS_components.RadioGroup, typeof __VLS_components.RadioGroup, ]} */ ;
    // @ts-ignore
    RadioGroup;
    // @ts-ignore
    const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
        modelValue: (__VLS_ctx.paymentMethod),
        ...{ class: "grid grid-cols-2 gap-3" },
    }));
    const __VLS_85 = __VLS_84({
        modelValue: (__VLS_ctx.paymentMethod),
        ...{ class: "grid grid-cols-2 gap-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_84));
    const { default: __VLS_87 } = __VLS_86.slots;
    // @ts-ignore
    [paymentMethod,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-center space-x-2" },
    });
    const __VLS_88 = {}.RadioGroupItem;
    /** @type {[typeof __VLS_components.RadioGroupItem, ]} */ ;
    // @ts-ignore
    RadioGroupItem;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
        id: "pm-credit",
        value: "CREDIT_CARD",
    }));
    const __VLS_90 = __VLS_89({
        id: "pm-credit",
        value: "CREDIT_CARD",
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    const __VLS_93 = {}.Label;
    /** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
    // @ts-ignore
    Label;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
        for: "pm-credit",
    }));
    const __VLS_95 = __VLS_94({
        for: "pm-credit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    const { default: __VLS_97 } = __VLS_96.slots;
    var __VLS_96;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-center space-x-2" },
    });
    const __VLS_98 = {}.RadioGroupItem;
    /** @type {[typeof __VLS_components.RadioGroupItem, ]} */ ;
    // @ts-ignore
    RadioGroupItem;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
        id: "pm-debit",
        value: "DEBIT_CARD",
    }));
    const __VLS_100 = __VLS_99({
        id: "pm-debit",
        value: "DEBIT_CARD",
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    const __VLS_103 = {}.Label;
    /** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
    // @ts-ignore
    Label;
    // @ts-ignore
    const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
        for: "pm-debit",
    }));
    const __VLS_105 = __VLS_104({
        for: "pm-debit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_104));
    const { default: __VLS_107 } = __VLS_106.slots;
    var __VLS_106;
    var __VLS_86;
    const __VLS_108 = {}.Button;
    /** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    Button;
    // @ts-ignore
    const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
        disabled: (__VLS_ctx.loading || !__VLS_ctx.isValid),
        type: "submit",
    }));
    const __VLS_110 = __VLS_109({
        disabled: (__VLS_ctx.loading || !__VLS_ctx.isValid),
        type: "submit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_109));
    const { default: __VLS_112 } = __VLS_111.slots;
    // @ts-ignore
    [loading, isValid,];
    (__VLS_ctx.loading ? "Procesando…" : "Pagar y generar factura");
    // @ts-ignore
    [loading,];
    var __VLS_111;
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mt-4 space-y-3" },
});
if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    const __VLS_113 = {}.Alert;
    /** @type {[typeof __VLS_components.Alert, typeof __VLS_components.Alert, ]} */ ;
    // @ts-ignore
    Alert;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
        variant: "destructive",
    }));
    const __VLS_115 = __VLS_114({
        variant: "destructive",
    }, ...__VLS_functionalComponentArgsRest(__VLS_114));
    const { default: __VLS_117 } = __VLS_116.slots;
    const __VLS_118 = {}.AlertTitle;
    /** @type {[typeof __VLS_components.AlertTitle, typeof __VLS_components.AlertTitle, ]} */ ;
    // @ts-ignore
    AlertTitle;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({}));
    const __VLS_120 = __VLS_119({}, ...__VLS_functionalComponentArgsRest(__VLS_119));
    const { default: __VLS_122 } = __VLS_121.slots;
    var __VLS_121;
    const __VLS_123 = {}.AlertDescription;
    /** @type {[typeof __VLS_components.AlertDescription, typeof __VLS_components.AlertDescription, ]} */ ;
    // @ts-ignore
    AlertDescription;
    // @ts-ignore
    const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({}));
    const __VLS_125 = __VLS_124({}, ...__VLS_functionalComponentArgsRest(__VLS_124));
    const { default: __VLS_127 } = __VLS_126.slots;
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
    var __VLS_126;
    var __VLS_116;
}
if (__VLS_ctx.invoiceId) {
    // @ts-ignore
    [invoiceId,];
    const __VLS_128 = {}.Alert;
    /** @type {[typeof __VLS_components.Alert, typeof __VLS_components.Alert, ]} */ ;
    // @ts-ignore
    Alert;
    // @ts-ignore
    const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({}));
    const __VLS_130 = __VLS_129({}, ...__VLS_functionalComponentArgsRest(__VLS_129));
    const { default: __VLS_132 } = __VLS_131.slots;
    const __VLS_133 = {}.AlertTitle;
    /** @type {[typeof __VLS_components.AlertTitle, typeof __VLS_components.AlertTitle, ]} */ ;
    // @ts-ignore
    AlertTitle;
    // @ts-ignore
    const __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({}));
    const __VLS_135 = __VLS_134({}, ...__VLS_functionalComponentArgsRest(__VLS_134));
    const { default: __VLS_137 } = __VLS_136.slots;
    var __VLS_136;
    const __VLS_138 = {}.AlertDescription;
    /** @type {[typeof __VLS_components.AlertDescription, typeof __VLS_components.AlertDescription, ]} */ ;
    // @ts-ignore
    AlertDescription;
    // @ts-ignore
    const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({}));
    const __VLS_140 = __VLS_139({}, ...__VLS_functionalComponentArgsRest(__VLS_139));
    const { default: __VLS_142 } = __VLS_141.slots;
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.invoiceId);
    // @ts-ignore
    [invoiceId,];
    var __VLS_141;
    var __VLS_131;
}
var __VLS_23;
const __VLS_143 = {}.CardFooter;
/** @type {[typeof __VLS_components.CardFooter, typeof __VLS_components.CardFooter, ]} */ ;
// @ts-ignore
CardFooter;
// @ts-ignore
const __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({
    ...{ class: "text-xs text-muted-foreground" },
}));
const __VLS_145 = __VLS_144({
    ...{ class: "text-xs text-muted-foreground" },
}, ...__VLS_functionalComponentArgsRest(__VLS_144));
const { default: __VLS_147 } = __VLS_146.slots;
var __VLS_146;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Card: Card,
        CardContent: CardContent,
        CardDescription: CardDescription,
        CardFooter: CardFooter,
        CardHeader: CardHeader,
        CardTitle: CardTitle,
        Input: Input,
        Label: Label,
        Button: Button,
        RadioGroup: RadioGroup,
        RadioGroupItem: RadioGroupItem,
        Alert: Alert,
        AlertDescription: AlertDescription,
        AlertTitle: AlertTitle,
        orderId: orderId,
        holderName: holderName,
        cardNumber: cardNumber,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cvv: cvv,
        paymentMethod: paymentMethod,
        loading: loading,
        error: error,
        invoiceId: invoiceId,
        isValid: isValid,
        onCardNumberInput: onCardNumberInput,
        pay: pay,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
