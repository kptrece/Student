<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <SectionSlider/>
      <SectionFeatures/>
      <SectionTeam/>
    </main>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionSlider from "@/components/SectionSlider.vue";
  import SectionFeatures from "@/components/SectionFeatures.vue";
  import SectionTeam from "@/components/SectionTeam.vue";

  export default defineComponent({
    name: "AsessmentPage",
    components: { SectionHeader, SectionSlider, SectionFeatures, SectionTeam }
  });

</script>