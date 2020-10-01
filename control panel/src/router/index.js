import Vue from 'vue'
import VueRouter from 'vue-router'

export var rt = new VueRouter()

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
      },
      {
        path : '/cpanel/categories',
        component: () =>
    import(/* webpackChunkName: "products" */ '@/components/routes/DcpCategories')
      },
      {
        path : '/cpanel/coupons',
        component: () =>
    import(/* webpackChunkName: "products" */ '@/components/routes/DcpCoupons')
      },
      {
        path : '/cpanel/reports',
        component: () =>
    import(/* webpackChunkName: "products" */ '@/components/routes/DcpReports')
      },
      {
        path : '/cpanel/customers',
        component: () =>
    import(/* webpackChunkName: "products" */ '@/components/routes/DcpCustomers')
      },
      {
        path : '/cpanel/employee',
        component: () =>
    import(/* webpackChunkName: "products" */ '@/components/routes/DcpEmployee')
      },
      {
        path : '/cpanel/template',
        component: () =>
    import(/* webpackChunkName: "products" */ '@/components/routes/DcpTemplate')
      },
      {
        path : '/cpanel/settings',
        component: () =>
    import(/* webpackChunkName: "products" */ '@/components/routes/DcpSettings')
      },
      {
        path : '/cpanel/help',
        component: () =>
    import(/* webpackChunkName: "products" */ '@/components/routes/DcpHelp')
      }
    ]
  },{
    path: '/auth',
    component: () =>
    import(/* webpackChunkName: "tmp" */ '@/views/SignUpSignIn'),
    children: [
      {
        path: 'signup',
        component: () =>
    import(/* webpackChunkName: "signup" */ '@/components/routes/signupsignin/DssSignUp'),
      },
      {
        path: 'signin',
        component: () =>
    import(/* webpackChunkName: "signin" */ '@/components/routes/signupsignin/DssSignIn'),
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
