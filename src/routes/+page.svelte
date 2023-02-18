<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import App from './App.svelte';

	// @ts-ignore
	const settings: Settings = global.settings;
</script>

<SvelteToast />
<main>
	<App {...settings} />
</main>

<style global>
	/* or using unpkg.com */
	@import url('https://unpkg.com/@catppuccin/palette/css/catppuccin.css');

	@font-face {
		font-family: 'Azeret Mono';
		src: url('/fonts/AzeretMono-Regular.otf');
		font-weight: 400;
	}

	@font-face {
		font-family: 'Azeret Mono';
		src: url('/fonts/AzeretMono-Bold.otf');
		font-weight: bold;
	}

	:root {
		--bg: var(--ctp-mocha-base);
		--fg: var(--ctp-mocha-text);
		--primary: var(--ctp-mocha-green);
		--secondary: var(--ctp-mocha-green);

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;

		/* Toast Notificaitons */
		--toastBarBackground: var(--ctp-latte-green);
		--toastBackground: rgba(0, 0, 0, 0);
		--toastBoxShadow: none;
		--toastBarHeight: 2px;
	}

	body {
		font-family: 'Azeret Mono', monospace;
		color: var(--ctp-mocha-text);
		background-color: var(--ctp-mocha-base);

		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		place-items: center;

		min-width: 320px;
		min-height: 100vh;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	main {
		line-height: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100vh;
		gap: 0;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	p {
		padding-top: 0;
		margin-top: 0;
		white-space: pre;
	}

	@media (min-width: 320px) {
		body {
			font-size: 1.3em;
		}
	}

	@media (max-width: 370px) {
		body {
			font-weight: bold;
		}
	}

	@media (min-width: 425px) {
		body {
			font-size: 1.5em;
		}
	}

	@media (min-width: 768px) {
		body {
			font-size: 2em;
		}
	}
</style>
