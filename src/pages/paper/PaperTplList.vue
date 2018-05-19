<template>
    <div class="papertpllist">
        <div class="pi-basic fc-flex">
            <div class="icon">
                <i class="iconfont icon-icon133 fc-text-blue font-s18"></i>
            </div>
            <div class="fc-flex__item text-left">
                <span class="font-s18 font-w500">{{pinfo.name}}</span><span style="color:#6e6e6e">&nbsp;&nbsp;{{pinfo.sexstr}}&nbsp;&nbsp;{{pinfo.agestr}}</span>
            </div>
            <div class="text-right" style="line-height:1.8">
                <span class="fc-text-blue">{{pinfo.disease_name}}</span>
            </div>
        </div>
        <div class="paper-item fc-flex" v-for="papertpl in papertpls" @click="clickPaperTplItem(papertpl)">
            <div style="margin-top:2px;" class="pull-10-r">
                <img style="width:16px;height:16px;" src="../../../static/image/paper1.png" />
            </div>
            <div class="fc-flex__item">
                <div class="">
                    <span style="font-weight: normal">{{papertpl.title}}</span>
                </div>
                <div class="paper-lasttime">
                    最近更新时间:&nbsp;&nbsp;{{papertpl.last_paper_time}}
                </div>
            </div>
            <div style="margin:auto">
                <span class="paper-cnt fc-text-blue">{{papertpl.paper_cnt}}份</span>&nbsp;&nbsp;<i class="iconfont icon-combinedshapefuben"></i>
            </div>
        </div>
        <div class="noData" v-if="papertpls.length == 0">
            <span>暂无量表信息</span>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function() {
            return {
                openid: '',
                patientid: '',
                pinfo: {},
                papertpls: [],
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.patientid = this.$route.query.patientid;
            // console.log(this.patientid);
            var url = api.get('paper.tpllist4onepatient');
            var params = {
                openid: this.openid,
                patientid: this.patientid,
            }
            common.post(url, params, function(response){
                self.papertpls = response.data.papertpls;
                self.pinfo = response.data.info;
            })
        },
        mounted: function() {
            document.title = "量表";
        },
        methods:{
            title: function(papertpl) {
                return ""  + papertpl.title
            },
            subtitle: function(papertpl) {
                return "最近更新: " + papertpl.last_paper_time
            },
            clickPaperTplItem: function(papertplitem) {
                this.$router.push({name: 'paper-list', params: {'papertplid': papertplitem.id, 'ename': papertplitem.ename}, query: {'papertplid': papertplitem.id, 'ename': papertplitem.ename, 'patientid': this.patientid}})
            }
        }
    }
</script>
<style scoped>
    .pi-basic {
        padding: 10px;
        border-bottom: 0.5px solid #d9d9d9;
    }
    .papertpllist .icon {
        padding: 3px 10px;
        padding-left: 0;
        width: 25px;
        text-align: right;
    }
    .paper-item {
        text-align: left;
        padding: 10px;
        background: #fff;
        line-height: 1.5;
        border-bottom: 0.5px solid #d9d9d9;
    }
    .paper-item .paper-cnt {
    }
    .paper-item .paper-lasttime {
        color: #999;
        font-size: 15px;
    }
    .noData {
        position: absolute;
        width: 100%;
        top: 40%;
    }
</style>
