import Vue from 'vue';
import VueRouter from 'vue-router';

// import Login from 'page/login.vue';
// import Main from 'page/main.vue';
// import Home from 'page/home.vue';
// import Client from 'page/client.vue';
// import Menu from 'page/menu.vue';
// import Server from 'page/server.vue';
// import PostList from 'page/post-list.vue';
// import PostRelease from 'page/post-release.vue';
// import PostCategory from 'page/post-category.vue';
// import User from 'page/user.vue';


const Login = () => import('page/login.vue');
const Main = () => import('page/main.vue');
const Home = () => import('page/home.vue');
const Client = () => import('page/client.vue');
const Menu = () => import('page/menu.vue');
const Server = () => import('page/server.vue');
const PostList = () => import('page/post-list.vue');
const PostRelease = () => import('page/post-release.vue');
const PostCategory = () => import('page/post-category.vue');
const User = () => import('page/user.vue');

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: '',
          redirect: 'home',
        },
        {
          path: 'home',
          component: Home,
        },
        {
          path: 'client',
          component: Client,
        },
        {
          path: 'menu',
          component: Menu,
        },
        {
          path: 'server',
          component: Server,
        },
        {
          path: 'post-list',
          component: PostList,
        },
        {
          path: 'post-release',
          component: PostRelease,
        },
        {
          path: 'post-category',
          component: PostCategory,
        },
        {
          path: 'user',
          component: User,
        }
      ]
    }
  ]
});

// 路由守卫 拦截没有token的登录
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else if (localStorage.getItem('token')) {
    next();
  } else {
    next('/login');
  }
});

export default router;