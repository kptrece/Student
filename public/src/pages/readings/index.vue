<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <h1 class="mt-5">Fundamentals of Programming</h1>
        <p>Your interactive guide to learning programming fundamentals</p>
        <CourseViewer/>
      </div>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import CourseViewer from "./components/CourseViewer.vue";

  export default defineComponent({
    name: "ReadingsPage",
    components: { SectionFooter, SectionHeader, CourseViewer },
  });

</script>