<template>
  <div class="p-5 mx-5">
    <div class="row">
      <div class="col-4 mb-5" v-for="(topic, ti) in excercise" :key="ti">
        <div class="card">
          <img src="/src/assets/img/excercises-banner.png" />
          <div class="card-body">
            <h3>{{ topic?.header?.name }}</h3>
            <table>
              <tbody>
                <tr>
                  <td style="width: 180px;">Number of items</td>
                  <td>: {{ jlconfig.quiz_limit }}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:
                    <span v-if="topic?.completed && topic?.passed" class="badge bg-success">Passed</span>
                    <span v-else-if="topic?.completed && !topic?.passed" class="badge bg-danger">Fail</span>
                    <span v-else class="badge bg-secondary">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer d-flex justify-content-end">
            <!-- <button class="btn btn-secondary w-100" @click="locked ? onSelectExam(topic) : onSelectExam(topic)"> -->
            <button class="btn btn-secondary w-100" @click="locked ? $toast.warning('all exercise must passed') : onSelectExam(topic)">
              <i v-if="topic?.completed || locked" class="bi bi-lock-fill me-1"></i>
              <i v-else class="bi bi-unlock-fill me-1"></i>
              <span>{{ topic?.attempt > 0 && !topic?.passed ? 'Take again': topic?.attempt > 0 && topic?.passed ? 'Completed':'Start Now' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { isAuthenticated } from '@/uikit-api';
  import Swal from 'sweetalert2';

  import jlconfig from "@/jlconfig.json";

  export default defineComponent({
    name: "TopicList",
    emits: ['view'],
    props: {
      excercise: {
        default: {},
        type: Object
      },
      locked: {
        default: true
      }
    },
    setup() {
      return {
        jlconfig
      }
    },
    methods: {
      onSelectExam(exam: any) {
      if(isAuthenticated()){
        this.$emit('view', toRaw(exam));
      }else{
        Swal.fire({
              title: "Sign In Required",
              text: "You need to sign in to start a quiz",
              icon: "info"
            }).then( async () => {
              this.$router.replace('/login');
            });
      }
      }
    }
  });

</script>