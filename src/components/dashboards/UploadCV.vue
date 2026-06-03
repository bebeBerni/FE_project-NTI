<template>
  <div class="upload-cv-page">
    <h1>Upload CV</h1>

    <p>
      To join this project, you must upload your CV first.
    </p>

    <form @submit.prevent="submitCv">
      <div class="form-group">
        <label>CV file</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          @change="handleFileChange"
          required
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Uploading...' : 'Upload CV and Join Project' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import api from '@/api/axios'
import axios from 'axios'

export default {
  name: 'UploadCV',

  data() {
    return {
      cvFile: null as File | null,
      loading: false,
    }
  },

  methods: {
    handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement
      this.cvFile = input.files?.[0] || null
    },

    async submitCv() {
  if (!this.cvFile) {
    alert('Please upload your CV.')
    return
  }

  const projectApplicationId = this.$route.params.projectApplicationId

  const formData = new FormData()
  formData.append('project_application_id', String(projectApplicationId))
  formData.append('type', 'cv')
  formData.append('file', this.cvFile)

  this.loading = true

  try {
    await api.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    alert('CV uploaded successfully.')

    this.$router.push('/student/dashboard')
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(
        error.response?.data?.message ||
        'Failed to upload CV.'
      )
    } else {
      alert('Unexpected error occurred.')
    }
  } finally {
    this.loading = false
  }
  },
  },
}
</script>

<style scoped>
.upload-cv-page {
  padding: 30px;
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
}

button {
  padding: 10px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>