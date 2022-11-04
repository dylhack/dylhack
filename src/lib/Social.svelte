<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast'

  export let name = 'GitHub';
  export let href;
  export let key = 0;
  export let maxLength = ` ${key} ${name} `.length;
  const padding = ' '.repeat((maxLength + 1)- ` ${key} ${name} `.length);

  const onCopy = () => {
    navigator.clipboard.writeText(name);
    toast.push('Copied!', { duration: 2000 });
  }
</script>

{#if href !== undefined}
  <p>| {key} <a class="name" href={href}>{name}</a>{padding}|</p>
{:else}
  <p on:click={onCopy} on:keypress={onCopy}>| {key} <span class="name clickable">{name}</span>{padding}|</p>
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
