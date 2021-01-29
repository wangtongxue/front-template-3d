<template>
<div class="app-wrapper">
  <top-bar></top-bar>
  <div class="main-container-home">
    <app-main></app-main>
  </div>
  <footer-bar></footer-bar>
</div>
</template>

<script>
import { AppMain, TopBar, FooterBar } from './components'

export default {
  name: 'layout',
  components: {
    AppMain,
    TopBar,
    FooterBar
  }
}
</script>

<style lang='less' scoped>
.app-wrapper {
  .clearfix {
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }
  position: relative;
  height: 100%;
  width: 100%;
  .main-container-home {
    width: 100%;
    height: 100%;
  }
}
</style>
