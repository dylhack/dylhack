<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import Host from "./Host.svelte";
  import Cat from "./Cat.svelte";
  import Social from "./Social.svelte";
  import TaskBarButton from "./TaskBarButton.svelte";
	import { onMount } from "svelte";

  export let hostname = 'example.com';
  export let socials: Socials[] = [{ "name": "GitHub", "href": "https://github.com/dylhack" }];
  export let title = hostname;
  export let description = `${hostname}'s personal website.`
  export let image = `https://${hostname}/image.png`; 

  // Meta tags
  const [name, tld] = hostname.split(".");
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

  // Host
  const hostsLength = (socialsLength + socialsPadding) - (buttonLength + 1);

  $: isLocked = true;

  const onUnlock = () => isLocked = false;
  const onLock = () => isLocked = true;
  const onSocialInteraction = (social: Socials) => {
    const { name, href } = social;
    if (href) window.open(href, '_blank');
    else {
      navigator.clipboard.writeText(name);
      toast.push('Copied!', { duration: 2000 });
    }
  }
  const onSocialClick = (e: CustomEvent<Socials>) => {
    onSocialInteraction(e.detail);
  }
	onMount(() => {
		window.addEventListener('keyup', (e: KeyboardEvent) => {
			if (isLocked) return;
			if ((/[0-9]/).test(e.key)) {
				const n = parseInt(e.key);
				if (n < socials.length) {
					const social = socials[n];
					if (social) onSocialInteraction(social);
				}
			}
		});

		console.debug({ hostName: hostname, socials });
	})

</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <meta name="title" content="{title}">
  <meta name="description" content="{description}">
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://{hostname}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:image" content="https://${hostname}/{image}">
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_small_image">
  <meta property="twitter:url" content="https://{hostname}">
  <meta property="twitter:title" content="{title}">
  <meta property="twitter:description" content="{description}">
  <meta property="twitter:image" content="https://${hostname}/{image}">
  <title>{hostname}</title>
</svelte:head>

<div>
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
    {#each socials as social, i}
      <Social
        name={social.name} href={social.href} 
        key={i} 
        padding={socialsPadding}
        maxLength={socialsLength} 
        on:click={onSocialClick}
      />
    {/each}
    <p>'{"-".repeat(socialsLength + socialsPadding)}'</p>
  {/if}
</div>

<style>

  .cat {
    margin-left: auto;
    cursor: pointer;
  }

  .taskbar {
    display: flex;
    flex-direction: row;
  }
</style>