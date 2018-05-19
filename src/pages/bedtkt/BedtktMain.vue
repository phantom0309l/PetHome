<template>
    <div class="bedtktmain fc-bg-gray">
        <div class="patientinfo text-left fc-bg-white" @click="clickPatientDetail">
            <div class="pi-basic"><i class="iconfont icon-icon133 fc-text-blue font-s18"></i><span class="font-s18 font-w600 fc-text-blue">{{bedtkt.name}}</span>&nbsp;&nbsp;{{bedtkt.sex}}&nbsp;&nbsp;{{bedtkt.age}}岁
            </div>
            <div class="fc-flex pull-10">
                <div class="patient-pic"><img src="../../../static/image/患者.png" /></div>
                <div class="fc-flex__item pull-10">
                    <div class="pi-content">应住院日期: {{bedtkt.plan_date}}</div>
                    <div class="pi-content push-10-t">手机: {{bedtkt.mobile}}</div>
                    <div class="pi-content push-10-t">近期居住地: {{bedtkt.address}}</div>
                </div>
                <div class="right-arrow"><i class="iconfont icon-combinedshapefuben font-s36 fc-text-999"></i></div>
            </div>
        </div>
        <div class="extra_info fc-bg-white text-left pull-10">
            <p v-if="bedtkt.extra_info.hasOwnProperty('idcard')">身份证号： {{bedtkt.extra_info.idcard}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('zhuyuanhao')">住院号： {{bedtkt.extra_info.zhuyuanhao}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('bingshi')">病史： {{bedtkt.extra_info.bingshi}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('linchuangbiaoxian')">临床表现： {{bedtkt.extra_info.linchuangbiaoxian}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('otherdisease')">其他疾病： {{bedtkt.extra_info.otherdisease}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('shoushuriqi')">手术日期： {{bedtkt.extra_info.shoushuriqi}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('xingongnengfenji')">心功能分级： {{bedtkt.extra_info.xingongnengfenji}}</p>
        </div>
        <div class="recent-status fc-bg-white text-left push-10-t">
            <div class="pi-basic fc-flex">
                <div style="margin:auto">
                    <i class="iconfont icon-ccgl-caozuozhuangtai-4 fc-text-blue font-s18"></i><span class="font-s18">最新状态</span>
                </div>

                <!-- <span :style="{backgroundColor: '#'+bedtkt.lastlog_color}" style="color: #fff; padding: 5px 15px 5px 5px; box-sizing: border-box; border-top-right-radius: 18px; border-bottom-right-radius: 18px; display: inline-block">{{bedtkt.lastlog_title}}</span> -->
                <div class="fc-flex__item text-right">
                    <span :style="{backgroundColor: '#'+bedtkt.lastlog_color}" style="color: #fff; padding: 5px;border-radius:3px;">{{bedtkt.lastlog_title}}</span>
                </div>
            </div>
            <div class="fc-flex pull-10" @click="clickLastStatus">
                <div class="text-right">
                    <!-- <i class="iconfont icon-tongguo-dianji font-s26 fc-text-green"></i> -->
                </div>
                <div class="fc-flex__item text-left pull-10">
                    <!-- <div class="font-s20 fc-text-green">
                        <span class="">{{bedtkt.lastlog_title}}</span>
                    </div>
                    <div class="push-10-t" style="color: #8E8E8E">
                        <div>审核医助: {{bedtkt.auditor_name}}</div>
                        <div class="push-10-t">应住院日期: {{bedtkt.plan_date}}</div>
                    </div> -->
                    <p v-html="contentHandle(bedtkt.lastlog_content)"></p>
                </div>
                <div class="right-arrow">
                    <i class="iconfont icon-combinedshapefuben font-s36 fc-text-999"></i>
                </div>
            </div>
        </div>
        <div class="operation push-10-t fc-bg-white">
            <div class="fc-flex">
                <div class="fc-flex__item" @click="clickApplicationInformation">
                    <div><img src="../../../static/image/入院资料.png" /></div>
                    <div>入院资料</div>
                </div>
                <div class="fc-flex__item" v-if="bedtkt.is_open != '0'" @click="clickSendMsg">
                    <div><img src="../../../static/image/询问是否可以入院.png" /></div>
                    <div>询问入院</div>
                </div>
            </div>
            <div class="fc-flex push-20-t" v-if="bedtkt.is_open != '0'">
                <div class="fc-flex__item" @click="clickConfirmEnter">
                    <div><img src="../../../static/image/确认入院.png" /></div>
                    <div>确认入院</div>
                </div>
                <div class="fc-flex__item" @click="clickRefuseEnter">
                    <div><img src="../../../static/image/拒绝入院.png" /></div>
                    <div>拒绝入院</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                openid: '',
                patientid: '',
                bedtktid: '',

                bedtkt: {
                    is_open: '0',
                    name: '',
                    sex: '',
                    mobile: '',
                    color: '',
                    title: '',
                    extra_info: {},
                },
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.bedtktid = this.$route.params.bedtktid;
            this.patientid = this.$route.query.patientid;
            var url = api.get('bedtkt.one');
            var params = {
                bedtktid: this.bedtktid,
                openid: this.openid,
            }
            common.post(url, params, function(response){
                self.bedtkt = response.data.bedtkt;
                if (!self.bedtkt.hasOwnProperty('extra_info')) {
                    self.bedtkt.extra_info = {};
                }
            })
        },
        methods: {
            clickApplicationInformation: function() {
                this.$router.push({
                    name: 'bedtkt-applicationinfomation',
                    params:{
                        bedtktid: this.bedtktid,
                    }
                })
            },
            clickSendMsg: function() {
                this.$router.push({
                    name: 'bedtkt-sendentermsg',
                    query:{
                        bedtktid: this.bedtktid,
                    }
                })
            },
            clickPatientDetail: function() {
                this.$router.push({
                    name: 'patient-main',
                    params:{
                        patientid: this.bedtkt.patientid,
                    }
                })
            },
            clickConfirmEnter: function() {
                this.$router.push({
                    name: 'bedtkt-pass',
                    query:{
                        bedtktid: this.bedtktid,
                    }
                })
            },
            clickRefuseEnter: function() {
                this.$router.push({
                    name: 'bedtkt-refuse',
                    query:{
                        bedtktid: this.bedtktid,
                    }
                })
            },
            clickLastStatus: function() {
                this.$router.push({
                    name: 'bedtktlog-list',
                    query:{
                        bedtktid: this.bedtktid,
                    }
                })
            },
            contentHandle: function(content) {
                let s = ""
                if (typeof content != 'undefined' && content != null) {
                    let a = content.split("\n")
                    if (a.length > 1) {
                        // a.shift()
                    }
                    s = a.join("<br/>")
                }
                return s
            }
        },
        mounted: function() {
            document.title = "患者预约";
        }
    }
</script>
<style scoped>
    h4 {
        margin-bottom: 10px;
        font-weight: normal;
    }
    .pi-basic {
        padding: 10px;
        border-bottom: 0.5px solid #d9d9d9;
    }

    .pi-basic span {
        display: inline-block;
        padding: 5px 10px 5px 5px;
    }

    .patient-pic {
        width: 100px;
        height: 100px;
        background:#F3F3F3;
    }
    .patient-pic img {
        width:68px;
        height:68px;
        margin: 16px;
    }

    .operation {
        padding: 20px 0;
    }

    .operation img {
        width: 57px;
        height: 57px;
    }

</style>
