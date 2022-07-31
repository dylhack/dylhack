<script setup lang="ts">
  defineProps({
    url: { type: String, required: true },
    isPage: { type: Boolean, default: false }
  });
</script>

<template>
  <NuxtLink v-if="isPage" :to=url class="foreground button bar-button">
    <slot></slot>
  </NuxtLink>
  <a v-else :href="url" class="foreground button bar-button">
    <slot></slot>
  </a>
</template>
