<template>
  <div>
    <!-- SUCCESSFUL PROJECTS -->
    <section class="section">
      <h2>{{ $t('home.successfulProjects.title') }}</h2>

      <p v-if="loadingHistories" class="message">
        Loading successful projects...
      </p>

      <p v-else-if="historyError" class="error">
        {{ historyError }}
      </p>

      <p v-else-if="projectHistories.length === 0" class="message">
        No successful projects found.
      </p>

      <div v-else>
        <div class="card-grid three-columns">
          <div
            class="info-card"
            v-for="history in projectHistories"
            :key="history.id"
          >
            <h3>{{ history.project?.title || 'Untitled project' }}</h3>

            <p>
              {{ history.final_note || history.project?.description || '—' }}
            </p>

            <p>
              <strong>Team:</strong>
              {{ history.team?.name || '—' }}
            </p>

            <p>
              <strong>Finished at:</strong>
              {{ formatDate(history.finished_at) }}
            </p>

            <span class="badge">
              {{ history.result || '—' }}
            </span>
          </div>
        </div>

        <div class="pagination" v-if="lastPage > 1">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="changeHistoryPage(currentPage - 1)"
          >
            Previous
          </button>

          <span class="page-info">
            Page {{ currentPage }} of {{ lastPage }}
          </span>

          <button
            class="page-btn"
            :disabled="currentPage === lastPage"
            @click="changeHistoryPage(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section alt-section">
      <h2>{{ $t('home.faq.title') }}</h2>

      <div class="faq-list">
        <div class="faq-item" v-for="item in faq" :key="item.id">
          <h3>{{ $t(item.questionKey) }}</h3>
          <p>{{ $t(item.answerKey) }}</p>
        </div>
      </div>
    </section>

    <!-- UPCOMING DEADLINES -->
    <section class="section">
      <h2>Upcoming Deadlines</h2>

      <p v-if="loadingProjects" class="message">
        Loading upcoming deadlines...
      </p>

      <p v-else-if="projectError" class="error">
        {{ projectError }}
      </p>

      <p v-else-if="upcomingProjects.length === 0" class="message">
        No upcoming deadlines found.
      </p>

      <div v-else class="timeline">
        <div
          class="timeline-item"
          v-for="project in upcomingProjects"
          :key="project.id"
        >
          <div class="timeline-date">
            {{ formatDate(project.deadline) }}
          </div>

          <div class="timeline-content">
            <h3>{{ project.title }}</h3>

            <p>
              {{ project.description || '—' }}
            </p>

            <p>
              <strong>Team:</strong>
              {{ project.team?.name || '—' }}
            </p>

            <p>
              <strong>Status:</strong>
              {{ project.status || '—' }}
            </p>

            <p v-if="project.company">
              <strong>Company:</strong>
              {{ project.company?.company_name || '—' }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import axios from "axios"

export default {
  name: "ChallengesView",

  data() {
    return {
      loadingHistories: true,
      loadingProjects: true,

      historyError: "",
      projectError: "",

      projectHistories: [] as any[],
      projects: [] as any[],

      currentPage: 1,
      lastPage: 1,
      perPage: 6,
      total: 0,

      faq: [
        {
          id: 1,
          questionKey: "home.faq.items.faq1.question",
          answerKey: "home.faq.items.faq1.answer"
        },
        {
          id: 2,
          questionKey: "home.faq.items.faq2.question",
          answerKey: "home.faq.items.faq2.answer"
        },
        {
          id: 3,
          questionKey: "home.faq.items.faq3.question",
          answerKey: "home.faq.items.faq3.answer"
        }
      ]
    }
  },

  computed: {
    upcomingProjects(): any[] {
      return this.projects
        .filter((project: any) => project.deadline)
        .sort((a: any, b: any) => {
          return (
            new Date(a.deadline).getTime() -
            new Date(b.deadline).getTime()
          )
        })
        .slice(0, 5)
    }
  },

  mounted() {
    this.getProjectHistories()
    this.getProjects()
  },

  methods: {
    async getProjectHistories(page = 1) {
      try {
        this.loadingHistories = true
        this.historyError = ""

        const response = await axios.get(
          `http://127.0.0.1:8000/api/project-histories?page=${page}&per_page=${this.perPage}`,
          {
            headers: {
              Accept: "application/json"
            }
          }
        )

        if (Array.isArray(response.data.data)) {
          this.projectHistories = response.data.data
          this.currentPage = response.data.current_page || page
          this.lastPage = response.data.last_page || 1
          this.perPage = response.data.per_page || this.perPage
          this.total = response.data.total || 0
        } else if (Array.isArray(response.data.project_histories?.data)) {
          this.projectHistories = response.data.project_histories.data
          this.currentPage = response.data.project_histories.current_page || page
          this.lastPage = response.data.project_histories.last_page || 1
          this.perPage = response.data.project_histories.per_page || this.perPage
          this.total = response.data.project_histories.total || 0
        } else if (Array.isArray(response.data.project_histories)) {
          this.projectHistories = response.data.project_histories
          this.currentPage = 1
          this.lastPage = 1
        } else {
          this.projectHistories = []
          this.historyError = "Project histories response has unexpected format."
        }
      } catch (error: any) {
        console.error("Error loading project histories:", error)
        this.historyError = "Could not load project histories from backend."

      } finally {
        this.loadingHistories = false
      }
    },

    async getProjects() {
      try {
        this.loadingProjects = true
        this.projectError = ""

        const response = await axios.get(
          "http://127.0.0.1:8000/api/projects",
          {
            headers: {
              Accept: "application/json"
            }
          }
        )

        if (Array.isArray(response.data)) {
          this.projects = response.data
        } else if (Array.isArray(response.data.projects)) {
          this.projects = response.data.projects
        } else if (Array.isArray(response.data.data)) {
          this.projects = response.data.data
        } else {
          this.projects = []
          this.projectError = "Projects response has unexpected format."
        }
      } catch (error: any) {
        console.error("Error loading projects:", error)
        this.projectError = "Could not load projects from backend."
      } finally {
        this.loadingProjects = false
      }
    },

    changeHistoryPage(page: number) {
      if (page < 1 || page > this.lastPage) return
      this.getProjectHistories(page)
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px 20px;
}

.alt-section {
  background-color: #f8fafc;
  border-radius: 18px;
}

.section h2 {
  font-size: 34px;
  margin-bottom: 20px;
  text-align: center;
  color: #2c3e50;
}

.card-grid {
  display: grid;
  gap: 20px;
  margin-top: 35px;
}

.three-columns {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.info-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  transition: 0.2s;
}

.info-card:hover {
  transform: translateY(-4px);
}

.info-card h3 {
  margin-bottom: 12px;
  color: #2c3e50;
}

.info-card p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 10px;
}

.badge {
  display: inline-block;
  margin-top: 14px;
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border-radius: 20px;
  font-size: 13px;
  text-transform: capitalize;
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

.pagination {
  margin-top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
}

.page-btn {
  padding: 10px 16px;
  border: none;
  background-color: #2563eb;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.page-btn:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.page-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.page-info {
  color: #2c3e50;
  font-weight: 600;
}

/* FAQ */
.faq-list {
  max-width: 900px;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px;
}

.faq-item h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.faq-item p {
  color: #555;
  line-height: 1.6;
}

/* TIMELINE */
.timeline {
  max-width: 900px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.timeline-item {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px;
}

.timeline-date {
  min-width: 140px;
  font-weight: 700;
  color: #42b983;
}

.timeline-content h3 {
  color: #2c3e50;
  margin-bottom: 8px;
}

.timeline-content p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 6px;
}

@media (max-width: 768px) {
  .section h2 {
    font-size: 28px;
  }

  .pagination {
    flex-direction: column;
  }

  .timeline-item {
    flex-direction: column;
  }
}
</style>