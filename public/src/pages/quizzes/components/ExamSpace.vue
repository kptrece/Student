<template>
  <div>
    <h1 class="text-center">{{ category?.header?.name }}</h1>
    <div class="row">
      <div class="col-sm-0 col-lg-3"></div>
      <div class="col-sm-12 col-lg-6">
        <swiper :slides-per-view="1" @swiper="onSwiper">
          <swiper-slide class="swiper-no-swiping" v-for="(question, i) in list">
            <div class="card mb-4">
              <div class="card-header">Question: {{ i + 1 }}</div>
              <div class="card-body">
                <p>{{ question?.question }}</p>
                <div class="input-group mb-3">
                  <span class="input-group-text">Answer</span>
                  <input v-model="question.answer_input" type="text" class="form-control">
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end">
                <button class="btn btn-primary w-50" @click="onSubmitAnswer(i)" :disabled="loading.btn_submit">{{ loading.btn_submit ? 'Please wait..':'Submit Answer' }}</button>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="d-flex justify-content-start">
          <button class="btn btn-secondary btn-lg me-4 w-50" @click="()=>{ $emit('back') }">Back</button>
        </div>
      </div>
      <div class="col-sm-0 col-lg-3"></div>
    </div>
  </div>
</template>
<script lang="ts">

  import { lsGetUser, printDevLog, queryInsertGetID, SystemConnections } from '@/uikit-api';
  import { defineComponent, toRaw } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import jlconfig from "@/jlconfig.json";
  import Swal from 'sweetalert2';

  export default defineComponent({
    name: "TopicList",
    emits: ['back','passed','fail'],
    props: {
      reset: {
        default: 0,
        type: Number
      },
      category: {
        default: {},
        type: Object
      },
      questionnaires: {
        default: {},
        type: Object
      }
    },
    components: { Swiper, SwiperSlide },
    data() {
      return {
        loading: {
          btn_submit: false
        },
        user: {} as any,
        swiper: {} as any,
        list: [] as any,
        score: 0,
        passed: 0
      }
    },
    methods: {
      async onSubmitAnswer(index: number) {
        if(!this.list[index]['answer_input']) {
          this.$toast.warning('Please provide your answer.');
        }
        else {
          var answer_correct  = (this.list[index]['answer']).toLowerCase();
          var answer_input    = (this.list[index]['answer_input']).toLowerCase();
          if(answer_correct == answer_input) {
            this.score = this.score + 1;
            this.list[index]['is_corrrect'] = 1;
          }
          else {
            this.list[index]['is_corrrect'] = 0;
          }
          if(this.swiper.isEnd) {
            if(this.score >= jlconfig.quiz_limit_passing) { this.passed = 1; }
            this.loading.btn_submit = true;
            await this.onSaveExcercises().then( async () => {
              this.loading.btn_submit = false;
              if(this.passed == 1) {
                Swal.fire({
                  title: "Congratulations",
                  text: "You passed the excercises with score of " + this.score + " out of " + jlconfig.quiz_limit + ".",
                  icon: "success"
                }).then( async () => {
                  this.$emit('passed');
                });
              }
              else {
                Swal.fire({
                  title: "You fail",
                  text: "You fail to pass with score of " + this.score + " out of " + jlconfig.quiz_limit + ".",
                  icon: "error"
                }).then( async () => {
                  this.$emit('fail');
                });
              }
            });
          }
          else {
            this.swiper.slideNext();
          }
        }
      },
      async onSaveExcercises() {
        await queryInsertGetID({
          connection: SystemConnections()['CONN_NPM_LMS'],
          table: 'questionnaire_category_quiz',
          columns: {
            'user_refid': this.user?.user_refid,
            'category_refid': this.category?.header?.group_refid,
            'total': jlconfig.quiz_limit,
            'score': this.score,
            'passed': this.passed
          }
        });
      },
      onSwiper(swiper: any) {
        this.swiper = swiper;
      }
    },
    watch: {
      reset: async function () {
        if(this.reset > 0) {
          var user = await lsGetUser() as any;
          if(user) {
            this.user     = user;
            this.list     = this.questionnaires;
            this.score    = 0;
            this.passed   = 0;
            this.swiper.slideTo(0);
            printDevLog("Props:", toRaw(this.$props));
            printDevLog("Data:", toRaw(this.$data));
          }
          else {
            Swal.fire({
              title: "Sign In Required",
              text: "You need to sign in to start an excercises",
              icon: "info"
            }).then( async () => {
              this.$router.replace('/login');
            });
          }
        }
      }
    }
  });

</script>