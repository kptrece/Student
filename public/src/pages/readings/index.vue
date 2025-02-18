<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <h1 class="mt-5">Learning Materials</h1>
        <div class="row mt-5">
          <div class="col-4">
            <Courses title="Fundamental of Programming" :list="fun_of_prog" @view="onView" />
            <h4 class="fw-bold">Data Structures</h4>
            <Courses title="Arrays" :list="arrays" @view="onViewDataStructure" />
            <Courses title="Linked List" :list="linked_list" @view="onViewLinkList"/>
            <Courses title="Stacks" :list="stacks" @view="onViewStacks"/>
            <h4 class="fw-bold">Algorithms</h4>
            <Courses title="Queues" :list="queues" @view="onViewQueues"/>
            <Courses title="Graphs" :list="graphs" @view="onViewGraphs"/>
          </div>
          <div class="col-8">
            <h1 class="text-center">{{ article?.title }}</h1>
            <h3 class="text-center my-4">{{ article?.description }}</h3>
            <div class="text-dark" v-html="article?.content"></div>
          </div>
        </div>
      </div>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { isArticleGroupDone, isFundamentalDone, createReadLogs, scrollToTop, fetchAllArticlesFunOfProg, fetchAllArticlesGraphs, fetchAllArticlesQueues, fetchAllArticlesStacks, fetchAllArticlesArrays, fetchAllArticlesLinkedList, printDevLog, fetchSingleArticleByTopic, lsGetUser } from "@/uikit-api";
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import Courses from "./components/Courses.vue";
  import Swal from 'sweetalert2';

  export default defineComponent({
    name: "ReadingsPage",
    components: { Courses, SectionFooter, SectionHeader },
    data() {
      return {
        user: {} as any,
        fun_of_prog: {} as any,
        arrays: {} as any,
        linked_list: {} as any,
        stacks: {} as any,
        queues: {} as any,
        graphs: {} as any,
        article: '' as any
      }
    },
    methods: {
      async fetchArticles() {
        await fetchAllArticlesFunOfProg().then( async (fun_of_prog) => {
          this.fun_of_prog = fun_of_prog;
          await fetchAllArticlesArrays().then( async (arrays) => {
            this.arrays = arrays;
            await fetchAllArticlesLinkedList().then( async (linked_list) => {
              this.linked_list = linked_list;
              await fetchAllArticlesStacks().then( async (stacks) => {
                this.stacks = stacks;
                await fetchAllArticlesQueues().then( async (queues) => {
                  this.queues = queues;
                  await fetchAllArticlesGraphs().then( async (graphs) => {
                    this.graphs = graphs;
                  });
                });
              });
            });
          });
        });
      },
      async onViewDataStructure(event: any) {
        await isFundamentalDone(this.user?.user_refid).then( async (response) => {
          if(response?.success) {
            await this.onView(event);
          }
          else {
            Swal.fire({
              title: "Required",
              html: response?.message,
              icon:"warning"
            });
          }
        });
      },
      async onViewLinkList(event: any) {
        await isArticleGroupDone(this.user?.user_refid, 'ARRAYS').then( async (response) => {
          if(response?.success) {
            await this.onView(event);
          }
          else {
            Swal.fire({
              title: "Required",
              html: response?.message,
              icon:"warning"
            });
          }
        });
      },
      async onViewStacks(event: any) {
        await isArticleGroupDone(this.user?.user_refid, 'LINKED_LIST').then( async (response) => {
          if(response?.success) {
            await this.onView(event);
          }
          else {
            Swal.fire({
              title: "Required",
              html: response?.message,
              icon:"warning"
            });
          }
        });
      },
      async onViewQueues(event: any) {
        await isArticleGroupDone(this.user?.user_refid, 'STACKS').then( async (response) => {
          if(response?.success) {
            await this.onView(event);
          }
          else {
            Swal.fire({
              title: "Required",
              html: response?.message,
              icon:"warning"
            });
          }
        });
      },
      async onViewGraphs(event: any) {
        await isArticleGroupDone(this.user?.user_refid, 'QUEUES').then( async (response) => {
          if(response?.success) {
            await this.onView(event);
          }
          else {
            Swal.fire({
              title: "Required",
              html: response?.message,
              icon:"warning"
            });
          }
        });
      },
      async onView(event: any) {
        await fetchSingleArticleByTopic(event?.topic_refid).then( async (article) => {
          if(article.length > 0) {
            scrollToTop();
            this.article = article[0];
            await createReadLogs({ article_refid: article[0]?.article_refid, topic_refid: article[0]?.topic_refid, user_refid: this.user?.user_refid});
          }
          else {
            this.$toast.warning("No article found");
          }
        });
      }
    },
    async mounted() {
      const user = await lsGetUser() as any;
      if(user?.user_refid) {
        this.user = user;
      }
      else {
        this.$toast.warning("Login to log reading history.")
      }
     
      await this.fetchArticles().then( async () => {
        printDevLog("Readings:", toRaw(this.$data));
      });
    }
  });

</script>