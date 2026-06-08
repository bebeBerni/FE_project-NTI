<template>
  <div class="auth-page">
    <h1>Forgot Password</h1>

    <form class="auth-form" @submit.prevent="sendResetLink">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>

      <p v-if="successMessage" class="success">
        {{ successMessage }}
      </p>

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>
    </form>

    <p class="auth-switch">
      <router-link to="/login">
        Back to Login
      </router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api/axios'
import axios from 'axios'

const email = ref('')
const loading = ref(false)

const successMessage = ref('')
const errorMessage = ref('')

const sendResetLink = async () => {
  loading.value = true

  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await api.post('/forgot-password', {
      email: email.value,
    })

    successMessage.value =
      response.data.message ||
      'Password reset link has been sent to your email.'
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      errorMessage.value =
        error.response?.data?.message ||
        'Failed to send reset email.'
    } else {
      errorMessage.value = 'Unexpected error occurred.'
    }
  } finally {
    loading.value = false
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

.success {
  color: #27ae60;
  margin-top: 10px;
}

.error {
  color: #e74c3c;
  margin-top: 10px;
}

.auth-switch {
  margin-top: 20px;
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