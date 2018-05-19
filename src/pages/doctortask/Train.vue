<template>
    <div class="templateBox">
        <header class="mint-header" style="display:flex">
            <div class="mint-header-button is-left"></div>
            <div class="mint-header-title">行为训练课程</div>
            <div class="mint-header-button is-right"></div>
        </header>

        <div class="page-cell am-text-secondary am-text-sm">
            <div class="mint-cell" v-on:click="clickChat(patientinfo.patientid)">
                <div class="mint-cell-wrapper" style="font-size:14px;">
                <span>{{patientinfo.name}}</span>
                <span class="am-margin-left-xl">{{patientinfo.sex_str}}</span>
                <span class="am-margin-left-xl">{{patientinfo.age_str}}岁</span>
                <i class="mint-cell-allow-right am-text-lg"></i>
                </div>
            </div>
        </div>

        <div class="am-padding-sm am-text-sm">
            <div>
                <div v-html="lesson.content"></div>
            </div>
            <div>巩固：</div>
            <div v-for="item in test">
                <div class="am-padding-vertical-xs">{{item.q}}</div>
                <div class="am-padding-sm bgGray">{{item.a}}</div>
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
                lesson : [],
                test : [],
                doctorserviceorderid : 0,
                content : "",
                isaudit : 0,
                patientinfo : []
            }
        },
        methods: {
            clickChat: function(patientid) {
                this.$router.push({name: 'patient-pipelist', params: {'patientid': patientid}});
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var doctorserviceorderid = this.$route.query.doctorserviceorderid;
            var url = api.get('doctortask.train');
            var params = {
                openid: openid,
                doctorserviceorderid: doctorserviceorderid,
            }
            common.post(url, params, function(response){
                var data = response.data;
                self.lesson = data.lesson;
                self.test = data.test;
                self.doctorserviceorderid = data.first_doctorserviceorderid;
                self.content = data.audit_content;
                self.isaudit = data.is_audit;
                self.patientinfo = data.patient_info;
            })
        },
        mounted: function() {
            document.title = "行为训练课程";
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
