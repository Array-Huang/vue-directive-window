<template>
  <div class="home">
    <div class="box" v-window>
      <div class="content1"></div>
      <div class="content2"></div>
    </div>
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

  .content1, .content2 {
    width: 100%;
    height: 50px;
    margin-top: 10px;
  }

  .content1 {
    background-color: blue;
  }

  .content2 {
    background-color: black;
  }
}
</style>
