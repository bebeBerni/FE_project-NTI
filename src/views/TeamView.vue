<template>
  <div class="teams-page">
    <div class="page-header">
      <h1>{{ $t('teams.title') }}</h1>
      <p>{{ $t('teams.description') }}</p>
    </div>

    <p v-if="loading" class="message">
      Loading teams...
    </p>

    <p v-else-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>

    <p v-else-if="teams.length === 0" class="message">
      No teams found.
    </p>

    <div v-else class="teams-grid">
      <div class="team-card" v-for="team in teams" :key="team.id">
        <h2>{{ team.name }}</h2>

        <p>
          <strong>{{ $t('teams.leader') }}:</strong>
          {{ getLeaderName(team) }}
        </p>

        <p>
          <strong>{{ $t('teams.members') }}:</strong>
          {{ team.students?.length || 0 }}
        </p>

        <p>
          <strong>Mentors:</strong>
          {{ team.mentors?.length || 0 }}
        </p>

        <p>
          <strong>{{ $t('teams.project') }}:</strong>
          {{ getProjectTitles(team) }}
        </p>

        <p>
          <strong>{{ $t('teams.status') }}:</strong>
          {{ team.status || '—' }}
        </p>

        <router-link :to="`/teams/${team.id}`" class="view-btn">
          {{ $t('teams.viewDetails') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios"

export default {
  name: "TeamsView",

  data() {
    return {
      teams: [] as any[],
      loading: true,
      errorMessage: ""
    }
  },

  mounted() {
    this.getTeams()
  },

  methods: {
    async getTeams() {
      try {
        this.loading = true
        this.errorMessage = ""

        const token = localStorage.getItem("token")

        const response = await axios.get(
          "http://127.0.0.1:8000/api/teams",
          {
            headers: {
              Accept: "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
          }
        )

        if (Array.isArray(response.data)) {
          this.teams = response.data
        } else if (Array.isArray(response.data.teams)) {
          this.teams = response.data.teams
        } else if (Array.isArray(response.data.data)) {
          this.teams = response.data.data
        } else {
          this.teams = []
          this.errorMessage = "Teams response has unexpected format."
        }
      } catch (error) {
        console.error("Error loading teams:", error)
        this.errorMessage = "Could not load teams from backend."
      } finally {
        this.loading = false
      }
    },

    getLeaderName(team: any) {
      if (!team.leader) return "—"

      if (typeof team.leader === "string") {
        return team.leader
      }

      return (
        `${team.leader.first_name || ""} ${team.leader.last_name || ""}`.trim() ||
        team.leader.email ||
        "—"
      )
    },

    getProjectTitles(team: any) {
      if (team.projects?.length) {
        return team.projects
          .map((project: any) => project.title)
          .filter(Boolean)
          .join(", ")
      }

      return "—"
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
  line-height: 1.5;
}

.view-btn {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #2563eb;
  color: white !important;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}

.view-btn:visited {
  color: white !important;
}

.view-btn:hover {
  background-color: #1d4ed8;
}

.message {
  text-align: center;
  margin-top: 30px;
  color: #666;
  font-size: 18px;
}

.error {
  text-align: center;
  margin-top: 30px;
  color: #dc2626;
  font-size: 18px;
}
</style>