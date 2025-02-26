<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <h1 class="mt-5 text-center">Learning Materials</h1>
        <div class="p-5">
          <div class="row mt-5">
            <div class="col-4">
              <div class="card">
                <img src="/src/assets/img/as-fundamental-of-programming.jpg" />
                <div class="card-body">
                  <h5>Fundamental of Programming</h5>
                  <p>Refer to the core principles and building blocks that underpin all software development. These include concepts like variables, data types, control structures, functions, and algorithms.</p>
                </div>
                <div class="card-footer">
                  <button class="btn btn-primary w-100" @click="readFundamentalOfProgramming()">Read</button>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card">
                <img src="/src/assets/img/as-data-structure.png" />
                <div class="card-body">
                  <h5>Data Structure</h5>
                  <p>Data structures are a specific way of organizing data in a specialized format on a computer so that the information can be organized, processed, stored, and retrieved quickly and effectively.</p>
                </div>
                <div class="card-footer">
                  <button class="btn btn-primary w-100" @click="readDataStructure()">
                    <i class="bi bi-lock-fill me-2"></i>
                    <span>Read</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card">
                <img src="/src/assets/img/as-algorithms.png" />
                <div class="card-body">
                  <h5>Algorithms</h5>
                  <p>A programming algorithm is a procedure or formula used for solving a problem. It is based on conducting a sequence of specified actions in which these actions describe how to do something.</p>
                </div>
                <div class="card-footer">
                  <button class="btn btn-primary w-100" @click="readAlgorithms()">
                    <i class="bi bi-lock-fill me-2"></i>
                    <span>Read</span>
                  </button>
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
  import { isArticleGroupDone, isFundamentalDone, createReadLogs, scrollToTop, fetchAllArticlesFunOfProg, fetchAllArticlesGraphs, fetchAllArticlesQueues, fetchAllArticlesStacks, fetchAllArticlesArrays, fetchAllArticlesLinkedList, printDevLog, fetchSingleArticleByTopic, lsGetUser } from "@/uikit-api";
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import Courses from "@/components/Courses.vue";
  import Swal from 'sweetalert2';

  export default defineComponent({
    name: "ReadingsPage",
    components: { Courses, SectionFooter, SectionHeader },
    data() {
      return {
        user: {} as any
      }
    },
    methods: {
      async readFundamentalOfProgramming() {
        this.$router.push("/readings-fundamental-of-programming");
      },
      async readDataStructure() {
        await isFundamentalDone(this.user?.user_refid).then( async (response) => {
          if(response?.success) {
            this.$router.push("/readings-data-structure");
          }
          else {
            Swal.fire({
              title: "Invalid Action",
              html: response?.message,
              icon: "info"
            });
          }
        });
      },
      async readAlgorithms() {
        await isFundamentalDone(this.user?.user_refid).then( async (response) => {
          if(response?.success) {
            this.$router.push("/readings-algorithms");
          }
          else {
            Swal.fire({
              title: "Invalid Action",
              html: response?.message,
              icon: "info"
            });
          }
        });
      }
    },
    async mounted() {
      const user = await lsGetUser() as any;
      if(user?.user_refid) {
        this.user = user;
      }
    }
  });

</script>