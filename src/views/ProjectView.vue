<template>
  <div class="projects-page">
    <div class="page-header">
      <h1>{{ $t('projects.title') }}</h1>
      <p>{{ $t('projects.description') }}</p>
    </div>

    <div class="projects-grid">
      <div class="project-card" v-for="project in projects" :key="project.id">
        <h2>{{ project.title }}</h2>

        <p>
        <strong>{{ $t('projects.type') }}:</strong>
          {{ project.type }}
        </p>

        <p>
        <strong>{{ $t('projects.company') }}:</strong>
          {{ project.company?.company_name || '—' }}
        </p>

        <p>
        <strong>{{ $t('projects.budget') }}:</strong>
          €{{ project.budget }}
        </p>

        <p>
        <strong>{{ $t('projects.status') }}:</strong>
          {{ project.status }}
        </p>
        
        <router-link :to="`/projects/${project.id}`" class="view-btn">
          {{ $t('projects.viewDetails') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios"

export default {
  name: "ProjectsView",

  data() {
    return {
      projects: [] as any[]
    }
  },

  mounted() {
    this.getProjects()
  },

  methods: {
    async getProjects() {
      try {
        const token = localStorage.getItem("token")

        const response = await axios.get("http://127.0.0.1:8000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        })

        this.projects = response.data.projects || response.data
      } catch (error) {
        console.error("Error loading projects:", error)
      }
    }
  }
}
</script>

<style scoped>
.projects-page {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.page-header p {
  font-size: 18px;
  color: #666;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.project-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.project-card h2 {
  margin-bottom: 15px;
  font-size: 22px;
  color: #2c3e50;
}

.project-card p {
  margin: 8px 0;
  color: #444;
}

.view-btn {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
}

.view-btn:hover {
  background-color: #369f6e;
}
</style>