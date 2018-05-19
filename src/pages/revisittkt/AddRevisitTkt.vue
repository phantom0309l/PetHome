<template>
    <div class="addrevisittkt">
    <div v-show = "scheduleList == false">
        <div class="pi-basic fc-flex pull-10">
            <div class="icon">
                <i class="iconfont icon-icon133 fc-text-blue font-s18"></i>
            </div>
            <div class="fc-flex__item">
                <div class="text-left"><span class="font-s18 font-w500">{{patient.name}}</span>&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;{{patient.age}}&nbsp;&nbsp;<span class="fc-text-blue">{{patient.disease_name}}</span></div>
            </div>
        </div>
        <div class="filterArea fc-flex">
            <div class="fc-flex__item">
                <a :class="{'filterActive': filterActive == 'revisittkt'}" href="javascript:" @click="clickrevisittkt">复诊记录({{revisittkts.length}})</a>
            </div>
            <div class="fc-flex__item">
                <a :class="{'filterActive': filterActive == 'addrevisittkt'}" href="javascript:" @click="clickAddRevisittkt">约复诊</a>
            </div>
        </div>
        <div v-show="filterActive == 'revisittkt'">
            <ul style="list-style-type: none; padding:0px">
                <li class="li-revisittkt" v-for="(revisittkt, index) in revisittkts" :key="index">
                    <div class="revisittkt fc-flex" :class="{'pipe-from-patient': revisittkt.status_desc == '审核拒绝'}" style="padding: 10px 10px 10px 0px">
                        <div class="fc-flex__item">
                            <p style="clear: both;word-break: break-all; text-align: left; margin-left: 10px;padding: 5px 5px 5px 0px;line-height:1.5">申请提交日期: {{revisittkt.createday}}</p>
                            <p style="clear: both;word-break: break-all; text-align: left; margin-left: 10px;padding: 5px 5px 5px 0px;line-height:1.5">预约日期: {{revisittkt.thedate}}</p>
                            <p style="clear: both;word-break: break-all; text-align: left; margin-left: 10px;padding: 5px 5px 5px 0px;line-height:1.5">复诊目的: {{revisittkt.patient_content}}</p>
                        </div>
                        <div style="width:100px;align-self:center;text-align:center;">
                            <span class="revisittkt-title" :class="{'overdue': revisittkt.status_desc == '过期', 'done': revisittkt.status_desc == '已完成', 'auditwait': revisittkt.status_desc == '待审核', 'auditpass': revisittkt.status_desc == '审核通过', 'auditrefuse': revisittkt.status_desc == '审核拒绝', 'patientcancel': revisittkt.status_desc == '患者取消', 'waitpatientconfirm': revisittkt.status_desc == '未确认', 'patientconfirm': revisittkt.status_desc == '患者确认', 'patientrefuse': revisittkt.status_desc == '患者拒绝'}" :style="{'backgroundColor': revisittkt.status_desc_bg_color}">{{revisittkt.status_desc}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div style="margin-top:100px" v-if="revisittkts.length == 0">暂无复诊记录</div>
        </div>
        <div class="push-10-t" v-show="filterActive == 'addrevisittkt'">
            <!-- <div @click="selectRevisitDate">
                <div style="text-align: left; margin-top: 10px">复诊日期:</div>
                <div :class="{'beforeSelectSchedule': selectScheduleDate == '请点击选择复诊日期', 'afterSelectSchedule': selectScheduleDate != '请点击选择复诊日期'}" style="text-align: center;width: 100%;padding: 5px 0px; box-sizing: border-box; border: none;">{{selectScheduleDate}}</div>
            </div> -->
            <div class="text-left push-20-t pull-10-l pull-10-r fc-flex">
                <div class="icon" style="padding: 2px 5px 0 0">
                    <i class="iconfont icon-info fc-text-blue font-s18"></i>
                </div>
                <div class="fc-flex__item">
                    <div><span class="font-s18 font-w500">复诊日期</span></div>
                    <div class="push-10-t">
                        <input class="form-control" type="text" placeholder="请点击选择复诊日期" v-model="selectScheduleDate" @click="selectRevisitDate" readonly/>
                    </div>
                </div>
            </div>
            <div v-if="checkuptplArr.length>0" class="text-left push-20-t pull-10-l pull-10-r fc-flex" style="margin-bottom:50px;">
                <div class="icon" style="padding: 2px 5px 0 0">
                    <i class="iconfont icon-icon133 fc-text-blue font-s18"></i>
                </div>
                <div class="fc-flex__item">
                    <div><span class="font-s18 font-w500">复诊项目</span></div>
                    <div class="push-10-t">
                        <mt-checklist align="right" v-model="checkuptplSelected" :options="checkuptplArr" style="text-align: left"></mt-checklist>
                    </div>
                </div>
                <!-- <div style="text-align: left; margin-top: 20px;">复诊项目:</div>
                <div style="padding-bottom: 50px;">
                    <mt-checklist align="right" v-model="checkuptplSelected" :options="checkuptplArr" style="text-align: left"></mt-checklist>
                </div> -->
            </div>
            <div style="position: fixed; bottom: 0px;width: 100%; left: 0px">
            <mt-button class="fc-bg-blue push-10-t" type="primary" style="width: 100%;" @click="saveAndPostToPatient">保存并发送至患者</mt-button>
            </div>
        </div>
        </div>
        <div v-show = "scheduleList == true" style="position: absolute;top: 0px;left: 0px;width: 100%; height: 100%; z-index: 0;">
            <div style="background-color: #fff; padding: 15px; font-size: 20px; font-size: 2.0rem;text-align: center; color: #777; margin-top: 20pxx" @click="selectMonth">{{selectDate}}</div>
            <ul style="list-style-type: none; padding:0 10px">
                <li class="item-box">
                    <div v-for="(month, index) in months" style="text-align: left;" :key="index">
                        <div style="background-color:#fff;">
                            <mt-cell :title="schedule.theday + ' ' + schedule.daypartstr" :value="schedule.desc" v-for="(schedule, index1) in month.schedules" :key="index1" @click.native="clickSchedule(schedule)" is-link></mt-cell>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="months.length == 0">无出诊数据,如要添加,请联系医助</div>
        </div>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom" showToolbar="true" style="width: 100%">
            <div style="width: 100%; font-size: 0px;">
                <a href="javascript:" style="color: #4472c5; text-decoration: none; width: 50%; display: inline-block; font-size: 18px; font-size: 1.8rem; padding: 5px 0px; border-right: 0.5px solid #ccc; border-bottom: 0.5px solid #ccc; box-sizing: border-box" @click.stop="clickpopupCancel">取消</a>
                <a href="javascript:" style="color: #4472c5; text-decoration: none; width: 50%;  display: inline-block; font-size: 18px; font-size: 1.8rem; padding: 5px 0px; border-left: 0.5px solid #ccc; border-bottom: 0.5px solid #ccc; box-sizing: border-box" @click.stop="clickpopupConfirm">确认</a>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
    import common from '../../lib/common.js';
    import api from '../../config/api.js';
    import moment from 'moment'
    export default {
        data: function() {
            return {
                patient: {},
                openid: '',

                filterActive: 'revisittkt',
                revisittkts: [],
                checkuptplSelected: [],
                checkuptplArr: [],

                popupVisible: false,
                scheduleList: false,
                selectScheduleDate: '请点击选择复诊日期',
                selectSchedule: '',

                months:[],
                pickerValue: '',
                slots: [
                    {
                        flex: 1,
                        values: ['2015','2016','2017', '2018', '2019',],
                    },
                    {
                        flex: 1,
                        values: ['01','02','03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                    }
                ],

                selectValues:[],
                selectDate: '请点击选择复诊日期(默认本月)',
                frommonth: '',
                tomonth: '',
            }
        },
        components: {
        },
        created: function() {
            var year = moment().format('YYYY');
            var month = moment().format('MM');
            this.slots[0].defaultIndex = Number(year) - 2015;
            this.slots[1].defaultIndex = Number(month) - 1;

            window.eventBus.$on('select-schedule', this.handleSelectSchedule);
            this.openid = localStorage.getItem('_openid_');
            this.getPatientInfo();
            this.getRevisittktListByPatient();
            this.getCheckupTplList();
            this.getSchedules();
        },
        mounted: function() {
            document.title = "复诊预约";
        },
        methods: {
            inCancerArr: function(diseaseid) {
                return common.isCancer(diseaseid);
            },
            clickpopupCancel: function(e) {
                console.log(e);
                e.stopPropagation();
                this.popupVisible = false;
            },
            clickpopupConfirm: function() {
                this.selectDate = this.selectValues.join('-');
                if (this.selectDate.trim() == '') {
                    this.selectDate = moment().format('YYYY')+"-"+moment().format('MM');
                }
                this.popupVisible = false;
                this.frommonth = this.selectDate;
                this.tomonth = this.selectDate;
                this.getSchedules();


            },
            selectMonth: function() {
                this.popupVisible = true;
            },
            onValuesChange: function(picker, values) {
                console.log(picker, 'picker', values, 'values');
                this.selectValues = values;
            },
            clickSchedule: function(schedule) {
                this.scheduleList = false;
                this.selectScheduleDate = schedule.thedate + ' ' + schedule.daypartstr;
                this.selectSchedule = schedule;
            },
            getSchedules: function() {
                var self = this;
                var url = api.get('appointment.schedulelist');
                var params = {
                    openid: this.openid,
                    frommonth: this.frommonth,
                    tomonth: this.tomonth,
                }
                common.post(url, params,function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.months = data.months;
                    }
                })
            },
            handleSelectSchedule: function(schedule) {
                this.popupVisible = false;
                this.selectScheduleDate = schedule.thedate +' ' + schedule.daypartstr;
                this.selectSchedule = schedule;
            },
            getPatientInfo: function() {
                var self = this;
                var openid = localStorage.getItem('_openid_');
                var patientid = this.$route.params.patientid;
                console.log('patientid',patientid);
                var url = api.get('patient.info');
                var params = {
                    openid: openid,
                    patientid: patientid,
                }
                common.post(url, params, function(response){
                    console.log(response);
                    var data = response.data;
                    self.patient = data;
                    self.patient.id = patientid;
                }, 'json', false)
            },
            getRevisittktListByPatient: function() {
                var self = this;
                var openid = localStorage.getItem('_openid_');
                var patientid = this.$route.params.patientid;
                console.log('patientid',patientid);
                var url = api.get('appointment.historylistbypatient');
                var params = {
                    openid: openid,
                    patientid: patientid,
                }
                common.post(url, params, function(response){
                    console.log(response);
                    var data = response.data;
                    self.revisittkts = data.revisittkts;
                })
            },
            getCheckupTplList: function() {
                var self = this;
                var openid = localStorage.getItem('_openid_');
                var patientid = this.$route.params.patientid;
                console.log('patientid',patientid);
                var url = api.get('appointment.checkuptpllist');
                var params = {
                    openid: openid,
                }
                common.post(url, params, function(response){
                    var data = response.data;
                    self.checkuptplArr = data.checkuptpls.map(function(checkuptpl){
                        var obj = {};
                        obj.label = checkuptpl.title;
                        obj.value = checkuptpl.checkuptplid;
                        return obj;
                        console.log('xxxx')
                    })
                }, 'json', false)
            },
            selectRevisitDate: function() {
                this.scheduleList = true;
            },

            clickrevisittkt: function() {
                this.filterActive = 'revisittkt';
            },
            clickAddRevisittkt: function() {
                this.filterActive = 'addrevisittkt';
            },
            saveAndPostToPatient: function() {
                var self = this;
                console.log(this.checkuptplSelected, 'checkuptplids', this.checkuptplArr);
                this.$messagebox.confirm('请再次确认,是否给患者发送预约信息?').then(action => {
                    var url = api.get('appointment.addjson');
                    var params = {
                        openid: self.openid,
                        patientid: self.patient.patientid,
                        scheduleid: self.selectSchedule.scheduleid,
                        checkuptplids: self.checkuptplSelected,

                    };
                    common.post(url, params, function(response) {
                        if (response.errno == 0) {
                            let instance = self.$toast('发送成功');
                            setTimeout(() => {
                                instance.close();
                                self.$router.push({name: 'patient-main', params: {'patientid': self.patient.patientid}})
                            }, 2000);
                        }
                    })
                }, cancel => {
                });
            }
        },
    }
</script>
<style scoped>
    .addrevisittkt {
    }
    .addrevisittkt li.li-revisittkt {
        border-top: 0.5px solid #d9d9d9;
    }
    .addrevisittkt li.li-revisittkt:first-child {
        border-top: 0;
    }
    .patientinfotitle {
        padding: 10px;
        text-align: left;
        background: #fff;
    }
    .filterArea {
        padding: 0px;

    }
    .filterArea a {
        border: 0.5px solid #eee;
        display: inline-block;
        width: 100%;
        font-size: 16px;
        font-size: 1.6rem;
        color: #4472c5;
        margin-left: -1px;
        text-decoration: none;
        padding: 10px 0px;
        background: #fff;
    }
    .filterArea a.filterActive {
        background-color: #4472c5;
        color: #fff;
    }
    .revisittkt {
        background: #fff;
    }
    .revisittkt p {
        margin: 0px;
        font-size: 16px;
        font-size: 1.6rem;
    }
    .revisittkt-title {
        margin: 0px 0px 0px 0px;
        padding: 5px 10px;
        border-radius: 3px;
        color: #fff;
        font-size: 14px;
    }
    .revisittkt-title.overdue {
        background-color: #ddd;
    }
    .revisittkt-title.done {
        background-color: #37b031;
    }
    .revisittkt-title.auditwait {
        background-color: #37b031;
    }
    .revisittkt-title.auditpass {
        background-color: #37b031;
    }
    .revisittkt-title.auditrefuse {
        background-color:  #f06602;
    }
    .revisittkt-title.patientcancel {
        background-color:  #f06602;
    }
    .revisittkt-title.waitpatientconfirm {
        background-color:  #f06602;
    }
    .revisittkt-title.patientconfirm {
        background-color: #37b031;
    }
    .revisittkt-title.patientrefuse {
        background-color:  #f06602;
    }
    .pipe-from-patient .pipe-title {
        float: left;
        margin: 0px 0px 0px 0px;
        padding: 5px 10px;
        background-color: #4472c5;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        color: #fff
    }
    .slot3 {
        text-align: center;
    }
    .beforeSelectSchedule {
        color: #ccc;
        font-size: 14px;
        font-size: 1.4rem;
        background-color: #fff;
    }
    .afterSelectSchedule {
        color: #333;
        font-size: 14px;
        font-size: 1.4rem;
        background-color: #fff;
    }
    .pi-basic .icon {
        padding: 4px 10px;
        padding-left: 0;
        width: 25px;
        text-align: right;
    }
</style>
<style>
    .addrevisittkt .mint-cell-wrapper, .addrevisittkt .mint-checklist-label {
        padding-left: 0 !important;
    }
</style>
