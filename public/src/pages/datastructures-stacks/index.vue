<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <div class="row m-5 p-5">
          <div clas="col-12">
            <h1 class="text-center pb-5">Stacks Visualization</h1>
          </div>
          <div class="col-12 mb-5">
            <div class="bg-dark p-5 m-0"></div>
          </div>
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