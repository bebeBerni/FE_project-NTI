import { createRouter, createWebHistory } from 'vue-router'

// core views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PartnersView from '../views/PartnersView.vue'
import ChallengesView from '../views/ChallengesView.vue'
import NewsView from '../views/NewsView.vue'
import ContactView from '../views/ContactView.vue'

// existing
import TeamView from '../views/TeamView.vue'
import TeamDetailView from '../views/TeamDetailView.vue'
import ProjectsView from '../views/ProjectView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/o-nti',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/partneri-mentori',
      name: 'partners',
      component: PartnersView,
    },
    {
      path: '/vyzvy-a-terminy',
      name: 'challenges',
      component: ChallengesView,
    },
    {
      path: '/novinky',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: ContactView,
    },

    // tvoje existujúce veci
    {
      path: '/teams',
      name: 'teams',
      component: TeamView
    },
    {
      path: '/teams/:id',
      name: 'team-detail',
      component: TeamDetailView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: ProjectDetailView
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ],
})

export default router