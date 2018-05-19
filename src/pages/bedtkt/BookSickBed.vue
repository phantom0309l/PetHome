<template>
<div class="book-sick-bed fc-bg-gray">
  <div class="navbar-div">
    <a href="javascript:" :class="['navbar', {'selected': active=='male'}]" @click="clickMale">男性患者</a>
    <a href="javascript:" :class="['navbar', {'selected': active=='female'}]" @click="clickFemale">女性患者</a>
    <a class="header-a" href="javascript:" @click="clickOperationHistory">操作记录</a>
  </div>
  <div style="padding-top: 32px;">
    <div v-for="tkt in tktlist" :id="tkt.id" class="text-left fc-bg-white push-10-t push-10-b pull-10-b patientinfo" @click="enterBedtktMain(tkt)">
      <div class="fc-flex pull-10" style="border-bottom:0.5px solid #d9d9d9;">
        <div class="fc-flex__item text-left fc-text-blue"><i class="iconfont icon-jibenxinxi font-s20"></i>&nbsp;&nbsp;<span class="font-s18">{{tkt.name}}</span></div>
        <div class="fc-flex__item text-right" style="color:#666">{{tkt.sex}}&nbsp;&nbsp;{{tkt.age}}岁&nbsp;&nbsp;{{tkt.disease_name}}</div>
      </div>
      <div class="fc-flex push-10-t pull-25-l">
        <div class="fc-flex__item">手机号: {{tkt.mobile}}</div>
      </div>
      <div class="fc-flex push-10-t pull-25-l">
        <div class="fc-flex__item">应住院日期: {{tkt.plan_date}}</div>
      </div>
      <div class="fc-flex push-10-t pull-25-l ">
        <div class="fc-flex__item">入院确认: <span :class="getPatientStatusClass(tkt.patient_status)">{{tkt.patient_status_desc}}</span></div>
      </div>
    </div>
    <div v-if="tktlist.length == 0" style="position: none;margin-top: 200px;">
      <span style="margin-top:400px;width:80%; padding: 15px">暂无数据</span>
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
      openid: '',
      selected: '',
      active: 'male',
      status: '1',
      tktlist: [],
      tktlist_male: [],
      tktlist_female: [],

      bedtktid: '',
      sex: '',
      locationflag: true,
    }
  },
  methods: {
    getPatientStatusClass: function(patient_status) {
      let s = ""
      if (patient_status == 0) { //待发送
        s = "gray"
      } else if (patient_status == 1) { //已发送待确认
        s = "green"
      } else if (patient_status == 2) { //患者确认来
        s = "blue"
      } else if (patient_status == 3) { //患者拒绝
        s = "orange"
      }
      return s
    },
    clickMale: function() {
      this.active = 'male';
      this.tktlist = this.tktlist_male;
    },
    clickFemale: function() {
      this.active = 'female';
      this.tktlist = this.tktlist_female;
    },
    clickOperationHistory: function() {
      this.$router.push({
        name: 'bedtkt-historylist',
      })
    },
    enterBedtktMain: function(tkt) {
      this.$router.push({
        name: 'bedtkt-main',
        params: {
          'bedtktid': tkt.id
        },
        query: {
          'patientid': tkt.patientid
        }
      });
    },
    initPageAboutOnePatient() {
      this.bedtktid = this.$route.query.bedtktid || '';
      this.sex = this.$route.query.sex;
      var self = this;
      if (this.bedtktid.trim() != '') {
        $(document).ready(function() {
          console.log('ready');
          var pos = "";
          if (self.sex == 1 || self.sex == 0) {
            self.clickMale();
            console.log(self.tktlist, 'tktlist');
          } else {
            self.clickFemale();
          }
          if ($("#" + self.bedtktid).offset() != null) {
            $("html,body").animate({
              scrollTop: $("#" + self.bedtktid).offset().top - 60
            }, 300);
            console.log('xxxx');
          }
        })
      }
      self.locationflag = false;
    }
  },
  beforeRouteEnter(to, from, next) {
      document.querySelector('body').setAttribute('class', 'fc-bg-gray')
      next();
  },
  beforeRouteLeave(to, from, next) {
      document.querySelector('body').setAttribute('class', '')
      next();
  },
  updated: function() {
    // console.log(this.bedtktid,'NNNN');
    if (this.bedtktid.trim() != '' && this.locationflag === true) {
      this.initPageAboutOnePatient();
      console.log('YYYY');
    }
  },
  created: function() {
    this.bedtktid = this.$route.query.bedtktid || '';
    console.log(this.bedtktid, '???');
    this.sex = this.$route.query.sex;
  },
  mounted: function() {
    var self = this;
    document.title = "住院预约";
    console.log('created');
    this.openid = localStorage.getItem('_openid_');
    var url = api.get('sickbed.list');
    var params = {
      openid: this.openid,
    }

    common.post(url, params, function(response) {
      if (response.errno == 0) {
        console.log('post success');
        var data = response.data;
        self.tktlist_male = data.tktlist_male;
        self.tktlist_female = data.tktlist_female;
        self.tktlist = self.tktlist_male;
      }
    })
  },
  watch: {
    '$route': function() {
      console.log('?????');
      this.initPageAboutOnePatient();
    }
  }
}
</script>
<style scoped>
.navbar-div {
  text-align: left;
  position: fixed;
  left: 0px;
  width: 100%;
  background-color: #fff;
  -moz-box-shadow: 2px 1px 3px #dddddd;
  -webkit-box-shadow: 2px 1px 3px #dddddd;
  box-shadow: 2px 1px 3px #dddddd;
  font-size: 0px;
}

.navbar {
  width: 35%;
  display: inline-block;
  background-color: #fff;
  padding: 10px 0px;
  text-decoration: none;
  color: #4472c5;
  text-align: center;
  font-size: 16px;
  position: relative;
}

.navbar:nth-child(2):after {
    content: " ";
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 0;
    width: 1px;
    border-right: 1px solid #ccc;
    color: #ccc;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
    z-index: 2;
}

.selected.navbar:nth-child(2):after {
    border-right: 0;
}

.header-a {
  color: #353535;
  padding: 10px;
  width: 30%;
  float:right;
  display: inline-block;
  background-color: #fff;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
}

a.selected {
  background-color: #4472c5;
  color: #fff;
}

.patientinfo span.left {
  width: 45%;
}

.patientinfo span {
  display: inline-block;
  width: auto;
  line-height: 1.75;
}

.doperation {
  margin: 0px -5px;
}

.doperation a {
  display: inline-block;
  font-size: 16px;
  font-size: 1.6rem;
  padding: 5px 0px;
  text-align: center;
  color: #fff;
  width: 33.3333%;
  text-decoration: none;
}

.blue {
  color: #00ccff;
}

.green {
  color: #4bcc00;
}

.orange {
  color: #f06500;
}

.gray {
  color: #999;
}

.pull-25-l {
  padding-left: 25px;
}
</style>
