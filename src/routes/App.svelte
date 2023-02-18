<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import Host from './Host.svelte';
	import AsciiArt from './AsciiArt.svelte';
	import Social from './Social.svelte';
	import TaskBarButton from './TaskBarButton.svelte';
	import { onMount } from 'svelte';

  export let splitAt: number = 8;
  export let art: string = '';
	const longestLine = art
		.split('\n')
		.reduce((acc, line) => (line.length > acc ? line.length : acc), 0);

	export let hostname = 'example.com';
	export let socials: Socials[] = [{ name: 'GitHub', href: 'https://github.com/dylhack' }];
	export let title = hostname;
	export let description = `${hostname}'s personal website.`;

	// Meta tags
	const [name, tld] = hostname.split('.');
	const padding = 1;

	// Taskbar Button
	const buttonLocked = '+';
	const buttonUnlocked = '-';
	const buttonPadding = padding;
	const buttonLength = Math.max(buttonLocked.length, buttonUnlocked.length) + buttonPadding * 2;

	// Socials length
	const socialsOffset = buttonLength + 2;
	const socialsPadding = padding;
	let socialsLength = socialsOffset + longestLine;
	socials.forEach((social) => {
		const x = socialsOffset + social.name.length;
		if (x > socialsLength) socialsLength = x;
	});

	// Host
	const hostsLength = socialsLength + socialsPadding - (buttonLength + 1);

	$: isLocked = true;

	const onUnlock = () => (isLocked = false);
	const onLock = () => (isLocked = true);
	const onSocialInteraction = (social: Socials) => {
		const { name, href } = social;
		if (href) window.open(href, '_blank');
		else {
			navigator.clipboard.writeText(name);
			toast.push('Copied!', { duration: 2000 });
		}
	};
	const onSocialClick = (e: CustomEvent<Socials>) => {
		onSocialInteraction(e.detail);
	};
	onMount(() => {
		window.addEventListener('keyup', (e: KeyboardEvent) => {
			if (isLocked) return;
			if (/[0-9]/.test(e.key)) {
				const n = parseInt(e.key);
				if (n < socials.length) {
					const social = socials[n];
					if (social) onSocialInteraction(social);
				}
			}
		});

		console.debug({ hostName: hostname, socials });
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_small_image" />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<title>{hostname}</title>
</svelte:head>

<div>
	<div class="asciiart">
		<AsciiArt {art} {splitAt} />
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
		<Host {name} tld={'.' + tld} maxLength={hostsLength} />
	</div>
	<!-- TODO(dylhack): add animations つ ◕_◕ ༽つ -->
	{#if !isLocked}
		<p>|{' '.repeat(socialsLength + socialsPadding)}|</p>
		{#each socials as social, i}
			<Social
				name={social.name}
				href={social.href}
				key={i}
				padding={socialsPadding}
				maxLength={socialsLength}
				on:click={onSocialClick}
			/>
		{/each}
		<p>'{'-'.repeat(socialsLength + socialsPadding)}'</p>
	{/if}
</div>

<style>
	.asciiart {
		margin-left: auto;
		cursor: pointer;
		width: 100%;
	}

	.taskbar {
		display: flex;
		flex-direction: row;
	}
</style>
