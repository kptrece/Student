<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <div class="row mt-5 pt-5">
          <div class="col-12">
            <h1 class="text-center">Excercises</h1>
            <p class="text-center">Please complete reading materials to start excercises</p>
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
          <div class="col-12">
            <p class="text-center">Quiz will enable once you passed all excercises</p>
            <div class="d-flex justify-content-center">
              <button class="btn btn-primary btn-lg" @click="proceedToQuiz()">
                <i v-if="!all_passed" class="bi bi-lock-fill me-1"></i>
                <i v-else class="bi bi-unlock-fill me-1"></i>
                <span>Proceed to Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { lsGetUser, fetchRandomExcercises, printDevLog, queryURL, randomNumbers, isFundamentalDone, isArticleGroupDone, isParentArticleDone } from '@/uikit-api';
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
        linked_list_locked: false,
        list_stacks_locked: false,
        list_queues_locked: false,
        list_graphs_locked: false,
        list_arrays_locked: false,

        swiper: {} as any,
        excercise: {} as any,
        reset: 0,
        category: {} as any,
        questionnaires: {} as any,
        all_passed: false
      }
    },
    methods: {
      async isArticleGroupDoneLocal() {
        //this.reset_unlock = randomNumbers();
        await isArticleGroupDone(this.user?.user_refid, 'ARRAYS').then( async (check_array) => {
          this.list_arrays_locked = !check_array?.success;
          //console.log(check_array?.success)
          await isArticleGroupDone(this.user?.user_refid, 'LINKED_LIST').then( async (check_linked_list) => {
            this.linked_list_locked = !check_linked_list?.success;
            await isArticleGroupDone(this.user?.user_refid, 'STACKS').then( async (check_stacks) => {
              this.list_stacks_locked = !check_stacks?.success;
              await isArticleGroupDone(this.user?.user_refid, 'QUEUES').then( async (check_queues) => {
                this.list_queues_locked = !check_queues?.success;
                await isArticleGroupDone(this.user?.user_refid, 'GRAPHS').then( async (check_queues) => {
                this.list_graphs_locked = !check_queues?.success;
              });
              });
            });
          });
        });
      },
      async initExercises() {
        this.loading      = true;

        await queryURL({ url: "util_quiz/initExcercises?user_refid="+ this.user?.user_refid +"&limit=" + jlconfig.excercises_limit }).then( async (excercise) => {
          
          this.loading    = false;
          excercise = excercise.map((ex: any) => {
            let locked : boolean = true;
            if(ex?.header?.name == "Array"){
              locked = this.list_arrays_locked
            }else if(ex?.header?.name == "Linked List"){
              locked = this.linked_list_locked
            }else if(ex?.header?.name == "Stacks"){
              locked = this.list_stacks_locked
            }else if(ex?.header?.name == "Queues"){
              locked = this.list_queues_locked
            }else if(ex?.header?.name == "Graphs"){
              locked = this.list_graphs_locked
            }

            return {...ex, locked: locked}
          });
          this.excercise  = excercise;
          console.log("exercise, ", this.excercise)
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

        if(this.excercise.length == passed) {
          this.all_passed = true;
        }
        else {
          this.all_passed = false;
        }
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
        else {
          this.loading    = true;
          this.category   = toRaw(exam);
          await fetchRandomExcercises({ group_refid: exam?.header?.group_refid, limit: jlconfig.excercises_limit }).then( async (response) => {
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
      },
      async proceedToQuiz() {
        if(this.all_passed) {
          this.$router.replace('/quizzes');
        }
        else {
          Swal.fire({
            title: "Invalid Action",
            text: "You need to pass all excercises to proceed in the quiz",
            icon: "info"
          })
        }
      }
    },
    async mounted() {
      var user = await lsGetUser() as any;
      if(user) { this.user = user; }
      await this.isArticleGroupDoneLocal().then( async () => {
        printDevLog("Excercises:", toRaw(this.$data));
      });
      await this.initExercises().then( async () => {
        printDevLog("Excercises:", toRaw(this.$data));
      });

    },
  });

</script>
<style scoped>
  .btn-outline-primary {
    cursor: not-allowed !important;
  }
</style>