import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RankingView from '../views/RankingView.vue'
import HistoricoView from '../views/HistoricoView.vue'
import ProfileView from '../views/ProfileView.vue'
import GerenciarProfileView from '../views/GerenciarProfileView.vue'
import GerenciarVideosView from '../views/GerenciarVideosView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'profile',
      component: ProfileView,
      meta: { hideNavbar: true }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: RankingView,
    },
    {
      path: '/historico',
      name: 'Historico',
      component: HistoricoView,
    },
    {
      path: '/gerenciarPerfil',
      name: 'GerenciarPerfil',
      component: GerenciarProfileView,
      meta: { hideNavbar: true }
    },
    {
      path: '/gerenciarVideos',
      name: 'GerenciarVideos',
      component: GerenciarVideosView,
    },
    {
      path: '/movie/:id',
      name: 'MovieDetail',
      component: MovieDetailView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
