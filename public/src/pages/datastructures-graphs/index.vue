<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <div class="row mt-5">
          <div clas="col-12">
            <h1 class="text-center py-5">Graph Visualization</h1>
          </div>
        </div>
        <iframe class="w-100 border-0" style="height: 800px;"  src="https://algo-spear-visualization.web.app/graphs.html"></iframe>
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
    name: "VisualizationGraphPage",
    components: { SectionFooter, SectionHeader }
  });

</script>