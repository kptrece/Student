<template>
  <section class="hero section dark-background">
    <img src="/src/assets/img/hero-bg-2.jpg" alt="" class="hero-bg">
    <div class="container py-5">
      <swiper 
        :autoplay="{delay: 6000, disableOnInteraction: true }"
        :navigation="false"
        :slides-per-view="1"
        :centeredSlides="true"
        :space-between="0"
        :modules="modules"
        :pagination="{ clickable: true }"
        @autoplayTimeLeft="onAutoplayTimeLeft">
        <swiper-slide>
          <div class="row gy-4 justify-content-between">
            <div class="col-lg-4 order-lg-last hero-img py-5">
              <img src="/src/assets/img/as-structured-data.png" class="img-fluid animated" alt="">
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center">
              <h1 class="text-white">Master Data <span>Structures & Algorithms</span></h1>
              <p class="text-white"><small>Elevate your coding skills and crack technical interviews with our comprehensive Data Structures and Algorithms learning platform. Whether you're a beginner or an advanced programmer, our interactive lessons, hands-on coding challenges, and real-world problem-solving exercises will guide you to success. Start learning today and build the foundation for a successful career in software development.</small></p>
              <div class="d-flex">
                <router-link class="btn-get-started" to="/" >Read More</router-link>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="row gy-4 justify-content-between">
            <div class="col-lg-4 order-lg-last hero-img py-5">
              <img src="/src/assets/img/as-slider-img.png" class="img-fluid animated" alt="">
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center">
              <h1 class="text-white"><span>Visualize</span> The Concepts</h1>
              <p class="text-white"><small>Understand complex Data Structures and Algorithms through engaging, interactive visualizations. Our platform transforms abstract concepts into intuitive visual experiences, making it easier to grasp foundational principles and optimize problem-solving strategies. Perfect for students, developers, and coding enthusiasts, this visualization-based learning system empowers you to see and solve algorithmic challenges with clarity. Dive in and accelerate your learning journey today!</small></p>
              <div class="d-flex">
                <router-link class="btn-get-started" to="/" >Read More</router-link>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="row gy-4 justify-content-between">
            <div class="col-lg-4 order-lg-last hero-img py-5">
              <img src="/src/assets/img/as-testing.png" class="img-fluid animated" alt="">
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center">
              <h1 class="text-white"><span>Learn</span> & <span>Assess</span></h1>
              <p class="text-white"><small>Take your understanding of Data Structures and Algorithms to the next level with our dynamic learning and assessment platform. Combine in-depth tutorials with hands-on coding practice and tailored assessments designed to reinforce key concepts and measure your progress. Whether you're preparing for technical interviews or aiming to sharpen your problem-solving skills, our platform offers personalized learning paths, real-time feedback, and detailed performance insights. Start learning and track your growth every step of the way!</small></p>
              <div class="d-flex">
                <router-link class="btn-get-started" to="/" >Read More</router-link>
              </div>
            </div>
          </div>
        </swiper-slide>
        <template #container-end>
          <div class="autoplay-progress">
            <svg viewBox="0 0 48 48" ref="progressCircle">
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref="progressContent">1</span>
          </div>
        </template>
      </swiper>
    </div>
    <svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
      <defs>
        <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
      </defs>
      <g class="wave1">
        <use xlink:href="#wave-path" x="50" y="3"></use>
      </g>
      <g class="wave2">
        <use xlink:href="#wave-path" x="50" y="0"></use>
      </g>
      <g class="wave3">
        <use xlink:href="#wave-path" x="50" y="9"></use>
      </g>
    </svg>
  </section>
</template>
<script lang="ts">

  import { defineComponent, ref } from "vue";
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay, Pagination, Navigation } from 'swiper/modules';

  export default defineComponent({
    name: "SectionCarousel",
    components: { Swiper, SwiperSlide },
    setup() {
      const progressCircle = ref(null) as any;
      const progressContent = ref(null)as any;
      const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
        progressCircle.value.style.setProperty('--progress', 1 - progress);
        progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
      };
      return {
        onAutoplayTimeLeft,
        progressCircle,
        progressContent,
        modules: [Autoplay, Pagination, Navigation],
      };
    }
  });

</script>
<style scope>
  .autoplay-progress {
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 10;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
  }
  .autoplay-progress svg {
    --progress: 0;
    position: absolute;
    left: 0;
    top: 0px;
    z-index: 10;
    width: 100%;
    height: 100%;
    stroke-width: 4px;
    stroke: white;
    fill: none;
    stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
    stroke-dasharray: 125.6;
    transform: rotate(-90deg);
  }
</style>