import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/ControlPanel.vue'
import Dashboard from '../components/routes/DcpDashboard.vue'
import Products from '../components/routes/DcpProducts.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Control Panel',
    component: Home,
    redirect :'/cpanel/dashboard',
    children: [
      {
        path: '/cpanel/dashboard',
    name: 'Dashboard',
    component: Dashboard,
      },
      {
        path : '/cpanel/products',
        component: Products
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
