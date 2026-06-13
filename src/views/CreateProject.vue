<template>
  <div class="create-project-page">
    <h1>Create Project</h1>

    <form class="project-form" @submit.prevent="createProject">
      <div class="form-group">
        <label>Project title</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Enter project title"
          required
        />
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea
          v-model="form.description"
          placeholder="Enter project description"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label>Type</label>
        <select v-model="form.type" required>
          <option value="research">Research</option>
          <option value="client">Client</option>
          <option value="internal">Internal</option>
        </select>
      </div>

      <div class="form-group">
        <label>Budget</label>
        <input
          v-model="form.budget"
          type="number"
          step="0.01"
          min="0"
          placeholder="Enter budget"
          required
        />
      </div>

      <div class="form-group">
        <label>Deadline</label>
        <input v-model="form.deadline" type="date" />
      </div>

      <div class="form-group">
        <label>Status</label>
        <select v-model="form.status" required>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
        </select>
      </div>

      <div class="form-group">
  <label>Motivation</label>
  <textarea
    v-model="form.motivation"
    placeholder="Explain why you want to create this project"
    required
  ></textarea>
</div>

<div class="form-group">
  <label>Note</label>
  <textarea
    v-model="form.note"
    placeholder="Additional information (optional)"
  ></textarea>
</div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Project' }}
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
  title: '',
  description: '',
  type: 'research',
  budget: '',
  deadline: '',
  status: 'pending',
  motivation: '',
  note: '',
})

const createProject = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await api.post('/student/projects', {
      title: form.title,
      description: form.description,
      type: form.type,
      budget: form.budget,
      deadline: form.deadline || null,
      status: form.status,
      motivation: form.motivation,
      note: form.note,
    })

    successMessage.value =
      response.data.message || 'Project created successfully.'

    const projectApplicationId = response.data.project_application_id

    if (!projectApplicationId) {
      errorMessage.value =
        'Project was created, but project application ID was not returned.'
      return
    }

    setTimeout(() => {
      router.push(
        `/student/project-applications/${projectApplicationId}/upload-cv`
      )
    }, 800)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      errorMessage.value =
        error.response?.data?.message || 'Failed to create project.'
    } else {
      errorMessage.value = 'Unexpected error occurred.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-project-page {
  max-width: 500px;
  margin: 60px auto;
}

.project-form {
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
select,
textarea {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

textarea {
  min-height: 120px;
  resize: vertical;
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