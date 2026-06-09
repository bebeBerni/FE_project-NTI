<template>
  <div class="container">
    <h1>Company Dashboard</h1>

    <div class="stats">
      <div class="card">
        <h3>Company Projects</h3>
        <p>{{ projects.length }}</p>
      </div>

      <div class="card">
        <h3>Pending Projects</h3>
        <p>{{ pendingProjects }}</p>
      </div>

      <div class="card">
        <h3>Approved Projects</h3>
        <p>{{ approvedProjects }}</p>
      </div>
    </div>

    <div class="actions">
      <button class="btn btn-primary" @click="openCreateForm">
        + Create Project
      </button>
    </div>

    <form v-if="showForm" class="project-form" @submit.prevent="saveProject">
      <h2>{{ editingProjectId ? 'Edit Project' : 'Create Project' }}</h2>

      <input v-model="form.title" type="text" placeholder="Project title" required />

      <textarea
        v-model="form.description"
        placeholder="Project description"
        required
      ></textarea>

      <select v-model="form.type" required>
        <option value="">Select project type</option>
        <option value="Software Development">Software Development</option>
        <option value="Research">Research</option>
        <option value="Design">Design</option>
      </select>

      <input
        v-model.number="form.budget"
        type="number"
        placeholder="Budget"
        min="0"
      />

      <select v-model="form.status" required>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <input v-model="form.deadline" type="date" />

      <div class="form-actions">
        <button class="btn btn-primary" type="submit">
          {{ editingProjectId ? 'Update Project' : 'Create Project' }}
        </button>

        <button class="btn btn-secondary" type="button" @click="cancelForm">
          Cancel
        </button>
      </div>
    </form>

    <p v-if="loading">Loading projects...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div class="projects">
      <h2>Company Projects</h2>

      <div v-if="projects.length === 0 && !loading" class="empty">
        No projects yet.
      </div>

      <div
        v-for="project in projects"
        :key="project.id"
        class="project-card"
      >
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>

          <p><strong>Type:</strong> {{ project.type }}</p>
          <p><strong>Budget:</strong> {{ project.budget || 'Not specified' }}</p>
          <p><strong>Status:</strong> {{ project.status }}</p>
          <p><strong>Deadline:</strong> {{ formatDate(project.deadline) }}</p>
        </div>

        <div class="project-actions">
          <button class="btn btn-edit" @click="editProject(project)">
            Edit
          </button>

          <button class="btn btn-delete" @click="deleteProject(project.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from '@/api/axios'

type Project = {
  id: number
  title: string
  description: string
  type: string
  budget: number | null
  status: 'pending' | 'approved' | 'rejected'
  deadline: string | null
}

export default {
  name: 'CompanyDashboard',

  data() {
    return {
      projects: [] as Project[],
      loading: false,
      error: '',
      showForm: false,
      editingProjectId: null as number | null,

      form: {
        title: '',
        description: '',
        type: '',
        budget: null as number | null,
        status: 'pending',
        deadline: '',
      },
    }
  },

  computed: {
    pendingProjects(): number {
      return this.projects.filter(project => project.status === 'pending').length
    },

    approvedProjects(): number {
      return this.projects.filter(project => project.status === 'approved').length
    },
  },

  mounted() {
    this.fetchProjects()
  },

  methods: {
    async fetchProjects() {
      this.loading = true
      this.error = ''

      try {
        const response = await api.get('/company/projects')
        this.projects = response.data.projects || response.data
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          'Failed to load company projects.'
      } finally {
        this.loading = false
      }
    },

    openCreateForm() {
      this.showForm = true
      this.editingProjectId = null
      this.resetForm()
    },

    editProject(project: Project) {
      this.showForm = true
      this.editingProjectId = project.id

      this.form = {
        title: project.title,
        description: project.description,
        type: project.type,
        budget: project.budget,
        status: project.status,
        deadline: project.deadline ? project.deadline.substring(0, 10) : '',
      }
    },

    async saveProject() {
      this.error = ''

      try {
        const payload = {
          title: this.form.title,
          description: this.form.description,
          type: this.form.type,
          budget: this.form.budget,
          status: this.form.status,
          deadline: this.form.deadline || null,
        }

        if (this.editingProjectId) {
          await api.put(`/company/projects/${this.editingProjectId}`, payload)
        } else {
          await api.post('/company/projects', payload)
        }

        await this.fetchProjects()
        this.cancelForm()
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          'Failed to save project.'
      }
    },

    async deleteProject(projectId: number) {
      if (!confirm('Are you sure you want to delete this project?')) return

      try {
        await api.delete(`/company/projects/${projectId}`)
        await this.fetchProjects()
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          'Failed to delete project.'
      }
    },

    cancelForm() {
      this.showForm = false
      this.editingProjectId = null
      this.resetForm()
    },

    resetForm() {
      this.form = {
        title: '',
        description: '',
        type: '',
        budget: null,
        status: 'pending',
        deadline: '',
      }
    },

    formatDate(date: string | null) {
      if (!date) return 'Not specified'
      return date.substring(0, 10)
    },
  },
}
</script>

<style scoped>
.container {
  padding: 35px 45px;
}

.stats {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.card {
  flex: 1;
  padding: 22px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fff;
}

.card h3 {
  margin-bottom: 18px;
}

.card p {
  font-size: 22px;
  margin: 0;
}

.actions {
  margin-bottom: 22px;
}

.btn {
  width: auto;
  min-width: auto;
  height: auto;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.2;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-secondary {
  background-color: #777;
  color: white;
}

.btn-edit {
  background: white;
  color: #22a66a;
  border-color: #22a66a;
}

.btn-delete {
  background: white;
  color: #dc3545;
  border-color: #dc3545;
}

.btn-edit:hover {
  background: #22a66a;
  color: white;
}

.btn-delete:hover {
  background: #dc3545;
  color: white;
}

.project-form {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-form input,
.project-form textarea,
.project-form select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.project-form textarea {
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.projects {
  margin-top: 20px;
}

.project-card {
  margin-bottom: 15px;
  padding: 22px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  background: #fff;
}

.project-info {
  flex: 1;
}

.project-actions {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.empty {
  color: #777;
}

.error {
  color: red;
}
</style>