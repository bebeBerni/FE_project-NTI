<template>
  <div class="team-detail-page" v-if="team">
    <div class="team-detail-card">
      <h1>{{ team.name }}</h1>

      <p>
        <strong>Leader:</strong>
        {{ getLeaderName(team) }}
      </p>

      <p>
        <strong>Members:</strong>
        {{ team.students?.length || 0 }}
      </p>

      <p>
        <strong>Projects:</strong>
        {{ team.projects?.length || 0 }}
      </p>

      <p>
        <strong>Status:</strong>
        {{ team.status || '—' }}
      </p>

      <!-- PROJECTS -->
      <div v-if="team.projects?.length" class="section-block">
        <h2>Team Projects</h2>

        <div
          v-for="project in team.projects"
          :key="project.id"
          class="item-card"
        >
          <h3>{{ project.title }}</h3>

          <p>
            <strong>Type:</strong>
            {{ project.type || '—' }}
          </p>

          <p>
            <strong>Status:</strong>
            {{ project.status || '—' }}
          </p>

          <p>
            <strong>Budget:</strong>
            €{{ project.budget || '0' }}
          </p>

          <p>
            <strong>Deadline:</strong>
            {{ formatDate(project.deadline) }}
          </p>

          <p>
            <strong>Description:</strong>
            {{ project.description || '—' }}
          </p>
        </div>
      </div>

      <!-- STUDENTS -->
      <div v-if="team.students?.length" class="section-block">
        <h2>Team Members</h2>

        <div
          v-for="student in team.students"
          :key="student.id"
          class="item-card"
        >
          <p>
            <strong>Student:</strong>
            {{ getStudentName(student) }}
          </p>

          <p>
            <strong>Faculty:</strong>
            {{ student.faculty || '—' }}
          </p>

          <p>
            <strong>Department:</strong>
            {{ student.department || '—' }}
          </p>

          <p>
            <strong>Study program:</strong>
            {{ student.study_program || '—' }}
          </p>

          <p>
            <strong>Year:</strong>
            {{ student.year_of_study || '—' }}
          </p>

          <p>
            <strong>Role:</strong>
            {{ student.pivot?.member_role || '—' }}
          </p>

          <p>
            <strong>UKF verified:</strong>
            {{ student.is_ukf_verified ? 'Yes' : 'No' }}
          </p>
        </div>
      </div>

      <!-- MENTORS -->
      <div v-if="team.mentors?.length" class="section-block">
        <h2>Team Mentors</h2>

        <div
          v-for="mentor in team.mentors"
          :key="mentor.id"
          class="item-card"
        >
          <p>
            <strong>Mentor:</strong>
            Mentor #{{ mentor.id }}
          </p>

          <p>
            <strong>Specialization:</strong>
            {{ mentor.specialization || '—' }}
          </p>

          <p>
            <strong>Bio:</strong>
            {{ mentor.bio || '—' }}
          </p>

          <p>
            <strong>Active:</strong>
            {{ mentor.pivot?.active ? 'Yes' : 'No' }}
          </p>

          <p>
            <strong>Assigned at:</strong>
            {{ formatDate(mentor.pivot?.assigned_at) }}
          </p>
        </div>
      </div>

      <router-link to="/teams" class="back-btn">
        Back to Teams
      </router-link>
    </div>
  </div>

  <div v-else-if="loading" class="not-found">
    <h1>Loading team...</h1>
  </div>

  <div v-else class="not-found">
    <h1>Team not found</h1>

    <router-link to="/teams" class="back-btn">
      Back to Teams
    </router-link>
  </div>
</template>

<script lang="ts">
import axios from "axios"

export default {
  name: "TeamDetailView",

  data() {
    return {
      team: null as any,
      loading: true
    }
  },

  mounted() {
    this.getTeam()
  },

  methods: {
    async getTeam() {
      try {
        const teamId = this.$route.params.id
        const token = localStorage.getItem("token")

        const response = await axios.get(
          `http://127.0.0.1:8000/api/teams/${teamId}`,
          {
            headers: {
              Accept: "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
          }
        )

        this.team = response.data.team || response.data
      } catch (error) {
        console.error(error)
        this.team = null
      } finally {
        this.loading = false
      }
    },

    getLeaderName(team: any) {
      if (!team.leader) return "—"

      return (
        `${team.leader.first_name || ""} ${team.leader.last_name || ""}`.trim() ||
        team.leader.email ||
        "—"
      )
    },

    getStudentName(student: any) {
      if (student.user) {
        return (
          `${student.user.first_name || ""} ${student.user.last_name || ""}`.trim() ||
          student.user.email ||
          `User ID: ${student.user_id}`
        )
      }

      return `Student ID: ${student.id} / User ID: ${student.user_id}`
    },

    formatDate(date: string) {
      if (!date) return "—"

      return new Date(date).toLocaleDateString("sk-SK", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })
    }
  }
}
</script>

<style scoped>
.team-detail-page {
  max-width: 950px;
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

.team-detail-card h2 {
  margin-top: 30px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.team-detail-card h3 {
  margin-bottom: 12px;
  color: #2c3e50;
}

.team-detail-card p {
  margin: 10px 0;
  font-size: 16px;
  color: #444;
  line-height: 1.5;
}

.section-block {
  margin-top: 25px;
}

.item-card {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 14px;
}

.back-btn {
  display: inline-block;
  margin-top: 25px;
  padding: 12px 20px;
  background-color: #2563eb;
  color: #ffffff !important;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}

.back-btn:visited {
  color: #ffffff !important;
}

.back-btn:hover {
  background-color: #1d4ed8;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found h1 {
  margin-bottom: 20px;
}
</style>