<template>
  <div>
    <SectionHeader/>
    <main class="main py-5">
      <div class="w-100 h-100">
        <div class="d-block w-100 py-5"></div>
        <div class="h-100 d-flex justify-content-center align-items-center my-5">
          <div class="row mt-5">
            <div class="card">
              <div class="card-body">
                <div style="width: 450px;">
                  <h1 class="text-center">AlgoSpear</h1>
                  <div class="mt-5">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input v-model="form.email" class="form-control form-control-lg" type="text" />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Password</label>
                      <input v-model="form.password" class="form-control form-control-lg" type="password" />
                    </div>
                    <div class="d-flex justify-content-between mt-4">
                      <a href="">forget password?</a>
                      <button class="btn btn-primary btn-lg rounded-5 w-50" @click="login()" :disabled="loading">{{ loading ? 'Please wait..':'Sign In' }}</button>
                    </div>
                    <div class="mt-5 d-flex flex-column">
                      <span class="mx-auto">don't have an account?</span>
                      <router-link to="/sign-up" class="d-flex"><button class="btn btn-primary btn-lg rounded-5 w-50 mx-auto" :disabled="loading">Sign up</button></router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-block w-100 py-5 my-5"></div>
      </div>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { printDevLog, SystemMessage, userStudentSignIn, isAuthenticated } from '@/uikit-api';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";

  export default defineComponent({
    name: "ExcercisesPage",
    components: { SectionFooter, SectionHeader },
    data() {
      return {
        loading: false,
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async login() {
        this.loading = true;
        await userStudentSignIn(this.form).then( async (response) => {
          this.loading = false;
          if(response.success) {
            this.$router.replace('/');
          }
          else {
            this.$toast.warning(response?.message)
          }
        });
      }
    },
    async mounted(){
      if(isAuthenticated()){
        this.$router.replace('/');
      }
    }
  });

</script>