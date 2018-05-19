<template>
    <div class="templateBox">
        <header class="mint-header" style="display:flex">
            <div class="mint-header-button is-left"></div>
            <div class="mint-header-title">患者交流</div>
            <div class="mint-header-button is-right"></div>
        </header>

        <div class="am-padding-sm am-text-sm">
            <div class="page-cell am-text-secondary am-text-sm">
                <div class="mint-cell" v-for="pipepatient in pipepatients" v-on:click="clickChat(pipepatient.patientid)">
                    <div class="mint-cell-wrapper" style="font-size:14px;">
                    <span>{{pipepatient.name}}</span>
                    <span class="am-margin-left-sm">{{pipepatient.sex_str}}</span>
                    <span class="am-margin-left-sm">{{pipepatient.age_str}}岁</span>
                    <i class="mint-cell-allow-right am-text-lg"></i>
                    </div>
                </div>
            </div>
            <audit :doctorserviceorderid="doctorserviceorderid" :content="content" :isaudit="isaudit"></audit>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function() {
            return {
                pipepatients : [],
                task_type : "",
                doctorserviceorderid : 0,
                content : "",
                isaudit : 0,
            }
        },
        methods: {
            clickChat: function(patientid) {
                this.$router.push({name: 'patient-pipelist', params: {'patientid': patientid}});
            },
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var from_date = this.$route.query.from_date;
            var end_date = this.$route.query.end_date;
            var url = api.get('doctortask.pipepatients');
            var params = {
                openid: openid,
                from_date: from_date,
                end_date: end_date
            }
            common.post(url, params, function(response){
                var data = response.data;
                self.task_type = data.task_type;
                self.pipepatients = data.pipepatients;
                self.doctorserviceorderid = data.first_doctorserviceorderid;
                self.content = data.audit_content;
                self.isaudit = data.is_audit;
            })
        },
        mounted: function() {
            document.title = "患者交流";
        },
        components: {
            'audit': function(resolve) {
                require(['./components/Audit.vue'], resolve);
            }
        },
    }
</script>

<style src="../../../static/css/amazeui-2.7.2.min.css" scoped>
</style>
<style src="../../../static/css/pages/doctortask.css" scoped>
</style>

<style scoped>
    .mint-cell-allow-right::after{ width: 8px; height: 8px;}
</style>
