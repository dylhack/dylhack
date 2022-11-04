<script lang="ts">
  $: hideCat= true;

  const bumpCatState = () => hideCat = !hideCat;
</script>

<div on:click={bumpCatState} on:keypress={bumpCatState} class="cat">
    <!-- NOTE(dylhack): credit to https://www.asciiart.eu/animals/cats -->
    <p>.-------------------.</p>
    <p>|     /\_____/\     |</p>
    <p>|    /  o   o  \    |</p>
    <p>|   ( ==  ^  == )   |</p>
    {#if !hideCat}
    <p>|    )         (    |</p>
    <p>|   (           )   |</p>
    <p>|  ( (  )   (  ) )  |</p>
    <p>| (__(__)___(__)__) |</p>
    {/if}
</div>

<style>
  p {
    white-space: pre;
  }
</style>
