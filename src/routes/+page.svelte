<script lang="ts">
	import './styles.css';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import Host from '$components/Host.svelte';
	import AsciiArt from '$components/AsciiArt.svelte';
	import Social from '$components/Social.svelte';
	import TaskBarButton from '$components/TaskBarButton.svelte';
	import getSettings from '../lib/settings';
	import { getAnalytics, logEvent } from 'firebase/analytics';
	import { initializeApp, type FirebaseOptions } from 'firebase/app';
	
	const firebaseConfig: FirebaseOptions = {
		apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
		projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
		appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
		measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
	};
	const { splitAt, art, hostname, socials, title, description } = getSettings();
	const longestLine = art
		.split('\n')
		.reduce((acc, line) => (line.length > acc ? line.length : acc), 0);

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

	const onUnlock = () => {
		logEvent(getAnalytics(), 'lock_engaged');
		isLocked = false;
	};

	const onLock = () => {
		logEvent(getAnalytics(), 'lock_engaged');
		isLocked = true;
	};

	const onSocialInteraction = (social: Socials<any>) => {
		const { href, value } = social;
		logEvent(getAnalytics(), 'social_clicked', { social });
		if (href) {
			window.open(href, '_blank');
		} else if (value) {
			navigator.clipboard.writeText(value);
			toast.push('Copied!', { duration: 2000 });
		}
	};

	const onSocialClick = (e: CustomEvent<Socials<any>>) => {
		onSocialInteraction(e.detail);
	};

	const initFirebase = () => {
		initializeApp(firebaseConfig);
	};

	onMount(() => {
		initFirebase();
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
	<title>{title}</title>
</svelte:head>

<SvelteToast/>
<main>
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
		{#each socials as social, i}
			<Social
				href={social.href}
				value={social.value}
				name={social.name}
				key={i}
				padding={socialsPadding}
				maxLength={socialsLength}
				on:click={onSocialClick}
			/>
		{/each}
		<p>'{'-'.repeat(socialsLength + socialsPadding)}'</p>
	{/if}
</main>

<style scoped>
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
