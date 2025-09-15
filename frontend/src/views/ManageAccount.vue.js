import { computed, onMounted, ref, watch } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userService } from "@/api/userService";
import { useToast } from "@/components/ui/toast/use-toast";
// Constantes de validación (alineadas con backend)
const NAME_MIN = 2;
const NAME_MAX = 50;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NEW_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_-])[a-zA-Z0-9!@#$%^&*()_-]{12,}$/;
// State
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const newPassword = ref("");
const isAdmin = ref(false);
const avatarUrl = ref(null);
const selectedFile = ref(null);
const previewUrl = ref(null);
const fileInputRef = ref(null);
const isUploading = ref(false);
const { toast } = useToast();
const errors = ref({});
// Utils
const normalizeSpace = (s) => s.replace(/\s+/g, " ").trim();
const fullName = computed(() => normalizeSpace(`${firstName.value} ${lastName.value}`));
const initials = computed(() => {
    const fn = (firstName.value || "").trim();
    const ln = (lastName.value || "").trim();
    const s = `${fn[0] ?? ""}${ln[0] ?? ""}`.toUpperCase();
    return s || "U";
});
// Carga inicial desde localStorage
const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser)
        return;
    try {
        const u = JSON.parse(storedUser);
        email.value = u.email ?? "";
        const parts = (u.name ?? "").trim().split(/\s+/);
        firstName.value = parts.shift() ?? "";
        lastName.value = parts.join(" ");
        avatarUrl.value = u.profilePictureUrl ?? null;
    }
    catch {
    }
};
onMounted(loadUserFromStorage);
// Validaciones por campo
const validateName = () => {
    const name = fullName.value;
    let msg = "";
    if (!name)
        msg = "Name cannot be blank or null";
    else if (name.length < NAME_MIN || name.length > NAME_MAX)
        msg = `'name' must be between ${NAME_MIN} and ${NAME_MAX} characters`;
    errors.value.firstName = msg || undefined;
    errors.value.lastName = msg || undefined;
    return !msg;
};
const validateEmail = () => {
    const v = email.value.trim();
    let msg = "";
    if (!v)
        msg = "email cannot be blank or null";
    else if (!EMAIL_REGEX.test(v))
        msg = "Invalid email format";
    errors.value.email = msg || undefined;
    return !msg;
};
const validateOldPassword = () => {
    if (isAdmin.value) {
        errors.value.oldPassword = undefined;
        return true;
    }
    const v = password.value.trim();
    const ok = v.length > 0;
    errors.value.oldPassword = ok ? undefined : "Current password is required";
    return ok;
};
const validateNewPassword = () => {
    const v = newPassword.value;
    let msg = "";
    if (!v)
        msg = "New password cannot be blank or null";
    else if (!NEW_PASSWORD_REGEX.test(v))
        msg = "The password must have at least 12 characters, one lowercase letter, one uppercase letter, one number, and a special symbol.";
    errors.value.newPassword = msg || undefined;
    return !msg;
};
// Validaciones para deshabilitar botones
const isNameValid = computed(() => {
    const n = fullName.value;
    return n.length >= NAME_MIN && n.length <= NAME_MAX;
});
const isEmailValid = computed(() => EMAIL_REGEX.test(email.value.trim()));
const isAccountFormValid = computed(() => isNameValid.value && isEmailValid.value);
const isOldValid = computed(() => isAdmin.value || password.value.trim().length > 0);
const isNewValid = computed(() => NEW_PASSWORD_REGEX.test(newPassword.value));
const isPasswordFormValid = computed(() => isOldValid.value && isNewValid.value);
// Valida al escribir
watch([firstName, lastName], () => {
    if (errors.value.firstName || errors.value.lastName)
        validateName();
});
watch(email, () => {
    if (errors.value.email)
        validateEmail();
});
watch(password, () => {
    if (errors.value.oldPassword)
        validateOldPassword();
});
watch(newPassword, () => {
    if (errors.value.newPassword)
        validateNewPassword();
});
// Mapeo de errores del backend (invalid_params)
const applyServerInvalidParams = (problem) => {
    if (!problem?.invalid_params?.length)
        return;
    for (const p of problem.invalid_params) {
        // normaliza el nombre del campo que envía el backend
        const field = p.name;
        const reason = p.reason || problem.detail;
        if (field === "name") {
            errors.value.firstName = reason;
            errors.value.lastName = reason;
        }
        else if (field === "email") {
            errors.value.email = reason;
        }
        else if (field === "oldPassword") {
            errors.value.oldPassword = reason;
        }
        else if (field === "newPassword") {
            errors.value.newPassword = reason;
        }
    }
};
// Handlers
const handleAccount = async () => {
    const ok = [validateName(), validateEmail()].every(Boolean);
    if (!ok) {
        toast({ variant: "destructive", title: "Fix errors", description: "Please correct the highlighted fields." });
        return;
    }
    try {
        const payload = {
            name: fullName.value,
            email: email.value.trim()
        };
        await userService.updateCurrent(payload);
        // Sincroniza localStorage.user
        const stored = localStorage.getItem("user");
        if (stored) {
            const u = JSON.parse(stored);
            u.name = payload.name;
            u.email = payload.email;
            localStorage.setItem("user", JSON.stringify(u));
        }
        toast({ title: "Success", description: "Your account has been updated." });
    }
    catch (err) {
        const problem = err;
        applyServerInvalidParams(problem);
        toast({
            variant: "destructive",
            title: problem?.title || "Error",
            description: problem?.detail || "Failed to update account. Please try again.",
        });
    }
};
const handleChangePassword = async () => {
    const ok = [validateOldPassword(), validateNewPassword()].every(Boolean);
    if (!ok) {
        toast({ variant: "destructive", title: "Fix errors", description: "Please correct the highlighted fields." });
        return;
    }
    try {
        const payload = {
            oldPassword: isAdmin.value ? undefined : password.value,
            newPassword: newPassword.value
        };
        await userService.changeCurrentPassword(payload);
        toast({ title: "Success", description: "Your password has been changed." });
        password.value = "";
        newPassword.value = "";
    }
    catch (err) {
        const problem = err;
        applyServerInvalidParams(problem);
        toast({
            variant: "destructive",
            title: problem?.title || "Error",
            description: problem?.detail || "Failed to change password. Please try again.",
        });
    }
};
// ====== Avatar upload + preview (igual que antes) ======
const onSelectFile = (e) => {
    const input = e.target;
    const file = input.files?.[0];
    if (!file)
        return;
    if (!file.type.startsWith("image/")) {
        toast({ variant: "destructive", title: "Invalid file", description: "Please select an image file." });
        return;
    }
    selectedFile.value = file;
    if (previewUrl.value)
        URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = URL.createObjectURL(file);
};
const clearPreview = () => {
    selectedFile.value = null;
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
        previewUrl.value = null;
    }
};
const uploadAvatar = async () => {
    if (!selectedFile.value)
        return;
    isUploading.value = true;
    try {
        const url = await userService.updateCurrentProfilePicture(selectedFile.value);
        avatarUrl.value = url;
        const stored = localStorage.getItem("user");
        if (stored) {
            const u = JSON.parse(stored);
            u.profilePictureUrl = url;
            localStorage.setItem("user", JSON.stringify(u));
        }
        toast({ title: "Success", description: "Profile picture updated." });
        clearPreview();
    }
    catch (err) {
        const problem = err;
        toast({
            variant: "destructive",
            title: problem?.title || "Error",
            description: problem?.detail || "Could not upload the image. Try again.",
        });
    }
    finally {
        isUploading.value = false;
    }
};
const avatarSrc = computed(() => previewUrl.value || avatarUrl.value || "");
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex min-h-screen items-center justify-center" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "w-full max-w-sm flex flex-col gap-6" },
});
const __VLS_0 = {}.Tabs;
/** @type {[typeof __VLS_components.Tabs, typeof __VLS_components.Tabs, ]} */ ;
// @ts-ignore
Tabs;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    defaultValue: "account",
}));
const __VLS_2 = __VLS_1({
    defaultValue: "account",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
const __VLS_5 = {}.TabsList;
/** @type {[typeof __VLS_components.TabsList, typeof __VLS_components.TabsList, ]} */ ;
// @ts-ignore
TabsList;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
const __VLS_10 = {}.TabsTrigger;
/** @type {[typeof __VLS_components.TabsTrigger, typeof __VLS_components.TabsTrigger, ]} */ ;
// @ts-ignore
TabsTrigger;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    value: "account",
}));
const __VLS_12 = __VLS_11({
    value: "account",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
var __VLS_13;
const __VLS_15 = {}.TabsTrigger;
/** @type {[typeof __VLS_components.TabsTrigger, typeof __VLS_components.TabsTrigger, ]} */ ;
// @ts-ignore
TabsTrigger;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    value: "password",
}));
const __VLS_17 = __VLS_16({
    value: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
var __VLS_18;
var __VLS_8;
const __VLS_20 = {}.TabsContent;
/** @type {[typeof __VLS_components.TabsContent, typeof __VLS_components.TabsContent, ]} */ ;
// @ts-ignore
TabsContent;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    value: "account",
}));
const __VLS_22 = __VLS_21({
    value: "account",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_24 } = __VLS_23.slots;
const __VLS_25 = {}.Card;
/** @type {[typeof __VLS_components.Card, typeof __VLS_components.Card, ]} */ ;
// @ts-ignore
Card;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_29 } = __VLS_28.slots;
const __VLS_30 = {}.CardHeader;
/** @type {[typeof __VLS_components.CardHeader, typeof __VLS_components.CardHeader, ]} */ ;
// @ts-ignore
CardHeader;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_34 } = __VLS_33.slots;
const __VLS_35 = {}.CardTitle;
/** @type {[typeof __VLS_components.CardTitle, typeof __VLS_components.CardTitle, ]} */ ;
// @ts-ignore
CardTitle;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({}));
const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_39 } = __VLS_38.slots;
var __VLS_38;
const __VLS_40 = {}.CardDescription;
/** @type {[typeof __VLS_components.CardDescription, typeof __VLS_components.CardDescription, ]} */ ;
// @ts-ignore
CardDescription;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const { default: __VLS_44 } = __VLS_43.slots;
var __VLS_43;
var __VLS_33;
const __VLS_45 = {}.CardContent;
/** @type {[typeof __VLS_components.CardContent, typeof __VLS_components.CardContent, ]} */ ;
// @ts-ignore
CardContent;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    ...{ class: "grid gap-6" },
}));
const __VLS_47 = __VLS_46({
    ...{ class: "grid gap-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_49 } = __VLS_48.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-4" },
});
const __VLS_50 = {}.Avatar;
/** @type {[typeof __VLS_components.Avatar, typeof __VLS_components.Avatar, ]} */ ;
// @ts-ignore
Avatar;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    ...{ class: "h-16 w-16" },
}));
const __VLS_52 = __VLS_51({
    ...{ class: "h-16 w-16" },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_54 } = __VLS_53.slots;
const __VLS_55 = {}.AvatarImage;
/** @type {[typeof __VLS_components.AvatarImage, ]} */ ;
// @ts-ignore
AvatarImage;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    src: (__VLS_ctx.avatarSrc),
}));
const __VLS_57 = __VLS_56({
    src: (__VLS_ctx.avatarSrc),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
// @ts-ignore
[avatarSrc,];
const __VLS_60 = {}.AvatarFallback;
/** @type {[typeof __VLS_components.AvatarFallback, typeof __VLS_components.AvatarFallback, ]} */ ;
// @ts-ignore
AvatarFallback;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_64 } = __VLS_63.slots;
(__VLS_ctx.initials);
// @ts-ignore
[initials,];
var __VLS_63;
var __VLS_53;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex flex-wrap items-center gap-2" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ onChange: (__VLS_ctx.onSelectFile) },
    ref: "fileInputRef",
    accept: "image/*",
    ...{ class: "hidden" },
    type: "file",
});
/** @type {typeof __VLS_ctx.fileInputRef} */ ;
// @ts-ignore
[onSelectFile, fileInputRef,];
const __VLS_65 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
Button;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_69;
let __VLS_70;
const __VLS_71 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.fileInputRef && __VLS_ctx.fileInputRef.click();
            // @ts-ignore
            [fileInputRef, fileInputRef,];
        } });
