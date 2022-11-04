<script lang="ts">
  import Host from "./lib/Host.svelte";
  import Cat from "./lib/Cat.svelte";
  import Social from "./lib/Social.svelte";
  import TaskBarButton from "./lib/TaskBarButton.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  type Social = { name: string; href?: string };

  const hostName = import.meta.env.VITE_HOST;
  const socials: Social[] = JSON.parse(import.meta.env.VITE_SOCIALS);
  const [name, tld] = hostName.split(".");
  const options = {};

  // Taskbar Button
  const buttonLocked = '+';
  const buttonUnlocked = '-';
  const buttonPadding = 1;
  const buttonLength = Math.max(buttonLocked.length, buttonUnlocked.length) + buttonPadding * 2;

  // Socials length
  const socialsLength = buttonLength + 1 + 27;

  let i = 0, width = 0;
  $: isLocked = true;

  const getI = () => i++;
  const onUnlock = () => {
    isLocked = false;
  };
  const onLock = () => {
    isLocked = true;
    i = 0;
  };
  const getWidth = (): number => {
    if (width > 0) return width;
    socials.forEach((social) => {
    });
    return width;
  };

  document.title = hostName;
  console.debug({ hostName, socials });
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
      locked={buttonLocked}
      unlocked={buttonUnlocked}
      maxLength={buttonLength}
      padding={buttonPadding}
    />
    <Host {name} tld={"." + tld} maxLength={27} />
  </div>
  <!-- TODO(dylhack): add animations つ ◕_◕ ༽つ -->
  {#if !isLocked}
    <p>|{" ".repeat(socialsLength)}|</p>
    {#each socials as social}
      <Social name={social.name} href={social.href} key={getI()} maxLength={socialsLength} />
    {/each}
    <p>'{"-".repeat(socialsLength)}'</p>
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
