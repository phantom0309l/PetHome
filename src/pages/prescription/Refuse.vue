<template>
    <div>
        <header class="mint-header" style="display:flex">
            <div class="mint-header-button is-left"></div>
            <div class="mint-header-title">延伸处方（续方）申请</div>
            <div class="mint-header-button is-right"></div>
        </header>

        <div class="am-padding-sm am-text-sm">
            <textarea placeholder="请您填写患者不能延伸处方（续方）的原因" v-model="doctor_remark" class="textareaBox"></textarea>
        </div>

        <div class="am-padding-sm am-text-sm">
            <div class="am-g">
                <div class="am-u-sm-6">
                    <button class="am-btn am-round am-btn-default am-btn-block" v-on:click="goBack()">返回</button>
                </div>
                <div class="am-u-sm-6">
                    <button class="am-btn am-round am-btn-secondary am-btn-block" v-on:click="handleAudit()">提交</button>
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
                prescriptionid : 0,
                doctor_remark : "",
                doctor_is_audit : 2
            }
        },
        methods: {
            handleAudit : function(){
                var self = this;
                var openid = localStorage.getItem('_openid_');
                var prescriptionid = self.prescriptionid;
                if (this.doctor_remark.trim() == '') {
                    this.$messagebox.alert("请输入拒绝理由").then(action => {
                    });
                    return false;
                }

                $.ajax({
                    url: api.get('prescription.auditjson'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: openid,
                        prescriptionid: prescriptionid,
                        doctor_remark: self.doctor_remark,
                        doctor_is_audit: self.doctor_is_audit
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var instance = self.$toast('已提交');
                        setTimeout(() => {
                            instance.close();
                            window.location.href = "/#/prescription/one?prescriptionid=" + prescriptionid;
                        }, 1000);
                    }
                })
            },
            goBack : function(){
                var prescriptionid = this.prescriptionid;
                this.$router.push({name: 'prescription-one', query: {'prescriptionid': prescriptionid}});
            }
        },
        created: function() {
            this.prescriptionid = this.$route.query.prescriptionid;
        },
        mounted: function() {
            document.title = "延伸处方（续方）申请";
        },
    }
</script>

<style src="../../../static/css/amazeui-2.7.2.min.css" scoped>
</style>

<style scoped>
    .textareaBox{ width: 100%; border: 1px solid #ddd; padding: 10px; height: 200px;}
</style>
