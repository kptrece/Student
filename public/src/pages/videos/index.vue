<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <h1 class="mt-5 text-center">Video Tutorials</h1>
        <p class="text-center">For more interactive learning we provide videos as further references for each topic</p>
        <div class="row">
          <div class="col-3">
            <h5>Data Structures</h5>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td style="width: 40px;">1</td>
                  <td>Arrays</td>
                  <td><button class="btn btn-primary btn-sm" @click="onChangeVideo(0)">Watch</button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Linked Lists</td>
                  <td><button class="btn btn-primary btn-sm" @click="onChangeVideo(1)" >Watch</button></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Stacks</td>
                  <td><button class="btn btn-primary btn-sm"  @click="onChangeVideo(2)">Watch</button></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Queues</td>
                  <td><button class="btn btn-primary btn-sm">Watch</button></td>
                </tr>
              </tbody>
            </table>
            <h5>Programming Basics</h5>
          </div>
          <div class="col-9">
            <swiper class="pt-3" :slides-per-view="1" :space-between="0" @swiper="onSwiper">
              <swiper-slide>
                <div class="card">
                  <div class="card-header">Arrays</div>
                  <div class="card-body p-0 m-0">
                    <iframe src="https://www.youtube.com/embed/eXFItikqw8c" allow="autoplay; encrypted-media" allowfullscreen style="width: 100%;height: 500px;"></iframe>
                    <h3 class="p-3">1D, 2D arrays, operations like insertion, deletion, and traversa</h3>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="card">
                  <div class="card-header">Linked Lists</div>
                  <div class="card-body p-0 m-0">
                    <iframe src="https://www.youtube.com/embed/R9PTBwOzceo" allow="autoplay; encrypted-media" allowfullscreen style="width: 100%;height: 500px;"></iframe>
                    <h3 class="p-3">Singly, Doubly, Circular linked lists</h3>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                
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
  import { Swiper, SwiperSlide } from 'swiper/vue';

  export default defineComponent({
    name: "VideosPage",
    components: { SectionFooter, SectionHeader, Swiper, SwiperSlide },
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