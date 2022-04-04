<template>
  <div @click="reverse">
    {{ msg }}
  </div>
</template>
<script
  lang="ts"
  setup
>
import { Point } from 'unist'

export const getLine = (point: Point) => point.line

export let msg = 'Hello Vue!'

export const reverse = async () => {
  await new Promise(resolve => {
    setTimeout(resolve, 500)
  })
  msg = [...msg].reverse().join('')
}
</script>
<style>
div {
  color: red;
}
</style>
