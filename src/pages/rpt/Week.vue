<template>
<div class="toTop">
  <div class="header">
    <div style="width:80%;margin-left:10%;margin-right:10%" class="push-20-t">
      <div class="header-left">
        <img src="../../../static/image/cube_1.png" />
      </div>
      <div class="header-right">
        <p class="header-title"> {{data.other.doctor_name}}医生数据周报</p>
        <p class="header-subtitle">{{data.other.begin_date}} 至 {{data.other.end_date}}</p>
      </div>
      <div class="clear"></div>
    </div>
  </div>

  <div class="item">
    <p class="title">当前患者总数 {{data.total["全部"]}}人</p>
    <div id="patient-total"></div>
  </div>
  <div class="item">
    <p class="title">本周<span style="color:#19D7C6">新增</span>患者/人</p>
    <div class="new-left">
      <div class="new-left-img">
        <img src="../../../static/weekrpt/patient-new-pie.png" />
      </div>
      <div style="float:left;padding-left:10px;text-align:left;margin-top:-2px;font-size:14px;">
        <div>{{data.new["全部"]}}</div>
        <div>新增总数</div>
      </div>
    </div>
    <div class="new-right">
      <div :class="getUpDownClass">
        <img src="../../../static/weekrpt/patient-new-up.png" />
      </div>
      <div style="float:left;padding-left:10px;text-align:left;margin-top:-2px;font-size:14px;">
        <div>{{getPercent}}</div>
        <div>{{getIncreaseTitle}}</div>
      </div>
    </div>
    <div class="clear"></div>
    <div id="patient-new"></div>
  </div>
  <div class="item">
    <p class="title">本周活跃患者/人</p>
    <div class="active-item">
      <div class="active-item-img">
        <img style="width:34px;height:49px;" src="../../../static/weekrpt/活跃@2x.png" />
      </div>
      <div class="active-item-center">
        <div>{{data.active.cnt}}</div>
        <div>本周活跃</div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="active-item">
      <div class="active-item-img">
        <img style="width:53px;height:46px;" src="../../../static/weekrpt/active-msg.png" />
        <p style="margin:0;font-size:14px;">患者消息</p>
      </div>
      <div class="active-item-center">
        <div style="height:30px;">
          <div style="float:left;line-height:1.8;width:70px;">{{data.msg_user.cnt}}人</div>
          <div style="float:left;margin-left:10px;"><img style="width:25px;height:25px;float:left" src="../../../static/weekrpt/active-patient.png" /></div>
        </div>
        <div class="clear:both;"></div>
        <div style="height:30px;">
          <div style="float:left;line-height:1.8;width:70px;">{{data.msg.cnt}}条</div>
          <div style="float:left;margin-left:10px;"><img style="width:25px;height:25px;float:left" src="../../../static/weekrpt/活跃-患者消息-消息@2x.png" /></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="active-item">
      <div class="active-item-img">
        <img style="width:53px;height:46px;" src="../../../static/weekrpt/paper.png" />
        <p style="margin:0;font-size:14px;">随访量表</p>
      </div>
      <div class="active-item-center">
        <div style="height:30px;">
          <div style="float:left;line-height:1.8;width:70px;">{{data.paper_user.cnt}}人</div>
          <div style="float:left;margin-left:10px;"><img style="width:25px;height:25px;float:left" src="../../../static/weekrpt/活跃-随访量表-人@2x.png" /></div>
        </div>
        <div class="clear:both;"></div>
        <div style="height:30px;">
          <div style="float:left;line-height:1.8;width:70px;">{{data.paper.cnt}}个</div>
          <div style="float:left;margin-left:10px;"><img style="width:25px;height:25px;float:left" src="../../../static/weekrpt/活跃-随访量表-量表@2x.png" /></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
  <!--住院业务-->
  <div class="item">
    <p class="title">住院业务</p>
    <div class="bedtkt-top">
      <div class="bedtkt-top-left">
        <img src="../../../static/weekrpt/业务-患者@2x.png" />
        <div class="bedtkt-patient-title">患者</div>
      </div>
      <div class="bedtkt-top-right">
        <img src="../../../static/weekrpt/业务-医生@2x.png" />
        <div class="bedtkt-doctor-title">医生</div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="bedtkt-bottom">
      <div class="bedtkt-bottom-left">
        <div class="bedtkt-bottom-left-top">
          <div class="bedtkt-val-title">{{data.bedtkt["全部"] | filterValue}}人次</div>
          <img src="../../../static/weekrpt/发起@2x.png" />
        </div>
        <div class="bedtkt-bottom-left-bottom">
          <div class="bedtkt-val-title">{{data.bedtkt["患者关闭"] | filterValue}}人次</div>
          <img src="../../../static/weekrpt/取消@2x.png" />
        </div>
      </div>
      <div class="bedtkt-bottom-center">
        <img src="../../../static/weekrpt/住院业务@2x.png" />
      </div>
      <div class="bedtkt-bottom-right">
        <div class="bedtkt-bottom-right-top">
          <div class="bedtkt-val-title">{{data.bedtkt["已确认入住"] | filterValue}}人次</div>
          <img style="width:55px;height:21px;" src="../../../static/weekrpt/确认@2x.png" />
        </div>
        <div class="bedtkt-bottom-right-bottom">
          <div class="bedtkt-val-title">{{data.bedtkt["医生关闭"] | filterValue}}人次</div>
          <img src="../../../static/weekrpt/拒绝@2x.png" />
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
  <!--复诊业务-->
  <div class="item">
    <p class="title">复诊业务</p>
    <div class="revisit-top">
      <div class="revisit-top-left">
        <img src="../../../static/weekrpt/业务-患者@2x.png" />
        <div class="revisit-patient-title">患者</div>
      </div>
    </div>
    <div class="revisit-bottom">
      <div class="revisit-bottom-left">
        <div class="revisit-val-title">{{data.revisit_user["cnt"] | filterValue}}人</div>
      </div>
      <div class="revisit-bottom-center">
        <img src="../../../static/weekrpt/复诊业务@2x.png" />
      </div>
      <div class="revisit-bottom-right">
        <div class="revisit-val-title">{{data.revisit["cnt"] | filterValue}}次</div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
  <!-- <div class="div-logo">
    <img src="../../assets/logo.png" style="width:110px;height:39px;margin-top:20px;" />
  </div> -->
  <!--遮罩-->
  <div v-show="!dataLoaded" style="width:100%;height:9000px;background-color:#fff;position:absolute;top:0;left:0;"></div>
