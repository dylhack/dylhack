<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast'

  export let name = 'GitHub';
  export let href;
  export let key = 0;
  export let maxLength = ` ${key} | ${name} `.length;
  export let padding = 1;
  const keySpace = ' '.repeat(padding);
  const rightSpace = ' '.repeat((maxLength + padding) - `${keySpace}${key}${keySpace}| ${name}`.length);

  const onCopy = () => {
    navigator.clipboard.writeText(name);
    toast.push('Copied!', { duration: 2000 });
  }
</script>

{#if href !== undefined}
  <p>|{keySpace}{key}{keySpace}| <a class="name" href={href}>{name}</a>{rightSpace}|</p>
{:else}
  <p on:click={onCopy} on:keypress={onCopy}>|{keySpace}{key}{keySpace}| <span class="name clickable">{name}</span>{rightSpace}|</p>
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
