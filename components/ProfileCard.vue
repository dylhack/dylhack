<script setup lang="ts">
import Vue from 'vue';
// NOTE(dylhack): vue-typed-js does not have typedefs
// @ts-ignore
import Typed from 'vue-typed-js';

export type ProfileProps = {
  name?: string;
  pfp?: string;
  href?: string;
  titles: string[];
}

Vue.use(Typed);

defineProps<ProfileProps>();
</script>

<template>
  <div class="foreground profile">
    <img :src=pfp alt="myself" />
    <div class="profile-details">
      <h1>{{ name }}</h1>
      <vue-typed-js :back-speed="20" :show-cursor="false" :strings="titles">
        <h2 class="typing"></h2>
      </vue-typed-js>
    </div>
    <a :href=href>
      <input class="button book-me" type="button" value="Book Me">
    </a>
  </div>
</template>

<style scoped>
.profile {
  /* Sizing */
  width: 35%;
  min-width: 300px;
  max-width: 400px;
  padding: 4% 1%;
  gap: 25px;

  /* Organization */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.typing {
  margin-left: auto;
  margin-right: auto;
}

h1 {
  font-size: 2.5em;
  font-family: 'Satoshi';
}

h2 {
  font-size: 2em;
  font-family: 'Chakra Petch';
  font-weight: 300;
}

img {
  /* Sizing */
  width: 65%;
  margin-left: auto;
  margin-right: auto;
  /* Appearance */
  border: 2px solid #000;
  border-radius: 100%;
}

.profile-details {
  /* Sizing */
  width: 100%;
  line-height: 0;
  /* Organization */
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.book-me {
  /* Sizing */
  font-size: 2.5em;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 10px 0 10px;
}
</style>
