<template>
  <div class="reset-page">
    <form @submit.prevent="resetPassword" class="reset-card">
      <h2>Reset password</h2>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        readonly
      />

      <input
        v-model="password"
        type="password"
        placeholder="New password"
        required
      />

      <input
        v-model="password_confirmation"
        type="password"
        placeholder="Confirm password"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Changing password...' : 'Reset password' }}
      </button>

      <p v-if="success" class="success">{{ success }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ResetPassword',

  data() {
    return {
      email: '',
      token: '',
      password: '',
      password_confirmation: '',
      loading: false,
      success: '',
      error: ''
    }
  },

  mounted() {
    this.token = this.$route.params.token
    this.email = this.$route.query.email
  },

  methods: {
    async resetPassword() {
      this.loading = true
      this.success = ''
      this.error = ''

      try {
        await axios.post('http://localhost:8000/api/reset-password', {
          token: this.token,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })

        this.success = 'Password was changed successfully.'

        setTimeout(() => {
          this.$router.push('/login')
        }, 1500)

      } catch (err) {
        this.error =
          err.response?.data?.message ||
          'Password reset failed.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.reset-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f6fa;
}

.reset-card {
  width: 400px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>