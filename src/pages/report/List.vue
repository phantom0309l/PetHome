<template>
    <div class="report-list" style="padding-top: 50px;">
        <mt-header style="z-index: 3;" fixed :title="patient.name+' '+patient.attrStr"></mt-header>
        <div class="text-left push-10-b fc-bg-white border-t border-b" v-for="report in reports">
            <div class="fc-text-666 pull-10 border-b">
                {{report.createtime}}
                <a v-if="report.isreply == 1" class="fc-text-blue" style="float: right; margin-top: 1px; font-size: 14px;">已批复</a>
            </div>
            <div class="report-info" @click="goReportOne(report.reportid)">
                <div class="pull-10">
                    <div class="report-info-row" v-if="report.appeal">
                        <span class="fc-text-blue">患者诉求：</span>
                        <p>{{report.appeal}}</p>
                    </div>
                    <div class="report-info-row" v-if="report.remark">
                        <span class="fc-text-blue">运营备注：</span>
                        <p>{{report.remark}}</p>
                    </div>
                </div>
                <mt-cell
                  title="点击查看详细汇报"
                  is-link
                  value="">
                </mt-cell>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../config/api.js';
import common from '../../lib/common.js';
import util from '../../lib/utils.js'
export default {
    data: function() {
        return {
            patient: {
                name: '',
                attrStr: '',
            },
            reports: [],
        }
    },
    methods: {
        fetchData: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            console.log(this.$route);
            var patientid = this.$route.query.patientid;
            var url = api.get('report.list');
            var params = {
                openid: openid,
                patientid: patientid,
            };
            common.post(url, params, function(response) {
                self.errno = response.errno;
                self.errmsg = response.errmsg;

                if (response.errno == 0) {
                    var data = response.data;
                    self.patient = data.patient;
                    self.reports = data.reports;
                }
            })
        },
        goReportOne: function(reportid) {
            this.$router.push({name: 'report-one', params: {'reportid': reportid}});
        }
    },
    created: function() {
        this.fetchData();
    },
    mounted: function() {
        document.title = "汇报列表";
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('body').setAttribute('class', 'fc-bg-primary');
        next();
    },
    beforeRouteLeave(to, from, next) {
        document.querySelector('body').setAttribute('class', '');
        next();
    },
}
</script>

<style scoped>
.report-info .report-info-row {
    margin-top: 10px;
}
.report-info .report-info-row:first-of-type {
    margin-top: 0;
}
</style>
