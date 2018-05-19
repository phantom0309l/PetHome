<template>
    <div class="BaseInfo text-left">
        <div class="patient-basenfo fc-bg-white">
            <div class="title fc-flex">
                <div class="" style="padding-top:2px">
                    <i class="iconfont icon-icon133 font-s20 fc-text-blue"></i>
                </div>
                <div class="fc-flex__item text-left">
                    <span class="font-s18 fc-text-blue pull-5-l">患者信息</span>
                </div>
            </div>
            <div class="fc-flex" style="padding:20px 10px;">
                <div class="patient-pic">
                    <img src="../../../static/image/患者.png" />
                </div>
                <div class="fc-flex__item pull-10-l">
                    <div class="fc-flex pull-5 remove-padding-t">
                        <div class="pull-10-r"><i class="iconfont icon-gerenzhongxin fc-text-blue font-s20"></i></div>
                        <div class="fc-flex__item text-left">姓名: {{patient.name}}</div>
                    </div>
                    <div class="fc-flex pull-5">
                        <div class="pull-10-r"><i class="iconfont icon-xingbie1 fc-text-blue font-s20"></i></div>
                        <div class="fc-flex__item text-left">性别: {{patient.sexstr}}</div>
                    </div>
                    <div class="fc-flex pull-5">
                        <div class="pull-10-r"><i class="iconfont icon-chushengriqi fc-text-blue font-s20"></i></div>
                        <div class="fc-flex__item text-left">年龄: {{patient.agestr}}</div>
                    </div>
                    <div class="fc-flex pull-5">
                        <div class="pull-10-r"><i class="iconfont icon-jibingbaike fc-text-blue font-s20"></i></div>
                        <div class="fc-flex__item text-left">疾病: {{patient.disease_name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="push-10-t fc-bg-white" v-for="(group, index) in groups">
            <div class="title fc-flex" @click="openOrClose($event, group, index)">
                <div class="item-title-icon">
                    <img :src="getTitleIcon(group.title)" />
                </div>
                <div class="fc-flex__item text-left">
                    <span class="font-s18 fc-text-blue pull-5-l">{{group.title}}</span>
                </div>
                <div class="text-right">
                    <img class="openorclose" src="../../../static/image/close.png" width="23" height="23" style="padding: 5px;">
                </div>
            </div>
            <div class="fc-flex" style="padding:10px;" v-show="group.openstatus">
                <div style="padding:5px;width:100%">
                <table class="table">
                    <tr v-for="item in group.items">
                        <td width="40%">{{item.title}}</td>
                        <td>{{item.value}}</td>
                    </tr>
                </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function() {
            return {
                groups:[],

                labelStatusText: '收起全部',
                labelStatus: 1,

                patient: {
                    // name: '张三',
                    // sexstr: '男',
                    // agestr: '35岁',
                    // disease: '肺癌',  //多疾病的情况没考虑
                },
            }
        },
        methods: {
            changeLabelStatus: function() {
                var that = this;
                this.labelStatus  = this.labelStatus == 0 ? 1: 0;
                this.labelStatusText = this.labelStatusText == '展开全部' ? '收起全部' : '展开全部';

                if (this.labelStatus == 1) {
                    console.log('xxx');
                    $("img").each(function(index, ele){
                        ele.src = '../../../static/image/close.png';
                    })
                    this.groups.map(function(one){
                        one.openstatus = true;
                    })
                }else {
                    $("img").each(function(index, ele){
                        ele.src = '../../../static/image/open.png';
                    })
                    this.groups.map(function(one){
                        one.openstatus = false;
                    })
                }
            },
            openOrClose: function(e, group, index){
                let p = e.currentTarget
                let img = p.querySelector('.openorclose')
                group.openstatus = !group.openstatus;
                this.$set(this.groups, index, group);
                if (group.openstatus) {
                    img.src = '../../../static/image/close.png';
                }else {
                    img.src = '../../../static/image/open.png';
                }
            },
            getTitleIcon: function(title) {
                let str
                if (title == '基本资料') {
                    str = '../../../static/image/基本资料-icon.png'
                } else if (title == '病例信息') {
                    str = '../../../static/image/病历信息.png'
                } else if (title == '既往病史') {
                    str = '../../../static/image/既往病史.png'
                } else if (title == '家族史') {
                    str = '../../../static/image/家族史.png'
                } else {
                    str = '../../../static/image/基本资料-icon.png'
                }
                return str
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var patientid = this.$route.params.patientid;
            var url = api.get('patient.allinfo');
            var params = {
                openid: openid,
                patientid: patientid,
            }
            common.post(url, params, function(response){
                self.groups = response.data.info_arr;
                self.groups.map(function(one){
                    one.openstatus = true;
                })
            })
            var url = api.get('patient.info');
            var params = {
                openid: openid,
                patientid: patientid,
            }
            common.post(url, params, function(response){
                var data = response.data;
                self.patient = data;
                self.patient.id = patientid;
            })
        },
        mounted: function() {
            document.title = "基本资料";
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('body').setAttribute('class', 'fc-bg-gray')
            next();
        },
        beforeRouteLeave(to, from, next) {
            document.querySelector('body').setAttribute('class', '')
            next();
        },
    }
</script>
<style scoped>
    .BaseInfo .title {
        border-bottom: 0.5px solid #d9d9d9;
        padding: 10px;
    }

    .patient-pic {
        width: 125px;
        height: 125px;
        background:#F3F3F3;
    }
    .patient-pic img {
        width:68px;
        height:68px;
        margin: 27px;
    }
    .aforclick {
        -webkit-tap-highlight-color:transparent;
    }
    .table {
        border-collapse: collapse;
        width: 100%;
    }
    .table td {
        padding: 10px;
        text-align: left;
        border-top: 1px dashed #ccc;
    }
    .table tr:first-child td {
        border-top: 0;
    }
    .table tr {
        text-align: center
    }
    .item-title-icon img{
        width: 21px;
        padding-top: 2px;
    }
</style>
