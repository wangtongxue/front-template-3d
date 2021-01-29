<template>
  <div class="top-bar">
    top-bar
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.top-bar {
  width: 100%;
  height: 50px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
