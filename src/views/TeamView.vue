<template>
  <div class="teams-page">
    <div class="page-header">
      <h1>{{ $t('teams.title') }}</h1>
      <p>{{ $t('teams.description') }}</p>
    </div>

    <div class="teams-grid">
      <div class="team-card" v-for="team in teams" :key="team.id">
        <h2>{{ team.name }}</h2>

        <p>
          <strong>{{ $t('teams.leader') }}:</strong>
          {{ team.leader }}
        </p>

        <p>
          <strong>{{ $t('teams.members') }}:</strong>
          {{ team.members }}
        </p>

        <p>
          <strong>{{ $t('teams.project') }}:</strong>
          {{ team.project }}
        </p>

        <p>
          <strong>{{ $t('teams.status') }}:</strong>
          {{ team.status }}
        </p>

        <router-link :to="`/teams/${team.id}`" class="view-btn">
          {{ $t('teams.viewDetails') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TeamView",
  data() {
    return {
teams: [
  {
    id: 1,
    name: "CodeCrafters",
    leader: "Anna Smith",
    members: 4,
    project: "Smart Task Manager",
    status: this.$t('teams.statuses.active')
  },
  {
    id: 2,
    name: "TechNova",
    leader: "John Miller",
    members: 3,
    project: "AI Project Matcher",
    status: this.$t('teams.statuses.pending')
  },
  {
    id: 3,
    name: "NextGen Devs",
    leader: "Emma Brown",
    members: 5,
    project: "Student Collaboration Platform",
    status: this.$t('teams.statuses.approved')
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

.view-btn {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border-radius: 8px;
  text-decoration: none;
}

.view-btn:hover {
  background-color: #369f6e;
}
</style>
