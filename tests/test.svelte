<script lang="ts">
let count = 1

// the `$:` means 're-run whenever these values change'
$: doubled = count * 2
$: quadrupled = doubled * 2

function handleClick() {
  count += 1
}
</script>

<button
  class="test"
  on:click={handleClick}>Count: {count}</button
>

<p>{count} * 2 = {doubled}</p>
<p>{doubled} * 2 = {quadrupled}</p>

<style>
.test {
  border: transparent;
}
</style>
