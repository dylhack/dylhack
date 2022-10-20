<script lang="ts">
import crypto from 'crypto';
import Vue, { Component } from 'vue';
import ProfileCard from "~/components/ProfileCard.vue";

export type BarButtonProps = {
  icon: Component;
  href: string;
}

let pfp = '';
let titles: string[] = [];

export default Vue.extend({
  name: "IndexPage",
  components: { ProfileCard },
  data: () => {
    if (pfp.length === 0) {
      const hash = crypto.createHash('md5');
      const id = hash.update(process.env.EMAIL || "").digest('hex');
      pfp = `https://www.gravatar.com/avatar/${id}.jpg?s=400`;
    }
    if (titles.length === 0) {
      titles = JSON.parse(process.env.TITLES || "[\"Not set\"]");
    }

    return {
      name: process.env.NAME,
      href: process.env.HREF,
      github: process.env.GITHUB,
      bike: process.env.BIKE,
      camera: process.env.CAMERA,
      titles,
      pfp,
    }
  }
});
</script>

<template>
  <div class="index">
    <ProfileCard class="profile" :name=name :titles=titles :href=href :pfp=pfp>
    </ProfileCard>
  </div>
</template>

<style>
@import url("~/static/css/index.css");

.profile,
.nav {
  margin-left: auto;
  margin-right: auto;
}
</style>
