<template>
  <div class="progress my-2 rounded-0" :style="{height: height + 'px'}">
    <div 
      class="progress-bar bg-success " 
      role="progressbar" 
      :style="{ width: percentage + '%' }" 
      :aria-valuenow=percentage
      aria-valuemin="0" 
      aria-valuemax="100">
      {{ percentage }}%
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "Progressbar",
    props: {
      loading: {
        default: false,
        type: Boolean
      },
      percentage: {
        default: 0,
        type: Number
      },
      height:{
        default: 40,
        type: Number
      }
    }
  });

</script>
