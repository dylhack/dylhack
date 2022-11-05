<script lang="ts">
  import Host from "./lib/Host.svelte";
  import Cat from "./lib/Cat.svelte";
  import Social from "./lib/Social.svelte";
  import TaskBarButton from "./lib/TaskBarButton.svelte";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  type Social = { name: string; href?: string };

  const hostName = import.meta.env.VITE_HOST || "example.com";;
  const socials: Social[] = JSON.parse(import.meta.env.VITE_SOCIALS || '[{ "name": "GitHub", "href": "https://github.com/dylhack"}]');
  const [name, tld] = hostName.split(".");
  const options = {};
  const padding = 1;

  // Taskbar Button
  const buttonLocked = '+';
  const buttonUnlocked = '-';
  const buttonPadding = padding;
  const buttonLength = Math.max(buttonLocked.length, buttonUnlocked.length) + buttonPadding * 2;

  // Socials length
  const socialsOffset = buttonLength + 2;
  const socialsPadding = padding;
  // NOTE(dylhack): 13 is the length of the cat
  let socialsLength = socialsOffset + 13;
  socials.forEach(social => {
    const x = socialsOffset + social.name.length;
    if (x > socialsLength) socialsLength = x;
  });

  console.log(socialsLength);
  // Host
  const hostsLength = (socialsLength + socialsPadding) - (buttonLength + 1);

  let i = 0;
  $: isLocked = true;

  const getI = () => i++;
  const onUnlock = () => {
    isLocked = false;
  };
  const onLock = () => {
    isLocked = true;
    i = 0;
  };

  const onSocialInteraction = (social: Social) => {
    const { name, href } = social;
    if (href) window.open(href, '_blank');
    else {
      navigator.clipboard.writeText(name);
      toast.push('Copied!', { duration: 2000 });
    }
  }
  const onSocialClick = (e: CustomEvent<{ name: string, href?: string }>) => {
    onSocialInteraction(e.detail);
  }
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    if ((/[0-9]/).test(e.key)) {
      const n = parseInt(e.key);
      if (n < socials.length) {
        const social = socials[n];
        if (social) onSocialInteraction(social);
      }
    }
  });

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
    <Host {name} tld={"." + tld} maxLength={hostsLength} />
  </div>
  <!-- TODO(dylhack): add animations つ ◕_◕ ༽つ -->
  {#if !isLocked}
    <p>|{" ".repeat(socialsLength + socialsPadding)}|</p>
    {#each socials as social}
      <Social
        name={social.name} href={social.href} 
        key={getI()} 
        padding={socialsPadding}
        maxLength={socialsLength} 
        on:click={onSocialClick}
      />
    {/each}
    <p>'{"-".repeat(socialsLength + socialsPadding)}'</p>
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
    margin-left: auto;
    cursor: pointer;
  }

  .taskbar {
    display: flex;
    flex-direction: row;
  }
</style>
