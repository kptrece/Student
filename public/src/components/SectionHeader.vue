<template>
  <header id="header" class="header d-flex align-items-center fixed-top" style="background-color: #161166;">
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <router-link to="/"><h1 class="sitename text-white">AlgoSpear</h1></router-link>
      </a>
      <nav id="navmenu" class="navmenu">
        <ul>
          <li><router-link :class="{ active: $route.name == 'home' ? true : false }" to="/">Home</router-link></li>
          <li class="dropdown"><a href="#" :class="{ active: $route.name == 'readings' ? true : $route.name == 'videos' ? true : false }"><span>Courses</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><router-link to="/readings">Reading Materials</router-link></li>
              <li><router-link to="/videos">Video Tutorials</router-link></li>
            </ul>
          </li>
          <li class="dropdown"><a href="#" :class="{ active: $route.name == 'excercises' ? true : $route.name == 'quizzes' ? true : false }"><span>Assessment</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><router-link to="/excercises">Excercises</router-link></li>
              <li><router-link to="/quizzes">Quizzes</router-link></li>
            </ul>
          </li>
          <li class="dropdown"><a href="#" :class="{ active: $route.name == 'datastructures' ? true : $route.name == 'algorithms' ? true : false }"><span>Visualization</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><router-link to="/datastructures">Data Structure</router-link></li>
              <li><router-link to="/algorithms">Algorithms</router-link></li>
            </ul>
          </li>
          <li v-if="!isAuthenticated()"><router-link :class="{ active: $route.name == 'login' ? true : false }" to="/login">Login</router-link></li>
          <li v-else><button class="btn btn-primary rounded-5" @click="logout()">Logout</button></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { isAuthenticated } from '@/uikit-api';
  import Swal from 'sweetalert2';

  export default defineComponent({
    name: "SectionHeader",
    setup() {
      return {
        isAuthenticated
      }
    },
    methods: {
      logout() {
        Swal.fire({
          title: "Confirmation",
          text: "Confirm your sign out action",
          showCancelButton: true,
          confirmButtonText: "Logout",
          icon: "question"
        }).then( async (result) => {
          if(result.isConfirmed) {
            localStorage.clear();
            this.$router.replace('/');
          }
        });
      }
    }
  });

</script>