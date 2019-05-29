<template>
  <div class="home">
    <div class="box" v-window="params">
      <div class="resize-handler"></div>
      <div class="maximize-handler"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      params: {
        minWidth: 10,
        maxWidth: 400,
        minHeight: 100,
        maxHeight: 400,
        customMoveHandler: '.resize-handler',
        customMaximizeHandler: '.maximize-handler',
      },
    };
  },
};
</script>
<style lang="stylus" scoped>
.home {
  .box {
    width: 320px;
    height: 320px;
    background-color: red;
    position: relative;
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

  .resize-handler {
    width: 20px;
    height: 20px;
    background-color: red;
    position: absolute;
    left: 0;
    top: -20px;
  }

  .maximize-handler {
    width: 20px;
    height: 20px;
    background-color: yellow;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