</div>
</template>
<style scoped>
.header {
  width: 100%;
}

.header-left,
.header-right {
  float: left;
}

.header-left {
  margin: 5px 20px 0 0;
}

.header-left img {
  width: 48px;
  height: 48px;
}

.header-title {
  text-align: left;
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
}

.header-subtitle {
  color: #fff;
  font-size: 14px;
  margin-top: 0;
}

.toTop {
  padding: 1px 10px 20px 10px;
  background-image: -webkit-linear-gradient(to top, orange, green);
  background-image: linear-gradient(to top, #ffffff, #CAF6F2, #19D7C6);
}

.item {
  background: rgba(255, 255, 255, 0.8);
  ;
  border-radius: 3px;
  margin-top: 20px;
  padding-bottom: 10px;
}

.title {
  padding: 20px 0 20px 20px;
  text-align: left;
  margin: 0;
}

#patient-total {
  width: 100%;
  height: 150px;
}

#patient-new {
  width: 100%;
  height: 150px;
}

.new-left {
  float: left;
  /*border: 1px solid #eee;*/
  padding: 10px;
  margin-left: 10px;
}

.new-right {
  float: right;
  /*border: 1px solid #eee;*/
  padding: 10px;
  margin-right: 10px;
}

.new-left-img,
.new-right-img {
  float: left;
}

.new-left-img img,
.new-right-img img {
  width: 36px;
  height: 36px;
}

.new-right-img-down img {
  transform: rotate(180deg);
}

/*活跃*/

.active-item {
  padding: 10px 10px;
  width: 80%;
  margin: 0 auto;
}

.active-item-img {
  width: 30%;
  text-align: left;
  float: left;
}

.active-item-center {
  float: left;
  padding-left: 30px;
  text-align: left;
  height: 53px;
  line-height: 1.8;
  width: 60%;
}



/*住院业务*/

.bedtkt-top-left,
.bedtkt-top-right {
  float: left;
  width: 50%;
  text-align: center;
}

.bedtkt-top-left img,
.bedtkt-top-right img,
.revisit-top-left img {
  width: 35px;
  height: 35px;
}

.bedtkt-bottom,
.revisit-bottom {
  margin-top: 20px;
}

.bedtkt-bottom-left,
.bedtkt-bottom-center,
.bedtkt-bottom-right,
.revisit-bottom-left,
.revisit-bottom-center,
.revisit-bottom-right {
  float: left;
  text-align: center;
  width: 33%;
}

.bedtkt-bottom-left img,
.bedtkt-bottom-right img {
  width: 52px;
  height: 19px;
}

.bedtkt-bottom-center img,
.revisit-bottom-center img {
  width: 105px;
  height: 105px;
}

.bedtkt-bottom-left-bottom,
.bedtkt-bottom-right-bottom {
  margin-top: 10px;
}

