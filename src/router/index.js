import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
import Users from '../components/users'
import UserHome from '../components/userhome'
import UserManagement from '../components/usermanagement'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/users',
    children: [
      {
        path: '/users',
        component: Users,
        redirect: '/users/userhome',
        children: [
          {
            path: 'userhome',
            component: UserHome
          }, {
            path: 'management',
            component: UserManagement
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 用户直接访问登录页面 直接放行
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) { // 没有登录强制跳转到登录页面
    return next('/login')
  }
  next()
})
export default router
