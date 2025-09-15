<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {userService} from "@/api/userService"
import {useToast} from "@/components/ui/toast/use-toast"
import type {JsonProblem} from "@/types/problem"
import {UserResponse} from "@/types/user";

// Constantes de validación (alineadas con backend)
const NAME_MIN = 2
const NAME_MAX = 50
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const NEW_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_-])[a-zA-Z0-9!@#$%^&*()_-]{12,}$/

// State
const firstName = ref("")
const lastName = ref("")
const email = ref("")
const password = ref("")
const newPassword = ref("")
const isAdmin = ref(false)

const avatarUrl = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)

const {toast} = useToast()

// Errores por campo
type FieldErrors = {
  firstName?: string
  lastName?: string
  email?: string
  oldPassword?: string
  newPassword?: string
}
const errors = ref<FieldErrors>({})

// Utils
const normalizeSpace = (s: string) => s.replace(/\s+/g, " ").trim()
const fullName = computed(() => normalizeSpace(`${firstName.value} ${lastName.value}`))

const initials = computed(() => {
  const fn = (firstName.value || "").trim()
  const ln = (lastName.value || "").trim()
  const s = `${fn[0] ?? ""}${ln[0] ?? ""}`.toUpperCase()
  return s || "U"
})

// Carga inicial desde localStorage
const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem("user")
  if (!storedUser) return
  try {
    const u: UserResponse = JSON.parse(storedUser)
    email.value = u.email ?? ""
    const parts = (u.name ?? "").trim().split(/\s+/)
    firstName.value = parts.shift() ?? ""
    lastName.value = parts.join(" ")
    avatarUrl.value = u.profilePictureUrl ?? null
  } catch {
  }
}
onMounted(loadUserFromStorage)

// Validaciones por campo
const validateName = () => {
  const name = fullName.value
  let msg = ""
  if (!name) msg = "Name cannot be blank or null"
  else if (name.length < NAME_MIN || name.length > NAME_MAX)
    msg = `'name' must be between ${NAME_MIN} and ${NAME_MAX} characters`
  errors.value.firstName = msg || undefined
  errors.value.lastName = msg || undefined
  return !msg
}

const validateEmail = () => {
  const v = email.value.trim()
  let msg = ""
  if (!v) msg = "email cannot be blank or null"
  else if (!EMAIL_REGEX.test(v)) msg = "Invalid email format"
  errors.value.email = msg || undefined
  return !msg
}

const validateOldPassword = () => {
  if (isAdmin.value) {
    errors.value.oldPassword = undefined
    return true
  }
  const v = password.value.trim()
  const ok = v.length > 0
  errors.value.oldPassword = ok ? undefined : "Current password is required"
  return ok
}

const validateNewPassword = () => {
  const v = newPassword.value
  let msg = ""
  if (!v) msg = "New password cannot be blank or null"
  else if (!NEW_PASSWORD_REGEX.test(v))
    msg = "The password must have at least 12 characters, one lowercase letter, one uppercase letter, one number, and a special symbol."
  errors.value.newPassword = msg || undefined
  return !msg
}

// Validaciones para deshabilitar botones
const isNameValid = computed(() => {
  const n = fullName.value
  return n.length >= NAME_MIN && n.length <= NAME_MAX
})
const isEmailValid = computed(() => EMAIL_REGEX.test(email.value.trim()))
const isAccountFormValid = computed(() => isNameValid.value && isEmailValid.value)

const isOldValid = computed(() => isAdmin.value || password.value.trim().length > 0)
const isNewValid = computed(() => NEW_PASSWORD_REGEX.test(newPassword.value))
const isPasswordFormValid = computed(() => isOldValid.value && isNewValid.value)

// Valida al escribir
watch([firstName, lastName], () => {
  if (errors.value.firstName || errors.value.lastName) validateName()
})
watch(email, () => {
  if (errors.value.email) validateEmail()
})
watch(password, () => {
  if (errors.value.oldPassword) validateOldPassword()
})
watch(newPassword, () => {
  if (errors.value.newPassword) validateNewPassword()
})

