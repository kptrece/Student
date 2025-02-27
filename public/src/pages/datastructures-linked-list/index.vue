<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <div class="row mt-5">
          <div clas="col-12">
            <h1 class="text-center pb-5">Linked List Visualization</h1>
          </div>
        </div>
        <SectionVisualizationTimer group_code="LINKED_LIST"/>
        <iframe class="w-100 border-0" style="height: 600px;"  src="https://algo-spear-visualization.web.app/linkedlist.html"></iframe>
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
    name: "VisualizationLinkedListPage",
    components: { SectionVisualizationTimer, SectionFooter, SectionHeader }
  });

</script>