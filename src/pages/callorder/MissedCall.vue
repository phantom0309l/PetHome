<template>
<div class="missedcall">
  <div class="err-box" v-if="errno != 0">
    {{errmsg}}
  </div>
  <ul class="test" style="list-style-type: none; padding:1px 0" v-if="patient != null">
    <li class="item-box" @click="goPatientDetail($event, patient)">
      <div class="item-box-header">
        <span>{{patient.name}}</span>

        <span style="float: right">{{patient.disease_name}}</span>

      </div>
      <div class="item-box-item" style="margin-top: 10px">
        <span class="left">性别: </span>
        <span>{{patient.sexstr}}</span>
      </div>
      <div class="item-box-item">
        <span class="left">年龄: </span>
        <span>{{patient.age}}</span>
      </div>
      <div class="item-box-item" v-if="patient.patientcardno != ''">
        <span class="left">就诊卡号: </span>
        <span>{{patient.patientcardno}}</span>
      </div>
      <div class="item-box-item">
        <span class="left">呼叫日期: </span>
        <span>{{patient.createday}}</span>
      </div>
    </li>
  </ul>
  <div style="position: fixed; bottom: 0;width: 100%; height: 49px;" v-if="patient != null">
    <a @click="goChat" style="display: block; width: 100%; height: 100%; line-height: 49px; background-color: #4595ff; color: #fff; font-size: 18px;">进入诊后交流给患者直接留言</a>
  </div>
</div>
</template>
<script>
import common from '../../lib/common.js';
import api from '../../config/api.js';
export default {
  data: function() {
    return {
      callorderid: 0,
      callorder: {},
      patient: null,

      errmsg: "",
      errno: -1,
    }
  },
  methods: {
    goPatientDetail: function(e, patient) {
      var self = this;
      this.$router.push({
        name: 'patient-main',
        params: {
          'patientid': self.patient.patientid
        }
      });
    },
    goChat: function() {
      var self = this;
      this.$router.push({
        name: 'patient-pipelist',
        params: {
          'patientid': self.patient.patientid
        }
      });
    },
    fetchData: function() {
      var self = this;
      self.callorderid = this.$route.query.callorderid;
      console.log('callorderid', self.callorderid);
      var url = api.get('callorder.missedcall');
      var params = {
        callorderid: self.callorderid
      }
      common.post(url, params, function(response) {
        console.log(response);
        self.errno = response.errno
        self.errmsg = response.errmsg
        if (response.errno == 0) {
          var data = response.data;
          self.callorder = data.callorder;
          self.patient = self.callorder.patient;
        } else {

        }
      })
    }
  },
  created: function() {
    var self = this;
    self.fetchData();
  },
  mounted: function() {
    document.title = "紧急电话未接听";
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
.missedcall {
}

.err-box {
  padding: 20px 0;
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
  font-size: 14 px;
  padding: 2px 0px;
  color: #666;
}

.item-box-item .left {
  width: 80px;
  display: inline-block;
}

.tag-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.tag-box {
  position: fixed;
  width: 100%;
  max-height: 70%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: rgba(255, 255, 255, 1);
  top: -100%;
  transition: top .6s;
  -webkit-transition: top .6s;
  z-index: 1000;
}

.tag-box-enter-active {
  top: 0
  /*transition: opacity .3s, transform .4s;*/
}

.tag-box-leave-active {
  transform: translate(0, -100%);
}

.tag-div {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;

  /*top: -100%;*/
  /*transition: opacity 1s, transform .4s, top .4s;*/
}

.tag-div-active {
  top: 0px;
}

.tag-div-leave {
  opacity: 0;
}
</style>
