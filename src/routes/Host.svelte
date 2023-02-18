<script lang="ts">
	import { onMount } from 'svelte';

	export let name = '';
	export let tld = '';
	export let maxLength = 17;
	const full = `${name}.${tld}`;
	const rightPadding = ' '.repeat(maxLength - full.length);
	const divider = '-'.repeat(maxLength);

	// SOURCE: https://unpkg.com/@catppuccin/palette@0.1.6/css/catppuccin.css
	// I ❤ Catppuccin
	const colors = [
		'inherit',
		'#f38ba8', // RED
		'#eba0ac', // ORANGE
		'#f9e2af', // YELLOW
		'#a6e3a1', // GREEN
		'#74c7ec', // CYAN
		'#89b4fa', // BLUE
		'#cba6f7', // PURPLE
		'#f5c2e7' // PINK
	];
	let colorI = 0;

	$: color = 'inherit';

	const bumpColor = (neg = false) => {
		if (neg) {
			colorI -= 1;
			if (colorI < 0) colorI = colors.length - 1;
		} else {
			colorI += 1;
			if (colors.length === colorI) colorI = 0;
		}
		color = colors[colorI];
	};

	onMount(() => {
		window.addEventListener('keyup', (e: KeyboardEvent) => {
			if (e.key === 'k') bumpColor();
			else if (e.key === 'j') bumpColor(true);
		});
	});
</script>

<!-- 
--------------------------.
|example.com              |
--------------------------'
 -->
<div>
	<p>{divider}.</p>
	<p>
		&nbsp;<b
			>{name}<span
				style="color: {color};"
				on:click={() => bumpColor()}
				on:keypress={() => bumpColor()}>{tld}</span
			></b
		>{rightPadding}|
	</p>
	<p>{divider}'</p>
</div>

<style scoped>
	div {
		display: flex;
		flex-direction: column;
	}

	span {
		cursor: pointer;
	}
</style>
