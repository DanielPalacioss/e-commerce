<script lang="ts" setup>
import {ref} from "vue"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {saveAuth, signUp} from "@/api/authService"
import type {AuthCreateUserRequest} from "@/types/auth"
import type {JsonProblem} from "@/types/problem"

const form = ref<AuthCreateUserRequest>({
  name: "",
  username: "",
  email: "",
  password: ""
})

const confirmPassword = ref("")
const errors = ref<Record<string, string>>({})
const generalError = ref<string | null>(null)

const handleRegister = async () => {
  errors.value = {}
  generalError.value = null

  if (form.value.password !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match"
    return
  }

  try {
    const auth = await signUp(form.value)
    saveAuth(auth)
    alert("✅ Account created successfully")
  } catch (problem: unknown) {
    const err = problem as JsonProblem
    generalError.value = err.detail

    if (err.invalid_params) {
      err.invalid_params.forEach(param => {
        errors.value[param.name] = param.reason
      })
    }
  }
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="p-0 h-auto text-sm" variant="link">
        Sign up
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create an account</DialogTitle>
        <DialogDescription>You can create your account here.</DialogDescription>
      </DialogHeader>

      <div class="space-y-4 pt-4">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="form.name" required/>
          <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>

        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input id="username" v-model="form.username" required/>
          <span v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</span>
        </div>

        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="form.email" required type="email"/>
          <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="form.password" required type="password"/>
          <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
        </div>

        <div class="grid gap-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" v-model="confirmPassword" required type="password"/>
          <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
        </div>

        <p v-if="generalError" class="text-red-600 text-sm">{{ generalError }}</p>

        <Button class="w-full" type="button" @click="handleRegister">
          Register
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
</style>