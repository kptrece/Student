<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <h1 class="mt-5">Fundamentals of Programming</h1>
        <p>Your interactive guide to learning programming fundamentals</p>
        <div class="row">
          <div class="col-3">
            <Courses title="Data Structure" :list="da" @view="onView" />
            <Courses title="Algorithm" :list="ag" @view="onView"/>
          </div>
          <div class="col-9" v-html="article?.content"></div>
        </div>
      </div>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { fetchAllArticlesDA, fetchAllArticlesAG, printDevLog, fetchSingleArticleByTopic } from "@/uikit-api";
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import Courses from "./components/Courses.vue";

  export default defineComponent({
    name: "ReadingsPage",
    components: { Courses, SectionFooter, SectionHeader },
    data() {
      return {
        da: {} as any,
        ag: {} as any,
        article: '' as any
      }
    },
    methods: {
      async fetchArticles() {
        await fetchAllArticlesDA().then( async (da) => {
          this.da = da;
          await fetchAllArticlesAG().then( async (ag) => {
            this.ag = ag;
          });
        });
      },
      async onView(event: any) {
        await fetchSingleArticleByTopic(event?.topic_refid).then( async (article) => {
          if(article.length > 0) {
            this.article = article[0];
          }
          else {
            this.$toast.warning("No article found");
          }
        });
      }
    },
    async mounted() {
      await this.fetchArticles().then( async () => {
        printDevLog("Readings:", toRaw(this.$data));
      });
    }
  });

</script>