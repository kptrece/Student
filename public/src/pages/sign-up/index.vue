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
                  <h1 class="text-center">Sign Up</h1>
                  <div class="mt-5">
                    <div class="mb-3">
                      <label class="form-label">Firstname</label>
                      <input v-model="form.firstname" class="form-control form-control-lg" type="text" />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Lastname</label>
                      <input v-model="form.lastname" class="form-control form-control-lg" type="text" />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input v-model="form.email" class="form-control form-control-lg" type="text" />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Password</label>
                      <input v-model="form.password" class="form-control form-control-lg" type="password" />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Confirm Password</label>
                      <input v-model="form.confirm_password" class="form-control form-control-lg" type="password" />
                    </div>
                    <div class="mt-2 d-flex flex-column"> 
                      <button class="btn btn-primary btn-lg rounded-5 w-50 mx-auto" @click="register()" :disabled="loading">Sign up</button>
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
  import { printDevLog, SystemMessage, createStudent } from '@/uikit-api';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
import type { register } from 'module';

  export default defineComponent({
    name: "Sign Up",
    components: { SectionFooter, SectionHeader },
    data() {
      return {
        loading: false,
        form: {
          email: '',
          password: '',
          confirm_password: '',
          firstname: '',
          lastname: '',
          created_by: ''
        }
      }
    },
    methods: {
      resetData(){
        this.form.email = ''
        this.form.firstname = ''
        this.form.lastname = ''
        this.form.created_by = ''
        this.form.password = ''
        this.form.confirm_password = ''
      },
      async register() {
        this.loading = true;
        await createStudent(this.form).then( async (response) => {
          this.loading = false;
          if(response.success) {
            //this.$router.replace('/');
            this.resetData()
            this.$toast.success(response?.message)
          }
          else {
            this.$toast.warning(response?.message)
          }
        });
      }
    }
  });

</script>