<template>
    <div class="multidiseaseweekrpt pd-5">
        <div class="content-item pd-8 remove-margin-b" style="border-bottom: 0.5px solid #d9d9d9">
            <h3 class="text-center">{{multidiseaseweekrpt.other['doctor_name']}}医生周报 {{multidiseaseweekrpt.other['begin_date']}} 至 {{multidiseaseweekrpt.other['end_date']}}</h3>
            <h3 v-if="isShowDisease" class="text-center font-w500">{{multidiseaseweekrpt.other['disease_name']}}</h3>
        </div>
        <div class="content-item pd-8">
            <h4 class="push-10-b">
                当前患者(共{{multidiseaseweekrpt.total['全部']}}人)
            </h4>
            <div style="font-size:0px; ">
                <div class="i-b boy-img pd-8" style="font-size:14px; font-size:1.4rem; text-align:center; position: relative; top: -30px">
                    <img src="../../assets/boy.png" style="width:50px"/>
                    <span>{{multidiseaseweekrpt.total['男']}}</span>
                    <span class="normal-word-color">人</span>
                </div>
                <div id="patient_no" class="i-b total-patient t-c">
                    <span style="font-size:16px"></span>
                </div>
                <div class="i-b girl-img t-r pd-8" style="font-size:14px; font-size:1.4rem; text-align:center;position: relative; top: -30px">
                    <img src="../../assets/girl.png" style="width:50px"/>
                    <span>{{multidiseaseweekrpt.total['女']}}</span>
                    <span class="normal-word-color">人</span>
                </div>
            </div>
        </div>
        <div class="content-item pd-8">
            <h4 class="push-10-b">
                报到&扫码
            </h4>
            <div style="font-size:0px">
                <div class="baodao-item-l item-border i-b t-c">
                    <img src="../../assets/newBD.png" />
                    <div style=" display:inline-block; vertical-align:super; text-align:left">
                        <span class="normal-word-color">新增报道</span><br/>
                        <!-- <span>{{multidiseaseweekrpt.newbaodao_patient_cnt_thisweek}}</span> -->
                        <span class="keyword">{{multidiseaseweekrpt.new['全部']}}</span>
                        <span class="normal-word-color">人</span>
                    </div>
                </div>
                <div class="baodao-item-r item-border i-b t-c">
                    <img src="../../assets/BDIncrease.png"/>
                    <div style=" display:inline-block;vertical-align:super;text-align:left">
                        <span class="normal-word-color">较上周增长</span><br/>
                        <span class="keyword">{{multidiseaseweekrpt.new_lastweek['全部'] | computedIncrease(multidiseaseweekrpt.new['全部'])}}</span>
                        <span class="normal-word-color">人</span>
                    </div>
                </div>
            </div>
            <div style="font-size:0px">
                <div class="baodao-item-l item-border i-b t-c">
                    <img src="../../assets/newSC.png"/>
                    <div style=" display:inline-block; vertical-align:super;text-align:left">
                        <span class="normal-word-color">新增扫码</span><br/>
                        <span class="keyword">{{multidiseaseweekrpt.new_wxuser.cnt}}</span>
                        <span class="normal-word-color">人</span>
                    </div>
                </div>
                <div class="baodao-item-r item-border i-b t-c">
                    <img src="../../assets/SCIncrease.png"/>
                    <div style=" display:inline-block;vertical-align:super;text-align:left">
                        <span class="normal-word-color">较上周增长</span><br/>
                        <span class="keyword">{{multidiseaseweekrpt.new_wxuser_lastweek.cnt | computedIncrease(multidiseaseweekrpt.new_wxuser.cnt)}}</span>
                        <span class="normal-word-color">人</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-item pd-8">
            <h4 class="push-10-b">
                患者活跃
            </h4>
            <div v-if="multidiseaseweekrpt.msg.cnt != 0" class="active-patient-item">
                <table style="font-size: 14px; font-size: 1.4rem; width: 100%">
                    <tbody>
                        <tr>
                            <td style="width: 40%; text-align:center">
                                <div class="i-b pd-5">
                                    <img src="../../assets/patientmsgicon.png" />
                                    <div>
                                        患者消息
                                    </div>
                                </div>
                            </td>
                            <td style="padding: 0px 5px; text-align: right; width: 60%; padding-right: 15%">
                                <div style="position: relative; top: -5px; width:100%"><span class="normal-word-color">消息总条数</span><span class="keyword">{{multidiseaseweekrpt.msg.cnt}}</span><span class="normal-word-color">条</span></div>
                                <div style="position: relative; top: 5px" ><span class="normal-word-color">发送消息患者数</span><span class="keyword">{{multidiseaseweekrpt.msg_user.cnt}}</span><span class="normal-word-color">人</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="multidiseaseweekrpt.paper.cnt != 0" class="active-patient-item">
                <table style="font-size: 14px; font-size: 1.4rem; width: 100%">
                    <tbody>
                        <tr>
                            <td style="width: 40%; text-align:center">
                                <div style="" class="i-b pd-5">
                                    <img src="../../assets/paper.png" width="55.19px" />
                                    <div>
                                        量表填写
                                    </div>
                                </div>
                            </td>
                            <td style="padding: 0px 5px; text-align: right; width: 60%; padding-right: 15%">
                                <div style="position: relative; top: -5px; width:100%"><span class="normal-word-color">患者填写量表总数</span><span class="keyword">{{multidiseaseweekrpt.paper.cnt}}</span><span class="normal-word-color">份</span></div>
                                <div style="position: relative; top: 5px" ><span class="normal-word-color">填写量表患者数</span><span class="keyword">{{multidiseaseweekrpt.paper_user.cnt}}</span><span class="normal-word-color">人</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="multidiseaseweekrpt.checkup.cnt != 0" class="active-patient-item">
                <table style="font-size: 14px; font-size: 1.4rem; width: 100%">
                    <tbody>
                        <tr>
                            <td style="width: 40%; text-align:center">
                                <div style="" class="i-b pd-5">
                                    <img src="../../assets/checkup.png" width="55.19px" />
                                    <div>
                                        检查报告
                                    </div>
                                </div>
                            </td>
                            <td style="padding: 0px 5px; text-align: right; width: 60%; padding-right: 15%">
                                <div style="position: relative; top: -5px; width:100%"><span class="normal-word-color">检查报告总数</span><span class="keyword">{{multidiseaseweekrpt.checkup.cnt}}</span><span class="normal-word-color">份</span></div>
                                <div style="position: relative; top: 5px" ><span class="normal-word-color">检查报告患者数</span><span class="keyword">{{multidiseaseweekrpt.checkup_user.cnt}}</span><span class="normal-word-color">人</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="multidiseaseweekrpt.revisit.cnt != 0" class="active-patient-item">
                <table style="font-size: 14px; font-size: 1.4rem; width: 100%">
                    <tbody>
                        <tr>
                            <td style="width: 40%; text-align:center">
                                <div style="" class="i-b pd-5">
                                    <img src="../../assets/revisit.png" width="55.19px" />
                                    <div>
                                        复诊
                                    </div>
                                </div>
                            </td>
                            <td style="padding: 0px 5px; text-align: right; width: 60%; padding-right: 15%">
                                <div style="position: relative; top: -5px; width:100%"><span class="normal-word-color">患者复诊次数</span><span class="keyword">{{multidiseaseweekrpt.revisit.cnt}}</span><span class="normal-word-color">份</span></div>
                                <div style="position: relative; top: 5px" ><span class="normal-word-color">复诊患者数</span><span class="keyword">{{multidiseaseweekrpt.revisit_user.cnt}}</span><span class="normal-word-color">人</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import common from '../../lib/common.js'
    import api from '../../config/api.js'
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/pie'
    export default {
        data: function() {
            return {
                openid: '',
                multidiseaseweekrpt: {
                    total: {'全部':0, '男':0, '女':0},
                    msg: {cnt:0},
                    msg_user: {cnt:0},
                    new: {cnt: 0},
                    new_lastweek: {cnt: 0},
                    new_wxuser: {cnt: 0},
                    new_wxuser_lastweek: {cnt: 0},
                    paper:{cnt:0},
                    checkup: {cnt:0},
                    checkup_user: {cnt:0},
                    revisit: {cnt: 0},
                    revisit_user: {cnt:0},
                    'patient_cnt_male': 0,
                    'patient_cnt_female': 0,
                    'msg_cnt_patient': 0,
                    'newbaodao_patient_cnt_thisweek': 0,
                    'newbaodao_patient_cnt_lastweek': 0,
                    'newscan_patient_cnt_thisweek': 0,
                    'newscan_patient_cnt_lastweek': 0,
                    'patient_dosage_cnt': 0,
                    'msg_cnt_audit': 0,
                    'wxsheet_cnt_ADHD': 0,
                    'newrecord_dosage_cnt': 0,
                    'is_open_shop': 0,
                    'shop_gross_amount': 0,
                    'shop_order_cnt': 0,
                    other:{
                        'doctor_name': '',
                        'begin_date': '',
                        'end_date': '',
                        'disease_name': '',
                        'doctorid': '',
                    }
                },
                option: {},
            }
        },
        created: function() {
            document.title="周报";
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            var date = this.$route.query.date;
            var diseaseid = this.$route.query.diseaseid || '';
            var url = api.get('doctor.multidiseaseweekrpt')
            var params = {
                date: date,
                openid: this.openid,
                diseaseid: diseaseid,
            }
            common.ajax({url: url, params: params, done: function(response){
                if (response.errno == 0) {
                    self.multidiseaseweekrpt = response.data;
                    // sessionStorage.setItem('shoporderlist', JSON.stringify(self.multidiseaseweekrpt.shop_detail_list));
                    self.initOption();
                }
            }})
        },
        updated: function() {
            // console.log('deploy');
            var echartContainer = document.getElementById('patient_no');
            var chart = echarts.init(echartContainer);
            chart.setOption(this.option);
        },
        computed: {
            isShowDisease: function() {
                return this.multidiseaseweekrpt.other['doctorid'] == 32
            }
        },
        methods: {
            goDetail: function() {
                if (this.multidiseaseweekrpt.shop_order_cnt !=0) {
                    this.$router.push({name: 'shoporderlist'})
                }
            },
            initOption: function() {
                this.option = {
                    series: {
                        type: 'pie',
                        data: [
                            {
                                value: this.multidiseaseweekrpt.total['女'],
                                labelLine: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: false,
                                    }
                                }
                            },
                            {
                                value: this.multidiseaseweekrpt.total['男'],
                                labelLine: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: false,
                                    }
                                }
                            },
                        ],
                        radius: ['50%', '65%']
                    },
                    color: [
                        '#f177b7','#5678f8'
                    ]
                }
            }
        },
        filters: {
            computedIncrease: function(vallast, valthis) {
                var result = valthis - vallast;
                if (result > 0) {
                    return result;
                }else {
                    return 0;
                }
            },
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
    .normal-word-color {
        color:#777;
    }
    .keyword {
        /*color: #f3a600;*/
        color: #333
    }
    .multidiseaseweekrpt {
        text-align: left;
    }
    .content-item {
        background-color: #fff;
        border-radius: 2px;
        margin-bottom: 8px;
    }
    .boy-img {
        width: 25%;
        font-size: 0px;
        box-sizing:border-box;
        padding-left: 20px;
    }
    .total-patient {
        width: 50%;
        font-size: 0px;
        height: 150px;
    }
    .girl-img {
        font-size: 0px;
        width: 25%;
        box-sizing:border-box;
        padding-right: 20px;
    }
    .baodao-item-l {
        width: 49%;
        font-size: 14px;
        font-size: 1.4rem;
        margin-right: 1%;
        margin-bottom: 2%;
    }
    .baodao-item-r {
        width: 49%;
        font-size: 14px;
        font-size: 1.4rem;
        margin-left: 1%;
        margin-bottom: 2%;
    }
    .item-border {
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 4px;
        /*box-sizing: inherit;*/
    }
    .active-patient-item {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding:10px 0px 10px 0px;
        margin-bottom: 8px;
    }
    .baodao-item-l img {
        width:36px;
        height:36px;
        position: relative;
        left: -15px;
    }
    .baodao-item-r img {
        width:36px;
        height:36px;
        position: relative;
        left: -15px;
    }
    .active-patient-item img {
        width: 48px;
        height: 48px;
    }
    .buy-med {
        width: 98%;
        margin: 0 1% 0 1%;
    }
</style>
