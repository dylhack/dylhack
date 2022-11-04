<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let button;

  export let locked = '🔒';
  export let unlocked = '🔓';

  $: buttonLabel = locked;

  const bumpState = () => {
    if (buttonLabel === locked) {
      buttonLabel = unlocked;
      dispatch('unlock', button);
    } else {
      buttonLabel = locked;
      dispatch('lock', button);
    }
  }
</script>


<div bind:this={button} on:click={bumpState} on:keypress={bumpState} class="taskbar-button">
  <p>.{'-'.repeat(`| ${buttonLabel} |`.length - 1)}</p>
  <p>| {buttonLabel} |</p>
  <p>'{'-'.repeat(`| ${buttonLabel} |`.length - 1)}</p>
</div>

<style>
  p {
    color: var(--primary);
  }

  div {
    color: var(--secondary);
    cursor: pointer;
  }
</style>
