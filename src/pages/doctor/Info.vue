<template>
    <div class="doctorinfo">
        <div class="disease-item" v-for="disease in doctor.disease_arr">
            <div class="title"><i class="iconfont icon-jibingbaike fc-text-blue font-s20"></i>&nbsp;&nbsp;<span>{{disease.name}}</span></div>
            <div style="width: 80%;margin:auto">
                <img  style="width:80%;margin:auto" :src="disease.qr_url">
            </div>
        </div>
        <!-- <router-link :to="{name: 'doctor-config'}">hahaha</router-link> -->

        <!-- <mt-popup v-model="popupVisible">
            <img :src="picurl" style="width: 100%;">
        </mt-popup> -->
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                // picurl: '',
                // popupVisible: false,
                test: '',
                openid: '',
                doctor: {

                }
            }
        },
        methods: {
            fetchData: function() {
                var self = this;
                var url = api.get('doctor.info');
                var params = {
                    openid: this.openid
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.doctor = data.doctor;
                    }
                })
            },
        },
        created: function(){
            this.openid = localStorage.getItem('_openid_');
            this.fetchData();
        }
    }
</script>
<style scoped>
    .doctorinfo {
        text-align: left;
        padding: 10px;
    }
    .disease-item {
        margin: 0px auto 20px auto;
    }
    .title {
        padding: 10px;
        text-align: center;
        background: #fff;
        border-bottom: 0.5px solid #d9d9d9;
    }
    img {
        display: block;
        width: 100%;
        margin: auto;
    }
</style>
