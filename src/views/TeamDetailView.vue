<template>
  <div class="team-detail-page" v-if="team">
    <div class="team-detail-card">
      <h1>{{ team.name }}</h1>

      <p><strong>Leader:</strong> {{ team.leader }}</p>
      <p><strong>Members:</strong> {{ team.members }}</p>
      <p><strong>Project:</strong> {{ team.project }}</p>
      <p><strong>Status:</strong> {{ team.status }}</p>
      <p><strong>Description:</strong> {{ team.description }}</p>

      <router-link to="/teams" class="back-btn">Back to Teams</router-link>
    </div>
  </div>

  <div v-else class="not-found">
    <h1>Team not found</h1>
    <router-link to="/teams" class="back-btn">Back to Teams</router-link>
  </div>
</template>

<script>
export default {
  name: "TeamDetailView",
  data() {
    return {
      teams: [
        {
          id: 1,
          name: "CodeCrafters",
          leader: "Anna Smith",
          members: 4,
          project: "Smart Task Manager",
          status: "Active",
          description: "A team focused on building smart productivity solutions for students and companies."
        },
        {
          id: 2,
          name: "TechNova",
          leader: "John Miller",
          members: 3,
          project: "AI Project Matcher",
          status: "Pending",
          description: "A development team working on matching students and companies through intelligent project selection."
        },
        {
          id: 3,
          name: "NextGen Devs",
          leader: "Emma Brown",
          members: 5,
          project: "Student Collaboration Platform",
          status: "Approved",
          description: "A team creating a platform for communication, file sharing, and project collaboration."
        }
      ],
      team: null
    }
  },
  created() {
    const teamId = Number(this.$route.params.id)
    this.team = this.teams.find(team => team.id === teamId) || null
  }
}
</script>

<style scoped>
.team-detail-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
}

.team-detail-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.team-detail-card h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.team-detail-card p {
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