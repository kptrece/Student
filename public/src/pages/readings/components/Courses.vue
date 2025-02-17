<template>
  <div>
    <h3>{{ title }}</h3>
    <ol>
      <li v-for="(item, i) in list" :key="i" @click="()=>{ this.$emit('view', item) }" >{{ item?.name }}</li>
    </ol>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from "vue";

  export default defineComponent({
    emits: ['view'],
    props: {
      title: {
        default: "Untitled",
        type: String
      },
      list: {
        default: {} as any,
        type: Object
      }
    }
  });
</script>