<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <div class="row mt-5">
          <div clas="col-12">
            <h1 class="text-center">Searching Visualization</h1>
          </div>
        </div>
        <SectionVisualizationTimer group_code="SEARCH"/>
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
  import SectionVisualizationTimer from "@/components/SectionVisualizationTimer.vue";

  export default defineComponent({
    name: "VisualizationArrayPage",
    components: { SectionVisualizationTimer, SectionFooter, SectionHeader }
  });

</script>