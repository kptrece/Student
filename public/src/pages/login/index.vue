<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="w-100 h-100">
        <div class="h-100 d-flex justify-content-center align-items-center">
          <div class="row">
            <div class="card">
              <div class="card-body">
                <div style="max-width: 375px;">
                  <h1 class="text-cenetr">Algo Spear</h1>
                  <div class="px-5 mt-4">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input class="form-control form-control-lg" type="text" />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input class="form-control form-control-lg" type="password" />
                      </div>
                      <div class="d-flex justify-content-end">
                        <button class="btn btn-primary btn-lg w-50">Sign In</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
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
    name: "ExcercisesPage",
    components: { SectionFooter, SectionHeader }
  });

</script>