<template>
    <div class="modifypwd">
        <!-- <div class="header">
            <img src="../../assets/logo.png">
        </div>
        <mt-field label="旧密码" placeholder="旧密码"  @touchstart.native="clearErrmsg" type="password" v-model="oldpwd"></mt-field>
        <mt-field label="新密码" placeholder="新密码"  @touchstart.native="clearErrmsg" type="password" v-model="pwd"></mt-field>
        <mt-field label="重复新密码" placeholder="重复新密码" @touchstart.native="clearErrmsg" type="password" v-model="repeatpwd"></mt-field>
        <div v-show="errmsg != ''" style="padding: 10px;margin-top: 10px;"><span style="color: #e64340">{{errmsg}}</span></div>
        <div style="margin:0 5px">
            <mt-button type="primary" size="large" style="margin-top: 10px" @touchstart.native="clickModifypwd">提交修改</mt-button>
        </div> -->

        <div style="padding: 60px 0px 20px 0px" class="text-center">
            <img src="../../assets/logo.png" style="width: 104px; height: 140px">
        </div>
        <form style="padding:10px">
            <div class="no-focus">
                <div class="fc-cell ">
                    <div class="fc-cell__hd"><i class="iconfont icon-user2 font-s20 fc-text-blue"></i><span class="push-10-l fc-text-danger">*</span></div>
                    <div class="form-material fc-cell__bd">
                        <input class="form-control" type="password" v-model="oldpwd" placeholder="旧密码" @touchstart="clearErrmsg" />
                    </div>
                </div>
                <div class="fc-cell ">
                    <div class="fc-cell__hd"><i class="iconfont icon-password font-s20 fc-text-green"></i><span class="push-10-l fc-text-danger">*</span></div>
                    <div class="form-material fc-cell__bd">
                        <input class="form-control" type="password" v-model="pwd" placeholder="新密码"  @touchstart.native="clearErrmsg" />
                    </div>
                </div>
                <div class="fc-cell ">
                    <div class="fc-cell__hd"><i class="iconfont icon-password font-s20 fc-text-green"></i><span class="push-10-l fc-text-danger">*</span></div>
                    <div class="form-material fc-cell__bd">
                        <input class="form-control" type="password" v-model="repeatpwd" placeholder="重复新密码" @touchstart.native="clearErrmsg" />
                    </div>
                </div>
                <div v-show="errmsg != ''" style="padding: 10px;margin-top: 10px;"><span class="fc-text-danger">{{errmsg}}</span></div>
                <div style="margin:0 5px">
                    <mt-button class="fc-bg-blue" type="primary" size="large" style="margin-top: 10px" @click="clickModifypwd">提交修改</mt-button>
                </div>
            </div>
            <!-- <mt-field label="用户名" placeholder="请输入用户名" v-model="username" v-on:keyup.13.native="goNext($event)"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" v-on:keyup.13.native="bindUser"></mt-field> -->
        </form>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                errmsg: '',
                openid: '',
                oldpwd: '',
                pwd: '',
                repeatpwd: '',
            }
        },
        methods: {
            'clickModifypwd': function() {
                var self = this;
                if (this.oldpwd.trim() == "") {
                    this.errmsg = "旧密码不能为空";
                    return ;
                }
                if (this.pwd.trim() == "" || this.repeatpwd.trim() == "") {
                    this.errmsg = "新密码/重复新密码不能为空";
                    return ;
                }
                if (this.pwd != this.repeatpwd) {
                    this.errmsg = "两次输入的新密码不一致，请重新输入";
                    return ;
                }

                var url = api.get('doctor.modifypwdjson');
                var params = {
                    openid: this.openid,
                    oldpwd: this.oldpwd,
                    newpwd: this.pwd,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        if (data.issuc == 1) {
                            let instance = self.$toast('修改成功');
                            setTimeout(() => {
                                instance.close();
                                WeixinJSBridge.call('closeWindow');
                            }, 2000);
                        }else {
                            self.errmsg = data.msg;
                        }

                    }
                })

            },
            checkParams: function() {
                if (this.oldpwd.trim() == '' || this.pwd.trim() == '' || this.repeatpwd.trim() == '' || (this.pwd != this.repeatpwd) ) {
                    return false
                }
            },
            clearErrmsg: function() {
                this.errmsg = ""
            }
        },
        created: function(){
            this.openid = localStorage.getItem('_openid_');
        }
    }
</script>
<style scoped>
.modifypwd {
    padding: 10px 0;
    text-align: left;
}
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
