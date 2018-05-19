// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import pvlog from './lib/pvlog.js'

import Mint from 'mint-ui'
// import { Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/style.css'
import '../static/css/weui-icon.css'
import '../static/css/mintui-extend.css'
import '../static/css/iconfont.css'
import '../static/css/global.css'
var eventBus = new Vue();
window.eventBus = eventBus;
Vue.use(Mint)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name,SwipeItem);
/* eslint-disable no-new */

// import PhotoGallery from './plugins/photogallery'
// Vue.use(PhotoGallery)

import common from './lib/common.js'

router.beforeEach((to, from, next) => {
    var openid = to.query.openid;
    pvlog.init(to, from);

    if (process.env.NODE_ENV == 'development') {
        // openid = "o-t1HwcyvnLdCzuYJUXaxGecywcY" // 周长虹
        // openid = "o-t1Hwa-hKbYzoAJzITfCnZzqdPA" //杨莉
        // openid = "o-t1HwZxZimLDbQFFhzC45G2vxdA"  // 刘盛
        // openid = "o-t1HwZtqO8o7IeLR0W1POvzvhKw"  // 史老师
        // openid = "o-t1HwXDvbV0dlGBJzcO5hPmvedQ"  //李永恒
        // openid = "o-t1HwVT1Md5DRsbrpRSdZ0TlE90"  //焦公凯
        openid = "o-t1HwUI2DxtnNFWvk9t-mMf4qso"; //王颖轶医生
        // openid = "o-t1HwT6A8RsFuVZvboxYV-4MZD0";//段明辉
        // openid = "o-t1HwWDAD0zB7pXbot2UMqR_wpA";//赵明
        // openid = 'o-t1HwRG_hmKuuUYVcO_YL8B9klc';//王迁医生
        // openid = 'o-t1HwSEO_LixUcwWH50Skz6wSsw';//秦燕医生
        // openid = 'o-t1HwUhMBmOfGYVDDPSSAykNqyE'; // 周国武
    }

    if (typeof openid != 'undefined' &&  openid != null && openid != '') {
        localStorage.setItem('_openid_', openid);
    }
    //兼容ios8以下 #后会被截掉的BUG
    var queryString = window.location.search;
    var fcqxurltemp = queryString.substring(1, queryString.length);
    let queryArr = fcqxurltemp.split('&') || [];
    let obj = {};
    queryArr.map(function(one){
        let arr = one.split('=');
        if (arr.length == 2) {
            obj[arr[0]] = arr[1];
        }
    })
    if (obj['fcqxtargeturl'] != undefined && to.name == 'empty') {
        next({path: obj['fcqxtargeturl']});
    }

    sessionStorage.setItem('_href_', window.location.href);
    queryString = encodeURIComponent(queryString);
    common.checkOpenid(queryString);
    if (to.meta.requireBind === true) {
        var status = common.checkLoginSync(queryString);
        if (status === true) {
            next();
        }else {
            next({name: 'doctor-bind'});
        }
    }else {
        next();
    }
})
new Vue({
  router,
  template: '<app/>',
  components: {App}
}).$mount('#app')