.bedtkt-val-title {
  padding-bottom: 5px;
}

.bedtkt-patient-title,
.bedtkt-doctor-title,
.revisit-patient-title {}

.bedtkt-patient-title {
  color: #E26EAE;
}

.bedtkt-doctor-title {
  color: #5676F3;
}



/*复诊业务*/

.revisit-top-left {
  text-align: center;
  width: 100%;
}

.revisit-val-title {
  line-height: 6;
}
</style>
<script>
import api from '../../config/api.js'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'


import common from '../../lib/common.js'
export default {
  data: function() {
    return {
      dataLoaded: false,
      patientTotalChart: null,
      patientNewChart: null,
      data: {
        active: {},
        bedtkt: {},
        msg: {},
        msg_user: {},
        new: {},
        new_lastweek: {},
        paper: {},
        paper_user: {},
        revisit: {},
        revisit_user: {},
        total: {},
        other: {},
      },
      defaultOption: {
        series: [{
          type: 'pie',
          radius: ['50%', '70%'],
          label: {
            normal: {
              show: true,
              position: 'outside'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{b}{c}人'
              },
              labelLine: {
                show: true
              }
            }
          },
          color: [
              "#0098d9",
              "#f7ba2a",
              "#13ce66",
              "#d95850",
              "#07a2a4",
              "#a0a7e6"
          ],
          data: [{
              value: 335,
              name: '肺癌'
            },
            {
              value: 310,
              name: '胃癌'
            },
            {
              value: 234,
              name: '其他癌症'
            },
          ]
        }]
      },

    }
  },
  computed: {
    openid: function() {
      return localStorage.getItem('_openid_')
    },
    getPercent: function() {
      if (!this.data.new.hasOwnProperty("全部")) {
        return ''
      }
      let thisWeek = this.data.new["全部"];
      let lastWeek = this.data.new_lastweek["全部"]

      if (thisWeek == 0 && lastWeek != 0) {
        return "下降为0"
      }
      if (thisWeek != 0 && lastWeek == 0) {
        return "首次进患者"
      }
      if (thisWeek == 0 && lastWeek == 0) {
        return "0%"
      }

      let diff = Math.abs(thisWeek - lastWeek)
      let percent = Math.round(diff / lastWeek * 1000) / 10

      return percent + '%'
    },
    getIncreaseTitle: function() {
      if (!this.data.new.hasOwnProperty("全部")) {
        return ''
      }
      if (this.data.new["全部"] - this.data.new_lastweek["全部"] >= 0) {
        return '较上周增长'
      } else {
        return '较上周下降'
      }
    },
    getUpDownClass: function() {
      if (this.data.new["全部"] - this.data.new_lastweek["全部"] >= 0) {
        return 'new-right-img'
      } else {
        return 'new-right-img new-right-img-down'
      }
    }
  },
  methods: {
    initAllCharts: function() {
      let that = this
      this.patientTotalChart = echarts.init(document.getElementById('patient-total'), 'essos')
      this.patientNewChart = echarts.init(document.getElementById('patient-new'), 'essos')
      this.fetchData(function(data) {
        that.updateTotalPatientChart(data.total)
        that.updateNewPatientChart(data.new)
      })
    },
    updateTotalPatientChart: function(data) {
      let option = Object.assign({}, this.defaultOption)
      // option.legend.data = [
      //     "男性",
      //     "女性"
      // ]
      option.series[0].data = [{
          value: data["男"],
          name: "男性"
        },
        {
          value: data["女"],
          name: "女性"
        }
      ]
      this.patientTotalChart.setOption(option)
    },
    updateNewPatientChart: function(data) {
      let option = Object.assign({}, this.defaultOption)
      let seriesData = []
      Object.keys(data).map(function(key) {
        let one = data[key]
        if (key != "全部") {
          seriesData.push({
            name: key,
            value: one
          })
        }
      })
      option.series[0].data = seriesData
      this.patientNewChart.setOption(option)
    },
    fetchData: function(f) {
      let that = this
      let date = this.$route.query.date
      let diseaseid = this.$route.query.diseaseid || '';
      common.post(api.get('doctor.weekrpt'), {
        openid: this.openid,
        date: date,
        diseaseid: diseaseid,
      }, function(d) {
        if (d.errno == 0) {
            that.dataLoaded = true
          that.data = d.data;
          if (typeof f == "function") {
            f(that.data)
          }
        } else {
          that.$messagebox.alert(d.errmsg, "错误");
        }
      })
    }
  },
  filters: {
    filterValue: function(val) {
      if (val == undefined || val == "") {
        return 0
      }
      return val
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initAllCharts()
    })

  }
}
</script>
