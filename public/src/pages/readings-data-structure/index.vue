<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <h1 class="text-center mt-5">Data Structure</h1>
        <div class="row mt-5">
          <div class="col-4">
            <ElemProgressbar  :loading="loading" />
            <!--Array Topics-->
            <CourseList title="Array" :btn_disabled="false" :list="array_list" @view="onView"/>
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetArrayReadingTime()"><small>Reset reading time</small></button>
            
            <!--Linked List Topics-->
            <CourseList title="Linked List" :btn_disabled="linked_list_locked" :list="linked_list" @view="onViewLinkList" />
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetLinkedListReadingTime()"><small>Reset reading time</small></button>
            
            <!--Stacks Topics-->
            <CourseList title="Stacks" :btn_disabled="list_stacks_locked" :list="list_stacks" @view="onViewStack" />
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetStackReadingTime()"><small>Reset reading time</small></button>
          
            <!--Queues Topics-->
            <CourseList title="Queues" :btn_disabled="list_queues_locked" :list="list_queues" @view="onViewQueues" />
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetQueuesReadingTime()"><small>Reset reading time</small></button>

            <!--Graphs Topics-->
            <CourseList title="Graphs" :btn_disabled="list_graphs_locked" :list="list_graphs" @view="onViewGraphs" />
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetGraphReadingTime()"><small>Reset reading time</small></button>
          </div>
          <div class="col-8">            
            <SectionArticleHeader :article="article" :user="user" :reset="reset" @completed="isArticleGroupDone()" />
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
  import { fetchAllArticlesGraphs, fetchAllArticlesQueues, fetchAllArticlesStacks, isArticleGroupDone, resetReadingTime, lsGetUser, fetchAllArticlesArrays, fetchAllArticlesLinkedList, printDevLog, fetchSingleArticleByTopic, scrollToTop, createReadLogs, randomNumbers, queryDelete, SystemConnections } from "@/uikit-api";
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import CourseList from "@/components/Courses.vue";
  import SectionArticleHeader from "@/components/SectionArticleHeader.vue";
  import ElemProgressbar from '@/components/ElemProgressbar.vue';
  import jlconfig from "@/jlconfig.json";
  import Swal from 'sweetalert2';

  export default defineComponent({
    components: { SectionArticleHeader, ElemProgressbar, CourseList, SectionFooter, SectionHeader },
    data() {
      return {
        reset: 0,
        timeDisplay: {} as any,
        timeMax: 0,
        loading: false,
        user: {} as any,
        array_list: [] as any,
        linked_list: [] as any,
        linked_list_locked: true,
        list_stacks: [] as any,
        list_stacks_locked: true,
        list_queues: [] as any,
        list_queues_locked: true,
        list_graphs:  [] as any,
        list_graphs_locked: true,
        article: {} as any
      }
    },
    methods: {
      async resetArrayReadingTime() {
        await resetReadingTime({ user_refid: this.user?.user_refid, articles: jlconfig.article_array.ARRAY }).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
      async resetLinkedListReadingTime() {
        await resetReadingTime({ user_refid: this.user?.user_refid, articles: jlconfig.article_array.LINKED_LIST }).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
      async resetStackReadingTime() {
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
      async resetGraphReadingTime() {
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
      },
      async onViewLinkList(event: any) {
        await isArticleGroupDone(this.user?.user_refid, 'ARRAYS').then( async (check) => {
          printDevLog("Check:", toRaw(check));
          if(check?.success) {
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
          else {
            Swal.fire({
              title: "Invalid Action",
              html: check?.message,
              icon: "info"
            });
          }
        });
      },
      async onViewStack(event: any) {
        await isArticleGroupDone(this.user?.user_refid, 'LINKED_LIST').then( async (check) => {
          printDevLog("Check:", toRaw(check));
          if(check?.success) {
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
          else {
            Swal.fire({
              title: "Invalid Action",
              html: check?.message,
              icon: "info"
            });
          }
        });
      },
      async onViewQueues(event: any) {
        await isArticleGroupDone(this.user?.user_refid, 'STACKS').then( async (check) => {
          printDevLog("Check:", toRaw(check));
          if(check?.success) {
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
          else {
            Swal.fire({
              title: "Invalid Action",
              html: check?.message,
              icon: "info"
            });
          }
        });
      },
      async onViewGraphs(event: any) {
        await isArticleGroupDone(this.user?.user_refid, 'QUEUES').then( async (check) => {
          printDevLog("Check:", toRaw(check));
          if(check?.success) {
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
          else {
            Swal.fire({
              title: "Invalid Action",
              html: check?.message,
              icon: "info"
            });
          }
        });
      },
      async isArticleGroupDone() {
        await isArticleGroupDone(this.user?.user_refid, 'ARRAYS').then( async (check_array) => {
          this.linked_list_locked = !check_array?.success;
          await isArticleGroupDone(this.user?.user_refid, 'LINKED_LIST').then( async (check_linked_list) => {
            this.list_stacks_locked = !check_linked_list?.success;
            await isArticleGroupDone(this.user?.user_refid, 'STACKS').then( async (check_stacks) => {
              this.list_queues_locked = !check_stacks?.success;
              await isArticleGroupDone(this.user?.user_refid, 'QUEUES').then( async (check_queues) => {
                this.list_graphs_locked = !check_queues?.success;
              });
            });
          });
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
      await fetchAllArticlesArrays().then( async (array_list) => {
        this.array_list     = toRaw(array_list);
        await fetchAllArticlesLinkedList().then( async (linked_list) => {
          this.linked_list = toRaw(linked_list);
          await fetchAllArticlesStacks().then( async (list_stacks) => {
            this.list_stacks = list_stacks;
            await fetchAllArticlesQueues().then( async (list_queues) => {
              this.list_queues = list_queues;
              await fetchAllArticlesGraphs().then( async (list_graphs) => {
                this.list_graphs = list_graphs;
                await this.isArticleGroupDone().then( async () => {
                  this.loading  = false;
                  printDevLog("Data:", this.$data);
                });
              });
            });
          });
        });
      });
    }
  });

</script>