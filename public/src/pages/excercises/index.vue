<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <div class="row mt-5 pt-5">
          <div class="col-3">
            <Categories title="Categories"/>
          </div>
          <div class="col-9">
            <h1>Exercises for Arrays</h1>
            <p>Read the question carefully and submit your answer, skipping questions is strictly not allowed</p>
            <swiper class="pt-3" :slides-per-view="1" :space-between="0" @swiper="onSwiper">
              <swiper-slide>
                <div class="card">
                  <div class="card-header">Question 1 of 10</div>
                  <div class="card-body">
                   <p>In a queue with the elements [3, 6, 9, 12], the element at the front of the queue is _________.</p>
                   <input type="text" class="form-control" />
                   <button class="btn btn-primary btn-lg mt-4">Submit Answer</button>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="card">
                  <div class="card-header">Question 2 of 10</div>
                  <div class="card-body">
                   <p>In a queue with the elements [3, 6, 9, 12], the element at the front of the queue is _________.</p>
                   <input type="text" class="form-control" />
                   <button class="btn btn-primary btn-lg mt-4">Submit Answer</button>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
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
  import Categories from "./components/Categories.vue";
  import { Swiper, SwiperSlide } from 'swiper/vue';

  export default defineComponent({
    name: "ExcercisesPage",
    components: { Categories, SectionFooter, SectionHeader, Swiper, SwiperSlide },
    data() {
      return {
        swiper: {} as any
      }
    },
    methods: {
      onSwiper(swiper: any) {
        this.swiper = swiper;
      },
      onChangeVideo(index: number) {
        this.swiper.slideTo(index);
      }
    }
  });

</script>