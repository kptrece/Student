import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/uikit-api';

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
      path: '/readings-algorithms',
      name: 'readings_algorithms',
      component: () => import('@/pages/readings-algorithms/index.vue'),
      meta: {
        title: "Reading Algorithms",
        requiresAuth: true
      },
    },
    {
      path: '/readings-data-structure',
      name: 'readings-data-structure',
      component: () => import('@/pages/readings-data-structure/index.vue'),
      meta: {
        title: "Data Structure",
        requiresAuth: true
      },
    },
    {
      path: '/readings-fundamental-of-programming',
      name: 'readings_fundamental_of_programming',
      component: () => import('@/pages/readings-fundamental-of-programming/index.vue'),
      meta: {
        title: "Fundamental of Programming",
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
    {
      path: '/datastructures',
      name: 'datastructures',
      component: () => import('@/pages/datastructures/index.vue'),
      meta: {
        title: "Data Structures",
        requiresAuth: false
      },
    },
    {
      path: '/algorithms',
      name: 'algorithms',
      component: () => import('@/pages/algorithms/index.vue'),
      meta: {
        title: "Algorithms",
        requiresAuth: false
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vue'),
      meta: {
        title: "Login",
        requiresAuth: false
      },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/pages/sign-up/index.vue'),
      meta: {
        title: "Sign Up",
        requiresAuth: false
      },
    },
    {
      path: '/datastructures-array',
      name: 'datastructures_array',
      component: () => import('@/pages/datastructures-array/index.vue'),
      meta: {
        title: "Datastructures Array",
        requiresAuth: true
      },
    },
    {
      path: '/datastructures-graphs',
      name: 'datastructures_graphs',
      component: () => import('@/pages/datastructures-graphs/index.vue'),
      meta: {
        title: "Datastructures Graphs",
        requiresAuth: true
      },
    },
    {
      path: '/datastructures-linked-list',
      name: 'datastructures_linked_list',
      component: () => import('@/pages/datastructures-linked-list/index.vue'),
      meta: {
        title: "Datastructures Linked List",
        requiresAuth: true
      },
    },
    {
      path: '/datastructures-queues',
      name: 'datastructures_queues',
      component: () => import('@/pages/datastructures-queues/index.vue'),
      meta: {
        title: "Datastructures Queues",
        requiresAuth: true
      },
    },
    {
      path: '/datastructures-stacks',
      name: 'datastructures_stacks',
      component: () => import('@/pages/datastructures-stacks/index.vue'),
      meta: {
        title: "Datastructures Stacks",
        requiresAuth: true
      },
    },

    {
      path: '/algorithms-searching',
      name: 'algorithms_searching',
      component: () => import('@/pages/algorithms-searching/index.vue'),
      meta: {
        title: "Algorithms Searching",
        requiresAuth: true
      },
    },
    {
      path: '/algorithms-sorting',
      name: 'algorithms_sorting',
      component: () => import('@/pages/algorithms-sorting/index.vue'),
      meta: {
        title: "Algorithms Sorting",
        requiresAuth: true
      },
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = isAuthenticated(); // Example of checking if user is logged in via localStorage
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isLoggedIn) {
          next({ name: 'login' }); // Redirect to login if the user is not authenticated
      } else {
          next(); // Continue to the requested route
      }
  } else {
      next(); // If no auth is required, just continue
  }
});

export default router
