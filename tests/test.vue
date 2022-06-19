<template>
  <div @click="reverse">
    {{ msg }}
  </div>
</template>
<script lang="ts" setup>
import { Point } from 'unist'

const getLine = (point: Point) => point.line

let msg = 'Hello Vue!'

const reverse = async () => {
  await new Promise(resolve => {
    setTimeout(resolve, 500)
  })
  msg = [...msg].reverse().join('')
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
