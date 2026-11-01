<template>
  <div @click="reverse">
    {{ msg }}
  </div>
</template>
<script lang="ts" setup>
let msg = 'Hello Vue!'

const reverse = async () => {
  await new Promise(resolve => {
    setTimeout(resolve, 500)
  })
  msg = [...msg].toReversed().join('')
}
</script>
<script>
export default {
  name: 'VTest',
}
</script>
<style>
div {
  color: red;
}
</style>
