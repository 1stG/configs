<template>
  <div @click="reverse">
    {{ msg }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      msg: 'Hello Vue!',
    }
  },
  methods: {
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
