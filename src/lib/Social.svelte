<script lang="ts">
  import { getPadding } from '../main';
  import { toast } from '@zerodevx/svelte-toast'

  export let name = 'GitHub';
  export let href;
  export let key = 0;
  const { length } = ` ${key} ${name} `;

  const onCopy = () => {
    navigator.clipboard.writeText(name);
    toast.push('Copied!', { duration: 2000 });
  }
</script>

{#if href !== undefined}
  <p>| {key} <a class="name" href={href}>{name}</a>{getPadding(length)} |</p>
{:else}
  <p on:click={onCopy} on:keypress={onCopy}>| {key} <span class="name clickable">{name}</span>{getPadding(length)} |</p>
{/if}

<style>
  .name {
    color: var(--primary);
    cursor: pointer;
  }

  .name:hover {
    color: var(--secondary);
  }
</style>
