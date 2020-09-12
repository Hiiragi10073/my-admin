<template>
  <div class="main">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <router-link to="/main/home">
            <h1>admin</h1>
          </router-link>
        </div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#393939"
          text-color="#fff"
          active-text-color="#fe9901"
          router
          unique-opened
        >
          <el-menu-item index="/main/home">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/main/client">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/main/client">用户管理</el-menu-item>
            <el-menu-item index="/main/menu">菜单管理</el-menu-item>
            <el-menu-item index="/main/server">服务监控</el-menu-item>
          </el-submenu>
          <el-submenu index="/main/post-list">
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/main/post-list">文章列表</el-menu-item>
            <el-menu-item index="/main/post-release">发布文章</el-menu-item>
            <el-menu-item index="/main/post-category">分类管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="/main/user">
            <i class="el-icon-user"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="user">
            <img :src="userData.profile_pic | addBaseURL" alt />
            <span class="username">{{userData.nickname}}</span>
            <el-button size="mini" type="warning" round @click="logout">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserData } from "api/api.js";
export default {
  data() {
    return {
      userData: {},
    };
  },
  methods: {
    async getUserData() {
      const { status, data } = await getUserData();
      if (status === 200) {
        this.userData = data;
      }
    },
    logout() {
      this.$confirm("您将退出登录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        localStorage.removeItem("token");
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "退出登录成功",
        }).catch((err) => {
          console.log(err);
        });
      });
    },
  },
  created() {
    this.getUserData();
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-aside {
  background-color: #393939;

  .logo {
    height: 80px;
    text-align: center;
    font-size: 36px;
    line-height: 80px;

    h1 {
      margin: 0;
      color: #f3843d;
    }
  }

  .el-menu {
    border: 0;
  }
}

.el-main {
  background-color: #6e6e6e;
}

.el-header {
  background-color: #f3843d;
  padding: 10px;

  .user {
    float: right;
    display: flex;
    align-items: center;
    margin-right: 50px;

    img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .username {
      color: #fff;
      margin: 0 50px 0 20px;
    }

    .el-button {
      background-color: #ff5a0a;
      border: 1px solid #d4500e;

      &:active {
        background-color: #fe9901;
        border: 1px solid #ffa928;
      }
    }
  }
}
</style>