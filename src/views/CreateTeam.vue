<template>
  <div class="create-team-page">
    <h1>Create Team</h1>

    <form class="team-form" @submit.prevent="createTeam">
      <div class="form-group">
        <label>Team name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Enter team name"
          required
        />
      </div>

      <div class="form-group">
        <label>Status</label>
        <select v-model="form.status" required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Team' }}
      </button>

      <p v-if="successMessage" class="success">
        {{ successMessage }}
      </p>

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'
import axios from 'axios'

const router = useRouter()

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const form = reactive({
  name: '',
  status: 'active',
})

const createTeam = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await api.post('/student/teams', {
      name: form.name,
      status: form.status,
    })

    successMessage.value =
      response.data.message || 'Team created successfully.'

    setTimeout(() => {
      router.push('/dashboard')
    }, 800)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      errorMessage.value =
        error.response?.data?.message || 'Failed to create team.'
    } else {
      errorMessage.value = 'Unexpected error occurred.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-team-page {
  max-width: 500px;
  margin: 60px auto;
}

.team-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
select {
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
}

.error {
  color: #e74c3c;
}
</style>