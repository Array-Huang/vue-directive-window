<template>
  <div class="home">
    <div class="box" v-window></div>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>
<style lang="stylus" scoped>
.home {
  .box {
    width: 640px;
    height: 320px;
    background-color: red;
  }
}
</style>
