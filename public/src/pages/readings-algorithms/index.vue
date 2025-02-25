<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <h1 class="text-center mt-5">Algorithms</h1>
        <div class="row mt-5">
          <div class="col-4">
            <ElemProgressbar  :loading="loading" />
            <CourseList title="Stacks" :list="list_stacks" @view="onView" />
            <button class="btn btn-danger btn-sm py-0 py-0 mb-4" @click="resetStacksReadingTime()" ><small>Reset reading time</small></button>
            <CourseList title="Queues" :list="list_queues" @view="onView" />
            <button class="btn btn-danger btn-sm py-0 py-0 mb-4" @click="resetQueuesReadingTime()"><small>Reset reading time</small></button>
            <CourseList title="Graphs" :list="list_graph" @view="onView" />
            <button class="btn btn-danger btn-sm py-0 py-0" @click="resetGraphsReadingTime()"><small>Reset reading time</small></button>
          </div>
          <div class="col-8">            
            <SectionArticleHeader :article="article" :user="user" :duration="180" :reset="reset"/>
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

  import { defineComponent, toRaw, ref } from 'vue';
  import { fetchAllArticlesGraphs, fetchAllArticlesQueues, resetReadingTime, lsGetUser, fetchAllArticlesStacks, printDevLog, fetchSingleArticleByTopic, scrollToTop, createReadLogs, randomNumbers, queryDelete, SystemConnections } from "@/uikit-api";
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import CourseList from "@/components/Courses.vue";
  import SectionArticleHeader from "@/components/SectionArticleHeader.vue";
  import ElemProgressbar from '@/components/ElemProgressbar.vue';
  import jlconfig from "@/jlconfig.json";

  export default defineComponent({
    components: { SectionArticleHeader, ElemProgressbar, CourseList, SectionFooter, SectionHeader },
    data() {
      return {
        reset: 0,
        timeDisplay: {} as any,
        timeMax: 0,
        loading: false,
        user: {} as any,
        list_stacks: [] as any,
        list_queues: [] as any,
        list_graph:  [] as any,
        article: {} as any
      }
    },
    methods: {
      async resetStacksReadingTime() {
        await resetReadingTime({ user_refid: this.user?.user_refid, articles: jlconfig.article_array.STACKS }).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
      async resetQueuesReadingTime() {
        await resetReadingTime({ user_refid: this.user?.user_refid, articles: jlconfig.article_array.QUEUES }).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
      async resetGraphsReadingTime() {
        await resetReadingTime({ user_refid: this.user?.user_refid, articles: jlconfig.article_array.GRAPHS }).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
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
      }
    },
    async mounted() {
      this.loading = true;
      const user = await lsGetUser() as any;
      if(user?.user_refid) {
        this.user = user;
      }
      else {
        this.$toast.warning("Login to log reading history.")
      }
      await fetchAllArticlesStacks().then( async (list_stacks) => {
        this.list_stacks     = toRaw(list_stacks);
        await fetchAllArticlesQueues().then( async (list_queues) => {
          this.list_queues = list_queues;
          await fetchAllArticlesGraphs().then( async (list_graph) => {
            this.list_graph = list_graph;
          });
        });
        this.loading  = false;
        printDevLog("Data:", this.$data);
      });
    }
  });

</script>