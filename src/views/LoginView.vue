<template>
  <div class="auth-page">
    <h1>Login</h1>

    <form class="auth-form" @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button type="submit" :disabled="auth.loading">
        Login
      </button>

      <p v-if="auth.error" class="error">{{ auth.error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value)

    console.log('LOGIN OK')
    console.log(auth.token)
    console.log(auth.user)

    router.push('/')
  } catch (e) {
    console.log('LOGIN FAILED', e)
  }
}
</script>
