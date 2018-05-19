<template>
    <div class="patientlist">
        <div style="position: fixed; top: 0px; left: 0px; width: 100%; z-index: 100;">
            <mt-search v-model="patient_name" :show="true" v-on:keyup.13.native="doSearch">
            </mt-search>
        </div>
        <div class="body-container">
            <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="true" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" style="list-style-type: none; padding:1px 0">
                <li class="item-box" v-for="patient in patients" @click="goPatientDetail(patient)">
                    <div class="item-box-header">
                        <span>{{patient.name}}</span>
                        <span style="float: right">{{patient.disease_name}}</span>
                    </div>
                    <div class="item-box-item" style="margin-top: 10px">
                        <span class="left">性别: </span>
                        <span>{{patient.sexstr}}</span>
                    </div>
                    <div class="item-box-item">
                        <span class="left">电话号码: </span>
                        <span>{{patient.mobile}}</span>
                    </div>
                    <div class="item-box-item">
                        <span class="left">入组日期: </span>
                        <span>{{patient.createday}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import staticData from '../../lib/staticData.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                // flag: 1,
                openid: '',
                patient_name: '',
                pagenum: 1,
                pagesize: 10,
                patients: [
                ],

                patientids:[],
            }
        },
        methods: {
            inCancerArr: function(diseaseid){
                return common.isCancer(diseaseid);
            },
            goPatientDetail: function(patient) {
                console.log('xxxx---')
                console.log(patient);
                this.$router.push({name: 'patient-main', params:{'patientid': patient.patientid}})
            },
            clickdiv: function() {
            },
            clicka: function() {
            },
            hello: function() {
            },
            doSearch: function(){
                this.pagenum = 1;
                this.flag = 1;
                var self = this;
                var url = api.get('patient.list');
                var params = {
                    patient_name: self.patient_name,
                    pagenum: self.pagenum,
                    pagesize: self.pagesize,
                    openid: self.openid
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        var data = response.data;
                        self.patients = data.patients;
                        console.log(self.patients);
                    }
                })

            },
            loadMore: function() {
                // this.fetchData();
            },
            fetchData: function() {
                // if (this.flag == 0) {
                //     return ;
                // }
                var self = this;
                var url = api.get('patient.listforpatientids');
                var params = {
                    // patient_name: self.patient_name,
                    // pagenum: self.pagenum,
                    // pagesize: self.pagesize,
                    openid: self.openid,
                    patientids: self.patientids,
                }
                // self.flag = 0;
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        var data = response.data;
                        if (data.length != 0) {
                            // console.log(data);
                            // self.pagenum++;
                            // self.patients = self.patients.concat(data.patients);
                            self.patients = data;
                        }
                        // self.flag =1;
                    }
                })
            }
        },
        created: function() {
            this.openid = localStorage.getItem('_openid_');
            this.patientids = staticData.get('patientids').split(',');
            this.fetchData();
        },
        mounted: function() {
            document.title="患者列表";
        },
        beforeRouteEnter(to, from, next) {
          document.querySelector('body').setAttribute('class', 'fc-bg-gray')
          next();
        },
        beforeRouteLeave(to, from, next) {
          document.querySelector('body').setAttribute('class', '')
          next();
        },

    }
</script>
<style scoped>
    .mint-search {
        height: 100%;
    }
    .patientlist {
    }
    .body-container {
        background-color: #eee;
        padding:  0px 0px 0px 0px;
        margin-top: 43px;
        /*overflow-scrolling: touch;*/
        /*-webkit-overflow-scrolling: touch;*/
        /*overflow: auto;*/
        /*-webkit-overflow-scrolling: touch;*/
    }

    .item-box {
        background-color: #fff;
        text-align: left;
        padding: 20px;
        margin: 10px;
    }
    .item-box-header {
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        color: #4472c5;
    }
    .item-box-item {
        font-size: 14   px;
        padding: 2px 0px;
        color: #666;
    }
    .item-box-item .left {
        width: 25%;
        display: inline-block;
    }
</style>
