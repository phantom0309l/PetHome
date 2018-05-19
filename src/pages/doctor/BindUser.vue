<template>
    <div class="vertical-container">
        <template v-if="isbind == 0">
        <div style="padding: 60px 0px 20px 0px">
            <img src="../../assets/logo.png" style="width: 104px; height: 140px">
        </div>
        <form style="padding:10px">
            <div class="no-focus">
                <div class="fc-cell ">
                    <div class="fc-cell__hd"><i class="iconfont icon-user2 font-s20 fc-text-blue"></i></div>
                    <div class="form-material fc-cell__bd">
                        <input class="form-control" type="text" v-model="username" placeholder="请输入您的登录名" v-on:keyup.13="goNext($event)" />
                    </div>
                </div>
                <div class="fc-cell ">
                    <div class="fc-cell__hd"><i class="iconfont icon-password font-s20 fc-text-blue"></i></div>
                    <div class="form-material fc-cell__bd">
                        <input class="form-control" type="password" v-model="password" placeholder="请输入密码" v-on:keyup.13="bindUser" />
                    </div>
                </div>
            </div>
            <!-- <mt-field label="用户名" placeholder="请输入用户名" v-model="username" v-on:keyup.13.native="goNext($event)"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" v-on:keyup.13.native="bindUser"></mt-field> -->
        </form>

        <div v-show="errmsg != ''"><span style="color: red">{{errmsg}}</span></div>
        <div style="margin:0 20px;">
            <mt-button class="push-20-t fc-bg-blue"  type="primary" size="large" @click="bindUser">安全登录</mt-button>
        </div>
        <div>
            <span>{{path}}</span>
        </div>
        </template>
        <template v-if="isbind == 1">
            <div class="fc-flex" style="padding:20px 10px;border-bottom:1px solid #ddd">
                <div class="doctor-pic">
                    <img v-if="doctor.sex == 2" src="../../../static/image/doctor-female.png" />
                    <img v-else src="../../../static/image/doctor-male.png" />
                </div>
                <div class="fc-flex__item pull-10-l">
                    <div class="fc-flex pull-5">
                        <div class="pull-10-r"><i class="iconfont icon-yisheng fc-text-blue font-s20"></i></div>
                        <div class="fc-flex__item text-left">医生：{{doctor.name}}</div>
                    </div>
                    <div class="fc-flex pull-5">
                        <div class="pull-10-r"><i class="iconfont icon-weishengjiancha fc-text-yellow font-s20"></i></div>
                        <div class="fc-flex__item text-left">职称：{{doctor.title}}</div>
                    </div>
                    <div class="fc-flex pull-5">
                        <div class="pull-10-r"><i class="iconfont icon-yiyuan fc-text-green font-s20"></i></div>
                        <div class="fc-flex__item text-left">医院：{{doctor.hospital_name}}</div>
                    </div>
                </div>
            </div>
            <div class="push-20">
                <mt-button class="fc-bg-blue"  type="primary" size="large" @click="unbindUser">退出登录</mt-button>
            </div>


            <!-- <div class="doctorinfo">
                <span>医生姓名:&nbsp;&nbsp;</span>
                <span>{{doctor.name}}</span><br/>
            </div>
            <img src="../../assets/bindsuccess.png" style="width: 100px; height: 100px; margin-top: 130px;"><br/>
            <span style="color: #4472c5; margin-top: 20px; display: block; font-size: 22px">已绑定成功</span>
            <a class="unbind-btn" href="javascript:" @click="unbindUser">解除绑定</a> -->
        </template>
    </div>
