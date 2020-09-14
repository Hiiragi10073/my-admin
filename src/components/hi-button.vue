<template>
  <el-button class="hi-button" :size="size" @click="handClick(data)" :type="type">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
    data: {
      type: Object,
    },
    handClick: {
      type: Function,
    },
    size: {
      type: String,
      default: "mini",
    },
  },
};
</script>

<style lang="scss">
.el-button.el-button--primary {
  background-color: #ff5a0a;
  border: 1px solid #ff5a0a;
  color: #fff;

  &:active {
    background-color: #fe9901;
    border: 1px solid #fe9901;
  }
}

.el-button.el-button--info {
  &:active {
    background-color: #a6a9ad;
  }
}
</style>
