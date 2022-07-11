import Vue from 'vue';
import VueRouter from 'vue-router';

const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location, onResolve, onReject) {
  if (onResolve || onReject) {
    originPush.call(this, location, onResolve, onReject);
  } else {
    originPush.call(this, location).catch(err => err);
  }
};

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('page/login.vue')
    },
    {
      path: '/',
      component: () => import('page/main.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('page/home.vue')
        },
        {
          path: 'client',
          name: 'Client',
          component: () => import('page/client.vue')
        },
        {
          path: 'menu',
          name: 'Menu',
          component: () => import('page/menu.vue')
        },
        {
          path: 'blog-list',
          name: 'BlogList',
          component: () => import('page/blog-list.vue')
        },
        {
          path: 'blog-category',
          name: 'BlogCategory',
          component: () => import('page/blog-category.vue')
        },
        {
          path: 'blog-post',
          name: 'BlogPost',
          component: () => import('page/blog-post.vue')
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('page/user.vue')
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
