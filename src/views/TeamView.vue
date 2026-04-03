<template>
  <div class="teams-page">
    <div class="page-header">
      <h1>Teams</h1>
      <p>Browse student teams participating in projects.</p>
    </div>

    <div class="teams-grid">
      <div class="team-card" v-for="team in teams" :key="team.id">
        <h2>{{ team.name }}</h2>
        <p><strong>Leader:</strong> {{ team.leader }}</p>
        <p><strong>Members:</strong> {{ team.members }}</p>
        <p><strong>Project:</strong> {{ team.project }}</p>
        <p><strong>Status:</strong> {{ team.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamsView",
  data() {
    return {
      teams: [
        {
          id: 1,
          name: "CodeCrafters",
          leader: "Anna Smith",
          members: 4,
          project: "Smart Task Manager",
          status: "Active"
        },
        {
          id: 2,
          name: "TechNova",
          leader: "John Miller",
          members: 3,
          project: "AI Project Matcher",
          status: "Pending"
        },
        {
          id: 3,
          name: "NextGen Devs",
          leader: "Emma Brown",
          members: 5,
          project: "Student Collaboration Platform",
          status: "Approved"
        }
      ]
    }
  }
}
</script>

<style scoped>
.teams-page {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  margin-bottom: 10px;
  font-size: 36px;
  color: #2c3e50;
}

.page-header p {
  font-size: 18px;
  color: #666;
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.team-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.team-card h2 {
  margin-bottom: 15px;
  font-size: 22px;
  color: #2c3e50;
}

.team-card p {
  margin: 8px 0;
  color: #444;
}
</style>