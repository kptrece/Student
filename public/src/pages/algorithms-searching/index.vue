<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <iframe class="w-100 border-0" style="height: 1300px;"  src="https://algo-spear-visualization.web.app/searching.html"></iframe>
      </div>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";

  export default defineComponent({
    name: "VisualizationArrayPage",
    components: { SectionFooter, SectionHeader }
  });

</script>