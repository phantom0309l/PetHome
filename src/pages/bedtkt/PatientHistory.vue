<template>
    <div class="PatientHistory">
        <div class="header-div">
            <!-- <div style="display: inline-block; padding: 5px">
                <span>{{patient.name}}&nbsp;&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;&nbsp;{{patient.agestr}}&nbsp;&nbsp;&nbsp;{{patient.disease}}</span>
            </div> -->
            <div class="pi-basic fc-flex">
                <div class="icon">
                    <i class="iconfont icon-icon133 fc-text-blue font-s18"></i>
                </div>
                <div class="fc-flex__item">
                    <div class="text-left"><span class="font-s18 font-w500">{{patient.name}}</span>&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;{{patient.age}}&nbsp;&nbsp;<span class="fc-text-blue">{{patient.disease_name}}</span></div>
                </div>
            </div>
        </div>
        <div class="body-div">
            <div v-for="bedtkt in bedtktlist" class="body-div-item fc-flex" @click="clickItem(bedtkt)">
                <div class="fc-flex__item" style="padding: 10px;line-height:1.8;">
                    <span v-html="getLastLogContent(bedtkt.lastlog_content)"></span>
                </div>
                <div class="" style="width:100px;align-self:center;text-align:center;">
                    <span :style="{backgroundColor: '#'+bedtkt.lastlog_color}" style="color: #fff; padding: 5px;border-radius:3px;font-size:12px">{{bedtkt.lastlog_title}}</span>
                </div>
            </div>
            <div class="noData" v-if="bedtktlist.length == 0">
                <span>该患者暂无约住院记录</span>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function()  {
            return {
                patient: '',
                bedtktlist: [
                    {
                        lastlog_color: '#ccc',
                        lastlog_title: '开玩笑',
                        content: 'hahahahahaah123',
                        title: '已拒绝',
                        color: 'blue',
                    },
                    {
                        lastlog_color: '#ccc',
                        content: 'hahahahahaah123',
                        title: '已拒绝',
                        color: 'blue',
                    }
                ],
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var patientid = this.$route.params.patientid;
            var url = api.get('patient.info');
            var params = {
                patientid: patientid,
                openid: openid,
            }
            common.post(url, params, function(response){
                console.log('response1', response);
                self.patient = response.data;
            })

            url = api.get('bedtkt.history4onepatient');
            common.post(url, params, function(response){
                console.log('response2', response);
                self.bedtktlist = response.data.bedtktlist;
                console.log(self.bedtktlist);
            })
        },
        mounted: function() {
            document.title = "住院预约";
        },
        methods: {
            clickItem: function(bedtkt) {
                this.$router.push({name: 'bedtkt-main', params: {'bedtktid': bedtkt.id}});
            },
            getLastLogContent(content) {
                if (content == undefined) {
                    return ""
                }
                return content.replace("\n", "<br/>")
            }
        },
        filters: {
            filterColor: function(val) {
                return 'red';
            }
        }
    }
</script>
<style scoped>
.header-div {
    text-align: left;
    padding: 5px;
    display: block;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    border-bottom: 0.5px solid #d9d9d9;
    background: #fff;
}

.PatientHistory .body-div {
    margin-top: 40px;
}
.body-div-item {
    text-align: left;
    padding: 10px 10px 10px 0;
    box-sizing: border-box;
    background:#fff;
    border-bottom: 0.5px solid #d9d9d9;
}
.PatientHistory .body-div-item:first-child {
    margin-top: 0 !important;
}

.PatientHistory {

}
.noData {
    position: absolute;
    margin:0;
    width: 100%;
    top: 40%;
}

.header-div .icon {
    padding: 4px 10px;
    padding-left: 0;
    width: 25px;
    text-align: right;
}

</style>
