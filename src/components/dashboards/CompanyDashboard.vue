<template>
  <div class="container">
    <h1>Company Dashboard</h1>

    <div class="card">
      <h3>Published Projects</h3>
      <p>{{ publishedProjects }}</p>
    </div>

    <div class="card">
      <h3>Applications Received</h3>
      <p>{{ applications }}</p>
    </div>

    <div class="card">
      <h3>Accepted Students</h3>
      <p>{{ acceptedStudents }}</p>
    </div>

    <div class="actions">
      <button>Create Project</button>
      <button>Manage Projects</button>
      <button>View Applications</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyDashboard",

  data() {
    return {
      publishedProjects: 8,
      applications: 24,
      acceptedStudents: 6,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.card {
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
}
.actions {
  display: flex;
  gap: 10px;
}
</style>