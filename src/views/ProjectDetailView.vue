<template>
  <div class="project-detail-page" v-if="project">
    <div class="project-detail-card">
      <h1>{{ project.title }}</h1>

      <p><strong>Type:</strong> {{ project.type || '—' }}</p>

      <p>
        <strong>Company:</strong>
        {{ project.company?.company_name || '—' }}
      </p>

      <p>
        <strong>ICO:</strong>
        {{ project.company?.ico || '—' }}
      </p>

      <p>
        <strong>Company website:</strong>
        <a
          v-if="project.company?.website"
          :href="project.company.website"
          target="_blank"
        >
          {{ project.company.website }}
        </a>
        <span v-else>—</span>
      </p>

      <p>
        <strong>Company address:</strong>
        {{ project.company?.address || '—' }}
      </p>

      <p><strong>Budget:</strong> €{{ project.budget || '0' }}</p>
      <p><strong>Status:</strong> {{ project.status || '—' }}</p>
      <p><strong>Description:</strong> {{ project.description || '—' }}</p>

      <router-link to="/projects" class="back-btn">
        Back to Projects
      </router-link>
    </div>
  </div>

  <div v-else-if="loading" class="not-found">
    <h1>Loading project...</h1>
  </div>

  <div v-else class="not-found">
    <h1>Project not found</h1>
    <router-link to="/projects" class="back-btn">
      Back to Projects
    </router-link>
  </div>
</template>

<script lang="ts">
import axios from "axios"

type Company = {
  id: number
  company_name: string
  ico: string
  description: string
  website: string
  address: string
  created_at: string
  updated_at: string
}

type Project = {
  id: number
  title: string
  type: string
  company: Company | null
  budget: string | number
  status: string
  description: string
}

export default {
  name: "ProjectDetailView",

  data() {
    return {
      project: null as Project | null,
      loading: true
    }
  },

  mounted() {
    this.getProject()
  },

  methods: {
    async getProject() {
      try {
        const projectId = this.$route.params.id
        const token = localStorage.getItem("token")

        const response = await axios.get(
          `http://127.0.0.1:8000/api/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        )

        this.project = response.data.project || response.data
      } catch (error) {
        console.error("Error loading project:", error)
        this.project = null
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.project-detail-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
}

.project-detail-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.project-detail-card h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.project-detail-card p {
  margin: 12px 0;
  font-size: 16px;
  color: #444;
}

.project-detail-card a {
  color: #42b983;
  word-break: break-all;
}

.back-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 20px;
  background: #2c3e50;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.3s;
}

.back-btn:hover {
  background: #1a252f;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found h1 {
  margin-bottom: 20px;
}
</style>