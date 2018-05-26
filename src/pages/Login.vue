<template>
    <div class="login">
        <div class="main">
            <img style="padding-top: 30px;" width="48px" height="78px" src="../../static/image/logo.png"/>

            <div class="pull-20">
                <van-cell-group>
                    <van-field v-model="mobile"
                               type="tel"
                               maxlength="11"
                               placeholder="手机号"
                               :error-message="fieldError.mobile"/>
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="password"
                               type="password"
                               placeholder="密码"
                               :error-message="fieldError.password"/>
                </van-cell-group>

                <van-button class="push-20-t" style="color: #fabf40" size="large" @click="submit">登录</van-button>

                <div class="forgotPassword pull-10">
                    密码忘记了？
                    <a href="javascript:void(0);">请找回密码。</a>
                </div>
            </div>
        </div>

        <div class="bottom">
            还没有账号？
            <a @click="goRegister">立即注册。</a>
        </div>
    </div>
</template>

<script>
    import api from '../config/api.js';
    import common from '../lib/common.js';
    import util from '../lib/utils.js'

    export default {
        data: function () {
            return {
                mobile: '',
                password: '',
                fieldError: {
                    mobile: '',
                    password: '',
                }
            }
        },
        methods: {
            // 获取数据
            fetchData: function () {
                var self = this;
                var url = api.get('xxx');
                var params = {};
                common.post(url, params, function (response) {
                    if (response.errno === 0) {
                        var data = response.data;
                    }
                })
            },
            // 前往xx页面
            goRegister: function () {
                this.$router.push({name: 'register'});
            },
            goIndex: function () {
                this.$router.push({name: 'index'});
            },
            submit: function () {
                let self = this;
                if (this.mobile === '') {
                    this.fieldError.mobile = '请填写手机号';
                    return;
                } else if (this.mobile.length < 11) {
                    this.fieldError.mobile = '手机号格式错误';
                    return;
                } else {
                    this.fieldError.mobile = '';
                }

                if (this.password === '') {
                    this.fieldError.password = '请填写密码';
                    return;
                } else {
                    this.fieldError.password = '';
                }

                this.$toast('登录成功');
                localStorage.setItem('_mobile_', this.mobile);

                let second = 1;
                const timer = setInterval(() => {
                    second--;
                    if (!second) {
                        clearInterval(timer);
                        self.$toast.clear();
                        this.goIndex();
                    }
                }, 1000);
            }
        },
        created: function () {
            this.fetchData();
            console.log(this.$route);
        },
        mounted: function () {
            document.title = "登录";
        },
        beforeRouteEnter(to, from, next) {
            $('#app').css('height', window.innerHeight);
            $('#app').css('padding-bottom', 0);
            document.querySelector('body').setAttribute('class', 'fc-bg-primary');
            next();
        },
        beforeRouteLeave(to, from, next) {
            $('#app').css('height', 'auto');
            $('#app').css('padding-bottom', 50);
            document.querySelector('body').setAttribute('class', '');
            next();
        },
    }
</script>

<style scoped>
    /*背景模糊*/
    .login {
        position: relative;
        height: 100%;
        width: 100%;
        background: url("http://viptail.image.alimmdn.com/image/albums/longarticle/234513/2017070921051596702E173.jpg") no-repeat fixed 60%;
        padding: 1px;
        box-sizing: border-box;
        z-index: 1;
    }

    .login:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.7);
        /*-webkit-filter: blur(2px);*/
        /*filter: blur(2px);*/
        z-index: 2;
    }

    .forgotPassword {
        font-size: 12px;
        color: #fff;
    }

    .forgotPassword a {
        color: #fabf40;
    }

    .main {
        position: relative;
        z-index: 4;
    }

    .login .bottom {
        position: absolute;
        z-index: 6;
        bottom: 0;
        background-color: rgba(238, 238, 238, 0.2);
        font-size: 12px;
        color: #fff;
        padding: 15px;
        width: 100%;
    }

    .login .bottom a {
        color: #fabf40;
    }
</style>
