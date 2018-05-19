<template>
    <div class="prescriptionlist">
        <header class="mint-header" style="display:flex">
            <div class="mint-header-button is-left"></div>
            <div class="mint-header-title title">延伸处方（续方）列表</div>
            <div class="mint-header-button is-right"></div>
        </header>
        <div class="prescription-body" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
            <div class="prescription-box prescription-title">
                <span class="ganxieffid patientname">姓名</span>
                <span class="ganxieffid patientage">年龄</span>
                <span class="ganxieffid createtime">申请时间</span>
                <span class="ganxieffid status">状态</span>
                <span class="ganxieffid detail">详情</span>
            </div>
            <div v-for="(prescription, index) in prescriptions" class="prescription-box">
                <span class="ganxieffid patientname">{{prescription.patientname}}</span>
                <span class="ganxieffid patientage">{{prescription.patientage}}</span>
                <span class="ganxieffid createtime">{{prescription.createtime}}</span>
                <span class="ganxieffid status">{{prescription.doctor_is_audit | auditStr}}</span>
                <span class="ganxiedate taskBox-c-item-btn am-fr" v-on:click="goDetail(prescription.id)">查看</span>
                <hr v-if="prescriptions.length != index+1" class="prescription-border"/>
            </div>
            <div v-if="prescriptions.length == 0" class="no-prescriptionbox">
                <span class="no-prescriptionmsg">您未开通 或 暂时没有需要您审核的延伸处方（续方）。</span>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                loading: false,
                openid: '',
                pagenum: 1,
                prescriptions: [],
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            self.openid = openid;
            self.loadData();
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('body').setAttribute('class', 'fc-bg-light');
            next();
        },
        beforeRouteLeave(to, from, next) {
            document.querySelector('body').setAttribute('class', '')
            next();
        },
        methods: {
            loadMore: function(){
                this.loading = true;
                this.loadData();
            },
            loadData: function() {
                var self = this;

                var url = api.get('prescription.list');
                var params = {
                    openid: self.openid,
                    pagenum: self.pagenum,
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        var data = response.data;
                        self.prescriptions = self.prescriptions.concat(data.prescriptions);
                        if(data.prescriptions.length != 0){
                            self.loading = false;
                            self.pagenum++;
                        }
                    }
                })
            },
            goDetail: function(prescriptionid){
                this.$router.push({name: 'prescription-one', query: {'prescriptionid': prescriptionid}});
            }
        },
        mounted: function() {
            document.title = "延伸处方（续方）列表";
        },
        filters: {
            'auditStr': function(value) {
                if(value == '0'){
                    return '待审核';
                }
                if(value == '1'){
                    return '已通过';
                }
                if(value == '2'){
                    return '已拒绝';
                }
                if(value == '3'){
                    return '已拒绝';
                }
                return '';
            },
        },
        beforeDestroy: function() {

        },
    }
</script>
<style scoped>
.title{
    /*font-size: 20px;*/
}
.prescriptionlist{
    text-align: left;
    -webkit-font-smoothing: auto;
    font-family: "Segoe UI",Arial,Helvetica,"Microsoft Jhenghei","Hiragino Sans GB","WenQuanYi Zen Hei","Microsoft Yahei",STHeiti,"WenQuanYi Micro Hei",times, sans-serif;
}
.prescription-body{
    margin: 30px 15px 50px 15px;
}
#pgtitle{
    text-align: center;
    vertical-align: middle;
    margin-bottom: 30px;
    font-size: 22px;
    color: #555;
}
.prescription-box{
    color: #666;
    margin-top: 15px;
    margin-left: 0px;
}
.prescription-title{
    color: black;
}
.patientname{
    width: 60px;
}
.patientage{
    width: 12%;
}
.createtime{
    width: 28%;
}
.detail{
    float: right;
    margin-right: 7px;
}
.ganxieffid {
    display: inline-table;
    vertical-align: middle;
    font-size: 16px;
}
.ganxiedate {
    /*height: 16px;*/
    bottom: 0px;
    font-size: 12px;
    line-height: 18px;
    color: #999999;
    float: right;
    margin-right: 0px;
}
.prescription-contentbox{
    margin-left: 0px;
    margin-top: 0px;
    margin-bottom: 20px;
    width: 100%;
}
.prescription-border{
    border: none;
    border-bottom: 1px dashed #eee;
    color: #eee;
    margin-top: 10px;
}
.ganxiecontent {
    border-radius: 3px;
    font-size: 14px;
    color: #666666;
    line-height: 24px;
    prescription-spacing: 1px;
    margin-top: 5px;
    font-weight: lighter;
    border: 1px solid #ffd9d9;
    background-color: #fff9f9;
    padding: 10px;
}
.no-prescriptionbox{
    position: none;
    margin-top: 100px;
    text-align: center;
}
.no-prescriptionmsg{
    margin-top: 400px;
    width: 80%;
    padding: 15px;
}
.taskBox-c-item-btn{
    padding: 3px 10px;
    background: #1996ea;
    color: #fff;
    border-radius: 6px;
    font-size: 12px;
    border: 1px solid #1996ea;
}
</style>
