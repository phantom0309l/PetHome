<template>
    <div>
        <header class="mint-header" style="display:flex">
            <div class="mint-header-button is-left"></div>
            <div class="mint-header-title">延伸处方（续方）申请</div>
            <div class="mint-header-button is-right"></div>
        </header>

        <div class="am-padding-sm am-text-sm">
            <div class="am-g am-g-collapse patientbaseBox" v-on:click="clickToChat(data.patientid)">
                <div class="am-u-sm-11">
                    <span>{{data.patient_name}}</span>
                    <span class="am-margin-left-sm">{{data.patient_sex}}</span>
                    <span class="am-margin-left-sm">{{data.patient_age}}岁</span>
                    <span class="am-margin-left-sm">{{data.disease_name}}</span>
                </div>
                <div class="am-u-sm-1">
                    <i class="am-icon-chevron-right"></i>
                </div>
            </div>
            <div class="am-g" v-on:click="clickToDrug(data.patientid)">
                <button class="am-btn am-round am-btn-primary am-btn-block godrug">用药情况</button>
            </div>
        </div>

        <div class="am-padding-sm am-text-sm">
            <table class="am-table am-table-bordered">
                <thead>
                    <tr>
                        <td>数量</td>
                        <td>药名</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data.items">
                        <td>{{item.cnt}}{{item.pack_unit}}</td>
                        <td>{{item.medicine_title}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="am-padding-sm am-text-sm" v-if="data.doctor_is_audit == 0">
            <div class="am-g">
                <div class="am-u-sm-6">
                    <button class="am-btn am-round am-btn-danger am-btn-block" v-on:click="goRefuse()">拒绝续方</button>
                </div>
                <div class="am-u-sm-6">
                    <button class="am-btn am-round am-btn-success am-btn-block" v-on:click="handleAudit()">同意续方</button>
                </div>
            </div>
        </div>

        <div class="am-padding-sm am-text-sm" v-else-if="data.doctor_is_audit != 0">
            <div class="am-g" v-if="data.doctor_is_audit == 1">
                <button class="am-btn am-round am-btn-primary am-btn-block">已通过</button>
            </div>
            <div class="am-g" v-if="data.doctor_is_audit == 2">
                <p class="bgBox">{{data.doctor_remark}}</p>
                <button class="am-btn am-round am-btn-danger am-btn-block">已拒绝</button>
            </div>
            <div class="am-g" v-if="data.doctor_is_audit == 3">
                <p class="bgBox">延伸处方（续方）审核超时（48小时）系统自动拒绝</p>
                <button class="am-btn am-round am-btn-danger am-btn-block">已拒绝</button>
            </div>
        </div>
        <div class="am-g am-padding-sm go-list">
            <button class="am-btn am-round am-btn-defalt am-btn-block" v-on:click="goList()">查看延伸处方（续方）列表</button>
        </div>
        <div class="am-padding-sm am-text-sm">
        </div>

        <div class="linkBox">如有问题请在微信中直接与医生助理联系，<span class="am-icon-weixin am-text-warning" v-on:click="closeWin()">去联系</span></div>


    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function() {
            return {
                data : [],
                prescriptionid : 0
            }
        },
        methods: {
            clickToChat: function(patientid) {
                this.$router.push({name: 'patient-pipelist', params: {'patientid': patientid}});
            },
            clickToDrug: function(patientid) {
                this.$router.push({name: 'drug-detail', query: {'patientid': patientid}});
            },
            goRefuse : function(){
                var prescriptionid = this.prescriptionid;
                this.$router.push({name: 'prescription-refuse', query: {'prescriptionid': prescriptionid}});
            },
            goList : function(){
                this.$router.push({name: 'prescription-list'});
            },
            handleAudit : function(){
                var self = this;
                var openid = localStorage.getItem('_openid_');
                var prescriptionid = self.prescriptionid;
                $.ajax({
                    url: api.get('prescription.auditjson'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: openid,
                        prescriptionid: prescriptionid,
                        doctor_remark: "",
                        doctor_is_audit: 1
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var instance = self.$toast('已提交');
                        setTimeout(() => {
                            instance.close();
                            window.location.href = "/#/prescription/list";
                        }, 1000);
                    }
                })
            },
            closeWin : function(){
                WeixinJSBridge.call('closeWindow');
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var prescriptionid = this.prescriptionid = this.$route.query.prescriptionid;
            var url = api.get('prescription.one');
            var params = {
                openid: openid,
                prescriptionid: prescriptionid
            }
            common.post(url, params, function(response){
                var data = response.data;
                self.data = data;
            })
        },
        mounted: function() {
            document.title = "延伸处方（续方）申请";
        },
    }
</script>

<style src="../../../static/css/amazeui-2.7.2.min.css" scoped>
</style>
<style src="../../../static/css/pages/doctortask.css" scoped>
</style>
<style scoped>
    .patientbaseBox{background: #fafafa; padding: 15px 0px 15px 15px; text-align: left; color: #26a2ff; border-radius: 3px; display: inline-block; width: 70%; float: left;}
    .godrug{display: inline-block; width: 30%; margin-top: 7px;}
    .bgBox{ background: #fafafa; padding: 15px; text-align: left; color: #333; border-radius: 3px;}
    .linkBox{ position: fixed; bottom: 10px; font-size: 12px; color: #999; text-align: center; width: 100%;}
    .go-list{position: absolute; bottom: 40px;}
</style>
