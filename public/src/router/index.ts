import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/index.vue'),
      meta: {
        title: "Home",
        requiresAuth: false
      },
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/pages/courses/index.vue'),
      meta: {
        title: "Courses",
        requiresAuth: false
      },
    },
    {
      path: '/excercises',
      name: 'excercises',
      component: () => import('@/pages/excercises/index.vue'),
      meta: {
        title: "Excercises",
        requiresAuth: false
      },
    },
    {
      path: '/quizzes',
      name: 'quizzes',
      component: () => import('@/pages/quizzes/index.vue'),
      meta: {
        title: "Quizzes",
        requiresAuth: false
      },
    },
    {
      path: '/visualization',
      name: 'visualization',
      component: () => import('@/pages/visualization/index.vue'),
      meta: {
        title: "Visualization",
        requiresAuth: false
      },
    },
    {
      path: '/readings',
      name: 'readings',
      component: () => import('@/pages/readings/index.vue'),
      meta: {
        title: "Reading Materials",
        requiresAuth: false
      },
    },
    {
      path: '/videos',
      name: 'videos',
      component: () => import('@/pages/videos/index.vue'),
      meta: {
        title: "Video Tutorials",
        requiresAuth: false
      },
    },
  ],
})

export default router
