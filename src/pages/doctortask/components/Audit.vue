<template>
    <div class="auditBox am-margin-top-sm">
        <textarea class="auditBox-text" placeholder="您可以在此处填写会诊记录" v-model="audit_content"></textarea>
        <div class="am-margin-top-sm"><button style="font-size:16px;" class="auditBox-btn mint-button mint-button--primary mint-button--large" v-on:click="handleAudit()">{{ isaudit == 1 ? '已会诊' : '会诊'}}</button></div>
    </div>
</template>
<script>
    import api from '../../../config/api.js';
    export default {
        data: function() {
            var self = this;
            return {
                audit_content : self.content
            }
        },
        props: ['doctorserviceorderid', 'content', 'isaudit'],
        mounted: function() {
        },
        methods: {
            handleAudit : function(doctorserviceorderid){
                var self = this;
                var openid = localStorage.getItem('_openid_');
                $.ajax({
                    url: api.get('doctortask.auditjson'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: openid,
                        doctorserviceorderid: self.doctorserviceorderid,
                        content: self.audit_content,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var instance = self.$toast('已会诊');
                        setTimeout(() => {
                            instance.close();
                            window.location.href = "/#/doctortask/weektasklist";
                        }, 1000);
                    }
                })
            },
        },
        watch : {
            content : function(val, oldVal){
                this.audit_content = val;
            }
        }
    }
</script>
<style src="../../../../static/css/pages/doctortask.css" scoped>
</style>
