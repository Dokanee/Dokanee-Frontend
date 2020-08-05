import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Control Panel',
    component: () =>
    import(/* webpackChunkName: "cpanel" */ '@/views/ControlPanel'),
    redirect :'/cpanel/dashboard',
    children: [
      {
        path: '/cpanel/dashboard',
    name: 'Dashboard',
    component: () =>
    import(/* webpackChunkName: "dashboard" */ '@/components/routes/DcpDashboard'),
      },
      {
        path : '/cpanel/products',
        component: () =>
    import(/* webpackChunkName: "products" */ '@/components/routes/DcpProducts')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
