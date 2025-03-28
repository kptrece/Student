<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <h1 class="text-center mt-5">Fundamental of Programming</h1>
        <div class="row mt-5">
          <div class="col-4">
            <ElemProgressbar :loading="loading" />
            <ProgressBar :height="25" :percentage="progress" />
            <CourseList title="Fundamental of Programming" :btn_disabled="false" :list="list" @view="onView" />
            <button class="btn btn-danger btn-sm py-0 py-0" @click="resetFundamentalReadingTime()"><small>Reset reading time</small></button>
          </div>
          <div class="col-8">            
            <SectionArticleHeader :article="article" :user="user" :reset="reset" @completed="isArticleGroupDone()"/>
            <div class="text-dark mt-5">
              <div v-if="article?.content" v-html="article?.content"></div>
              <div v-else class="p-5 m-5">
                <div class="card">
                  <div class="card-body">
                    <h3 class="text-center p-5" style="color: #a9a0a0;">Select reading material to start</h3>
                    <div class="d-flex justify-content-center pb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#a9a0a0" class="bi bi-bookmark-plus-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
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
  import { resetReadingTimeByGroup, randomNumbers, lsGetUser, fetchAllArticlesFunOfProg, printDevLog, fetchSingleArticleByTopic, scrollToTop, createReadLogs, fetchArticleReadsById } from "@/uikit-api";
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import CourseList from "@/components/Courses.vue";
  import ElemProgressbar from '@/components/ElemProgressbar.vue';
  import SectionArticleHeader from "@/components/SectionArticleHeader.vue";
  import ProgressBar from '@/components/ProgressBar.vue';
  import jlconfig from "@/jlconfig.json";

  export default defineComponent({
    components: { SectionArticleHeader, ElemProgressbar, CourseList, SectionFooter, SectionHeader, ProgressBar },
    data() {
      return {
        reset: 0,
        reset_unlock: 0,
        loading: false,
        user: {} as any,
        list: [] as any,
        article: {} as any,
        articles_refid: {} as any,
        articleRed: {} as any,
        progress: 0
      }
    },
    methods: {
      async onView(event: any) {
        this.loading = true;
        await fetchSingleArticleByTopic(event?.topic_refid).then( async (article) => {
          this.loading = false;
          if(article.length > 0) {
            scrollToTop();
            this.article  = article[0];
            this.reset    = randomNumbers();
          }
          else {
            this.$toast.warning("No article found");
          }
        });
      },
      async resetFundamentalReadingTime() {
        await resetReadingTimeByGroup({ user_refid: this.user?.user_refid, group_code:'FUN_OF_PROG'}).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
      async isArticleGroupDone() {
        this.loadProgress()
        this.reset_unlock = randomNumbers();
      },
      async loadProgress(){
        await fetchArticleReadsById(this.user?.user_refid).then( async (list) => {
          this.articleRed = list;
        });

        let funOfProgDone = 0
        await fetchAllArticlesFunOfProg().then(async (list) => {
          list.forEach((item:any) => {
            if(this.articleRed.some((articleRed:any) => item?.topic_refid == articleRed?.topic_refid)){
              funOfProgDone++
            }
          })

          this.progress = Math.floor(funOfProgDone / list.length * 100)
        })
      }
    },
    async mounted() {
      this.loading = true;
      const user = await lsGetUser() as any;
      if(user?.user_refid) {
        this.user = user;

        await fetchArticleReadsById(user?.user_refid).then( async (list) => {
          this.articleRed = list;
        });

        this.articles_refid = this.list?.map((article:any) => article?.topic_refid)
        this.articleRed = this.articleRed?.filter((article:any) => this.articles_refid.includes(article?.topic_refid))
        this.loadProgress()  
      }
      else {
        this.$toast.warning("Login to log reading history.")
      }
      await fetchAllArticlesFunOfProg().then( async (list) => {
        this.list     = toRaw(list);
        this.loading  = false;
        printDevLog("Data:", this.$data);
      });


    },
  });

</script>