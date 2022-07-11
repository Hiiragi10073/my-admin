<template>
  <div class="main">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <router-link to="/main/home">
            <h1>Umisaki</h1>
          </router-link>
        </div>
        <!-- 导航菜单 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#393939"
          text-color="#fff"
          active-text-color="#fe9901"
          router
          unique-opened
        >
          <div v-for="item in menuData" :key="item.id">
            <!-- 非分页菜单 -->
            <el-menu-item
              :index="item.router"
              v-if="item.children.length === 0"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
            <!-- 分页菜单 -->
            <el-submenu :index="item.router" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="subItem.router"
                v-for="subItem in item.children"
                :key="subItem.id"
                >{{ subItem.name }}</el-menu-item
              >
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <!-- tabs -->
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
            @tab-click="clickTab"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.id"
              :label="item.name"
              :name="item.router"
            ></el-tab-pane>
          </el-tabs>
          <div class="user">
            <img :src="userData.profile_pic | addBaseURL" alt />
            <span class="username">{{ userData.nickname }}</span>
            <el-button size="mini" type="warning" round @click="logout"
              >退出</el-button
            >
          </div>
        </el-header>
        <!-- 内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserData, getMenuData } from 'api/user';
// 函数：将数组重组成一个立体的数组
import { unFlatArray } from 'utils/unFlatArray';

export default {
  data() {
    return {
      userData: {},
      // 立体的菜单数组
      menuData: [],
      // 展开的菜单数组
      menuData2: [],
      // tabs 栏的数据
      editableTabsValue: '',
      editableTabs: []
    };
  },
  methods: {
    // 获取用户信息
    async getUserData() {
      const { status, data } = await getUserData();
      if (status === 200) {
        this.userData = data;
      }
    },
    // 退出登录
    logout() {
      this.$confirm('您将退出登录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token');
        this.$router.push('/login');
        this.$message({
          type: 'success',
          message: '退出登录成功'
        }).catch(err => {
          console.log(err);
        });
      });
    },
    // 获取菜单数据
    async getMenuData() {
      const { status, data } = await getMenuData();

      if (status === 200) {
        // 创建两个数组，一个时用于渲染菜单导航的层级数组 一个是用来渲染tabs栏的平坦数组
        this.menuData = unFlatArray(data);
        this.menuData2 = data;
      }
    },
    // 页面初始化时获取tabs栏的本地数据
    getEditableTabs() {
      // 如果数据不存在 则添加一个首页并且跳转到首页
      if (!localStorage.getItem('editableTabs')) {
        this.editableTabs.push({
          id: 1,
          name: '首页',
          router: '/home'
        });
        this.$router.push('/home');
        this.editableTabsValue = '/home';
        return;
      }
      // 如果存在 则直接读取，并激活对应的tabs
      this.editableTabs = JSON.parse(localStorage.getItem('editableTabs'));
      this.editableTabsValue = this.$route.path;
    },

    clickTab(obj) {
      this.$router.push(obj.name);
    },

    removeTab(name) {
      // 获得移除的tabs的路由路径在tabs数组中的位置
      const index = this.editableTabs.findIndex(item => item.router === name);
      // 不删除首页
      if (index === 0) return;

      // 删除对应的tabs
      this.editableTabs = this.editableTabs.filter(
        item => item.router !== name
      );

      // 存储到本地
      localStorage.setItem('editableTabs', JSON.stringify(this.editableTabs));
      // 判断删除的tabs的路由是不是当前页面 如果不是就什么都不做，如果是则跳转到左侧一个的tabs对应的路径
      if (this.editableTabs.find(item => this.$route.path === item.router))
        return;
      this.$router.push(this.editableTabs[index - 1].router);
    }
  },
  watch: {
    // 监测 route 变化来修改tabs栏相关数据
    $route: {
      handler(to, from) {
        this.editableTabsValue = to.path;
        if (this.editableTabs.find(item => item.router === to.path)) {
          return;
        } else {
          const tabItem = this.menuData2.find(item => {
            return item.router === to.path && item.children.length === 0;
          });
          this.editableTabs.push(tabItem);
          localStorage.setItem(
            'editableTabs',
            JSON.stringify(this.editableTabs)
          );
        }
      }
    }
  },
  created() {
    this.getUserData();
    this.getEditableTabs();
    this.getMenuData();
  }
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
  padding-top: 70px;
}
.el-tabs {
  margin-left: 20px;
}

.el-header {
  background-color: #fff;
  padding: 10px;
  margin-bottom: -50px;
  position: relative;

  .user {
    position: absolute;
    top: 5px;
    right: 5px;
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
      color: #ff5a0a;
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

<style lang="scss">
.main .el-tabs {
  .el-tabs__header {
    border-bottom: 0px solid #ff5a0a;
    margin: 10px 0 0 0;
  }

  .el-tabs__item {
    border-left: 1px solid #ff5a0a;
    color: #fff;
  }

  .is-active {
    color: #fff;
  }

  .el-tabs__nav {
    background-color: #f3843d;
  }

  .el-tabs__header .el-tabs__item.is-active {
    border-bottom: 0;
    background-color: #ff5a0a;
  }
}
</style>
