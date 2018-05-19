<template>
    <div class="one">
        <header class="mint-header" style="position: fixed; top: 0; z-index: 1000; width: 100%;" @click="goReportList()">
            <div class="mint-header-button is-left">
                <a href="#/" class="router-link-active">
                    <button class="mint-button mint-button--default mint-button--normal">
                        <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
                        <label class="mint-button-text"></label>
                    </button>
                </a>
            </div>
            <h1 class="mint-header-title">点击查看历史汇报</h1>
            <div class="mint-header-button is-right"></div>
        </header>
        <div class="err-box" v-if="errno != 0">{{errmsg}}</div>
        <template v-else>
            <div class="main">
                <div class="item replys" v-if="replys&&replys.length>0">
                    <div class="blue item-title pd-10" @click="showDetail.replys = !showDetail.replys">
                        批复记录<i :class="showDetail.replys ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="blue-border pd-5 mg-10" v-show="showDetail.replys">
                        <table class="table">
                            <tbody>
                                <tr v-for="item in replys">
                                    <td class="ws-nowrap">
                                        {{toSimpleDate(item.thedate)}}
                                    </td>
                                    <td class="wb-breakall">
                                        {{item.content}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="item">
                    <div class="blue item-title pd-10" @click="showDetail.info = !showDetail.info">
                        基本信息<i :class="showDetail.info ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="pd-10" v-show="showDetail.info">
                        <table class="table">
                            <tbody>
                            <tr>
                                <th class="blue">
                                    {{patient.name}}
                                </th>
                                <td class="blue">
                                    {{patient.attrStr}}
                                </td>
                            </tr>
                            <tr v-if="pcard.complication">
                                <th>
                                    诊断
                                </th>
                                <td>
                                    {{pcard.complication}}
                                </td>
                            </tr>
                            <tr v-if="revisitrecord && revisitrecord.thedate">
                                <th>
                                    上次就诊
                                </th>
                                <td>
                                    {{revisitrecord.thedate}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="item" v-if="appeal">
                    <div class="blue item-title pd-10" @click="showDetail.appeal = !showDetail.appeal">
                        患者诉求<i :class="showDetail.appeal ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="blue-border mg-10 pd-10" v-show="showDetail.appeal" style="white-space: pre-wrap;">{{appeal}}</div>
                </div>
                <div class="item" v-if="remark">
                    <div class="blue item-title pd-10" @click="showDetail.remark = !showDetail.remark">
                        运营备注<i :class="showDetail.remark ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div v-show="showDetail.remark">
                        <div class="blue-border mg-10 pd-10" style="white-space: pre-wrap;">{{remark}}</div>
                        <ul class="picture-box" v-if="pictures&&pictures.length>0">
                            <li v-for="item in pictures">
                                <img :src="item.thumb_url" @click="preview(item.url)"/>
                            </li>
                            <div class="clear"></div>
                        </ul>
                    </div>
                </div>
                <div class="item" v-if="patientremarks&&patientremarks.length>0">
                    <div class="blue item-title pd-10" @click="showDetail.patientremarks = !showDetail.patientremarks">
                        症状体征及不良反应<i :class="showDetail.patientremarks ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="blue-border pd-5 mg-10" v-show="showDetail.patientremarks">
                        <table class="table">
                            <tbody>
                                <tr style="border: none" v-for="item in patientremarks">
                                    <th>
                                        {{item.name}}
                                    </th>
                                    <td class="ws-nowrap">
                                        {{toSimpleDate(item.thedate)}}
                                    </td>
                                    <td class="wb-breakall">
                                        {{item.content}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="item" v-if="checkuptpls&&checkuptpls.length>0">
                    <div class="blue item-title pd-10" @click="showDetail.checkups = !showDetail.checkups">
                        检查<i :class="showDetail.checkups ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div v-for="checkuptpl in checkuptpls" style="text-align: center;" v-show="showDetail.checkups">
                        <p class="blue">{{checkuptpl.title}}</p>
                        <div class="checkup-box pd-10 mg-10">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>日期</td>
                                        <td v-for="question in checkuptpl.questions">{{question}}</td>
                                    </tr>
                                    <tr v-for="checkup in checkuptpl.checkups">
                                        <td>{{checkup.check_date}}</td>
                                        <td v-for="answer in checkup.answers">
                                            {{answer}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p class="checkup-tips">左右滑动查看更多信息</p>
                    </div>
                </div>
                <div class="item" v-if="patientmedicinepkg && patientmedicinepkg.items">
                    <div class="blue item-title pd-10" @click="showDetail.patientmedicinepkg = !showDetail.patientmedicinepkg">
                        患者现用药情况<i :class="showDetail.patientmedicinepkg ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="blue-border pd-5 mg-10" v-show="showDetail.patientmedicinepkg">
                        <table style="width: 100%;">
                            <tbody>
                                <tr v-for="item in patientmedicinepkg.items">
                                    <th class="pd-5 ws-nowrap">
                                        {{item.medicinename}}
                                    </th>
                                    <td class="pd-5 wb-breakall">
                                        {{getPatientMedicinePkgItemInfo(item)}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="item" v-if="isShowDiagnose">
                    <div class="blue item-title pd-10" @click="showDetail.diagnose = !showDetail.diagnose">
                        最新诊断<i :class="showDetail.diagnose ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="blue-border pd-5 mg-10" v-show="showDetail.diagnose">
                        <table style="width: 100%;">
                            <tbody>
                                <tr>
                                    <th style="text-align: center;" class="pd-10" colspan="2">
                                        {{diagnose.thedate}}
                                    </th>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">部位</th>
                                    <td class="pd-5 wb-breakall">{{diagnose.position}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">起源</th>
                                    <td class="pd-5 wb-breakall">{{diagnose.diagnose_start}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">特殊</th>
                                    <td class="pd-5 wb-breakall">{{diagnose.special}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="item" v-if="isShowStaging">
                    <div class="blue item-title pd-10" @click="showDetail.staging = !showDetail.staging">
                        最新分期<i :class="showDetail.staging ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="blue-border pd-5 mg-10" v-show="showDetail.staging">
                        <table style="width: 100%;">
                            <tbody>
                                <tr>
                                    <th style="text-align: center;" class="pd-10" colspan="2">
                                        {{staging.thedate}}
                                    </th>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">分期类型</th>
                                    <td class="pd-5 wb-breakall">{{staging.type}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">T</th>
                                    <td class="pd-5 wb-breakall">{{staging.T}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">N</th>
                                    <td class="pd-5 wb-breakall">{{staging.N}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">M</th>
                                    <td class="pd-5 wb-breakall">{{staging.M}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">分期</th>
                                    <td class="pd-5 wb-breakall">{{staging.stage}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">备注</th>
                                    <td class="pd-5 wb-breakall">{{staging.content}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="item" v-if="isShowChemo">
                    <div class="blue item-title pd-10" @click="showDetail.chemo = !showDetail.chemo">
                        最新化疗方案<i :class="showDetail.chemo ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="blue-border pd-5 mg-10" v-show="showDetail.chemo">
                        <table style="width: 100%;">
                            <tbody>
                                <tr>
                                    <th style="text-align: center;" class="pd-10" colspan="2">
                                        {{chemo.thedate}}
                                    </th>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">方案</th>
                                    <td class="pd-5 wb-breakall">{{chemo.protocol}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">周期</th>
                                    <td class="pd-5 wb-breakall">{{chemo.cycle}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">性质</th>
                                    <td class="pd-5 wb-breakall">{{chemo.property}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">疗程</th>
                                    <td class="pd-5 wb-breakall">{{chemo.period}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">备注</th>
                                    <td class="pd-5 wb-breakall">{{chemo.content}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="item" v-if="isShowChemo">
                    <div class="blue item-title pd-10" @click="showDetail.nexthualiaodate = !showDetail.nexthualiaodate">
                        预计下次化疗日期<i :class="showDetail.nexthualiaodate ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="pd-5 mg-10" v-show="showDetail.nexthualiaodate">
                        <table style="width: 100%;">
                            <tbody>
                                <tr>
                                    <td class="pd-5 wb-breakall">{{nexthualiaodate}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="item" v-if="isShowChemo">
                    <div class="blue item-title pd-10" @click="showDetail.wbc_checkup = !showDetail.wbc_checkup">
                            最新血常规<i :class="showDetail.wbc_checkup ? 'collapse-close' : 'collapse-open'" class="collapse"></i>
                    </div>
                    <div class="blue-border pd-5 mg-10" v-show="showDetail.wbc_checkup">
                        <table style="width: 100%;">
                            <tbody>
                                <tr>
                                    <th style="text-align: center;" class="pd-10" colspan="2">
                                        {{wbc_checkup.thedate}}
                                    </th>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">白细胞</th>
                                    <td class="pd-5 wb-breakall">{{wbc_checkup.baixibao}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">血红蛋白</th>
                                    <td class="pd-5 wb-breakall">{{wbc_checkup.xuehongdanbai}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">血小板</th>
                                    <td class="pd-5 wb-breakall">{{wbc_checkup.xuexiaoban}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">中性粒细胞</th>
                                    <td class="pd-5 wb-breakall">{{wbc_checkup.zhongxingli}}</td>
                                </tr>
                                <tr>
                                    <th class="pd-5 ws-nowrap">备注</th>
                                    <td class="pd-5 wb-breakall">{{wbc_checkup.content}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 底部菜单 -->
            <div class="tabbar">
                <mt-button class="tabbar-item tabbar-item-patient" @click="goPatientDetail">
                    <img src="../../../static/image/people.png" height="20" width="20" slot="icon">
                    患者详情
                </mt-button>
                <mt-button id="reply_button" class="tabbar-item tabbar-item-reply" @click="showReply">
                    <img src="../../../static/image/pen.png" height="20" width="20" slot="icon">
                    批复
                </mt-button>
            </div>
            <!-- 批复弹出框 -->
            <mt-popup
            v-model="replyVisible"
            position="top"
            :modal="true"
            style="width: 100%; height: 230px; border-radius: 0px;">
                <div>
                    <div style="height: 40px; border-bottom: 1px solid #F0F0F0; background-color: #26a2ff;">
                        <button @click="hideReply" style="height: 39px; border: 0px; background-color: unset; position: absolute; left: 10px; top: 0px; color: #fff; font-size: 14px; font-size: 1.4rem;">取消</button>
                        <div style="line-height: 40px; height: 39px; width: 100%; text-align: center; padding-left: 0; margin-bottom: 0; color: #fff; font-size: 16px; font-size: 1.6rem;">批复</div>
                        <button @click="replyPost" style="height: 39px; border: 0px; background-color: unset; position: absolute; right: 10px; top: 0px; color: #fff; font-size: 14px; font-size: 1.4rem;">提交</button>
                    </div>
                    <textarea id="reply_textarea" v-model="reply_content" style="width: 100%; height: 186px; border: 0; padding: 10px 15px; font-size: 16px;" placeholder="请输入批复内容"/>
                </div>
            </mt-popup>
        </template>
    </div>
</template>

<script>
import api from '../../config/api.js';
import common from '../../lib/common.js';
import util from '../../lib/utils.js'
export default {
  data: function() {
    return {

      errmsg: "",

      errno: -1,

      showDetail: {
        replys: true,
        info: true,
        patientmedicinepkg: true,
        appeal: true,
        remark: true,
        patientremarks: true,
        checkups: true,
        diagnose: true,
        staging: true,
        chemo: true,
        nexthualiaodate: true,
        wbc_checkup: true,
      },

      patient: {
        // name: '张三',
        // sexstr: '男',
        // agestr: '35岁',
        // disease: '肺癌',  //多疾病的情况没考虑
      },

      pcard: {

      },

      patientmedicinepkg: {

      },

      checkuptpls: {

      },

      revisitrecord: {

      },

      patientremarks: {

      },

      appeal: "",
      remark: "",

      pictures: [],

      originalPictureUrl: [],

      replys: [],

      replyVisible: false,

      reply_content: '',

      //肿瘤专用数据
      diagnose: '',//最新诊断
      staging: '',//最新分期
      chemo: '',//最新化疗方案
      nexthualiaodate: '',//预计下次化疗日期
      wbc_checkup: '',//最新血常规
    }
  },
  computed: {
      isShowDiagnose: function () {
          return util.isObject(this.diagnose) && Object.keys(this.diagnose).length > 0
      },
      isShowStaging: function () {
          return util.isObject(this.staging) && Object.keys(this.staging).length > 0
      },
      isShowChemo: function() {
          return util.isObject(this.chemo) && Object.keys(this.chemo).length > 0
      },
      isShowNextHualiaoDate: function() {
          return this.nexthualiaodate.length > 0
      },
      isShowWbcCheckup: function() {
          return util.isObject(this.wbc_checkup) && Object.keys(this.wbc_checkup).length > 0
      }
  },
  methods: {
    goReportList: function() {
      this.$router.push({name: 'report-list', query: {'patientid': this.patient.patientid}});
    },
    preview: function(curSrc) {
      if (this.originalPictureUrl.length == 0) {
        this.originalPictureUrl = this.pictures.map(function(value, index, array) {
          return value.url
        })
      }
      var self = this
      WeixinJSBridge.invoke('imagePreview', {
        'current': curSrc,
        'urls': self.originalPictureUrl
      });
    },
    showReply: function() {
      this.replyVisible = true
      setTimeout(function() {
        document.getElementById('reply_textarea').focus()
      }, 1000)
    },
    hideReply: function() {
      this.replyVisible = false
    },
    replyPost: function() {
      var self = this
      var openid = localStorage.getItem('_openid_')
      var reportid = this.$route.params.reportid
      var url = api.get('report.one')
      var content = this.reply_content
      var params = {
        openid: openid,
        reportid: reportid,
        content: content,
      }
      setTimeout(function() {
        $('.mint-indicator').css('position', 'relative')
        $('.mint-indicator').css('z-index', '4000')
      }, 50)
      var url = api.get('doctorcomment.addpost')
      common.ajax({
        url: url,
        params: 'POST',
        params: params,
        dataType: 'json',
        loadingText: '正在提交...',
        done: function(response) {
          if (response.errno == 0) {
            self.replys.unshift(response.data.reply);
            self.reply_content = ''
            self.hideReply()
            let instance = self.$toast('批复成功!')
            setTimeout(() => {
              instance.close();
            }, 2000);
          } else {
            self.$messagebox.alert(response.errmsg).then(action => {});
          }
        },
        fail: function(jqXHR, statusText, error) {
          self.$messagebox.alert('提交失败').then(action => {})
        },
        always: function() {
          $('.mint-indicator').css('position', '')
          $('.mint-indicator').css('z-index', '')
        }
      })
    },
    goPatientDetail: function() {
      this.$router.push({
        name: 'patient-main',
        params: {
          'patientid': this.patient.patientid
        }
      })
    },
    toSimpleDate: function(dateStr) {
      return (dateStr ? dateStr : "  ").substring(2)
    },
    getPatientMedicinePkgItemInfo: function(item) {
      return item.drug_dose + "  " + item.drug_frequency + "  " + item.drug_change
    },
  },
  created: function() {
    var self = this;
    var openid = localStorage.getItem('_openid_')
    var reportid = this.$route.params.reportid
    var url = api.get('report.one')
    var params = {
      openid: openid,
      reportid: reportid,
    }
    common.post(url, params, function(response) {
      self.errno = response.errno
      self.errmsg = response.errmsg

      if (response.errno == 0) {
        var data = response.data
        self.patient = data.patient
        self.pcard = data.pcard
        self.patientmedicinepkg = data.patientmedicinepkg
        self.checkuptpls = data.checkuptpls
        self.revisitrecord = data.revisitrecord
        self.patientremarks = data.patientremarks
        self.appeal = data.appeal
        self.remark = data.remark
        self.pictures = data.pictures
        self.replys = data.replys
        //肿瘤汇报专有数据
        self.diagnose = data.diagnose || ""
        self.staging = data.staging || ""
        self.chemo = data.chemo || ""
        self.nexthualiaodate = data.nexthualiaodate || ""
        self.wbc_checkup = data.wbc_checkup || ""
      }
    })
  },
  mounted: function() {
    document.title = "病情汇报"
  }
}
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

input,
button,
textarea {
  outline: none;
}

.one {
  background-color: #FFF;
  padding-top: 40px;
}

.err-box {
  padding: 20px 0;
}

.main {
  text-align: left;
  margin-bottom: 49px;
}

.blue-border {
  border: 1px solid #8CCFF0;
  border-radius: 5px;
}

.pd-5 {
  padding: 5px;
}

.pd-10 {
  padding: 10px;
}

.mg-10 {
  margin: 10px;
}

.no-border {
  border: none;
}

.blue {
  color: #0096E0;
}

.ws-nowrap {
  white-space: nowrap;
}

.wb-breakall {
  word-break: break-all;
}

.collapse {
  width: 23px;
  height: 23px;
  display: inline-block;
  background-size: 23px;
  float: right;
  margin: 2px 5px;
}

.collapse-open {
  background-image: url('../../../static/image/open.png');
}

.collapse-close {
  background-image: url('../../../static/image/close.png');
}

table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

table td[class*=col-],
table th[class*=col-] {
  position: static;
  display: table-cell;
  float: none;
}

table th {
  padding: 5px 10px;
}

.replys .table tr {
    border-bottom: 1px dashed #E9E9E9;
}

.replys .table tr:last-child {
    border-bottom: none;
}

.item {
  overflow: hidden;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  background-color: #E9F5FF;
}

.table tr {
  border-top: 1px dashed #E9E9E9;
}

.table tr:first-child {
  border-top: none;
}

.table>tbody>tr>th {
  white-space: nowrap;
  width: auto;
}

.table>tbody>tr>td,
.table>tbody>tr>th {
  padding: 8px;
  vertical-align: top;
}

.picture-box {
  list-style: none;
  padding: 5px;
}

.picture-box li {
  float: left;
  margin: 5px;
}

.picture-box li img {
  width: 70px;
  height: 70px;
}

.checkup-box {
  border-top: 1px solid #8CCFF0;
  border-bottom: 1px solid #8CCFF0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.checkup-box tr:first-child {
  border-bottom: 1px solid #E9E9E9;
  color: #666;
}

.checkup-box tr th,
.checkup-box tr td {
  padding: 10px;
  white-space: nowrap;
}

.checkup-tips {
  font-weight: normal;
  font-size: 12px;

  color: #999;
  margin-top: -5px;
}

.tabbar {
  height: 40px;
  line-height: 40px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #D9D9D9;
}

.tabbar-item {
  width: 50%;
  height: 100%;
  float: left;
  font-size: 14px;
  font-size: 1.4rem;
  font-weight: 500;
  border: 0;
  border-radius: 0;
}

.tabbar-item-patient {
  background-color: #F6F8FA;
  color: #26A2FF;
}

.tabbar-item-reply {
  background-color: #26A2FF;
  color: #FFFFFF;
}
</style>
