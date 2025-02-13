<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="p-5 m-5 bg-dark mt-5" style="margin-top: 200px;"></div>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";

  export default defineComponent({
    name: "CoursesPage",
    components: { SectionFooter, SectionHeader }
  });

</script>