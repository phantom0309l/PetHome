const Doctor = {
    template: '<router-view></router-view>',
}
const Patient = {
    template: '<router-view></router-view>',
}
const EmptyTemplate = {
    template: '<router-view></router-view>',
}
const DoctorTask = {
    template: '<router-view></router-view>',
}

export default [
    {
        path: '/index',
        name: 'index',
        meta: {
            requireBind: false,
            showTabbar: true,
        },
        component: resolve => require(['../pages/Index.vue'], resolve)
    },
    {
        path: '/msglist',
        name: 'msglist',
        meta: {
            requireBind: true,
            showTabbar: true,
        },
        component: resolve => require(['../pages/MsgList.vue'], resolve)
    },
    {
        path: '/my',
        name: 'my',
        meta: {
            requireBind: true,
            showTabbar: true,
        },
        component: resolve => require(['../pages/My.vue'], resolve)
    },
    {
        path: '/info',
        name: 'info',
        meta: {
            requireBind: true,
            showTabbar: false,
        },
        component: resolve => require(['../pages/Info.vue'], resolve)
    },
    {
        path: '/msgone',
        name: 'msgone',
        meta: {
            requireBind: true,
            showTabbar: false,
        },
        component: resolve => require(['../pages/MsgOne.vue'], resolve)
    },
    {
        path: '/productlist',
        name: 'productlist',
        meta: {
            requireBind: false,
            showTabbar: false,
        },
        component: resolve => require(['../pages/ProductList.vue'], resolve)
    },
    {
        path: '/productone',
        name: 'productone',
        meta: {
            requireBind: false,
            showTabbar: false,
        },
        component: resolve => require(['../pages/ProductOne.vue'], resolve)
    },
    {
        path: '/registerfamily',
        name: 'registerfamily',
        meta: {
            requireBind: true,
            showTabbar: false,
        },
        component: resolve => require(['../pages/RegisterFamily.vue'], resolve)
    },
    {
        path: '/myfamily',
        name: 'myfamily',
        meta: {
            requireBind: true,
            showTabbar: false,
        },
        component: resolve => require(['../pages/myFamily.vue'], resolve)
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            requireBind: false,
            showTabbar: false,
        },
        component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            requireBind: false,
            showTabbar: false,
        },
        component: resolve => require(['../pages/Register.vue'], resolve)
    },
    {
        path: '/error',
        name: 'error',
        component: resolve => require(['../pages/Error.vue'], resolve)
    },
    {
        path: '/',
        name: 'empty',
        // redirect: '/error',
        component: resolve => require(['../pages/Empty.vue'], resolve),
    },
    {
        path: '*',
        // redirect: '/error',
        redirect: to => {
            sessionStorage.setItem('_errorurl_', to.path);
            localStorage.setItem('_errorwxurl_', to.path);
            localStorage.setItem('_errorhref_', window.location.href);
            return '/error';
        }
    }
]
