// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import pvlog from './lib/pvlog.js'

import '../static/css/weui-icon.css'
import '../static/css/iconfont.css'
import '../static/css/global.css'

// Vant 有赞
import Vant from 'vant'
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);
import {Lazyload} from 'vant';

Vue.use(Lazyload);

var eventBus = new Vue();
window.eventBus = eventBus;

import common from './lib/common.js'

router.beforeEach((to, from, next) => {
    var openid = to.query.openid;
    pvlog.init(to, from);

    // if (process.env.NODE_ENV === 'development') {
    //     openid = 'o-t1HwUhMBmOfGYVDDPSSAykNqyE'; // 周国武
    // }

    //兼容ios8以下 #后会被截掉的BUG
    var queryString = window.location.search;
    var fcqxurltemp = queryString.substring(1, queryString.length);
    let queryArr = fcqxurltemp.split('&') || [];
    let obj = {};
    queryArr.map(function (one) {
        let arr = one.split('=');
        if (arr.length === 2) {
            obj[arr[0]] = arr[1];
        }
    })
    if (obj['fcqxtargeturl'] != undefined && to.name == 'empty') {
        next({path: obj['fcqxtargeturl']});
    }

    sessionStorage.setItem('_href_', window.location.href);
    queryString = encodeURIComponent(queryString);

    if (to.meta.requireBind === true) {
        if (common.checkLogin() === true) {
            next();
        } else {
            next({name: 'login'});
        }
    }
    // common.checkOpenid(queryString);
    // if (to.meta.requireBind === true) {
    //     var status = common.checkLoginSync(queryString);
    //     if (status === true) {
    //         next();
    //     } else {
    //         next({name: 'doctor-bind'});
    //     }
    // } else {
    //     next();
    // }
    next();
})
new Vue({
    router,
    template: '<app/>',
    components: {App}
}).$mount('#app');
