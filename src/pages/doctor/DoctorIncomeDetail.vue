<template>
    <div class="doctor-income-detail">
        <div class="header">
            <span class="tag"></span>
            <h4>{{doctor.name}}医生,您上月份患者管理收益已结算</h4>
            <div>请核查</div>
        </div>

        <div>
            <mt-cell title="当月报到和活跃患者总数" style="text-align: left; color: #f99a2d">
                <span style="color:#f99a2d ">{{settleorder.activecnt}}人</span>
            </mt-cell>
            <mt-cell title="收益总额" :value="income" style="text-align: left; color:#f99a2d">
                <span style="color:#f99a2d ">¥{{settleorder.amount}}</span>
            </mt-cell>
        </div>
        <div style="color: #aaa; font-size: 14px;font-size: 1.4rem;background-color: #fff;padding: 5px;">算法:收益总额=(本自然月报到的人数 + 本月管理人数) X 15</div>
        <div class="text-left push-10" >本月新报道患者详情:</div>
        <table class="table-border">
            <thead>
                <tr>
                    <th class="left" width="23%">微信名</th>
                    <th width="23%">患者名</th>
                    <th width="23%">关注时间</th>
                    <th class="right" width="23%">是否报到</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in rpts_baodao">
                    <td class="left" width="23%">{{patient.nickname}}</td>
                    <td width="23%">{{patient.name}}</td>
                    <td width="23%">{{patient.createtime}}</td>
                    <td class="right" width="23%">已报到</td>
                </tr>
                <tr v-for="patient in wxusers_notbaodao">
                    <td class="left" width="23%">{{patient.nickname}}</td>
                    <td width="23%">{{patient.name}}</td>
                    <td width="23%">{{patient.createtime}}</td>
                    <td class="right" width="23%">未报到</td>
                </tr>
                <tr v-if="patientsOfNewMonth.length == 0">
                    <td colspan="4">暂无数据</td>
                </tr>
            </tbody>
        </table>
        <mt-cell class="t-a-l" title="总计">
            <span>{{rpts_baodao.length + wxusers_notbaodao.length}}人</span>
        </mt-cell>
        <mt-cell class="t-a-l" title="未报到人数">
            <span>{{wxusers_notbaodao.length}}人</span>
        </mt-cell>
        <mt-cell class="t-a-l" title="本月新报道人数">
            <span>{{rpts_baodao.length}}人</span>
        </mt-cell>

        <div class="text-left push-10">本月管理患者详情:</div>
        <table class="table-border">
            <thead>
                <tr>
                    <th width="28%">患者名</th>
                    <th width="28%">报到时间</th>
                    <th width="40%">持续管理时长(月)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in rpts_manage">
                    <td width="28%">{{patient.name}}</td>
                    <td width="28%">{{patient.baodaodate}}</td>
                    <td width="40%">{{patient.month_pos}}个月</td>
                </tr>
                <tr v-if="patientsOfNewMonth.length == 0">
                    <td colspan="4">暂无数据</td>
                </tr>
            </tbody>
        </table>
        <mt-cell class="t-a-l" title="总计">
            <span>{{rpts_manage.length}}人</span>
        </mt-cell>
    </div>
</template>
<script>
    import common from '../../lib/common.js';
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                value:10,
                income: "100",
                patientsOfNewMonthCnt: '10',
                hadBDCnt: '10',
                HadnotBDCnt: '20',
                patientsOfNewMonth: [
                ],
                managedPatients: [
                ],
                doctor:{},
                settleorder: {},
                rpts_baodao:[],
                rpts_manage:[],
                wxusers_notbaodao:[],
            }
        },
        methods: {

        },
        created: function() {
            var self = this;
            var themonth = this.$route.params.themonth;
            var openid = localStorage.getItem('_openid_');
            var url = api.get('revenue.showitem'),
            params = {
                openid: openid,
                themonth: themonth,
            };
            common.post(url, params, function(response){
                console.log(response);
                var data = response.data;
                self.doctor = data.doctor;
                self.settleorder = data.settleorder;
                self.rpts_baodao = data.rpts_baodao;
                self.rpts_manage = data.rpts_manage;
                self.wxusers_notbaodao = data.wxusers_notbaodao;
            })
        },
        filters: {
            filterIsscan: function(val) {
                return val == '1'? '是': '否';
            }
        }
    }
</script>
<style scoped>
    .tag {
        display: inline-block;
        height: 23px;
        width: 4px;
        background-color: #3a84ea;
        vertical-align:text-bottom;
        border-radius: 4px;
    }
    h4 {
        font-weight: normal;
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .header {
        background-color: #fff;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 5px;
    }
    .doctor-income-detail {
    }
    .table-border {
        border-collapse: collapse;
        background-color: #fff;
        display: block;
        /*width: 100%;*/
        border-top: 0.5px solid #ccc;
        border-bottom: 0px solid #ccc;
        border-left: none;
        border-right: none;
    }
    .table-border thead {
        display: block;
    }
    .table-border tbody {
        display: block;
    }
    .table-border tr {
        display: block;
    }
    .table-border tr th {
        display: inline-block;
        padding: 5px;
        padding-left: 0px;
        padding-right: 0px;
        border: none;
        font-weight: normal;
    }
    .table-border tbody tr {
        border-top: 1px dashed #ccc;
    }
    .table-border tbody tr td {
        display: inline-block;
        padding: 5px;
        padding-left: 0px;
        padding-right: 0px;
        border: none;
        font-weight: normal;
        font-size: 14px;
        font-size: 1.4rem;
    }
    .t-a-l {
        text-align: left;
    }
    .left {
        text-align: left;
    }
    .right {
        text-align: right;
    }
</style>
