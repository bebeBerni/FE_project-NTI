<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import api from '@/api/axios'

const { t } = useI18n()

interface Project {
  id: number
  title: string
  description: string
  status: string
  created_at?: string
}

const projects = ref<Project[]>([])
const loading = ref(false)
const search = ref('')
const total = ref(0)
const editingProject = ref<Project | null>(null)

async function loadProjects() {
  loading.value = true

  try {
    const response = await api.get('/admin/projects', {
      params: {
        search: search.value,
      },
    })

    console.log('PROJECTS API:', response.data)

    projects.value = response.data.projects ?? []
    total.value = projects.value.length
  } catch (error) {
    console.error('Failed to load projects:', error)
  } finally {
    loading.value = false
  }
}

watch(search, () => {
  loadProjects()
})

onMounted(() => {
  loadProjects()
})

function editProject(project: Project) {
  editingProject.value = { ...project }
}

async function saveProject() {
  if (!editingProject.value) return

  try {
    await api.put(`/admin/projects/${editingProject.value.id}`, {
      title: editingProject.value.title,
      description: editingProject.value.description,
      status: editingProject.value.status,
    })

    await loadProjects()
    editingProject.value = null
    alert('Project updated successfully')
  } catch (error) {
    console.error(error)
  }
}

async function deleteProject(id: number) {
  if (!confirm(t('dashboard.messages.sureDelete'))) return

  try {
    await api.delete(`/admin/projects/${id}`)
    await loadProjects()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="users-page">
    <div class="users-card">

      <div class="users-header">
        <div>
          <h1 class="users-title">All Projects</h1>
          <p class="users-subtitle">Manage all projects</p>
          <p>Total: {{ total }}</p>
        </div>

        <input
          v-model="search"
          type="text"
          placeholder="Search by title, description or status..."
          class="search-input"
        >
      </div>

      <div class="table-wrapper">
        <table class="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ project.title }}</td>
              <td>{{ project.description }}</td>

              <td>
                <span class="badge badge-success">
                  {{ project.status }}
                </span>
              </td>

              <td>{{ project.created_at }}</td>

              <td>
                <button class="edit-btn" @click="editProject(project)">
                  Edit
                </button>

                <button class="delete-btn" @click="deleteProject(project.id)">
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="!loading && projects.length === 0">
              <td colspan="6" class="empty-state">
                No projects found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <div
    v-if="editingProject"
    class="modal-overlay"
    @click.self="editingProject = null"
  >
    <div class="modal">
      <h2>Edit Project</h2>

      <label>Title</label>
      <input v-model="editingProject.title" placeholder="Title" />

      <label>Description</label>
      <textarea v-model="editingProject.description" placeholder="Description"></textarea>

      <label>Status</label>
      <select v-model="editingProject.status">
        <option value="open">Open</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="declined">Declined</option>
        <option value="closed">Closed</option>
      </select>

      <div class="modal-actions">
        <button class="edit-btn" @click="saveProject">Save</button>
        <button class="delete-btn" @click="editingProject = null">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-page {
  padding: 24px;
}

.users-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.users-title {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.users-subtitle {
  margin-top: 4px;
  color: #6b7280;
}

.search-input {
  width: 320px;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
}

.search-input:focus {
  border-color: #2563eb;
}

.table-wrapper {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  background: #f9fafb;
  text-align: left;
  padding: 14px 16px;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.users-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.users-table tbody tr:hover {
  background: #f9fafb;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge-success {
  background: #dcfce7;
  color: #15803d;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 40px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 420px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal input,
.modal textarea,
.modal select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.modal textarea {
  min-height: 90px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.delete-btn {
  border: none;
  background: #dc3545;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 6px;
}

.delete-btn:hover {
  background: #bb2d3b;
}

.edit-btn {
  border: none;
  background: #2563eb;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.edit-btn:hover {
  background: #1d4ed8;
}
</style>