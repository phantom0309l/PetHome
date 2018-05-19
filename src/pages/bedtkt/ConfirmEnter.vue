<template>
    <div class="refuse-enter">
        <!-- <mt-header fixed title="发送入院通知">
            <router-link to="/bedtkt/list" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->

        <div class="fc-bg-white text-left">
            <div class="pi-basic fc-flex">
                <div class="icon">
                    <i class="iconfont icon-icon133 fc-text-blue font-s18"></i>
                </div>
                <div class="fc-flex__item">
                    <div><span class="font-s18 font-w500">{{bedtkt.name}}</span><span style="color:#6e6e6e">&nbsp;&nbsp;{{bedtkt.sex}}&nbsp;&nbsp;{{bedtkt.age}}岁</span></div>
                    <div class="fc-text-green push-10-t">应住院日期: {{bedtkt.plan_date}}</div>
                </div>
                <div class="text-right" style="line-height:1.8">
                    <span class="fc-text-blue">{{bedtkt.disease_name}}</span>
                </div>
            </div>
        </div>
        <div class="text-left push-10-t pull-10-l pull-10-r fc-flex">
            <div class="icon">

            </div>
            <div class="fc-flex__item">
                <span class="fc-text-danger">确认入院后系统会发送入院通知至患者,同时您可以填写备注信息将备注信息发送给患者。</span>
            </div>
        </div>
        <div class="text-left push-20-t pull-10-l pull-10-r fc-flex">
            <div class="icon">
                <i class="iconfont icon-info fc-text-blue font-s18"></i>
            </div>
            <div class="fc-flex__item">
                <div><span class="font-s18 font-w500">住院日期</span></div>
                <div class="push-10-t">
                    <!-- <input class="form-control" type="text" placeholder="请输入住院日期" v-model="time" @click="clickTimeInput()" onfocus="this.blur();" readonly/> -->
                    <input class="form-date" :class="[{'form-date-placeholder': time == ''}]" type="date" v-model="time"/>
                </div>
            </div>
        </div>
        <div class="text-left push-20-t pull-10-l pull-10-r fc-flex">
            <div class="icon">
                <i class="iconfont icon-beizhu fc-text-blue font-s18"></i>
            </div>
            <div class="fc-flex__item">
                <div><span class="font-s18 font-w500">备注内容</span></div>
                <textarea class="textarea-remark push-10-t form-control" rows="4" v-model="content"></textarea>
                <mt-cell class="push-5-t fc-text-blue remove-bgimg" title="将当前备注信息保存为默认备注"><mt-switch v-model="is_set_default"></mt-switch></mt-cell>

                <div class="push-20-t push-20-b fc-flex">
                    <div class="fc-flex__item pull-10-r">
                        <mt-button class="fc-text-blue" style="width:100%; box-shadow: 0 0 1px #4472c5;" type="default" size="normal" @click.native="clickCancel">取消</mt-button>
                    </div>
                    <div class="fc-flex__item text-right">
                        <mt-button class="fc-bg-blue" style="width:100%"  type="primary" size="normal" @click.native="clickConfirm">确认入院</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <template>
            <mt-datetime-picker
                ref="picker"
                type="date"
                v-model="pickerValue"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="startDate"
                @confirm="handleConfirm">
            </mt-datetime-picker>
        </template>
    </div>
</template>
<script>
    import common from '../../lib/common.js'
    import api from '../../config/api.js'
    import utils from '../../lib/utils.js'
    export default {
        data: function() {
            return {
                openid: '',
                content: '',
                is_set_default: false,
                bedtktid: '',
                bedtkt: {},
                pickerValue: '',
                time: '',
                startDate: '',
            }
        },
        methods: {
            'clickCancel': function() {
                this.$router.go(-1);
            },
            'clickConfirm': function() {
                var self = this;
                let is_set_default
                if (this.is_set_default == true) {
                    is_set_default = 1;
                }else {
                    is_set_default = 0;
                }
                this.$messagebox.confirm('一旦发送入院通知将不能撤回请确认').then(action => {
                    var url = api.get('sickbed.passjson');
                    var params = {
                        openid: this.openid,
                        content: this.content,
                        thedate: this.time,
                        is_set_default: is_set_default,
                        bedtktid: this.bedtktid,
                    }

                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            let instance = self.$toast('操作成功!');
                            setTimeout(() => {
                                instance.close();
                                self.$router.go(-1);
                            }, 2000);
                        }
                    })
                }, cancel => {

                });
            },
            clickTimeInput: function() {
                this.$refs.picker.open();
            },
            handleConfirm(date) {
                this.time = utils.formatDate(date);
            },
        },
        created(){
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.startDate = new Date();

            var queryString = this.$route.query;
            this.bedtktid = queryString.bedtktid;
            common.getBedtktInfo(this.bedtktid, this.openid, function(response){
                if (response.errno == 0) {
                    self.bedtkt = response.data.bedtkt;
                }
            })

            var url = api.get('sickbed.pass');
            var params = {
                openid: this.openid,
                bedtktid: this.bedtktid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    self.content = data.bedtkt_pass_content;
                }
            })
        },
        watch: {
            '$route': function(to, from) {

            }
        },
        mounted: function() {
            document.title = "确认入院";
        }
    }
</script>
<style scoped>
.refuse-enter {
}

.form-date {
    width: 100%;
    height: 45px;
    border: 0.5px solid #d9d9d9;
    border-radius: 3px;
    padding: 10px;
    font-size: 16px;
    color: #646464;
    background-color: #fff;
    vertical-align: middle;
    -webkit-appearance: none;
}

.form-date-placeholder::before {
    content: "请选择住院日期";
    color: #999;
    margin-left: 2px;
}

.footer a {
    display: inline-block;
    /*width: 50%;*/
    padding: 10px 0px;
    text-decoration: none;
    color: #fff;
}
.pi-basic {
    padding: 10px;
    border-bottom: 0.5px solid #d9d9d9;
}

.refuse-enter .icon {
    padding: 3px 10px;
    padding-left: 0;
    width: 25px;
    text-align: right;
}
.textarea-remark {
    width: 100%;
    border: 0.5px solid #d9d9d9;
    border-radius: 3px;
}
</style>
