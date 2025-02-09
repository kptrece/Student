<template>
  <div class="row">
    <div class="col-3">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Variable</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Operators</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Control Flow</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-9">
      <swiper class="pt-3" :slides-per-view="1" :space-between="0" @swiper="onSwiper">
        <swiper-slide>
          <div class="card">
            <div class="card-header"><h3>Variable</h3></div>
            <div class="card-body">
              <p>A variable acts as a container for storing data values that can be retrieved or modified during the program's execution. It is essential in DSA for implementing algorithms, as it helps manage data dynamically and efficiently.</p>
              <p>A <strong>variable</strong> in Data Structures and Algorithms (DSA) is a named memory location used to store a value that can change during program execution.</p>
              <img src="/src/assets/img/as-variable.png" alt="Variables Illustration" style="width: 500px; height: auto;">
              <p> It consists of three main parts: <strong>Datatype</strong> (e.g., <code style="background-color: #ccc; border-radius: 4px; padding:2px; color: green;"><bold>int</bold></code> specifies the type of value it stores), <strong>Variable Name</strong> (a unique identifier), and <strong>value</strong> (the actual data assigned, such as <code style="background-color: #ccc; border-radius: 4px; padding:2px; color: green;"><bold>20</bold></code>). When a variable is declared, memory is reserved in RAM for storing its value. Efficient variable management is fundamental in DSA as it directly affects algorithm performance and memory utilization.
              </p>
            </div>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <button class="btn btn-primary btn-lg" style="width: 200px;">Next</button>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="card">
            <div class="card-header"><h3>Operators</h3></div>
            <div class="card-body">
              <p>Operators allow you to perform operations on variables. Here’s an example using the addition operator:</p>
              <pre><code>int x = 10, y = 20, sum = x + y;</code></pre>
              <p>The <code>+</code> operator adds the values of <code>x</code> and <code>y</code>.</p>
              <p>Operators can be used for various operations like subtraction, multiplication, and division.</p>
              <img src="/src/assets/img/as-operators.jpg" alt="Operators Illustration" style="width: 500px; height: auto;">
            </div>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <button class="btn btn-secondary btn-lg me-5" style="width: 200px;">Back</button>
            <button class="btn btn-primary btn-lg" style="width: 200px;">Next</button>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="card">
            <div class="card-header"><h3>Control Flow</h3></div>
            <div class="card-body">
              <p>Control flow determines the order in which statements are executed in your program. The most common control flow statements are <code>if</code>, <code>else</code>, and <code>switch</code></p>
              <pre><code>if (x > 10) {\n  // Do something\n} else {\n  // Do something else\n}</code></pre>
              <p>This is an example of an <code>if-else</code> statement in action.</p>
              <img src="/src/assets/img/as-controlflow.png" alt="Control Flow Illustration">
            </div>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <button class="btn btn-secondary btn-lg me-5" style="width: 200px;">Read Again</button>
            <button class="btn btn-primary btn-lg" style="width: 250px;">Proceed to Excercises</button>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';

  export default defineComponent({
    name: "TopicItem",
    components: { Swiper, SwiperSlide },
    data() {
      return {
        swiper: {} as any
      }
    },
    methods: {
      onSwiper(swiper: any) {
        this.swiper = swiper;
      }
    }
  });

</script>