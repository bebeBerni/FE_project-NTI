<template>
  <div class="admin-wrapper">

    <div class="admin-header">
      <h1>{{ $t('dashboard.admin_dashboard.title') }}</h1>
      <p>{{ $t('dashboard.admin_dashboard.subtitle') }}</p>
    </div>

    <!-- LINKS SECTION -->
    <div class="admin-cards">

      <div class="admin-card">
        <h2>{{ $t('dashboard.admin_dashboard.users') }}</h2>
        <p>{{ $t('dashboard.admin_dashboard.all_users') }}</p>

        <router-link class="admin-link" to="/all_users">
          {{ $t('all_users') }}
        </router-link>
      </div>

      <div class="admin-card">
        <h2>{{ $t('dashboard.admin_dashboard.mentors') }}</h2>
        <p>{{ $t('dashboard.admin_dashboard.all_mentors') }}</p>

        <router-link class="admin-link" to="/all_mentors">
          {{ $t('all_mentors') }}
        </router-link>
      </div>

      <div class="admin-card">
  <h2>{{ $t('dashboard.admin_dashboard.projects') }}</h2>
  <p>{{ $t('dashboard.admin_dashboard.all_projects') }}</p>

  <router-link class="admin-link" to="/all_projects">
    {{ $t('all_projects') }}
  </router-link>
</div>

<div class="admin-card">
  <h2>{{ $t('dashboard.admin_dashboard.commissions') }}</h2>
  <p>{{ $t('dashboard.admin_dashboard.all_commissions') }}</p>

  <router-link class="admin-link" to="/all_commissions">
    {{ $t('all_commissions') }}
  </router-link>
</div>

    </div>

    <hr class="divider" />

    <!-- TABLE SECTION -->
    <div class="table-section">
      <h2>{{ $t('dashboard.admin_dashboard.assign_mentor') }}</h2>

      <table class="mentor-table">
        <thead>
          <tr>
            <th>{{ $t('dashboard.admin_dashboard.team') }}</th>
            <th>{{ $t('dashboard.admin_dashboard.current_mentors') }}</th>
            <th>{{ $t('dashboard.admin_dashboard.assign_mentor') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="team in teams" :key="team.id">

            <td class="team-name">
              {{ team.name }}
            </td>

            <td>
              <div
                v-for="mentor in team.mentors"
                :key="mentor.id"
                class="mentor-item"
              >
                <span>
                  {{ mentor.user?.first_name }}
                  {{ mentor.user?.last_name }}
                </span>

                <button
                  class="remove-btn"
                  @click="removeMentor(team.id, mentor.id)"
                >
                  {{ $t('dashboard.admin_dashboard.remove') }}
                </button>
              </div>
            </td>

            <td>
              <select
                class="mentor-select"
                @change="onMentorSelect(team.id, $event)"
              >
                <option value="">
                  {{ $t('dashboard.admin_dashboard.select_mentor') }}
                </option>

                <option
                  v-for="mentor in mentors"
                  :key="mentor.id"
                  :value="mentor.id"
                >
                  {{ mentor.first_name }}
                  {{ mentor.last_name }}
                </option>
              </select>
            </td>

          </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>

<script lang="ts">
import api from '@/api/axios'
interface TeamMentor {
  id: number;
  user?: {
    first_name: string;
    last_name: string;
  };
}

interface MentorOption {
  id: number;
  first_name: string;
  last_name: string;
}

interface Team {
  id: number;
  name: string;
  mentors: TeamMentor[];
}


export default {
  name: "AdminDashboard",

  data() {
  return {
    teams: [] as Team[],
    mentors: [] as MentorOption[],
  }
},

  async mounted() {
    await this.loadTeams();
    await this.loadMentors();
  },

  methods: {
    async loadTeams() {
      const response = await api.get('/teams');

    console.log("TEAMS RESPONSE:");
    console.log(response.data);

    this.teams = response.data.teams;
    },
    onMentorSelect(teamId: number, event: Event) {
  const target = event.target as HTMLSelectElement | null;

  if (!target || !target.value) {
    return;
  }

  this.assignMentor(teamId, Number(target.value));
},
async loadMentors() {
  const response = await api.get('/mentors');

    console.log("MENTORS RESPONSE:");
    console.log(response.data);

    this.mentors = response.data.mentors;
},
async removeMentor(teamId: number, mentorId: number) {
    try {
        const response = await api.delete(
  `/teams/${teamId}/mentors/${mentorId}`
);

        console.log(response.data);

        await this.loadTeams();
    } catch (error) {
        console.error(error);
    }
},

async assignMentor(teamId: number, mentorId: number) {
  try {
      await api.post(`/teams/${teamId}/assign-mentor`, {
          mentor_id: mentorId
      });

      await this.loadTeams();
  } catch (error) {
      console.error(error);
  }
},
  }
}
</script>
<style scoped>
.admin-wrapper {
  padding: 32px;
  background: #f6f7fb;
  min-height: 100vh;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

/* HEADER */
.admin-header {
  margin-bottom: 24px;
}

.admin-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.admin-header p {
  margin: 4px 0 0;
  color: #6b7280;
}

/* CARDS */
.admin-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.admin-card {
  background: white;
  padding: 18px;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.05);
}

.admin-card h2 {
  margin: 0 0 6px;
  font-size: 18px;
}

.admin-card p {
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 12px;
}

/* LINK → BUTTON LOOK */
.admin-link {
  display: inline-block;
  padding: 8px 12px;
  background: #6366f1;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s;
}

.admin-link:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

/* DIVIDER */
.divider {
  border: none;
  height: 1px;
  background: #e5e7eb;
  margin: 24px 0;
}

/* TABLE */
.table-section h2 {
  margin-bottom: 12px;
}

.mentor-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
}

.mentor-table th {
  text-align: left;
  padding: 12px;
  background: #f3f4f6;
  font-size: 13px;
  color: #374151;
}

.mentor-table td {
  padding: 12px;
  border-top: 1px solid #eee;
}

/* TEAM NAME */
.team-name {
  font-weight: 600;
}

/* MENTORS */
.mentor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  gap: 10px;
}

/* REMOVE BUTTON */
.remove-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
}

.remove-btn:hover {
  background: #dc2626;
}

/* SELECT */
.mentor-select {
  width: 100%;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: white;
}
</style>
