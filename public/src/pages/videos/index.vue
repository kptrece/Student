<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="container mt-5 py-5">
        <div class="row mt-5 ">
          <div class="col-4">
            <div style="padding: 47px;"></div>
            <div class="card mb-4" v-for="(video, vi) in videos" :key="vi">
              <div class="card-header text-white" style="background-color: rgb(22 17 102);">{{ video?.header?.name }}</div>
              <div class="card-body p-0 m-0">
                <div v-if="video?.videos.length == 0" class="alert alert-warning m-3">
                  <p>This category has no uploaded video yet. Try again later.</p>
                </div>
                <table class="table table-striped">
                  <tbody>
                    <tr v-for="(v, i) in video?.videos" :key="i">
                      <td><small>{{ v?.title }}</small></td>
                      <td><button class="btn btn-primary btn-sm" @click="onWatchVideo(v)" >Watch</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-8">
            <h1 class="text-center">Video Tutorials</h1>
            <p class="text-center">For more interactive learning we provide videos as further references for each topic</p>
            <iframe :src="`https://www.youtube.com/embed/${ video_code }`" allow="autoplay; encrypted-media" allowfullscreen style="width: 100%;height: 500px;"></iframe>
            <h3>{{ video_title }}</h3>
            <p>{{ video_description }}</p>
          </div>
        </div>
      </div>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { printDevLog, queryURL } from '@/uikit-api';

  export default defineComponent({
    name: "VideosPage",
    components: { SectionFooter, SectionHeader, Swiper, SwiperSlide },
    data() {
      return {
        swiper: {} as any,
        videos: {} as any,
        video_code: 'MHwmmiZ5LHs',
        video_title: '',
        video_description: ''
      }
    },
    methods: {
      onSwiper(swiper: any) {
        this.swiper = swiper;
      },
      onChangeVideo(index: number) {
        this.swiper.slideTo(index);
      },
      async onFetchVideos() {
        await queryURL({  url: "util_quiz/videoTutorials" }).then( async (videos) => {
          this.videos = videos;
        });
      },
      onWatchVideo(video: any) {
        printDevLog("Video:", toRaw(video));
        this.video_code         = video?.video_code;
        this.video_title        = video?.title;
        this.video_description  = video?.description;
      }
    },
    async mounted() {
      await this.onFetchVideos().then( async () => {
        printDevLog("Videos:", toRaw(this.$data));
      });
    },
  });

</script>