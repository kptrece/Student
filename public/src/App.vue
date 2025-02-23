

<template>
  <RouterView />
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { RouterView } from 'vue-router';
  import { useHead } from '@unhead/vue';
  import Aos from 'aos';
  
  export default defineComponent({
    name: 'MainApp',
    components: { RouterView },
    watch: {
      $route: async function () {
        const route = this.$route;
        useHead({
          title: route.meta?.title + ''
        })
      }
    },
    async mounted() {
      setTimeout(() => {
        Aos.init();
      },1500);
    },
  });


</script>