<script lang="ts">
	import { onMount } from "svelte";

  export let splitAt: number = 5;
  // NOTE(dylhack): credit to https://www.asciiart.eu/animals/cats
  export let art: string = `
    /\\_____/\\
   /  o   o  \\
  ( ==  ^  == )
   )         (
  (           )
 ( (  )   (  ) )
(__(__)___(__)__)`;
  const split = art.split('\n');
  const longestLine = split.reduce((acc, line) => line.length > acc ? line.length : acc, 0);
  const top = `.-${'-'.repeat(longestLine)}-.`;
  const fixedArt = [top, ...split].map((line, i) => {
    if (i === 0) return line;
    const x = longestLine - line.length;
    const padding = ' '.repeat(x < 0 ? 0 : x);
    return `| ${line}${padding} |`;
  });

  $: hideArt = true;

  const bumpArtState = () => hideArt = !hideArt;

  onMount(() => {
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'c') bumpArtState();
    });
  })
</script>

<div on:click={bumpArtState} on:keypress={bumpArtState}>
    {#each fixedArt as line, i}
      {#if i > splitAt}
        {#if !hideArt}
          <p>{line}</p>
        {/if}
      {:else}
        <p>{line}</p>
      {/if}
    {/each}
</div>

<style scoped>
  div {
    width: 100%;
  }

  p {
    white-space: pre;
    text-align: right;
    width: 100%;
  }
</style>
