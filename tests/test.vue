<template>
  <div @click="reverse">
    {{ msg }}
  </div>
</template>
<script lang="ts" setup>
// @ts-expect-error -- testing
import { Point } from 'unist'

// @ts-expect-error -- testing
const getLine = (point: Point) => point.line

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
