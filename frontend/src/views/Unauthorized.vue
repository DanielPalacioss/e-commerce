<script lang="ts" setup>
import {useRouter} from "vue-router";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {AlertTriangle} from "lucide-vue-next";

const router = useRouter()
</script>

<template>
  <main class="flex h-screen items-center justify-center bg-gray-100 p-4">
    <div class="max-w-md w-full space-y-6 text-center">
      <Alert class="text-left" variant="destructive">
        <AlertTriangle class="h-5 w-5"/>
        <AlertTitle>Unauthorized access</AlertTitle>
        <AlertDescription>
          You do not have permission to access this page.
        </AlertDescription>
      </Alert>

      <Button class="w-full" @click="router.back()">
        Go back
      </Button>

      <Button variant="ghost" @click="router.push('/')">
        Go to the beginning
      </Button>
    </div>
  </main>
</template>

<style scoped>

</style>