import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// core views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PartnersView from '../views/PartnersView.vue'
import ChallengesView from '../views/ChallengesView.vue'
import NewsView from '../views/NewsView.vue'
import ContactView from '../views/ContactView.vue'
import DashboardView from '../views/DashboardView.vue'
import UsersTableView from '../views/UsersTableView.vue'
import MentorsTableView from '../views/MentorsTableView.vue'
import TeamChatView from '@/views/TeamChatView.vue'

// existing
import TeamView from '../views/TeamView.vue'
import TeamDetailView from '../views/TeamDetailView.vue'
import ProjectsView from '../views/ProjectView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'


const routes: RouteRecordRaw[] = [
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

  // teams
  {
    path: '/teams',
    name: 'teams',
    component: TeamView,
  },
  {
    path: '/teams/:id',
    name: 'team-detail',
    component: TeamDetailView,
    props: true,
  },
  {
    path: '/team-chat/:id',
    component: TeamChatView
  },

  // projects
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: ProjectDetailView,
    props: true,
  },
  {
  path: '/dashboard',
  name: 'dashboard',
  component: DashboardView,
  meta: {
    requiresAuth: true
  }
},
//Users
{
  path: "/all_users",
  component: UsersTableView
},
{
  path: '/student/teams/create',
  name: 'student-team-create',
  component: () => import('../views/CreateTeam.vue'),
  meta: {
    requiresAuth: true,
  },
},
{
  path: '/student/projects/create',
  name: 'student-project-create',
  component: () => import('../views/CreateProject.vue'),
  meta: {
    requiresAuth: true,
  },
},
{
  path: '/student/project-applications/:projectApplicationId/upload-cv',
  name: 'student-upload-cv',
  component: () => import('../components/dashboards/UploadCV.vue'),
  meta: {
    requiresAuth: true,
  },
},
//Mentors
{
  path: "/all_mentors",
 component: MentorsTableView
},
{
  path: '/mentor/teams/:id/chat',
  name: 'team-chat',
  component: TeamChatView,
},


  // auth
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
  path: '/forgot-password',
  name: 'ForgotPassword',
  component: () => import('../views/ForgotPassword.vue'),
},
{
  path: '/reset-password/:token',
  name: 'ResetPassword',
  component: () => import('../views/ResetPassword.vue'),
},
{
  path: '/email-verified',
  component: () => import('../views/EmailVerified.vue')
},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
