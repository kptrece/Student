<template>
  <header id="header" class="header d-flex align-items-center fixed-top" style="background-color: #161166;">
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <h1 class="sitename">AlgoSpear</h1>
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
          <li><router-link :class="{ active: $route.name == 'login' ? true : false }" to="/login">Login</router-link></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>
</template>