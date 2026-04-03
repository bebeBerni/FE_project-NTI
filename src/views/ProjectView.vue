<template>
  <div class="projects-page">
    <div class="page-header">
      <h1>Projects</h1>
      <p>Explore available projects from companies and student teams.</p>
    </div>

    <div class="projects-grid">
      <div class="project-card" v-for="project in projects" :key="project.id">
        <h2>{{ project.title }}</h2>
        <p><strong>Type:</strong> {{ project.type }}</p>
        <p><strong>Company:</strong> {{ project.company }}</p>
        <p><strong>Budget:</strong> {{ project.budget }}</p>
        <p><strong>Status:</strong> {{ project.status }}</p>

        <router-link :to="`/projects/${project.id}`" class="view-btn">
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectsView",
  data() {
    return {
      projects: [
        {
          id: 1,
          title: "AI Task Manager",
          type: "Company Project",
          company: "TechCorp",
          budget: "€2000",
          status: "Open"
        },
        {
          id: 2,
          title: "Student Collaboration Platform",
          type: "Student Idea",
          company: "—",
          budget: "€0",
          status: "In Progress"
        },
        {
          id: 3,
          title: "E-commerce Recommendation System",
          type: "Company Project",
          company: "ShopSmart",
          budget: "€3500",
          status: "Open"
        }
      ]
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