// Mapeo de errores del backend (invalid_params)
const applyServerInvalidParams = (problem?: JsonProblem) => {
  if (!problem?.invalid_params?.length) return
  for (const p of problem.invalid_params) {
    // normaliza el nombre del campo que envía el backend
    const field = p.name
    const reason = p.reason || problem.detail
    if (field === "name") {
      errors.value.firstName = reason
      errors.value.lastName = reason
    } else if (field === "email") {
      errors.value.email = reason
    } else if (field === "oldPassword") {
      errors.value.oldPassword = reason
    } else if (field === "newPassword") {
      errors.value.newPassword = reason
    }
  }
}

// Handlers
const handleAccount = async () => {
  const ok = [validateName(), validateEmail()].every(Boolean)
  if (!ok) {
    toast({variant: "destructive", title: "Fix errors", description: "Please correct the highlighted fields."})
    return
  }

  try {
    const payload = {
      name: fullName.value,
      email: email.value.trim()
    }
    await userService.updateCurrent(payload)

    // Sincroniza localStorage.user
    const stored = localStorage.getItem("user")
    if (stored) {
      const u: UserResponse = JSON.parse(stored)
      u.name = payload.name
      u.email = payload.email
      localStorage.setItem("user", JSON.stringify(u))
    }

    toast({title: "Success", description: "Your account has been updated."})
  } catch (err: any) {
    const problem = err as JsonProblem
    applyServerInvalidParams(problem)
    toast({
      variant: "destructive",
      title: problem?.title || "Error",
      description: problem?.detail || "Failed to update account. Please try again.",
    })
  }
}

const handleChangePassword = async () => {
  const ok = [validateOldPassword(), validateNewPassword()].every(Boolean)
  if (!ok) {
    toast({variant: "destructive", title: "Fix errors", description: "Please correct the highlighted fields."})
    return
  }

  try {
    const payload = {
      oldPassword: isAdmin.value ? undefined : password.value,
      newPassword: newPassword.value
    }
    await userService.changeCurrentPassword(payload)

    toast({title: "Success", description: "Your password has been changed."})
    password.value = ""
    newPassword.value = ""
  } catch (err: any) {
    const problem = err as JsonProblem
    applyServerInvalidParams(problem)
    toast({
      variant: "destructive",
      title: problem?.title || "Error",
      description: problem?.detail || "Failed to change password. Please try again.",
    })
  }
}

// ====== Avatar upload + preview (igual que antes) ======
const onSelectFile = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (!file.type.startsWith("image/")) {
    toast({variant: "destructive", title: "Invalid file", description: "Please select an image file."})
    return
  }
  selectedFile.value = file
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = URL.createObjectURL(file)
}
const clearPreview = () => {
  selectedFile.value = null
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null
  }
}
const uploadAvatar = async () => {
  if (!selectedFile.value) return
  isUploading.value = true
  try {
    const url = await userService.updateCurrentProfilePicture(selectedFile.value)
    avatarUrl.value = url
    const stored = localStorage.getItem("user")
    if (stored) {
      const u: UserResponse = JSON.parse(stored)
      u.profilePictureUrl = url
      localStorage.setItem("user", JSON.stringify(u))
    }
    toast({title: "Success", description: "Profile picture updated."})
    clearPreview()
  } catch (err: any) {
    const problem = err as JsonProblem
    toast({
      variant: "destructive",
      title: problem?.title || "Error",
      description: problem?.detail || "Could not upload the image. Try again.",
    })
  } finally {
    isUploading.value = false
  }
}

const avatarSrc = computed(() => previewUrl.value || avatarUrl.value || "")
</script>

