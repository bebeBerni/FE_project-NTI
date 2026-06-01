<template>
  <div class="container">
    <h1>Mentor Dashboard</h1>

    <div class="card">
      <h3>Assigned Students</h3>
      <p>{{ assignedStudents }}</p>
    </div>

    <div class="card">
      <h3>Active Projects</h3>
      <p>{{ activeProjects }}</p>
    </div>

    <div class="card">
      <h3>Pending Reviews</h3>
      <p>{{ pendingReviews }}</p>
    </div>

    <div class="actions">
      <button>View Students</button>
      <button>Review Applications</button>
      <button>Manage Projects</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MentorDashboard",

  data() {
    return {
      assignedStudents: 12,
      activeProjects: 5,
      pendingReviews: 3,
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