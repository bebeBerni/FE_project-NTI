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

    <p class="auth-switch">
      <router-link to="/forgot-password">
        Forgot password?
      </router-link>
    </p>
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

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 60px auto;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}

.auth-switch {
  margin-top: 20px;
  color: #555;
}

.auth-switch a {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
}

.auth-switch a:hover {
  text-decoration: underline;
}
</style>