const { default: __VLS_72 } = __VLS_68.slots;
var __VLS_68;
if (__VLS_ctx.previewUrl) {
    // @ts-ignore
    [previewUrl,];
    const __VLS_73 = {}.Button;
    /** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    Button;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
        ...{ 'onClick': {} },
        disabled: (__VLS_ctx.isUploading),
    }));
    const __VLS_75 = __VLS_74({
        ...{ 'onClick': {} },
        disabled: (__VLS_ctx.isUploading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_74));
    let __VLS_77;
    let __VLS_78;
    const __VLS_79 = ({ click: {} },
        { onClick: (__VLS_ctx.uploadAvatar) });
    const { default: __VLS_80 } = __VLS_76.slots;
    // @ts-ignore
    [isUploading, uploadAvatar,];
    (__VLS_ctx.isUploading ? "Uploading..." : "Upload");
    // @ts-ignore
    [isUploading,];
    var __VLS_76;
}
if (__VLS_ctx.previewUrl) {
    // @ts-ignore
    [previewUrl,];
    const __VLS_81 = {}.Button;
    /** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    Button;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        ...{ 'onClick': {} },
        variant: "ghost",
    }));
    const __VLS_83 = __VLS_82({
        ...{ 'onClick': {} },
        variant: "ghost",
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    let __VLS_85;
    let __VLS_86;
    const __VLS_87 = ({ click: {} },
        { onClick: (__VLS_ctx.clearPreview) });
    const { default: __VLS_88 } = __VLS_84.slots;
    // @ts-ignore
    [clearPreview,];
    var __VLS_84;
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-3" },
});
const __VLS_89 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    for: "first-name",
}));
const __VLS_91 = __VLS_90({
    for: "first-name",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
const { default: __VLS_93 } = __VLS_92.slots;
var __VLS_92;
const __VLS_94 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    ...{ 'onBlur': {} },
    id: "first-name",
    modelValue: (__VLS_ctx.firstName),
    ...{ class: (__VLS_ctx.errors.firstName ? 'border-destructive focus-visible:ring-destructive' : '') },
    'aria-invalid': "true",
    autocomplete: "given-name",
    maxlength: "50",
    minlength: "1",
    required: true,
}));
const __VLS_96 = __VLS_95({
    ...{ 'onBlur': {} },
    id: "first-name",
    modelValue: (__VLS_ctx.firstName),
    ...{ class: (__VLS_ctx.errors.firstName ? 'border-destructive focus-visible:ring-destructive' : '') },
    'aria-invalid': "true",
    autocomplete: "given-name",
    maxlength: "50",
    minlength: "1",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_98;
let __VLS_99;
const __VLS_100 = ({ blur: {} },
    { onBlur: (__VLS_ctx.validateName) });
// @ts-ignore
[firstName, errors, validateName,];
var __VLS_97;
if (__VLS_ctx.errors.firstName) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-destructive mt-1" },
    });
    (__VLS_ctx.errors.firstName);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-3" },
});
const __VLS_102 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    for: "last-name",
}));
const __VLS_104 = __VLS_103({
    for: "last-name",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const { default: __VLS_106 } = __VLS_105.slots;
var __VLS_105;
const __VLS_107 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({
    ...{ 'onBlur': {} },
    id: "last-name",
    modelValue: (__VLS_ctx.lastName),
    ...{ class: (__VLS_ctx.errors.lastName ? 'border-destructive focus-visible:ring-destructive' : '') },
    maxlength: "50",
    minlength: "1",
    required: true,
}));
const __VLS_109 = __VLS_108({
    ...{ 'onBlur': {} },
    id: "last-name",
    modelValue: (__VLS_ctx.lastName),
    ...{ class: (__VLS_ctx.errors.lastName ? 'border-destructive focus-visible:ring-destructive' : '') },
    maxlength: "50",
    minlength: "1",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
let __VLS_111;
let __VLS_112;
const __VLS_113 = ({ blur: {} },
    { onBlur: (__VLS_ctx.validateName) });
// @ts-ignore
[errors, validateName, lastName,];
var __VLS_110;
if (__VLS_ctx.errors.lastName) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-destructive mt-1" },
    });
    (__VLS_ctx.errors.lastName);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-3" },
});
const __VLS_115 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    for: "email",
}));
const __VLS_117 = __VLS_116({
    for: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
const { default: __VLS_119 } = __VLS_118.slots;
var __VLS_118;
const __VLS_120 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
    ...{ 'onBlur': {} },
    id: "email",
    modelValue: (__VLS_ctx.email),
    ...{ class: (__VLS_ctx.errors.email ? 'border-destructive focus-visible:ring-destructive' : '') },
    autocomplete: "email",
    required: true,
    type: "email",
}));
const __VLS_122 = __VLS_121({
    ...{ 'onBlur': {} },
    id: "email",
    modelValue: (__VLS_ctx.email),
    ...{ class: (__VLS_ctx.errors.email ? 'border-destructive focus-visible:ring-destructive' : '') },
    autocomplete: "email",
    required: true,
    type: "email",
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
let __VLS_124;
let __VLS_125;
const __VLS_126 = ({ blur: {} },
    { onBlur: (__VLS_ctx.validateEmail) });
// @ts-ignore
[errors, email, validateEmail,];
var __VLS_123;
if (__VLS_ctx.errors.email) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-destructive mt-1" },
    });
    (__VLS_ctx.errors.email);
    // @ts-ignore
    [errors,];
}
var __VLS_48;
const __VLS_128 = {}.CardFooter;
/** @type {[typeof __VLS_components.CardFooter, typeof __VLS_components.CardFooter, ]} */ ;
// @ts-ignore
CardFooter;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({}));
const __VLS_130 = __VLS_129({}, ...__VLS_functionalComponentArgsRest(__VLS_129));
const { default: __VLS_132 } = __VLS_131.slots;
const __VLS_133 = {}.AlertDialog;
/** @type {[typeof __VLS_components.AlertDialog, typeof __VLS_components.AlertDialog, ]} */ ;
// @ts-ignore
AlertDialog;
// @ts-ignore
const __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({}));
const __VLS_135 = __VLS_134({}, ...__VLS_functionalComponentArgsRest(__VLS_134));
const { default: __VLS_137 } = __VLS_136.slots;
const __VLS_138 = {}.AlertDialogTrigger;
/** @type {[typeof __VLS_components.AlertDialogTrigger, typeof __VLS_components.AlertDialogTrigger, ]} */ ;
// @ts-ignore
AlertDialogTrigger;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    asChild: true,
}));
const __VLS_140 = __VLS_139({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
const { default: __VLS_142 } = __VLS_141.slots;
const __VLS_143 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
Button;
// @ts-ignore
const __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({
    disabled: (!__VLS_ctx.isAccountFormValid),
}));
const __VLS_145 = __VLS_144({
    disabled: (!__VLS_ctx.isAccountFormValid),
}, ...__VLS_functionalComponentArgsRest(__VLS_144));
const { default: __VLS_147 } = __VLS_146.slots;
// @ts-ignore
[isAccountFormValid,];
var __VLS_146;
var __VLS_141;
const __VLS_148 = {}.AlertDialogContent;
/** @type {[typeof __VLS_components.AlertDialogContent, typeof __VLS_components.AlertDialogContent, ]} */ ;
// @ts-ignore
AlertDialogContent;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({}));
const __VLS_150 = __VLS_149({}, ...__VLS_functionalComponentArgsRest(__VLS_149));
const { default: __VLS_152 } = __VLS_151.slots;
const __VLS_153 = {}.AlertDialogHeader;
/** @type {[typeof __VLS_components.AlertDialogHeader, typeof __VLS_components.AlertDialogHeader, ]} */ ;
// @ts-ignore
AlertDialogHeader;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({}));
const __VLS_155 = __VLS_154({}, ...__VLS_functionalComponentArgsRest(__VLS_154));
const { default: __VLS_157 } = __VLS_156.slots;
const __VLS_158 = {}.AlertDialogTitle;
/** @type {[typeof __VLS_components.AlertDialogTitle, typeof __VLS_components.AlertDialogTitle, ]} */ ;
// @ts-ignore
AlertDialogTitle;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({}));
const __VLS_160 = __VLS_159({}, ...__VLS_functionalComponentArgsRest(__VLS_159));
const { default: __VLS_162 } = __VLS_161.slots;
var __VLS_161;
const __VLS_163 = {}.AlertDialogDescription;
/** @type {[typeof __VLS_components.AlertDialogDescription, typeof __VLS_components.AlertDialogDescription, ]} */ ;
// @ts-ignore
AlertDialogDescription;
// @ts-ignore
const __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163({}));
const __VLS_165 = __VLS_164({}, ...__VLS_functionalComponentArgsRest(__VLS_164));
const { default: __VLS_167 } = __VLS_166.slots;
var __VLS_166;
var __VLS_156;
const __VLS_168 = {}.AlertDialogFooter;
/** @type {[typeof __VLS_components.AlertDialogFooter, typeof __VLS_components.AlertDialogFooter, ]} */ ;
// @ts-ignore
AlertDialogFooter;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({}));
const __VLS_170 = __VLS_169({}, ...__VLS_functionalComponentArgsRest(__VLS_169));
const { default: __VLS_172 } = __VLS_171.slots;
const __VLS_173 = {}.AlertDialogCancel;
/** @type {[typeof __VLS_components.AlertDialogCancel, typeof __VLS_components.AlertDialogCancel, ]} */ ;
// @ts-ignore
AlertDialogCancel;
// @ts-ignore
const __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({}));
const __VLS_175 = __VLS_174({}, ...__VLS_functionalComponentArgsRest(__VLS_174));
const { default: __VLS_177 } = __VLS_176.slots;
var __VLS_176;
const __VLS_178 = {}.AlertDialogAction;
/** @type {[typeof __VLS_components.AlertDialogAction, typeof __VLS_components.AlertDialogAction, ]} */ ;
// @ts-ignore
AlertDialogAction;
// @ts-ignore
const __VLS_179 = __VLS_asFunctionalComponent(__VLS_178, new __VLS_178({
    ...{ 'onClick': {} },
}));
const __VLS_180 = __VLS_179({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_179));
let __VLS_182;
let __VLS_183;
const __VLS_184 = ({ click: {} },
    { onClick: (__VLS_ctx.handleAccount) });
