<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-white" style="background-color: #161166;"><small>Category</small></th>
        <th class="text-white" style="background-color: #161166;"><small>Correct</small></th>
        <th class="text-white" style="background-color: #161166;"><small>Wrong</small></th>
        <th class="text-white" style="background-color: #161166;"><small>Total</small></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Arrays</td>
        <td>8</td>
        <td>2</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Searching</td>
        <td>0</td>
        <td>0</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Sorting</td>
        <td>0</td>
        <td>0</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Linked List</td>
        <td>0</td>
        <td>0</td>
        <td>10</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "Categories",
    props: {
      title: {
        default: 'Untitled',
        type: String
      }
    }
  });

</script>