<template>
  <div class="project-detail-page" v-if="project">
    <div class="project-detail-card">
      <h1>{{ project.title }}</h1>

      <p><strong>Type:</strong> {{ project.type }}</p>
      <p><strong>Company:</strong> {{ project.company }}</p>
      <p><strong>Budget:</strong> {{ project.budget }}</p>
      <p><strong>Status:</strong> {{ project.status }}</p>
      <p><strong>Description:</strong> {{ project.description }}</p>

      <router-link to="/projects" class="back-btn">Back to Projects</router-link>
    </div>
  </div>

  <div v-else class="not-found">
    <h1>Project not found</h1>
    <router-link to="/projects" class="back-btn">Back to Projects</router-link>
  </div>
</template>

<script>
export default {
  name: "ProjectDetailView",
  data() {
    return {
      projects: [
        {
          id: 1,
          title: "AI Task Manager",
          type: "Company Project",
          company: "TechCorp",
          budget: "€2000",
          status: "Open",
          description: "A smart system for managing tasks using artificial intelligence."
        },
        {
          id: 2,
          title: "Student Collaboration Platform",
          type: "Student Idea",
          company: "—",
          budget: "€0",
          status: "In Progress",
          description: "A platform where students can collaborate on projects, share files, and communicate."
        },
        {
          id: 3,
          title: "E-commerce Recommendation System",
          type: "Company Project",
          company: "ShopSmart",
          budget: "€3500",
          status: "Open",
          description: "A recommendation engine for online stores based on customer behavior."
        }
      ],
      project: null
    }
  },
  created() {
    const projectId = Number(this.$route.params.id)
    this.project = this.projects.find(project => project.id === projectId) || null
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

.back-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 16px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

.back-btn:hover {
  background-color: #369f6e;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found h1 {
  margin-bottom: 20px;
}
</style>