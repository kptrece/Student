<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <div class="row mt-5 pt-5">
          <div class="col-12">
            <h1 class="text-center">Quiz</h1>
            <p class="text-center">Select category to start</p>
          </div>
          <div class="col-4"></div>
          <div class="col-4"><ElemProgressbar :loading="loading"/></div>
          <div class="col-4"></div>
          <div class="col-12">
            <swiper :slides-per-view="1" :space-between="0" @swiper="onSwiper">
              <swiper-slide class="swiper-no-swiping"><TopicList :excercise="excercise" @view="viewExam" /></swiper-slide>
              <swiper-slide class="swiper-no-swiping">
                <ExamSpace 
                  :reset="reset"
                  :category="category" 
                  :questionnaires="questionnaires" 
                  @back="onBack"
                  @passed="onPassed"
                  @fail="onFail"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { lsGetUser, fetchRandomExcercises, printDevLog, queryURL, randomNumbers } from '@/uikit-api';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import TopicList from './components/TopicList.vue';
  import ExamSpace from './components/ExamSpace.vue';
  import ElemProgressbar from '@/components/ElemProgressbar.vue';
  import jlconfig from "@/jlconfig.json";
  import Swal from 'sweetalert2';

  export default defineComponent({
    components: { ElemProgressbar, ExamSpace, TopicList, SectionHeader, SectionFooter, Swiper, SwiperSlide },
    setup() {
      return {
        jlconfig
      }
    },
    data() {
      return {
        loading: false,
        user: {} as any,
        btn: {
          array: true,
          search: false,
          sorting: false,
          linked_list: false,
          graphs: false,
          stacks: false,
          queues: false
        },
        swiper: {} as any,
        excercise: {} as any,
        reset: 0,
        category: {} as any,
        questionnaires: {} as any
      }
    },
    methods: {
      async initExercises() {
        this.loading      = true;
        await queryURL({ url: "util_quiz/initQuiz?user_refid="+ this.user?.user_refid +"&limit=" + jlconfig.excercises_limit }).then( async (excercise) => {
          this.loading    = false;
          this.excercise  = excercise;
          this.isPassedAll();
        });
      },
      isPassedAll() {
        var passed = 0;
        for(let i = 0; i < this.excercise.length; i++) {
          if(this.excercise[i]['passed']) {
            passed = passed + 1;
          }
        }
        printDevLog("Over all status", {
          total: this.excercise.length,
          passed: passed
        });
      },
      async viewExam(exam: any) {
        printDevLog("View Exam", exam);
        if(exam?.passed) {
          Swal.fire({
            title: "Completed",
            text: "You've passed the excercises already",
            icon: "info"
          });
        }
        else if(!exam?.passed) {
          Swal.fire({
            title: "Failed Quiz",
            text: "You already failed this quiz.",
            icon: "error"
          });
        }
        else {
          this.loading    = true;
          this.category   = toRaw(exam);
          await fetchRandomExcercises({ group_refid: exam?.header?.group_refid, limit: jlconfig.quiz_limit }).then( async (response) => {
            this.loading          = false;
            this.questionnaires   = toRaw(response);
            this.reset            = randomNumbers();
            this.swiper.slideTo(1);
          });
        }
      },
      onSwiper(swiper: any) {
        this.swiper = swiper;
      },
      onBack() {
        this.swiper.slideTo(0);
      },
      async onPassed() {
        this.swiper.slideTo(0);
        await this.initExercises().then( async () => {

        });
      },
      async onFail() {
        this.swiper.slideTo(0);
        await this.initExercises().then( async () => {

        });
      }
    },
    async mounted() {
      var user = await lsGetUser() as any;
      if(user) { this.user = user; }
      await this.initExercises().then( async () => {
        printDevLog("Quiz:", toRaw(this.$data));
      });
    },
  });

</script>
<style scoped>
  .btn-outline-primary {
    cursor: not-allowed !important;
  }
</style>