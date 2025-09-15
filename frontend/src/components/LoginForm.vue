<script lang="ts" setup>
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {cn} from "@/lib/utils";
import SignupModal from "@/components/SignupModal.vue";
import {ref} from "vue"
import {login, saveAuth} from "@/api/authService"
import {userService} from "@/api/userService"
import type {AuthLoginRequest} from "@/types/auth"
import type {JsonProblem} from "@/types/problem"
import router from "@/routes";
import {UserResponse} from "@/types/user";
import {useToast} from "@/components/ui/toast";

const form = ref<AuthLoginRequest>({
  username: "",
  password: ""
})

const error = ref<string | null>(null)
const {toast} = useToast()

const submit = async () => {
  error.value = null
  try {
    const auth = await login(form.value)
    saveAuth(auth)
    const user: UserResponse = await userService.getCurrent()
    localStorage.setItem("user", JSON.stringify(user))

    toast({
      title: "Successful login",
      description: "Welcome",
      variant: "default",
    })

    router.push("/home")
  } catch (problem: unknown) {
    const err = problem as JsonProblem
    error.value = err.detail || "Error inesperado"
  }
}
</script>

<template>
  <form :class="cn('flex flex-col gap-6')" @submit.prevent="submit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">
        Login to your account
      </h1>
      <p class="text-balance text-sm text-muted-foreground">
        Enter your email below to login to your account
      </p>
    </div>
    <div class="grid gap-6">
      <div class="grid gap-2">
        <Label for="username">Username</Label>
        <Input id="username" v-model="form.username" placeholder="@username" required type="username"/>
      </div>
      <div class="grid gap-2">
        <Label for="email">Password</Label>
        <Input id="password" v-model="form.password" required type="password"/>
      </div>
      <Button class="w-full" type="submit">
        Login
      </Button>
    </div>
    <div class="text-center text-sm">
      Don't have an account?
      <SignupModal/>
    </div>
  </form>
</template>
