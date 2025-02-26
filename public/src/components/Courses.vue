<template>
  <div>
    <table class="table table-striped" style="width: 100%;">
      <thead class="bg-dark">
        <tr>
          <th colspan="2">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in list" :key="i">
          <td><small>{{ item?.name }}</small></td>
          <td style="width: 90px;">
            <button class="btn btn-primary btn-sm" @click="()=>{ $emit('view', item) }">
              <i v-if="btn_disabled" class="bi bi-lock-fill me-1"></i>
              <i v-else class="bi bi-unlock-fill me-1"></i>
              <span>Read</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
      },
      btn_disabled: {
        default: true,
        type: Boolean
      }
    }
  });
</script>