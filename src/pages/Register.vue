<template>
    <div class="register">
        <div class="main">
            <img style="padding-top: 30px;" width="48px" height="78px" src="../../static/image/logo.png"/>

            <div class="pull-20">
                <van-cell-group>
                    <van-field v-model="mobile"
                               type="tel"
                               maxlength="11"
                               placeholder="手机号"
                               :error-message="fieldError.mobile">
                        <van-button
                                @click="sendCode"
                                :loading="isSend"
                                slot="button"
                                size="small"
                                type="primary"
                                style="border-color: #fabf40; background-color: #fabf40">
                            发送验证码
                        </van-button>
                    </van-field>
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="code"
                               type="tel"
                               maxlength="4"
                               placeholder="验证码"
                               :error-message="fieldError.code"/>
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="password"
                               type="password"
                               placeholder="密码"
                               minlength="6"
                               :error-message="fieldError.password"/>
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="nickname"
                               placeholder="昵称"
                               :error-message="fieldError.nickname"/>
                </van-cell-group>
                <div class="protocol">
                    注册即表明你同意
                    <a href="javascript:void(0);">新用户注册协议</a>
                </div>

                <van-button class="push-20-t" style="color: #fabf40" size="large" @click="submit">注册</van-button>

            </div>
        </div>

        <div class="bottom">
            已经有账号了？
            <a @click="goLogin">立即登录。</a>
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
                code: '',
                password: '',
                nickname: '',
                isSend: false,
                fieldError: {
                    mobile: '',
                    code: '',
                    password: '',
                    nickname: '',
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
            goLogin: function () {
                this.$router.push({name: 'login'});
            },
            goIndex: function () {
                this.$router.push({name: 'index'});
            },
            sendCode: function (e) {
                let self = this;
                if (self.mobile.length === 11) {
                    self.$toast('验证码已发送');
                    self.isSend = true;

                    let second = 3;
                    const timer = setInterval(() => {
                        second--;
                        if (!second) {
                            clearInterval(timer);
                            self.$toast.clear();
                            self.isSend = false;
                        }
                    }, 1000);
                } else {
                    this.$toast('手机号格式错误');
                }
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

                if (this.code === '') {
                    this.fieldError.code = '请填写验证码';
                    return;
                } else if (this.code !== '1234') {
                    this.fieldError.code = '验证码错误';
                    return;
                } else {
                    this.fieldError.code = '';
                }

                if (this.password === '') {
                    this.fieldError.password = '请填写密码';
                    return;
                } else if (this.password.length < 6) {
                    this.fieldError.password = '密码至少为6位';
                    return;
                } else {
                    this.fieldError.password = '';
                }

                if (this.nickname === '') {
                    this.fieldError.nickname = '请填写昵称';
                    return;
                } else if (this.nickname === '科科') {
                    this.fieldError.nickname = '该昵称已被使用';
                    return;
                } else {
                    this.fieldError.nickname = '';
                }

                this.$toast('注册成功');

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
            document.title = "注册";
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
    .register {
        position: relative;
        height: 100%;
        width: 100%;
        background: url("http://viptail.image.alimmdn.com/image/albums/longarticle/234513/2017070921051596702E173.jpg") no-repeat fixed 60%;
        padding: 1px;
        box-sizing: border-box;
        z-index: 1;
    }

    .register:after {
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

    .protocol {
        font-size: 12px;
        color: #fff;
        text-align: left;
        padding: 10px 10px 10px 5px;
    }

    .protocol a {
        color: #fabf40;
    }

    .main {
        position: relative;
        z-index: 4;
    }

    .register .bottom {
        position: absolute;
        z-index: 6;
        bottom: 0;
        background-color: rgba(238, 238, 238, 0.2);
        font-size: 12px;
        color: #fff;
        padding: 15px;
        width: 100%;
    }

    .register .bottom a {
        color: #fabf40;
    }
</style>
