<script lang="ts">
  import { VITE_HOST, VITE_SOCIALS, repeat } from "./main";
  import Host from "./lib/Host.svelte";
  import Cat from "./lib/Cat.svelte";
  import Social from "./lib/Social.svelte";
  import TaskBarButton from "./lib/TaskBarButton.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  const options = {};

  type Social = { name: string; href?: string };

  export let hostName = VITE_HOST;
  export let socials: Social[] = VITE_SOCIALS;
  const [name, tld] = hostName.split(".");

  $: isLocked = true;

  let i = 0;
  const getI = () => i++;
  const onUnlock = () => {
    isLocked = false;
  };
  const onLock = () => {
    isLocked = true;
    i = 0;
  };

  document.title = hostName;
</script>

<main>
  <SvelteToast {options} />
  <div class="cat">
    <Cat />
  </div>
  <div class="taskbar">
    <TaskBarButton
      on:unlock={onUnlock}
      on:lock={onLock}
      locked="X"
      unlocked="-"
    />
    <Host {name} tld={"." + tld} />
  </div>
  <!-- TODO(dylhack): add animations つ ◕_◕ ༽つ -->
  {#if !isLocked}
    <p>|{repeat(" ")}|</p>
    {#each socials as social}
      <Social name={social.name} href={social.href} key={getI()} />
    {/each}
    <p>'{repeat("-")}'</p>
  {/if}
</main>

<style>
  main {
    line-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    gap: 0;
  }

  .cat {
    margin-left: 33%;
    cursor: pointer;
  }

  .taskbar {
    display: flex;
    flex-direction: row;
  }
</style>