const { default: __VLS_185 } = __VLS_181.slots;
// @ts-ignore
[handleAccount,];
var __VLS_181;
var __VLS_171;
var __VLS_151;
var __VLS_136;
var __VLS_131;
var __VLS_28;
var __VLS_23;
const __VLS_186 = {}.TabsContent;
/** @type {[typeof __VLS_components.TabsContent, typeof __VLS_components.TabsContent, ]} */ ;
// @ts-ignore
TabsContent;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({
    value: "password",
}));
const __VLS_188 = __VLS_187({
    value: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
const { default: __VLS_190 } = __VLS_189.slots;
const __VLS_191 = {}.Card;
/** @type {[typeof __VLS_components.Card, typeof __VLS_components.Card, ]} */ ;
// @ts-ignore
Card;
// @ts-ignore
const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({}));
const __VLS_193 = __VLS_192({}, ...__VLS_functionalComponentArgsRest(__VLS_192));
const { default: __VLS_195 } = __VLS_194.slots;
const __VLS_196 = {}.CardHeader;
/** @type {[typeof __VLS_components.CardHeader, typeof __VLS_components.CardHeader, ]} */ ;
// @ts-ignore
CardHeader;
// @ts-ignore
const __VLS_197 = __VLS_asFunctionalComponent(__VLS_196, new __VLS_196({}));
const __VLS_198 = __VLS_197({}, ...__VLS_functionalComponentArgsRest(__VLS_197));
const { default: __VLS_200 } = __VLS_199.slots;
const __VLS_201 = {}.CardTitle;
/** @type {[typeof __VLS_components.CardTitle, typeof __VLS_components.CardTitle, ]} */ ;
// @ts-ignore
CardTitle;
// @ts-ignore
const __VLS_202 = __VLS_asFunctionalComponent(__VLS_201, new __VLS_201({}));
const __VLS_203 = __VLS_202({}, ...__VLS_functionalComponentArgsRest(__VLS_202));
const { default: __VLS_205 } = __VLS_204.slots;
var __VLS_204;
const __VLS_206 = {}.CardDescription;
/** @type {[typeof __VLS_components.CardDescription, typeof __VLS_components.CardDescription, ]} */ ;
// @ts-ignore
CardDescription;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({}));
const __VLS_208 = __VLS_207({}, ...__VLS_functionalComponentArgsRest(__VLS_207));
const { default: __VLS_210 } = __VLS_209.slots;
var __VLS_209;
var __VLS_199;
const __VLS_211 = {}.CardContent;
/** @type {[typeof __VLS_components.CardContent, typeof __VLS_components.CardContent, ]} */ ;
// @ts-ignore
CardContent;
// @ts-ignore
const __VLS_212 = __VLS_asFunctionalComponent(__VLS_211, new __VLS_211({
    ...{ class: "grid gap-6" },
}));
const __VLS_213 = __VLS_212({
    ...{ class: "grid gap-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_212));
const { default: __VLS_215 } = __VLS_214.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-3" },
});
const __VLS_216 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
    for: "current-pass",
}));
const __VLS_218 = __VLS_217({
    for: "current-pass",
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
const { default: __VLS_220 } = __VLS_219.slots;
var __VLS_219;
const __VLS_221 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_222 = __VLS_asFunctionalComponent(__VLS_221, new __VLS_221({
    ...{ 'onBlur': {} },
    id: "current-pass",
    modelValue: (__VLS_ctx.password),
    ...{ class: (__VLS_ctx.errors.oldPassword ? 'border-destructive focus-visible:ring-destructive' : '') },
    type: "password",
}));
const __VLS_223 = __VLS_222({
    ...{ 'onBlur': {} },
    id: "current-pass",
    modelValue: (__VLS_ctx.password),
    ...{ class: (__VLS_ctx.errors.oldPassword ? 'border-destructive focus-visible:ring-destructive' : '') },
    type: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_222));
let __VLS_225;
let __VLS_226;
const __VLS_227 = ({ blur: {} },
    { onBlur: (__VLS_ctx.validateOldPassword) });
// @ts-ignore
[errors, password, validateOldPassword,];
var __VLS_224;
if (__VLS_ctx.errors.oldPassword) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-destructive mt-1" },
    });
    (__VLS_ctx.errors.oldPassword);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid gap-3" },
});
const __VLS_229 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
Label;
// @ts-ignore
const __VLS_230 = __VLS_asFunctionalComponent(__VLS_229, new __VLS_229({
    for: "new-pass",
}));
const __VLS_231 = __VLS_230({
    for: "new-pass",
}, ...__VLS_functionalComponentArgsRest(__VLS_230));
const { default: __VLS_233 } = __VLS_232.slots;
var __VLS_232;
const __VLS_234 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
Input;
// @ts-ignore
const __VLS_235 = __VLS_asFunctionalComponent(__VLS_234, new __VLS_234({
    ...{ 'onBlur': {} },
    id: "new-pass",
    modelValue: (__VLS_ctx.newPassword),
    ...{ class: (__VLS_ctx.errors.newPassword ? 'border-destructive focus-visible:ring-destructive' : '') },
    pattern: (__VLS_ctx.NEW_PASSWORD_REGEX.source),
    title: "At least 12 chars, one lowercase, one uppercase, one number, and one special symbol (!@#$%^&*()_-).",
    type: "password",
}));
const __VLS_236 = __VLS_235({
    ...{ 'onBlur': {} },
    id: "new-pass",
    modelValue: (__VLS_ctx.newPassword),
    ...{ class: (__VLS_ctx.errors.newPassword ? 'border-destructive focus-visible:ring-destructive' : '') },
    pattern: (__VLS_ctx.NEW_PASSWORD_REGEX.source),
    title: "At least 12 chars, one lowercase, one uppercase, one number, and one special symbol (!@#$%^&*()_-).",
    type: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_235));