</template>
<script>
    import common from '../../lib/common.js';
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                openid: '',
                errmsg: '',
                openid: '',
                username: '',
                password: '',
                path: '',
                isbind: '',
                doctor: {},
            }
        },
        methods: {
            goNext: function(self) {
                var input = $(self.target).parents(".mint-cell").next().find('input');
                $(input).focus();
            },
            bindUser: function() {
                this.openid = localStorage.getItem('_openid_');
                var self = this;
                if(!this.checkPostParams()){
                    return ;
                };
                $.ajax({
                    url: api.get('bind.binduserpost'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: this.openid,
                        username: this.username,
                        password: this.password,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        localStorage.setItem('_isbind_', '1');
                        let instance = self.$toast('绑定成功');
                        setTimeout(() => {
                            instance.close();
                            WeixinJSBridge.call('closeWindow');
                        }, 2000);
                    }else if (response.errno == 2001){
                        self.errmsg = "用户名不存在,请重新输入";
                    }else if (response.errno == 2002){
                        self.errmsg = '密码错误,请重新输入';
                    }else {
                        self.errmsg = '系统异常,请联系技术人员';
                    }
                })

            },
            unbindUser: function() {
                var self = this;
                this.$messagebox.confirm('您确定要取消绑定吗?').then(action => {
                    var url = api.get('bind.unbindpost');
                    var params = {
                        openid: this.openid,
                    }
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            localStorage.setItem('_isbind_', '0');
                            localStorage.setItem('_openid_', '');
                            let instance = self.$toast('解绑成功');
                            setTimeout(() => {
                                instance.close();
                                WeixinJSBridge.call('closeWindow');
                            }, 2000);
                        }
                    })
                }, cancel => {

                });
            },
            checkPostParams: function() {
                if (this.username.trim() == '') {
                    this.$messagebox.alert("请输入用户名").then(action => {
                    });
                    return false;
                }
                if (this.password.trim() == '') {
                    this.$messagebox.alert("请输入密码").then(action => {
                    });
                    return false;
                }
                return true;
            },
            clickUsername: function() {
                this.errmsg = '';
            },
            clickPassword: function() {
                this.errmsg = '';
            },
            getDoctorInfo: function() {
                var self = this;
                var doctorInfoUrl = api.get('doctor.info');
                var params = {
                    openid: this.openid,
                }
                common.post(doctorInfoUrl, params, function(response){
                    if (response.errno == 0) {
                        console.log('doctor-info', response.data);
                        self.doctor = response.data.doctor;
                    }
                })
            }
        },
        watch: {
            'username': function(val){
                if (val != '') {
                    this.errmsg = '';
                }
            },
            'password': function(val){
                if (val != '') {
                    this.errmsg = '';
                }
            },
            '$router': function(newValue, old) {
                console.log('hahaha');
            }
        },
        created: function() {
            var self = this;
            self.openid = localStorage.getItem('_openid_');
            var url = api.get('user.isbind');
            var params = {
                openid: self.openid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    self.isbind = response.data.isbind;
                    console.log('isbind', self.isbind);
                    if (self.isbind == 1) {
                        self.getDoctorInfo();
                    }
                }
            })
        }
        // beforeRouteEnter(to, from, next) {
        //     var self = this;
        //     var openid = '';
        //     var isbind = '';
        //     openid = localStorage.getItem('_openid_');
        //     var url = api.get('user.isbind');
        //     var params = {
        //         openid: openid,
        //     }
        //     common.post(url, params, function(response){
        //         if (response.errno == 0) {
        //             isbind = response.data.isbind;
        //             console.log('isbind', isbind);
        //             if (isbind == 1) {
        //                 this.getDoctorInfo();
        //             }
        //         }
        //     })

        // }
    }
</script>
<style scoped>
    .unbind-btn {
        text-decoration: none;
        color: #fff;
        width: 100%;
        line-height: 2.4;
        height: 41px;
        font-size: 18px;
    }
    .doctorinfo {
        padding: 10px;
        font-size: 16px;
        background-color: #4472c5;
        text-align: left;
    }
    .doctorinfo span {
        color: #fff;
    }
    .doctor-pic {
        width: 100px;
        height: 100px;
        background:#F3F3F3;
    }
    .doctor-pic img {
        width:68px;
        height:68px;
        margin: 16px;
    }
    /*cell*/
    .fc-cell {
        margin: 10px 15px;
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        border-bottom: 0.5px solid #d9d9d9;
    }
    .fc-cell__hd {
        padding-right: 0.5em;
        }
    .fc-cell__bd {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }

</style>
