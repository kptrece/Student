<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <div class="row mt-5">
          <div clas="col-12">
            <h1 class="text-center pb-5">Stacks Visualization</h1>
          </div>
          <iframe class="w-100 border-0" style="height: 600px;"  src="https://algo-spear-visualization.web.app/stacks.html"></iframe>
        </div>
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
    name: "VisualizationStacksPage",
    components: { SectionFooter, SectionHeader }
  });

</script>