let __VLS_238;
let __VLS_239;
const __VLS_240 = ({ blur: {} },
    { onBlur: (__VLS_ctx.validateNewPassword) });
// @ts-ignore
[errors, newPassword, NEW_PASSWORD_REGEX, validateNewPassword,];
var __VLS_237;
if (__VLS_ctx.errors.newPassword) {
    // @ts-ignore
    [errors,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-destructive mt-1" },
    });
    (__VLS_ctx.errors.newPassword);
    // @ts-ignore
    [errors,];
}
__VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
    ...{ class: "text-xs text-muted-foreground space-y-1" },
});
__VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
__VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
__VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
__VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
__VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
var __VLS_214;
const __VLS_242 = {}.CardFooter;
/** @type {[typeof __VLS_components.CardFooter, typeof __VLS_components.CardFooter, ]} */ ;
// @ts-ignore
CardFooter;
// @ts-ignore
const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({}));
const __VLS_244 = __VLS_243({}, ...__VLS_functionalComponentArgsRest(__VLS_243));
const { default: __VLS_246 } = __VLS_245.slots;
const __VLS_247 = {}.AlertDialog;
/** @type {[typeof __VLS_components.AlertDialog, typeof __VLS_components.AlertDialog, ]} */ ;
// @ts-ignore
AlertDialog;
// @ts-ignore
const __VLS_248 = __VLS_asFunctionalComponent(__VLS_247, new __VLS_247({}));
const __VLS_249 = __VLS_248({}, ...__VLS_functionalComponentArgsRest(__VLS_248));
const { default: __VLS_251 } = __VLS_250.slots;
const __VLS_252 = {}.AlertDialogTrigger;
/** @type {[typeof __VLS_components.AlertDialogTrigger, typeof __VLS_components.AlertDialogTrigger, ]} */ ;
// @ts-ignore
AlertDialogTrigger;
// @ts-ignore
const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
    asChild: true,
}));
const __VLS_254 = __VLS_253({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_253));
const { default: __VLS_256 } = __VLS_255.slots;
const __VLS_257 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
Button;
// @ts-ignore
const __VLS_258 = __VLS_asFunctionalComponent(__VLS_257, new __VLS_257({
    disabled: (!__VLS_ctx.isPasswordFormValid),
}));
const __VLS_259 = __VLS_258({
    disabled: (!__VLS_ctx.isPasswordFormValid),
}, ...__VLS_functionalComponentArgsRest(__VLS_258));
const { default: __VLS_261 } = __VLS_260.slots;
// @ts-ignore
[isPasswordFormValid,];
var __VLS_260;
var __VLS_255;
const __VLS_262 = {}.AlertDialogContent;
/** @type {[typeof __VLS_components.AlertDialogContent, typeof __VLS_components.AlertDialogContent, ]} */ ;
// @ts-ignore
AlertDialogContent;
// @ts-ignore
const __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({}));
const __VLS_264 = __VLS_263({}, ...__VLS_functionalComponentArgsRest(__VLS_263));
const { default: __VLS_266 } = __VLS_265.slots;
const __VLS_267 = {}.AlertDialogHeader;
/** @type {[typeof __VLS_components.AlertDialogHeader, typeof __VLS_components.AlertDialogHeader, ]} */ ;
// @ts-ignore
AlertDialogHeader;
// @ts-ignore
const __VLS_268 = __VLS_asFunctionalComponent(__VLS_267, new __VLS_267({}));
const __VLS_269 = __VLS_268({}, ...__VLS_functionalComponentArgsRest(__VLS_268));
const { default: __VLS_271 } = __VLS_270.slots;
const __VLS_272 = {}.AlertDialogTitle;
/** @type {[typeof __VLS_components.AlertDialogTitle, typeof __VLS_components.AlertDialogTitle, ]} */ ;
// @ts-ignore
AlertDialogTitle;
// @ts-ignore
const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({}));
const __VLS_274 = __VLS_273({}, ...__VLS_functionalComponentArgsRest(__VLS_273));
const { default: __VLS_276 } = __VLS_275.slots;
var __VLS_275;
const __VLS_277 = {}.AlertDialogDescription;
/** @type {[typeof __VLS_components.AlertDialogDescription, typeof __VLS_components.AlertDialogDescription, ]} */ ;
// @ts-ignore
AlertDialogDescription;
// @ts-ignore
const __VLS_278 = __VLS_asFunctionalComponent(__VLS_277, new __VLS_277({}));
const __VLS_279 = __VLS_278({}, ...__VLS_functionalComponentArgsRest(__VLS_278));
const { default: __VLS_281 } = __VLS_280.slots;
var __VLS_280;
var __VLS_270;
const __VLS_282 = {}.AlertDialogFooter;
/** @type {[typeof __VLS_components.AlertDialogFooter, typeof __VLS_components.AlertDialogFooter, ]} */ ;
// @ts-ignore
AlertDialogFooter;
// @ts-ignore
const __VLS_283 = __VLS_asFunctionalComponent(__VLS_282, new __VLS_282({}));
const __VLS_284 = __VLS_283({}, ...__VLS_functionalComponentArgsRest(__VLS_283));
const { default: __VLS_286 } = __VLS_285.slots;
const __VLS_287 = {}.AlertDialogCancel;
/** @type {[typeof __VLS_components.AlertDialogCancel, typeof __VLS_components.AlertDialogCancel, ]} */ ;
// @ts-ignore
AlertDialogCancel;
// @ts-ignore
const __VLS_288 = __VLS_asFunctionalComponent(__VLS_287, new __VLS_287({}));
const __VLS_289 = __VLS_288({}, ...__VLS_functionalComponentArgsRest(__VLS_288));
const { default: __VLS_291 } = __VLS_290.slots;
var __VLS_290;
const __VLS_292 = {}.AlertDialogAction;
/** @type {[typeof __VLS_components.AlertDialogAction, typeof __VLS_components.AlertDialogAction, ]} */ ;
// @ts-ignore
AlertDialogAction;
// @ts-ignore
const __VLS_293 = __VLS_asFunctionalComponent(__VLS_292, new __VLS_292({
    ...{ 'onClick': {} },
}));
const __VLS_294 = __VLS_293({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_293));
let __VLS_296;
let __VLS_297;
const __VLS_298 = ({ click: {} },
    { onClick: (__VLS_ctx.handleChangePassword) });
