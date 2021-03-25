import Vue from 'vue'
import VueRouter from 'vue-router'

export var rt = new VueRouter()

Vue.use(VueRouter)

const routes = [{
        path: '',
        name: 'Control Panel',
        component: () =>
            import ( /* webpackChunkName: "cpanel" */ '@/views/ControlPanel'),
        redirect: '/dashboard',
        children: [{
                path: '/dashboard',
                name: 'Dashboard',
                component: () =>
                    import ( /* webpackChunkName: "dashboard" */ '@/components/routes/DcpDashboard'),
            },
            {
                path: '/products',
                component: () =>
                    import ( /* webpackChunkName: "products" */ '@/components/routes/DcpProducts')
            },
            {
                path: '/pos/new-sale',
                component: () =>
                    import ( /* webpackChunkName: "new" */ '@/components/routes/pos/NewSale'),
            },
            {
                path: '/pos/all-sales',
                component: () =>
                    import ( /* webpackChunkName: "all" */ '@/components/routes/pos/AllSales'),
            },
            {
                path: '/categories',
                component: () =>
                    import ( /* webpackChunkName: "products" */ '@/components/routes/DcpCategories')
            },
            {
                path: '/coupons',
                component: () =>
                    import ( /* webpackChunkName: "products" */ '@/components/routes/DcpCoupons')
            },
            {
                path: '/reports',
                component: () =>
                    import ( /* webpackChunkName: "products" */ '@/components/routes/DcpReports')
            },
            {
                path: '/customers',
                component: () =>
                    import ( /* webpackChunkName: "products" */ '@/components/routes/DcpCustomers')
            },
            {
                path: '/employee',
                component: () =>
                    import ( /* webpackChunkName: "products" */ '@/components/routes/DcpEmployee')
            },
            {
                path: '/template',
                component: () =>
                    import ( /* webpackChunkName: "products" */ '@/components/routes/DcpTemplate')
            },
            {
                path: '/settings',
                component: () =>
                    import ( /* webpackChunkName: "settings" */ '@/components/routes/DcpSettings'),
                children: [{
                        path: 'general-settings',
                        component: () =>
                            import ( /* webpackChunkName: "settings" */ '@/components/routes/settings/GeneralSettings'),
                    },
                    {
                        path: 'store-info',
                        component: () =>
                            import ( /* webpackChunkName: "settings" */ '@/components/routes/settings/StoreInfo'),
                    },
                    {
                        path: 'template',
                        component: () =>
                            import ( /* webpackChunkName: "settings" */ '@/components/routes/settings/EditTemplate'),
                    }
                ]
            },
            {
                path: '/help',
                component: () =>
                    import ( /* webpackChunkName: "products" */ '@/components/routes/DcpHelp')
            }
        ]
    },
    {
        path: '/auth',
        component: () =>
            import ( /* webpackChunkName: "tmp" */ '@/views/SignUpSignIn'),
        children: [{
                path: 'signup',
                component: () =>
                    import ( /* webpackChunkName: "signup" */ '@/components/routes/signupsignin/DssSignUp'),
            },
            {
                path: 'signin',
                component: () =>
                    import ( /* webpackChunkName: "signin" */ '@/components/routes/signupsignin/DssSignIn'),
            },
            {
                path: 'signout',
                component: () =>
                    import ( /* webpackChunkName: "signout" */ '@/components/routes/signupsignin/DssSignOut'),
            },
            {
                path: 'reset-password',
                component: () =>
                    import ( /* webpackChunkName: "reset-pass" */ '@/components/routes/signupsignin/ResetPass'),
            }
        ]
    }, {
        path: '/user',
        component: () =>
            import ( /* webpackChunkName: "userprofile" */ '@/views/UserProfile'),
        children: [{
                path: 'profile',
                component: () =>
                    import ( /* webpackChunkName: "Profile" */ '@/components/routes/userprofile/Profile'),
            },
            {
                path: 'edit-profile',
                component: () =>
                    import ( /* webpackChunkName: "ProfileEdit" */ '@/components/routes/userprofile/ProfileEdit'),
            },
            {
                path: 'settings',
                component: () =>
                    import ( /* webpackChunkName: "ProfileSettings" */ '@/components/routes/userprofile/ProfileSettings'),
            }
        ]
    },
    {
        path: '/createstore',
        component: () =>
            import ( /* webpackChunkName: "storecreate" */ '@/views/StoreCreate'),

    },
    {
        path: '*',
        redirect: "/"
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router