<!-- eslint-disable vue/block-lang -->
<template>
  <div class="commission-dashboard">
    <h1>Commission Dashboard</h1>

    <p v-if="loading">Loading projects...</p>

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <div
      v-for="project in projects"
      :key="project.id"
      class="project-card"
    >
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>

      <h3>Applied students</h3>

      <p v-if="!project.applications || project.applications.length === 0">
        No students applied for this project.
      </p>

      <table v-else>
        <thead>
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Status</th>
            <th>CV</th>
            <th>Save</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="application in project.applications"
            :key="application.id"
          >
            <td>
              {{ application.student?.user?.first_name }}
              {{ application.student?.user?.last_name }}
            </td>

            <td>
              {{ application.student?.user?.email }}
            </td>

            <td>
              <select v-model="application.status">
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
              </select>
            </td>

            <td>
              <a
                v-if="getCv(application)"
                :href="getCvUrl(getCv(application))"
                target="_blank"
              >
                View CV
              </a>

              <span v-else>No CV uploaded</span>
            </td>

            <td>
              <button @click="updateStatus(application)">
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios'

export default {
  name: 'CommissionDashboard',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      projects: [],
      loading: true,
      error: '',
    }
  },

  async mounted() {
    await this.fetchProjects()
  },

  methods: {
    async fetchProjects() {
      try {
        this.loading = true

        const response = await api.get('/commission/projects')

        this.projects = response.data.projects || response.data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to load projects.'
      } finally {
        this.loading = false
      }
    },

    getCv(application) {
      if (!application.documents) {
        return null
      }

      return application.documents.find(document => document.type === 'cv')
    },

    getCvUrl(document) {
      if (!document.file_path) {
        return '#'
      }

      return `${import.meta.env.VITE_API_URL}/storage/${document.file_path}`
    },

    async updateStatus(application) {
      try {
        await api.patch(`/commission/applications/${application.id}/status`, {
          status: application.status,
        })

        alert('Status updated successfully.')
      } catch (error) {
        console.error(error)
        alert('Failed to update status.')
      }
    },
  },
}
</script>

<style scoped>
.commission-dashboard {
  padding: 24px;
}

.project-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background: #f5f5f5;
}

select {
  padding: 6px;
}

button {
  padding: 7px 12px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>