const { default: __VLS_299 } = __VLS_295.slots;
// @ts-ignore
[handleChangePassword,];
var __VLS_295;
var __VLS_285;
var __VLS_265;
var __VLS_250;
var __VLS_245;
var __VLS_194;
var __VLS_189;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Tabs: Tabs,
        TabsContent: TabsContent,
        TabsList: TabsList,
        TabsTrigger: TabsTrigger,
        Card: Card,
        CardContent: CardContent,
        CardDescription: CardDescription,
        CardFooter: CardFooter,
        CardHeader: CardHeader,
        CardTitle: CardTitle,
        Label: Label,
        Input: Input,
        Button: Button,
        AlertDialog: AlertDialog,
        AlertDialogAction: AlertDialogAction,
        AlertDialogCancel: AlertDialogCancel,
        AlertDialogContent: AlertDialogContent,
        AlertDialogDescription: AlertDialogDescription,
        AlertDialogFooter: AlertDialogFooter,
        AlertDialogHeader: AlertDialogHeader,
        AlertDialogTitle: AlertDialogTitle,
        AlertDialogTrigger: AlertDialogTrigger,
        Avatar: Avatar,
        AvatarFallback: AvatarFallback,
        AvatarImage: AvatarImage,
        NEW_PASSWORD_REGEX: NEW_PASSWORD_REGEX,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        newPassword: newPassword,
        previewUrl: previewUrl,
        fileInputRef: fileInputRef,
        isUploading: isUploading,
        errors: errors,
        initials: initials,
        validateName: validateName,
        validateEmail: validateEmail,
        validateOldPassword: validateOldPassword,
        validateNewPassword: validateNewPassword,
        isAccountFormValid: isAccountFormValid,
        isPasswordFormValid: isPasswordFormValid,
        handleAccount: handleAccount,
        handleChangePassword: handleChangePassword,
        onSelectFile: onSelectFile,
        clearPreview: clearPreview,
        uploadAvatar: uploadAvatar,
        avatarSrc: avatarSrc,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
