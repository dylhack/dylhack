<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	let button: HTMLDivElement;

	export let padding = 1;
	export let locked = '🔒';
	export let unlocked = '🔓';
	export let maxLength = Math.max(locked.length, unlocked.length) + padding * 2;

	$: buttonLabel = locked;

	const space = ' '.repeat(padding);
	const bumpState = () => {
		if (buttonLabel === locked) {
			buttonLabel = unlocked;
			dispatch('unlock', button);
		} else {
			buttonLabel = locked;
			dispatch('lock', button);
		}
	};

	onMount(() => {
		window.addEventListener('keyup', (e: KeyboardEvent) => {
			if (e.code === 'Space') bumpState();
		});
	});
</script>

<div bind:this={button} on:click={bumpState} on:keypress={bumpState} class="taskbar-button">
	<p>.{'-'.repeat(maxLength)}-</p>
	<p>|{space}{buttonLabel}{space}|</p>
	<p>'{'-'.repeat(maxLength)}-</p>
</div>

<style scoped>
	@keyframes primary {
		0% {
			color: var(--primary);
		}
		50% {
			color: #d5ffd5;
		}
		100% {
			color: var(--primary);
		}
	}

	p {
		color: var(--primary);
		animation: primary 2s infinite;
	}

	div {
		color: var(--secondary);
		cursor: pointer;
	}
</style>
