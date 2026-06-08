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
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          @change="handleFileChange"
          required
        />

        <p v-if="cvFile" class="file-name">
          Selected file: {{ cvFile.name }}
        </p>
      </div>

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="success">
        {{ successMessage }}
      </p>

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
      errorMessage: '',
      successMessage: '',
    }
  },

  methods: {
    handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement
      const file = input.files?.[0] || null

      this.errorMessage = ''
      this.successMessage = ''

      if (!file) {
        this.cvFile = null
        return
      }

      const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']
      const extension = file.name.split('.').pop()?.toLowerCase()

      if (!extension || !allowedExtensions.includes(extension)) {
        this.cvFile = null
        input.value = ''
        this.errorMessage = 'Allowed files are PDF, DOC, DOCX, JPG, JPEG and PNG.'
        return
      }

      this.cvFile = file
    },

    async submitCv() {
      if (!this.cvFile) {
        this.errorMessage = 'Please upload your CV.'
        return
      }

      const projectApplicationId = this.$route.params.projectApplicationId

      if (!projectApplicationId) {
        this.errorMessage = 'Project application ID is missing.'
        return
      }

      const formData = new FormData()
      formData.append('project_application_id', String(projectApplicationId))
      formData.append('type', 'cv')
      formData.append('file', this.cvFile)

      this.loading = true
      this.errorMessage = ''
      this.successMessage = ''

      try {
        await api.post('/documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        localStorage.setItem('cv_uploaded', 'yes')

        this.successMessage = 'CV uploaded successfully.'

        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 800)
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          this.errorMessage =
            error.response?.data?.message || 'Failed to upload CV.'
        } else {
          this.errorMessage = 'Unexpected error occurred.'
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

button:hover {
  background: #369f6e;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.file-name {
  margin-top: 10px;
  color: #555;
}

.success {
  color: #27ae60;
  font-weight: 600;
  margin-bottom: 15px;
}

.error {
  color: #e74c3c;
  font-weight: 600;
  margin-bottom: 15px;
}
</style>