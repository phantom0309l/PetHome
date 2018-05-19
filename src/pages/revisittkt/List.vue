<template>
    <div class="revisittkt-list">
        <div v-for="(schedule, index) in schedules" class="text-left revisittkt-item border-t border-b">
            <div class="container-header pull-10 fc-bg-gray">
                <i class="iconfont icon-chushengriqi fc-text-blue font-s18"></i><span class="push-10-l">{{schedule.thedate  + ' ' + schedule.daypartstr}}</span>
                <span class="pull-right fc-text-yellow">{{schedule.desc}}</span>
                <div class="clear"></div>
            </div>
            <div v-for="revisittkt in schedule.revisittkts" class="item-div border-t border-b">
                <div class="status-div" v-html="getStatusHtml(revisittkt.patient_confirm_status)"></div>
                <div class="container-header pull-10 pull-5-t pull-5-b">
                    <i class="iconfont icon-jibenxinxi font-s20 fc-text-blue"></i>
                    <span class="font-s18 fc-text-blue pull-5-l">{{revisittkt.patient.name}}</span>
                    <span style="color:#6e6e6e;">&nbsp;&nbsp;{{revisittkt.patient.sexstr}}&nbsp;&nbsp;{{revisittkt.patient.agestr}}</span>
                    <a class="fc-bg-green fc-text-white mark_his" v-if="revisittkt.is_mark_his == 1" @click="markHis(revisittkt, 0)"><i class="iconfont icon-xing" style="position: relative; top: 1px;"></i>已加号</a>
                    <a class="fc-bg-green fc-text-white mark_his" v-else @click="markHis(revisittkt, 1)">标记加号</a>
                </div>
                <div class="fc-flex border-t" style="padding:5px 10px 5px 28px; margin-left: 10px;" @click="goPatientDetail(revisittkt)">
                    <div class="fc-flex__item pull-5-b pull-5-t revisittkt-info">
                        <template v-for="config in revisittkt.use_configs">
                            <div class="use-config" v-if="config.key == 'patient_content'">
                                <p class="fc-text-blue">期望解决的问题:</p>
                                <div class="pull-5-t">{{revisittkt.patient_content}}</div>
                            </div>
                            <div class="use-config" v-else-if="config.value != 0 && config.value != ''">{{config.title}}:&nbsp;&nbsp;&nbsp;{{config.value}}</div>
                        </template>
                    </div>
                    <div class="text-center" style="align-self:center">
                        <i class="iconfont icon-combinedshapefuben fc-text-999" style="font-size: 14px;"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from '../../lib/utils.js'
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    import moment from 'moment'
    export default {
        data: function() {
            return {
                openid: '',
                schedules:[
                ],
            }
        },
        created: function(){
            this.openid = localStorage.getItem('_openid_');
            document.title = this.$route.params.thedate;
            this.getData(0);
        },
        methods: {
            getData: function(daysOffset) {
                var self = this;
                var fromdate = this.$route.params.thedate;
                var todate = fromdate;
                var url = api.get('appointment.list');
                var params = {
                    openid: this.openid,
                    fromdate: fromdate,
                    todate: todate,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.schedules = data.schedules;
                    }
                })
            },
            goPatientDetail: function(revisittkt) {
                this.$router.push({name: 'patient-main', params:{'patientid': revisittkt.patient.patientid}});
            },
            getStatusHtml: function(status) {
                let str = ''
                if (status == 0) {
                    str = '<div class="wait"><i class="iconfont icon-dengdai1"></i><span style="margin-left: 12px;">等待患者确认</span></div>'
                } else if (status == 1) {
                    str = '<div class="confirm"><i class="iconfont icon-tongguo1"></i><span style="margin-left: 12px;">患者确认如约复诊</span></div>'
                } else if (status == 2) {
                    str = '<div class="cancel"><i class="iconfont icon-jujue"></i><span style="margin-left: 12px;">患者取消复诊</span></div>'
                }
                return str
            },
            markHis: function(revisittkt, is_mark_his) {
                var self = this;
                var msg = is_mark_his == 1 ? '确定标记加号吗？' : '确定取消标记加号吗？';
                this.$messagebox.confirm(msg).then(action => {
                    var revisittktid = revisittkt.revisittktid;
                    var url = api.get('appointment.markhisjson');
                    var params = {
                        openid: this.openid,
                        revisittktid: revisittktid,
                        is_mark_his: is_mark_his,
                    }
                    common.ajax({
                        url: url,
                        params: 'POST',
                        params: params,
                        dataType: 'json',
                        loadingText: '正在提交...',
                        done: function(response) {
                            if (response.errno == 0) {
                                var data = response.data;
                                revisittkt.is_mark_his = is_mark_his;
                                let instance = self.$toast('操作成功');
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                            } else {
                                self.$messagebox.alert(response.errmsg).then(action => {});
                            }
                        },
                        fail: function(jqXHR, statusText, error) {
                            self.$messagebox.alert('操作失败').then(action => {})
                        }
                    })
                }, cancel => {

                })
            }
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
.revisittkt-info .use-config {
    margin-top: 10px;
}
.revisittkt-info .use-config:first-of-type {
    margin-top: 0;
}
.mark_his {
    padding: 3px 4px;
    font-size: 14px;
    border-radius: 3px;
    text-align: center;
    display: inline-block;
    position: absolute;
    right: 10px;

}
.container-header {
    /*background-color: #fff;*/
}
.revisittkt-item {
    margin-bottom: 15px;
}
.revisittkt-item:last-of-type {
    margin-bottom: 0;
}
.mint-search {
    height: 100%;
}
.mint-navbar {
    background: #fff;
}
.mint-tab-container {
    /*padding: 0 10px;*/
    margin-top: 3px;
}
.item-div {
    background: #fff;
    margin-bottom: 10px;
}
.item-div:last-of-type {
    margin-bottom: 0;
}
h4 {
    border-left: 3px solid #0099ff;
    text-align: left;
    padding-left: 10px;
    display: inline-block;
    margin: 10px 0px;
    font-weight: normal;
}
.scheduleStyle {
    float: left;
    display: inline-block;
    width: 25%;
    line-height: 1.5;
    padding: 10px 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    background: #fff;
}
.scheduleStyle span {
    display: block;
    text-align: center;
}

</style>
<style>
.revisittkt-list .status-div {
    font-size: 15px;
}
.revisittkt-list .status-div .confirm  {
    background: #efffed;
    color: #34ac62;
    padding: 5px 5px 5px 11px;
    /*margin-top: -5px;*/
}
.revisittkt-list .status-div .wait  {
    background: #fff0f5;
    color: #ec3b83;
    padding: 5px 5px 5px 11px;
    /*margin-top: -5px;*/
}
.revisittkt-list .status-div .cancel  {
    background: #ff7b74;
    color: #fff;
    padding: 5px 5px 5px 11px;
    /*margin-top: -5px;*/
}
</style>
