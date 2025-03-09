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
            <ProgressBar :percentage="arrayProgressPercentage" :height="25"/>
            <CourseList title="Array" :unlock="reset_unlock" :btn_disabled="false" :list="array_list" @view="onView"/>
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetArrayReadingTime()"><small>Reset reading time</small></button>
            
            <!--Linked List Topics-->
            <ProgressBar :percentage="linkListProgressPercentage" :height="25"/>
            <CourseList title="Linked List" :unlock="reset_unlock" :btn_disabled="linked_list_locked" :list="linked_list" @view="onViewLinkList" />
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetLinkedListReadingTime()"><small>Reset reading time</small></button>
            
            <!--Stacks Topics-->
            <ProgressBar :percentage="stacksProgressPercentage" :height="25"/>
            <CourseList title="Stacks" :unlock="reset_unlock" :btn_disabled="list_stacks_locked" :list="list_stacks" @view="onViewStack" />
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetStackReadingTime()"><small>Reset reading time</small></button>
          
            <!--Queues Topics-->
            <ProgressBar :percentage="queuesProgressPercentage" :height="25"/>
            <CourseList title="Queues" :unlock="reset_unlock" :btn_disabled="list_queues_locked" :list="list_queues" @view="onViewQueues" />
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetQueuesReadingTime()"><small>Reset reading time</small></button>

            <!--Graphs Topics-->
            <ProgressBar :percentage="graphsProgressPercentage" :height="25"/>
            
            <CourseList title="Graphs" :unlock="reset_unlock" :btn_disabled="list_graphs_locked" :list="list_graphs" @view="onViewGraphs" />
            <button class="btn btn-danger btn-sm py-0 mb-4" @click="resetGraphReadingTime()"><small>Reset reading time</small></button>
          </div>
          <div class="col-8">            
            <SectionArticleHeader :article="article" :user="user" :reset="reset" @completed="isArticleGroupDoneLocal()" />
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
  import { fetchAllArticlesGraphs, fetchAllArticlesQueues, fetchAllArticlesStacks, isArticleGroupDone, resetReadingTimeByGroup, lsGetUser, fetchAllArticlesArrays, fetchAllArticlesLinkedList, printDevLog, fetchSingleArticleByTopic, scrollToTop, createReadLogs, randomNumbers, queryDelete, SystemConnections,fetchArticleReadsById,isFundamentalDone } from "@/uikit-api";
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import CourseList from "@/components/Courses.vue";
  import ProgressBar from '@/components/ProgressBar.vue';
  import SectionArticleHeader from "@/components/SectionArticleHeader.vue";
  import ElemProgressbar from '@/components/ElemProgressbar.vue';
  import jlconfig from "@/jlconfig.json";
  import Swal from 'sweetalert2';

  export default defineComponent({
    components: { SectionArticleHeader, ElemProgressbar, CourseList, SectionFooter, SectionHeader, ProgressBar },
    data() {
      return {
        reset: 0,
        reset_unlock: 0,
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
        article: {} as any,
        articleRed: {} as any,
        arrayProgressPercentage: 0,
        linkListProgressPercentage: 0,
        stacksProgressPercentage: 0,
        queuesProgressPercentage: 0,
        graphsProgressPercentage: 0,

      }
    },
    methods: {
      async resetArrayReadingTime() {
        await resetReadingTimeByGroup({ user_refid: this.user?.user_refid, group_code: 'ARRAY'}).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
      async resetLinkedListReadingTime() {
        await resetReadingTimeByGroup({ user_refid: this.user?.user_refid, group_code:'LINKED_LIST'}).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
      async resetStackReadingTime() {
        await resetReadingTimeByGroup({ user_refid: this.user?.user_refid, group_code: 'STACKS'}).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
      async resetQueuesReadingTime() {
        await resetReadingTimeByGroup({ user_refid: this.user?.user_refid, group_code:'QUEUES'}).then( async (response) => {
          if(response?.success) {
            window.location.reload();
          }
        });
      },
      async resetGraphReadingTime() {
        await resetReadingTimeByGroup({ user_refid: this.user?.user_refid, group_code: 'GRAPHS'}).then( async (response) => {
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
      async isArticleGroupDoneLocal() {

        await this.loadProgress()

        this.reset_unlock = randomNumbers();
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
      },
      async loadProgress(){
        await fetchArticleReadsById(this.user?.user_refid).then( async (list) => {
          this.articleRed = list;
        });

        //array progress
        let arrayDone = 0
        this.array_list.forEach((article: any) => {
          if(this.articleRed.some((articleRed:any) => article?.topic_refid == articleRed?.topic_refid)){
            arrayDone++
          }
        });
        this.arrayProgressPercentage = Math.floor(arrayDone / this.array_list.length * 100)

        //linklist progression
        let linkListDone = 0
        this.linked_list.forEach((article: any) => {
          if(this.articleRed.some((articleRed:any) => article?.topic_refid == articleRed?.topic_refid)){
            linkListDone++
          }
        });
        this.linkListProgressPercentage = Math.floor(linkListDone / this.linked_list.length * 100)

        //stacks progression
        let stacksDone = 0
        this.list_stacks.forEach((article: any) => {
          if(this.articleRed.some((articleRed:any) => article?.topic_refid == articleRed?.topic_refid)){
            stacksDone++
          }
        });
        this.stacksProgressPercentage = Math.floor(stacksDone / this.list_stacks.length * 100)

        //queues progression
        let queuesDone = 0
        this.list_queues.forEach((article: any) => {
          if(this.articleRed.some((articleRed:any) => article?.topic_refid == articleRed?.topic_refid)){
            queuesDone++
          }
        });
        this.queuesProgressPercentage = Math.floor(queuesDone / this.list_queues.length * 100)

        //graphs progression
        let graphsDone = 0
        this.list_graphs.forEach((article: any) => {
          if(this.articleRed.some((articleRed:any) => article?.topic_refid == articleRed?.topic_refid)){
            graphsDone++
          }
        });
        this.graphsProgressPercentage = Math.floor(graphsDone / this.list_graphs.length * 100)
      }
    },
    async mounted() {
      this.loading = true;
      const user = await lsGetUser() as any;
      if(user?.user_refid) {
        this.user = user;

        await isFundamentalDone(this.user?.user_refid).then( async (response) => {
          //this.loading.algo = false;
          if(!response?.success) {
            Swal.fire({
              title: "Invalid Action",
              html: response?.message,
              icon: "info"
            }).then(() => {
              this.$router.push("/readings");
            })
          }
        });
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
                await this.isArticleGroupDoneLocal().then( async () => {
                  this.loading  = false;
                  printDevLog("Data:", this.$data);
                });
              });
            });
          });
        });
      });

      if(user?.user_refid) {
        await this.loadProgress()
      }
    }
  });

</script>