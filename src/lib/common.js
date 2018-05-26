import api from '../config/api.js';
import { Toast } from 'vant';
import Vue from 'vue';
export default {
    checkLogin: function () {
        var mobile = localStorage.getItem('_mobile_');
        if (mobile !== '' && mobile !== null && typeof mobile !== 'undefined') {
            return true;
        }
        return false;
    },
    checkOpenid: function(queryString) {
        var openid = localStorage.getItem('_openid_');
        // console.log(openid, 'openid');
        openid = openid == null? "": openid;
        if (openid == '') {
            $.ajax({
                url: api.get('index') + '&from_wx=' + queryString,
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {},
            }).done(function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    openid = data.openid;
                    localStorage.setItem('_openid_', openid);
                }
            })
        }
    },
    checkLoginAsync: function(f) {
        var openid = localStorage.getItem('_openid_');
        if (openid != '' && openid != null && typeof openid != 'undefined') {
            return true;
        }
        checkLoginFromServerAsync(f);
        return false;
    },
    checkLoginFromServerAsync: function(f) {
        $.ajax({
            url: api.get('user.islogin'),
            type: 'POST',
            dataType: 'json',
            data: {

            }
        }).done(function(response){
            if (response.errno == 0) {
                f();
            }
        })
    },
    checkLoginSync: function(queryString) {
        var isbind = localStorage.getItem('_isbind_');
        if (isbind == "1") {
            return true;
        }
        var openid = localStorage.getItem('_openid_');
        openid = openid == null ? '' : openid;
        var result = this.checkLoginFromServerSync(openid);

        if (result == true) {
            localStorage.setItem('_isbind_', 1);
        }
        return result;
    },
    getOpenidFromServer: function(queryString) {
        var openid = '';
        $.ajax({
            url: api.get('index'),
            type: 'POST',
            dataType: 'json',
            async: false,
            data: queryString,
        }).done(function(response){
            if (response.errno == 0) {
                var data = response.data;
                openid = data.openid;
            }
        })
        return openid;
    },
    checkLoginFromServerSync: function(openid) {
        console.log(openid, 'checkLoginFromServerSync');
        var result = false;
        $.ajax({
            url: api.get('user.isbind'),
            type: 'POST',
            dataType: 'json',
            async: false,
            data: {
                openid: openid,
            }
        }).done(function(response){
            if (response.errno == 0) {
                var data = response.data;
                if ($.trim(data.isbind) == '1') {
                    result = true;
                }
            }else {
                result = false
            }
        });
        return result;
    },
    ajax: function(options){
        options = options || {}

        var _default = {
            url: '',
            type: 'POST',
            dataType: 'json',
            params: [],
            isAsync: true,
            isNeedLoading: true,
            loadingText: '正在加载...',
        }

        var url = options.url || _default.url
        var type = options.type || _default.type
        var dataType = options.dataType || _default.dataType
        var params = options.params || _default.params
        var isAsync = options.isAsync || _default.isAsync
        var isNeedLoading = options.isNeedLoading || _default.isNeedLoading
        var loadingText = options.loadingText || _default.loadingText
        var doneCallback = options.done
        var failCallback = options.fail
        var alwaysCallback = options.always

        if (url == '') {
            return false;
        }

        if (isNeedLoading) {
            Toast.loading({
                mask: true,
                message: loadingText
            });
        }
        $.ajax({
            url: url,
            type: type,
            dataType: dataType,
            data: params,
            async: isAsync,
        }).done(function(response){
            if (typeof doneCallback == "function") {
                doneCallback(response);
            }
        }).fail(function(jqXHR, statusText, error){
            if (typeof errorCallback == "function") {
                failCallback(jqXHR, statusText, error);
            }
        }).always(function(){
            if (isNeedLoading) {
                Toast.clear();
            }
            if (typeof alwaysCallback == "function") {
                alwaysCallback();
            }
        })
    },
    post: function(url, params, handleResponse, dataType = 'json', isneedloading = true, isAsync = true){
        if (isneedloading) {
            Toast.loading({
                mask: true,
                message: '正在加载...'
            });
        }
        if (!params.hasOwnProperty('_openid_')) {
            var openid = localStorage.getItem('_openid_') || ''
            params['openid'] = openid
        }
        $.ajax({
            url: url,
            type: 'POST',
            dataType: dataType,
            data: params,
            async: isAsync,
        }).done(function(response){
            if (isneedloading) {
                Vue.nextTick(() => {
                    Toast.clear();
                });
            }
            if (typeof handleResponse == "function") {
                handleResponse(response);
            }
        }).fail(function() {
            if (isneedloading) {
                Vue.nextTick(() => {
                    Toast.clear();
                });
            }
        }).always(function(){
            if (isneedloading) {
                setTimeout(function(){
                    Toast.clear();
                }, 2000);
            }
        })
    },
}
