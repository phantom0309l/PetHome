<template>
    <div class="templateBox">
        <header class="mint-header" style="display:flex">
            <div class="mint-header-button is-left"></div>
            <div class="mint-header-title">FAQ</div>
            <div class="mint-header-button is-right"></div>
        </header>

        <div class="faqBox am-padding-sm am-text-sm">
            <div v-for="(faq, index) in faqdata">
                <div>{{index+1}}、{{faq.title}}</div>
                <div class="faqBox-content am-margin-vertical-sm">{{faq.content}}</div>
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
                faqdata : [],
                task_type : "",
                doctorserviceorderid : 0,
                content : "",
                isaudit : 0,
            }
        },
        methods: {
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var from_date = this.$route.query.from_date;
            var end_date = this.$route.query.end_date;
            var url = api.get('doctortask.faqs');
            var params = {
                openid: openid,
                from_date: from_date,
                end_date: end_date
            }
            common.post(url, params, function(response){
                var data = response.data;
                self.task_type = data.task_type;
                self.faqdata = data.faqs;
                self.doctorserviceorderid = data.first_doctorserviceorderid;
                self.content = data.audit_content;
                self.isaudit = data.is_audit;
            })
        },
        mounted: function() {
            document.title = "FAQ";
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