<template>
  <!-- Contenedor centrado -->
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-sm flex flex-col gap-6">
      <Tabs default-value="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <!-- Account Tab -->
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>

            <CardContent class="grid gap-6">
              <!-- Avatar + Upload -->
              <div class="flex items-center gap-4">
                <Avatar class="h-16 w-16">
                  <AvatarImage :src="avatarSrc"/>
                  <AvatarFallback>{{ initials }}</AvatarFallback>
                </Avatar>

                <div class="flex flex-wrap items-center gap-2">
                  <input
                      ref="fileInputRef"
                      accept="image/*"
                      class="hidden"
                      type="file"
                      @change="onSelectFile"
                  />
                  <Button variant="outline" @click="fileInputRef && fileInputRef.click()">Choose photo</Button>
                  <Button v-if="previewUrl" :disabled="isUploading" @click="uploadAvatar">
                    {{ isUploading ? "Uploading..." : "Upload" }}
                  </Button>
                  <Button v-if="previewUrl" variant="ghost" @click="clearPreview">Cancel</Button>
                </div>
              </div>

              <!-- Name -->
              <div class="grid gap-3">
                <Label for="first-name">First Name</Label>
                <Input
                    id="first-name"
                    v-model="firstName"
                    :class="errors.firstName ? 'border-destructive focus-visible:ring-destructive' : ''"
                    aria-invalid="true"
                    autocomplete="given-name"
                    maxlength="50"
                    minlength="1"
                    required
                    @blur="validateName"
                />
                <p v-if="errors.firstName" class="text-sm text-destructive mt-1">{{ errors.firstName }}</p>
              </div>

              <div class="grid gap-3">
                <Label for="last-name">Last Name</Label>
                <Input
                    id="last-name"
                    v-model="lastName"
                    :class="errors.lastName ? 'border-destructive focus-visible:ring-destructive' : ''"
                    maxlength="50"
                    minlength="1"
                    required
                    @blur="validateName"
                />
                <p v-if="errors.lastName" class="text-sm text-destructive mt-1">{{ errors.lastName }}</p>
              </div>

              <!-- Email -->
              <div class="grid gap-3">
                <Label for="email">Email</Label>
                <Input
                    id="email"
                    v-model="email"
                    :class="errors.email ? 'border-destructive focus-visible:ring-destructive' : ''"
                    autocomplete="email"
                    required
                    type="email"
                    @blur="validateEmail"
                />
                <p v-if="errors.email" class="text-sm text-destructive mt-1">{{ errors.email }}</p>
              </div>
            </CardContent>

            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button :disabled="!isAccountFormValid">Save changes</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action modifies your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction @click="handleAccount">Yes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <!-- Password Tab -->
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here.
              </CardDescription>
            </CardHeader>

            <CardContent class="grid gap-6">

              <div class="grid gap-3">
                <Label for="current-pass">Current password</Label>
                <Input
                    id="current-pass"
                    v-model="password"
                    :class="errors.oldPassword ? 'border-destructive focus-visible:ring-destructive' : ''"
                    type="password"
                    @blur="validateOldPassword"
                />
                <p v-if="errors.oldPassword" class="text-sm text-destructive mt-1">{{ errors.oldPassword }}</p>
              </div>

              <!-- New Password -->
              <div class="grid gap-3">
                <Label for="new-pass">New password</Label>
                <Input
                    id="new-pass"
                    v-model="newPassword"
                    :class="errors.newPassword ? 'border-destructive focus-visible:ring-destructive' : ''"
                    :pattern="NEW_PASSWORD_REGEX.source"
                    title="At least 12 chars, one lowercase, one uppercase, one number, and one special symbol (!@#$%^&*()_-)."
                    type="password"
                    @blur="validateNewPassword"
                />
                <p v-if="errors.newPassword" class="text-sm text-destructive mt-1">{{ errors.newPassword }}</p>

                <!-- Checklist de requisitos (visual) -->
                <ul class="text-xs text-muted-foreground space-y-1">
                  <li>• 12+ characters</li>
                  <li>• At least one uppercase (A-Z)</li>
                  <li>• At least one lowercase (a-z)</li>
                  <li>• At least one number (0-9)</li>
                  <li>• At least one symbol !@#$%^&*()_-</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button :disabled="!isPasswordFormValid">Save password</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action modifies your password.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction @click="handleChangePassword">Yes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
