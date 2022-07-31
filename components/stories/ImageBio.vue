<script setup lang="ts">
type ImageBioPros = {
  name: string;
  desc: string;
  date: string;
  image: string;
}
defineProps<ImageBioPros>();
</script>

<template>
  <div class="imgbio">
    <img :src=image alt="the event">
    <div class="details">
      <div class="summary">
        <h1>{{ name }}</h1>
        <h2>{{ date }}</h2>
      </div>
      <p>{{ desc }}</p>
    </div>
  </div>
</template>

<style scoped>
.imgbio {
  display: flex;
  flex-direction: row;
  gap: 25px;
  border: 2px solid #000;
  border-radius: 30px;
  max-width: 800px;
}

img {
  max-width: 400px;
  border: 2px solid #000000;
  border-radius: 30px;
  aspect-ratio: 1 / 1;
}

.imgbio .details {
  display: flex;
  flex-direction: column;
}
</style>
