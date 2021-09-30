import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
  {
    path: '/',
    name: 'index',
    component: () => import( '../views/index.vue')
  },
  {
    path: '/serch',
    name: 'serchview',
    component: () => import( '../views/serchview.vue')
  }
]

const router = new VueRouter({
    mode: 'hash',
  routes
  
})

export default router
