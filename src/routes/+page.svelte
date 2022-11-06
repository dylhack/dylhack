<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import App from './App.svelte';
	import { title, description, image, hostname, socials } from '../settings.json';
</script>

<SvelteToast  />
<main>
	<App {title} {description} {image} {hostname} {socials} />
</main>

<style global>
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
		--bg: #0a2e36;
		--fg: #fcfffc;
		--primary: #2ba84a;
		--secondary: #248232;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;

    /* Toast Notificaitons */
    --toastBarBackground: var(--secondary);
    --toastBackground: rgba(0, 0, 0, 0);
    --toastBoxShadow: none;
    --toastBarHeight: 2px;
	}

	body {
		font-family: 'Azeret Mono', monospace;
		color: var(--fg);
		background-color: var(--bg);

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
