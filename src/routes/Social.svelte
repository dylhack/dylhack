<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name = 'GitHub';
	export let href: string | undefined;
	export let value: string | undefined;
	export let key = 0;
	export let maxLength = ` ${key} | ${name} `.length;
	export let padding = 1;

	const dispatch = createEventDispatcher();
	const keySpace = ' '.repeat(padding);
	const rightSpace = ' '.repeat(
		maxLength + padding - `${keySpace}${key}${keySpace}| ${name}`.length
	);

	const onClick = () => {
		dispatch('click', { name, href, value });
	};
</script>

<!-- NOTE(dylhack): ally is ignored because a custom system has been added. -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<p on:click={onClick}>
	|{keySpace}{key}{keySpace}| <span class="name clickable">{name}</span>{rightSpace}|
</p>

<style scoped>
	.name {
		color: var(--primary);
		cursor: pointer;
	}

	.name:hover {
		color: var(--secondary);
	}
</style>
