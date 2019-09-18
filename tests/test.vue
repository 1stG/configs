<template>
  <div @click="reverse">
    {{ msg }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

import { Point } from 'unist'

export default Vue.extend({
  data() {
    return {
      msg: 'Hello Vue!',
      x_y: 'Z',
    }
  },
  methods: {
    getLine(point: Point) {
      return point.line
    },
    async reverse() {
      await new Promise(resolve => {
        setTimeout(resolve, 500)
      })
      this.msg = this.msg
        .split('')
        .reverse()
        .join('')
    },
  },
})
</script>
<style>
div {
  color: red;
}
</style>
