<template>
<div class="patientmain text-left">
    <div class="patient-basenfo fc-bg-white">
        <div class="title fc-flex">
            <div class="" style="padding-top:2px">
                <i class="iconfont icon-icon133 font-s20 fc-text-blue"></i>
            </div>
            <div class="fc-flex__item text-left">
                <span class="font-s18 fc-text-blue pull-5-l">患者信息</span>
            </div>
            <div class="fc-flex__item text-right">
                <span class="font-s18 fc-text-blue pull-5-l" v-if="patient.doctor_name">{{patient.doctor_name}}医生</span>
            </div>
        </div>
        <div class="fc-flex" style="padding:20px 10px;">
            <div class="patient-pic">
                <img src="../../../static/image/患者.png" />
            </div>
            <div class="fc-flex__item pull-10-l">
                <div class="fc-flex pull-5 remove-padding-t">
                    <div class="pull-10-r"><i class="iconfont icon-gerenzhongxin fc-text-blue font-s20"></i></div>
                    <div class="fc-flex__item text-left">姓名: {{patient.name}} <span class="die" v-if="patient.is_live == 0">已死亡</span></div>
                </div>
                <div class="fc-flex pull-5">
                    <div class="pull-10-r"><i class="iconfont icon-xingbie1 fc-text-blue font-s20"></i></div>
                    <div class="fc-flex__item text-left">性别: {{patient.sexstr}}</div>
                </div>
                <div class="fc-flex pull-5">
                    <div class="pull-10-r"><i class="iconfont icon-chushengriqi fc-text-blue font-s20"></i></div>
                    <div class="fc-flex__item text-left">年龄: {{patient.agestr}}</div>
                </div>
                <div class="fc-flex pull-5 remove-padding-b">
                    <div class="pull-10-r"><i class="iconfont icon-jibingbaike fc-text-blue font-s20"></i></div>
                    <div class="fc-flex__item text-left">疾病: {{getDiseaseNames(patient)}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="recentinfo fc-bg-white push-10-t">
        <div class="title fc-flex">
            <div class="" style="padding-top:2px">
                <i class="iconfont icon-icon133 font-s20 fc-text-blue"></i>
            </div>
            <div class="fc-flex__item text-left">
                <span class="font-s18 fc-text-blue pull-5-l">消息和量表</span>
            </div>
        </div>
        <div class="content">
            <div class="patient-pipes">
                <div class="fc-flex pull-10-t">
                    <div class="fc-flex__item"><span>近一个月患者消息</span></div>
                    <div class=""><span>{{patient.one_month_info.pipes.one_month_cnt}}条</span></div>
                </div>
                <div class="fc-flex pull-10-t">
                    <div class="fc-flex__item"><span>患者消息总计</span></div>
                    <div class=""><span>{{patient.one_month_info.pipes.all_cnt}}条</span></div>
                </div>
            </div>
            <div class="patient-paper push-10-t">
                <div class="fc-flex pull-10-t">
                    <div class="fc-flex__item"><span>近一个填写量表</span></div>
                    <div class=""><span>{{patient.one_month_info.papers.one_month_cnt}}条</span></div>
                </div>
                <div class="fc-flex pull-10-t">
                    <div class="fc-flex__item"><span>患者量表总计</span></div>
                    <div class=""><span>{{patient.one_month_info.papers.all_cnt}}条</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="patientinfotitle fc-bg-white pull-10-t" v-if="isShowTagAndRemark(patient)" @click="clickTagAndRemark(patient.id)">
        <div class="title fc-flex">
            <div class="" style="padding-top:2px">
                <i class="iconfont icon-icon133 font-s20 fc-text-blue"></i>
            </div>
            <div class="fc-flex__item text-left">
                <span class="font-s18 fc-text-blue pull-5-l">标签</span>
            </div>
        </div>
        <div class="content" v-if="patient.tags.length != 0 || (patient.remark_doctor != '' && patient.remark_doctor != undefined)" @click="clickTagAndRemark(patient.id)">
            <div class="fc-flex pull-5-t" v-if="patient.tags.length != 0">
                <div class=""><span class="pull-10-r">标签:</span></div>
                <div class="fc-flex__item"><span style="word-break:break-all">{{patient.tags.join(',&nbsp;&nbsp;&nbsp;')}}</span></div>
            </div>
            <div class="fc-flex pull-10-t" v-if="patient.remark_doctor != '' && patient.remark_doctor != undefined">
                <div class=""><span class="pull-10-r">备注:</span></div>
                <div class="fc-flex__item"><span style="word-break:break-all">{{patient.remark_doctor}}</span></div>
            </div>
        </div>
    </div>
    <div v-if="isShowTkt(patient)" class="fc-bg-white pull-10-t">
        <div class="title fc-flex">
            <div class="" style="padding-top:2px">
                <i class="iconfont icon-icon133 font-s20 fc-text-blue"></i>
            </div>
            <div class="fc-flex__item text-left">
                <span class="font-s18 fc-text-blue pull-5-l">预约</span>
            </div>
        </div>
        <div class="content pull-10 pull-20-l">
            <div class="pull-10-b" v-if="patient.service.bedtktid != '0' " @click="clickBedtktInfo">
                <span style="padding: 5px 0; display: inline-block">住院预约</span>
                <a class="yuyue-a" style="" href="javascript:">查看</a>
            </div>
            <div class="pull-10-t" :style="getStyle(patient)" v-if="patient.service.revisittktid != '0'" @click="clickRevisittkt(patient.id)">
                <span style="padding: 5px 0; display: inline-block">复诊预约</span>
                <a class="yuyue-a" href="javascript:">查看</a>
            </div>
        </div>
    </div>

    <div class="fc-bg-white quick-entry push-10-t text-center pull-20-t pull-20-b">
        <div class="main-entry">
            <div v-if="isShowEntry('治疗简报')" class="main-entry-item" @click="clickphymanewspaper(patient.id)"><img src="../../../static/image/肿瘤简报.png" />
                <div>治疗简报</div>
            </div>
            <div v-if="isShowEntry('基本资料')" class="main-entry-item" @click="clickBaseInfo(patient.id)"><img src="../../../static/image/基本资料.png" />
                <div>基本资料</div>
            </div>
            <div v-if="isShowEntry('医患交流')" class="main-entry-item" @click="clickChat(patient.id)"><img src="../../../static/image/诊后交流.png" />
                <div>医患交流</div>
            </div>
            <div v-if="isShowEntry('住院预约')" class="main-entry-item" @click="clickBedtkt(patient.id)"><img src="../../../static/image/住院预约.png" />
                <div>住院预约</div>
            </div>
            <div v-if="isShowEntry('复诊预约')" class="main-entry-item" @click="clickRevisittkt(patient.id)"><img src="../../../static/image/复诊预约.png" />
                <div>复诊预约</div>
            </div>
            <div v-if="isShowEntry('量表查询')" class="main-entry-item" @click="clickPaper(patient.id)"><img src="../../../static/image/量表查询.png" />
                <div>量表查询</div>
            </div>
            <div v-if="isShowEntry('数据查询')" class="main-entry-item" @click="clickData(patient.id)"><img src="../../../static/image/数据查询.png" />
                <div>数据查询</div>
            </div>
            <div v-if="isShowEntry('设置标签')" class="main-entry-item" @click="clickTagAndRemark(patient.id)"><img src="../../../static/image/标签备注.png" />
                <div>设置标签</div>
            </div>
            <div v-if="isShowEntry('患者日历')" class="main-entry-item" @click="clickWorCalendarList(patient.id)"><img src="../../../static/image/患者日历.png" />
                <div>患者日历</div>
            </div>
            <div v-if="isShowEntry('用药信息')" class="main-entry-item" @click="clickDrug(patient.id)"><img src="../../../static/image/用药信息.png" />
                <div>用药信息</div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</div>
</template>
<script>
import utils from '../../lib/utils.js';
import common from '../../lib/common.js';
import api from '../../config/api.js';
export default {
    data: function() {
        return {
            patient: {
                remark_doctor: '',
                tags: [],
                service: {
                    bedtktid: "0",
                    revisittktid: "0",
                },
                one_month_info: {
                    'untoward_effects': [],
                    'papers': {},
                    'pipes': {},
                }
            },
            arr: [8, 15, 19, 21],
        }
    },
    created: function() {
        var self = this;
        var openid = localStorage.getItem('_openid_');
        var patientid = this.$route.params.patientid;
        var url = api.get('patient.info');
        var params = {
            openid: openid,
            patientid: patientid,
        }
        common.post(url, params, function(response) {
            var data = response.data;
            self.patient = data;
            self.patient.id = patientid;
            window.scroll(0, 0);
        })

    },
    mounted: function() {
        document.title = "患者详情";
    },
    methods: {
        isShowEntry: function(name) {
            if (this.patient.entryControl) {
                return utils.contains(this.patient.entryControl, name);
            }
        },
        getStyle: function(patient) {
            if (patient.service.bedtktid != '0') {
                return "border-top: 0.5px dashed #d9d9d9;"
            }
            return 'padding-bottom:10px;'
        },
        isShowTagAndRemark: function(patient) {
            return patient.tags.length != 0 || (patient.remark_doctor != '' && patient.remark_doctor != undefined)
        },
        isShowTkt: function(patient) {
            return patient.service.bedtktid != '0' || patient.service.revisittktid != '0'
        },
        getDiseaseNames: function(patient) {
            if (this.inCancerArr(patient.diseaseid)) {
                return patient.disease_name
            } else {
                return patient.disease_name
            }
        },
        clickRevisittktInfo: function() {

        },
        inCancerArr: function(diseaseid) {
            return common.isCancer(diseaseid);
        },
        clickBaseInfo: function(patientid) {
            this.$router.push({
                name: 'patient-baseinfo',
                params: {
                    'patientid': patientid
                }
            })
        },
        clickBedtkt: function(patientid) {
            this.$router.push({
                name: 'bedtkt-patienthistory',
                params: {
                    'patientid': patientid
                }
            })
        },
        clickRevisittkt: function(patientid) {
            this.$router.push({
                name: 'revisittkt-add',
                params: {
                    'patientid': patientid
                }
            });
        },
        clickChat: function(patientid) {
            this.$router.push({
                name: 'patient-pipelist',
                params: {
                    'patientid': patientid
                }
            });
        },
        clickPaper: function(patientid) {
            this.$router.push({
                name: 'paper-tpllist4onepatient',
                query: {
                    'patientid': patientid
                }
            });
        },
        clickData: function(patientid) {
            this.$router.push({
                name: 'revisitrecord-list',
                query: {
                    'patientid': patientid
                }
            });
        },
        clickBedtktInfo: function() {
            this.$router.push({
                name: 'bedtktlog-list',
                params: {
                    'bedtktid': this.patient.service.bedtktid
                }
            });
        },
        clickphymanewspaper: function(patientid) {
            this.$router.push({
                name: 'patient-phymareport',
                params: {
                    'patientid': patientid
                }
            })
        },
        clickTagAndRemark: function(patientid) {
            this.$router.push({
                name: 'patient-tagandremark',
                params: {
                    'patientid': patientid
                }
            });
        },
        clickWorCalendarList: function(patientid) {
            this.$router.push({
                name: 'workcalendar-listforpatient',
                query: {
                    'patientid': patientid
                }
            });
        },
        clickDrug: function(patientid) {
            this.$router.push({
                name: 'drug-detail',
                query: {
                    'patientid': patientid
                }
            });
        }
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
.die {
    padding: 3px 6px;
    background-color: #e64340;
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
}

.patientmain .main-entry .main-entry-item {
    float: left;
    width: 33.33%;
    margin: 10px 0;
}

.patientmain .title {
    border-bottom: 0.5px solid #d9d9d9;
    padding: 10px;
}

.recentinfo .content {
    /*background: #fdeef3;*/
}

.patient-paper {
    border-top: 0.5px dashed #d9d9d9;
}

.patientinfotitle .content,
.recentinfo .content {
    padding: 10px 20px;
}

.clear-ff:after {
    clear: both;
}

.clear-f {
    float: right;
}

.cell-title {
    padding-left: 10px;
}

.patienttag-and-remark {
    padding: 10px;
    text-align: left;
    background: #fff;
}

.info {
    background: #fff;
    margin-top: 10px;
    display: inline-block;
    width: 100%;
}

.info-version2 {
    background: #fff;
    margin-top: 10px;
    display: inline-block;
    width: 100%;
}

.info>div {
    box-sizing: border-box;
    margin-top: 0px;
    font-size: 0px;
}

info-version2>div {
    box-sizing: border-box;
    margin-top: 0px;
    font-size: 0px;
}

.info>div>div {
    box-sizing: border-box;
    font-size: 16px;
    font-size: 1.6rem;
    width: 50%;
    padding: 10px;
    border: 1px solid #eee;
    display: inline-block;
    text-align: center;
}

.info-version2>div {
    box-sizing: border-box;
    font-size: 16px;
    font-size: 1.6rem;
    padding: 10px;
    border: 1px solid #eee;
    /*display: inline-block;*/
    text-align: left;
}

.info>div>div:hover {
    background-color: #ddd;
}

.info-version2>div:hover {
    background-color: #ddd;
}

.info>div>div>span {
    line-height: 4.3
}

.info-version2>div>span {
    line-height: 4.3
}

.info img {
    width: 32px;
    height: 32px;
}

.info-version2 img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
}

.detail-icon {
    color: #888;
    float: right;
    position: relative;
    top: 30%;
}

.patient-pic {
    width: 125px;
    height: 125px;
    background: #F3F3F3;
}

.patient-pic img {
    width: 68px;
    height: 68px;
    margin: 27px;
}

.yuyue-a {
    float: right;
    padding: 5px 5px;
    text-decoration: none;
    color: #3AA7E1;
}

.quick-entry img {
    width: 57px;
    height: 57px;
    margin: auto;
}
</style>
