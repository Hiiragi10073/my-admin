<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="ad-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in routes" :key="item.path">{{ item.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      routes: [],
      names: [
        { path: "main", name: "首页" },
        { path: "home", name: "首页" },
        { path: "client", name: "用户管理" },
        { path: "menu", name: "菜单管理" },
        { path: "server", name: "用户监控" },
        { path: "post-list", name: "文章列表" },
        { path: "post-release", name: "发布文章" },
        { path: "post-category", name: "分类管理" },
        { path: "user", name: "个人中心" },
      ],
    };
  },
  methods: {
    getRoute() {
      const { path } = this.$route;

      this.routes = path
        .slice(6)
        .split("#")
        .map((item, index) => {
          let name = this.names.find((nameItem) => nameItem.path === item).name;

          return {
            name: name,
            path: item,
          };
        });
    },
  },
  created() {
    this.getRoute();
  },
};
</script>

<style lang="scss">
.ad-breadcrumb {
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: #fff;

      &:hover {
        color: #fff;
      }
    }
    .is-link {
      color: #f3843d;

      &:hover {
        color: #ff5a0a;
      }
    }
  }
}
</style>