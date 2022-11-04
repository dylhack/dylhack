<script lang="ts">
  import { getPadding, repeat } from '../main';

  export let name = '';
  export let tld = '';
  const full = `${name}.${tld}`;
  let length = ` ${full} `.length + 4;

  const colors = [
    'inherit',
    '#ffadadff',
    '#ffd6a5ff',
    '#fdffb6ff',
    '#caffbfff',
    '#9bf6ffff',
    '#a0c4ffff',
    '#bdb2ffff',
    '#ffc6ffff',
  ];
  let colorI = 0;

  $: color = 'inherit';

  const bumpColor = () => {
      colorI += 1;
      if (colors.length === colorI) colorI = 0;
      color = colors[colorI];
  }
</script>

<!-- 
--------------------------.
|example.com              |
--------------------------'
 -->
<div>
  <p>{repeat("-", 4)}.</p>
    <p>| <b>{name}<span style="color: {color};" on:click={bumpColor} on:keypress={bumpColor}>{tld}</span></b>{getPadding(length)} |</p>
  <p>{repeat("-", 4)}'</p>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
  }

  span {
    cursor: pointer;
  }
</style>
