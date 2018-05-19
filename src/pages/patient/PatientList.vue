<template>
<!-- <div class="patientlist" @touchend="hiddensearchModal"> -->
<div class="patientlist">
    <div class="searchbar fc-bg-blue fc-flex">
        <div class="search-icon" @click.stop="searchModal=!searchModal">
            <span class="font-s18 fc-text-white">筛选 <i class="iconfont icon-arrowRight-copy"></i></span>
        </div>
        <div class="fc-flex__item fc-search">
            <form action="" onsubmit="return false">
                <mt-search v-model="patient_name" :show="true" v-on:keyup.13.native="doSearch" placeholder="请输入患者姓名搜索">
                </mt-search>
            </form>
        </div>
    </div>
    <div v-show="searchModal" style="position: fixed; width: 100%; height: 100%; top: 0; z-index: 1000;" @touchmove="hiddensearchModal" @click="hiddensearchModal">
        <div class="i-b" style="">
            <div style="border-bottom: 1px solid #fff; padding: 5px 5px;position:relative">
                按标签筛选({{curTag}})
                <select style="opacity:0; position: absolute; left:0;top:0; width:100%; height:100%" v-model="patienttagtplid" @change="doSearch($event,'tag')" @click.stop="preventEventThrough">
                        <option v-for="item in patienttagtpls" :value="item.patienttagtplid">{{item.name}}</option>
                    </select>
            </div>
            <div style="border-bottom: 1px solid #fff;padding: 5px 5px;position:relative">
                按疾病筛选({{curDisease}})
                <select style="opacity:0; position: absolute; left:0;top:0; width:100%; height:100%" v-model="diseaseid" @change="doSearch($event,'disease')" @click.stop="preventEventThrough">
                        <option v-for="disease in disease_arr" :value="disease.id">{{disease.name}}</option>
                    </select>
            </div>
            <div style="padding: 5px 5px;position:relative" v-if="juniorDoctors.length > 2">
                按医生筛选({{curDoctor}})
                <select style="opacity:0; position: absolute; left:0;top:0; width:100%; height:100%" v-model="search_doctorid" @change="doSearch($event,'doctor')" @click.stop="preventEventThrough">
                        <option v-for="doctor in juniorDoctors" :value="doctor.doctorid">{{doctor.name}}</option>
                    </select>
            </div>
        </div>
    </div>

    <div class="body-container">
        <ul class="test" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" style="list-style-type: none;">
            <li class="item-box" v-for="patient in patients" @click="goPatientDetail($event, patient)">
                <div class="fc-flex item-box-header">
                    <div class="fc-flex__item text-left fc-text-blue">
                        <i class="iconfont icon-jibenxinxi font-s20"></i>
                        <span class="font-s18">{{patient.name}}</span>
                        <span class="push-5-l" style="color:#666">{{patient.sexstr}}&nbsp;{{patient.agestr}}&nbsp;{{patient.disease_name}}</span>
                    </div>
                    <div class="pull-right fc-text-blue" v-if="patient.doctor_name">{{patient.doctor_name}}医生</div>
                </div>
                <div class="pull-10-l push-10-t pull-10-b">
                    <div class="item-box-item" v-if="patient.is_live == 0">
                        <span class="left fc-text-danger">患者已死亡</span>
                    </div>
                    <div class="item-box-item">
                        <span class="left">入组日期: </span>
                        <span>{{patient.createday}}</span>
                    </div>
                    <div class="item-box-item">
                        <span class="left">电话号码: </span>
                        <span>{{patient.mobile}}</span>
                    </div>
                    <div class="item-box-item" v-if="patient.patientcardno.trim() != ''">
                        <span class="left">就诊卡号: </span>
                        <span>{{patient.patientcardno}}</span>
                    </div>
                    <div class="item-box-item" v-if="patient.patientcard_id.trim() != '' && patient.patientcard_id != 0">
                        <span class="left">患者ID: </span>
                        <span>{{patient.patientcard_id}}</span>
                    </div>
                    <div class="item-box-item" v-if="patient.diseaseid != 1 && patient.diseasetag.trim() != ''">
                        <span class="left">诊断: </span>
                        <span>{{patient.diseasetag}}</span>
                    </div>
                    <div class="item-box-item ptag" v-if="patient.tags.length!= 0">
                        <span class="left">标签: </span>
                        <span>{{getPatientTag(patient)}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="patients.length == 0" class="push-20-t">
        暂无数据
    </div>
</div>
</template>
<script>
import api from '../../config/api.js'
import common from '../../lib/common.js'
export default {
    data: function() {
        return {
            openid: '',
            patient_name: '',
            pagenum: 1,
            pagesize: 10,
            patients: [],
            patienttagtplid: '',
            tagVisible: false,
            tagVisiblePopup: false,
            tagVisibleF: false,
            patienttagtpls: [{
                patienttagtplid: '',
                name: '全部'
            }],
            curTag: '全部',
            curDisease: '全部',
            curDoctor: '全部',
            diseaseid: 0,
            disease_arr: [{
                diseaseid: '',
                name: '全部'
            }],
            search_doctorid: 0,
            juniorDoctors: [{
                doctorid: '',
                name: '全部',
            }],

            searchModal: false,

            // #4392
            position: 0,
            positionflag: 0,


            loading: false,
        }
    },
    methods: {
        getPatientTag: function(patient) {
            var tags = '';
            if (patient.is_alk == 1) {
                tags += 'ALK、';
            }
            tags += patient.tags.join('、');
            return tags;
        },
        hiddensearchModal: function() {
            this.searchModal = false;
        },
        preventEventThrough: function(e) {
            e.preventDefault();
        },
        inArray: function(diseaseid) {
            return common.isCancer(diseaseid);
        },
        prevent: function(e) {
            e.preventDefault();
        },
        goPatientDetail: function(e, patient) {
            // $('.position-fix').removeClass('position-fix');
            // console.log(e.toElement.nodeName);
            // if (e.toElement.nodeName == "LI") {
            //     $(e.target).addClass('position-fix');
            // }else {
            //     $(e.target).parents('li').eq(0).addClass('position-fix');
            // }

            this.position = window.scrollY;

            // var query = {}
            // query.position = this.position;
            // this.$router.push({
            //     path: '/patient/list',
            //     query: query
            // });

            // this.$router.push({'path':'/patient/list', query: {'position': this.position}});
            this.$router.push({
                name: 'patient-main',
                params: {
                    'patientid': patient.patientid
                }
            });
        },
        clickdiv: function() {},
        clicka: function() {},
        hello: function() {},
        doSearch: function(e, str) {
            window.scroll(0, 0);
            if (str == 'tag') {
                this.curTag = this.patienttagtpls[e.target.selectedIndex]['name'];
            } else if (str == 'disease') {
                this.curDisease = this.disease_arr[e.target.selectedIndex]['name']
            } else if (str == 'doctor') {
                this.curDoctor = this.juniorDoctors[e.target.selectedIndex]['name']
            }
            this.pagenum = 1;
            var self = this;
            var url = api.get('patient.list');
            var params = {
                patient_name: self.patient_name,
                pagenum: self.pagenum,
                pagesize: self.pagesize,
                openid: self.openid,
                diseaseid: self.diseaseid,
                search_doctorid: self.search_doctorid,
                patienttagtplid: self.patienttagtplid,
            }
            self.loading = true;
            common.post(url, params, function(response) {
                if (response.errno == 0) {
                    var data = response.data;
                    self.patients = data.patients;
                    self.pagenum++;
                    self.loading = false;
                }
            })

        },
        loadMore: function() {
            this.fetchData();
        },
        fetchData: function() {
            var self = this;
            var url = api.get('patient.list');
            var params = {
                patient_name: self.patient_name,
                pagenum: self.pagenum,
                pagesize: self.pagesize,
                openid: self.openid,
                patienttagtplid: self.patienttagtplid,
                diseaseid: self.diseaseid,
                search_doctorid: self.search_doctorid,
            }
            self.loading = true;
            common.post(url, params, function(response) {
                if (response.errno == 0) {
                    var data = response.data;
                    if (data.patients.length > 0) {
                        self.pagenum++;
                        self.patients = self.patients.concat(data.patients);
                        if (self.positionflag == 0) {
                            self.$nextTick(function() {
                                window.scroll(0, self.position)
                            })
                        }
                        self.positionflag = 1;
                    }
                    if (data.junior_doctors.length > 0) {
                        self.juniorDoctors = [{
                            doctorid: 0,
                            name: '全部',
                        }]
                        self.juniorDoctors = self.juniorDoctors.concat(data.junior_doctors);
                    }
                    self.loading = false;
                }
            })
        },
        getPatienttagtpls: function() {
            var self = this;
            var url = api.get('patienttagtpl.list');
            var params = {
                openid: this.openid
            }
            common.post(url, params, function(response) {
                if (response.errno == 0) {
                    var data = response.data;
                    self.patienttagtpls = self.patienttagtpls.concat(data.patienttagtpls);
                }
            })
        }

    },
    created: function() {
        var self = this;
        this.openid = localStorage.getItem('_openid_');
        this.position = this.$route.query.position;
        this.fetchData();
        this.getPatienttagtpls();
        common.getDiseases(function(disease_arr) {
            self.disease_arr = self.disease_arr.concat(disease_arr);
        });
    },
    mounted: function() {
        document.title = "患者列表";
    },
    activated: function() {
        // console.log('active');
        // var el = $('.position-fix');
        // if ( el.length != 0) {
        //     window.scroll(0,el.offset().top-60);
        // }
        this.loading = false;
        window.scroll(0, this.position);
    },
    deactivated: function() {
        this.loading = true;
    }

}
</script>
<style>
.fc-search .mint-searchbar {
    background-color: #4472c5 !important;
    height: 100%;
}

.fc-search .mint-searchbar-cancel {
    color: #fff !important;
}

.fc-search .mint-searchbar-core {
    padding-left: 5px !important;
}
</style>
<style scoped>
.i-b {
    position: absolute;
    top: 53px;
    left: 0px;
    background-color: #e6e6e6;
    padding: 5px;
    border-right: 0.5px solid #d9d9d9;
    border-bottom: 0.5px solid #d9d9d9;
}

.searchbar {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 100;
    height: 52px;
    align-items: center;
}

.searchbar .search-icon {
    line-height: 3.0;
    padding: 0 10px;
    z-index: 200;
}

.mint-search {
    height: 100%;
}

.body-container {
    background-color: #eee;
    padding: 0px 0px 0px 0px;
    padding-top: 42px;
    /*overflow-scrolling: touch;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*overflow: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
}

.item-box {
    background-color: #fff;
    text-align: left;
    margin-top: 10px;
}

.item-box-header {
    border-bottom: 0.5px solid #d9d9d9;
    padding: 10px;
}

.item-box-item {
    font-size: 14 px;
    padding: 5px 0px;
    color: #666;
}

.item-box-item .left {
    padding-right: 10px;
    display: inline-block;
}

.ptag {
    background-color: #F3F8FF;
    padding: 5px;
    border: 0.5px dashed #d9d9d9;
    color: #F19B70;
    margin-right: 10px;
}

li:hover {
    background-color: #eee;
}
</style>
