<script setup lang="ts">
import GitHubVue from './icons/GitHub.vue';
// import BikeIconVue from './icons/BikeIcon.vue';
// import CameraIconVue from './icons/CameraIcon.vue';
import NavButton from './NavButton.vue';

defineProps({
  github: { type: String, default: '' },
  // bike: { type: String, default: '' },
});
</script>

<template>
  <div class="bar">
    <NavButton :url="github">
      <GitHubVue></GitHubVue>
    </NavButton>
    <!-- NOTE(dylhack): not ready -->
    <!-- <NavButton url="/gallery">
      <CameraIconVue></CameraIconVue>
    </NavButton>
    <NavButton :url="bike">
      <BikeIconVue></BikeIconVue>
    </NavButton> -->
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  flex-direction: row;
  gap: 25px;
}

.bar-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 84px;
  height: 84px;
}

.bar-button:hover>svg {
  filter: contrast(50%);
}

svg {
  transform: scale(70%);
}
</style>
