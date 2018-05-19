<template>
    <div class="adhdweekrpt">
        <div class="content-item pd-8">
            <h4 class="push-10-b">
                当前患者(共{{total}}人)
            </h4>
            <div style="font-size:0px; ">
                <div class="i-b boy-img pd-8" style="font-size:14px; font-size:1.4rem; text-align:center; position: relative; top: -30px">
                    <img src="../../assets/boy.png" style="width:50px"/>
                    <span>{{adhdweekrpt.patient_cnt_male}}</span>
                    <span class="normal-word-color">人</span>
                </div>
                <div id="patient_no" class="i-b total-patient t-c">
                    <span style="font-size:16px"></span>
                </div>
                <div class="i-b girl-img t-r pd-8" style="font-size:14px; font-size:1.4rem; text-align:center;position: relative; top: -30px">
                    <img src="../../assets/girl.png" style="width:50px"/>
                    <span>{{adhdweekrpt.patient_cnt_female}}</span>
                    <span class="normal-word-color">人</span>
                </div>
            </div>
        </div>
        <div class="content-item pd-8 ">
            <h4 class="push-10-b">
                报到&扫码
            </h4>
            <div style="font-size:0px">
                <div class="baodao-item-l item-border i-b t-c">
                    <img src="../../assets/newBD.png" />
                    <div style=" display:inline-block; vertical-align:super; text-align:left">
                        <span class="normal-word-color">新增报到</span><br/>
                        <!-- <span>{{adhdweekrpt.newbaodao_patient_cnt_thisweek}}</span> -->
                        <span class="keyword">{{adhdweekrpt.newbaodao_patient_cnt_thisweek}}</span>
                        <span class="normal-word-color">人</span>
                    </div>
                </div>
                <div class="baodao-item-r item-border i-b t-c">
                    <img src="../../assets/BDIncrease.png"/>
                    <div style=" display:inline-block;vertical-align:super;text-align:left">
                        <span class="normal-word-color">较上周增长</span><br/>
                        <span class="keyword">{{adhdweekrpt.newbaodao_patient_cnt_lastweek | computedIncrease(adhdweekrpt.newbaodao_patient_cnt_thisweek)}}</span>
                        <span class="normal-word-color">人</span>
                    </div>
                </div>
            </div>
            <div style="font-size:0px">
                <div class="baodao-item-l item-border i-b t-c">
                    <img src="../../assets/newSC.png"/>
                    <div style=" display:inline-block; vertical-align:super;text-align:left">
                        <span class="normal-word-color">新增扫码</span><br/>
                        <span class="keyword">{{adhdweekrpt.newscan_patient_cnt_thisweek}}</span>
                        <span class="normal-word-color">人</span>
                    </div>
                </div>
                <div class="baodao-item-r item-border i-b t-c">
                    <img src="../../assets/SCIncrease.png"/>
                    <div style=" display:inline-block;vertical-align:super;text-align:left">
                        <span class="normal-word-color">较上周增长</span><br/>
                        <span class="keyword">{{adhdweekrpt.newscan_patient_cnt_lastweek | computedIncrease(adhdweekrpt.newscan_patient_cnt_thisweek)}}</span>
                        <span class="normal-word-color">人</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-item pd-8">
            <h4 class="push-10-b">
                患者活跃
            </h4>
            <div class="active-patient-item">
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
                            <!-- <td style="width: 25%"> -->
                                <!-- <div style="border-top:2px solid #45d0a8; width:100%; display: inline-block; position: relative; top:5px" class="i-b"></div>
                                <div class="i-b" style="border-radius:5px;background-color:#45d0a8; width: 10px; height: 10px; float:right; position: relative; top: -8px"></div> -->
                            <!-- </td> -->
                            <td style="padding: 0px 5px; text-align: right; width: 60%; padding-right: 15%">
                                <div style="position: relative; top: -5px; width:100%"><span class="normal-word-color">患者主动发出</span><span class="keyword">{{adhdweekrpt.msg_cnt_patient}}</span><span class="normal-word-color">条</span></div>
                                <div style="position: relative; top: 5px" ><span class="normal-word-color">医助处理</span><span class="keyword">{{adhdweekrpt.msg_cnt_audit}}</span><span class="normal-word-color">条</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="adhdweekrpt.wxsheet_cnt_ADHD != 0" class="active-patient-item">
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
                            <!-- <td style="width: 25%"> -->
                                <!-- <div style="border-top:2px solid #45d0a8; width:100%; display: inline-block; position: relative; top:5px" class="i-b"></div>
                                <div class="i-b" style="border-radius:5px;background-color:#45d0a8; width: 10px; height: 10px; float:right; position: relative; top: -8px"></div> -->
                            <!-- </td> -->
                            <td style="padding: 0px 5px; text-align: right; width:60%;padding-right: 15%">
                                <div class="i-b" style="position: relative; top: 5px"><span class="normal-word-color">评估量表</span><span class="keyword">{{adhdweekrpt.wxsheet_cnt_ADHD}}</span><span class="normal-word-color">份</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="content-item pd-8">
            <h4 class="push-10-b">
                患者服药
                <!-- %7b%7badhdweekrpt.patient_dosage_cnt%e2%80%a8%7d%7d
                %7b%7badhdweekrpt.patient_dosage_cnt%7d%7d -->
            </h4>
            <table style="font-size: 14px; font-size: 1.4rem; width: 100%">
                <tbody>
                    <tr>
                        <td>
                            <div style="" class="i-b pd-5">
                                <div class="pd-5">
                                    <img src="../../assets/CurDrugCnt.png" style="width: 24px; height: 24px; vertical-align: middle; margin-right:5px" />
                                    <span class="normal-word-color">当前服药患者</span>
                                    <span class="keyword">{{adhdweekrpt.patient_dosage_cnt}}</span>
                                    <span class="keyword"></span>
                                    <span class="normal-word-color">人</span>
                                </div>
                                <div class="pd-5">
                                    <img src="../../assets/DrugItem.png" style="width: 24px; height: 24px; vertical-align: middle;  margin-right:5px"/>
                                    <span class="normal-word-color">本周更新服药记录</span>
                                    <span class="keyword">{{adhdweekrpt.newrecord_dosage_cnt}}</span>
                                    <span class="normal-word-color">条</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <img src="../../assets/CurDrug.png" style="width:70px;"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="adhdweekrpt.is_open_shop != 0" class="content-item pd-5" style="padding-bottom: 20px">
            <h4 class="push-10-b">
                其他服务
            </h4>
            <div style="font-size:0px">
                <div class="buy-med item-border i-b t-c" style="font-size: 0px; font-size: 0rem" @click="goDetail">
                    <div style="width: 50%; text-align: left" class="i-b">
                        <div class="i-b" style="vertical-align: top">
                            <img src="../../assets/buyMed.png" style="width: 48px; height: 42px"/>
                        </div>
                        <div class="i-b" style="margin-left:20%">
                            <span class="normal-word-color" style="font-size:14px; font-size:1.4rem">参与人数</span><br/>
                            <span style="font-size:14px; font-size:1.4rem">{{adhdweekrpt.shop_order_cnt}}人</span>
                        </div>
                    </div>
                    <div style="width: 35%; font-size: 14px; font-size: 1.4rem; text-align:right; margin-left:15%" class="i-b">
                        <img src="../../assets/dedail.png" style="height: 26px"/>
                    </div>
                </div>
                <!-- <div class="buy-med item-border i-b t-c" style="font-size: 0px; font-size: 0rem; height: 69px; vertical-align: top" @click="goDetail">
                    <div style="width: 35%; font-size: 14px; font-size: 1.4rem; text-align:left; margin-left: 15%" class="i-b">
                        <span class="normal-word-color">订单数</span><br/>
                        <span class="keyword">{{adhdweekrpt.shop_order_cnt}}</span>
                        <span>条</span>
                    </div>
                    <div style="width: 50%; text-align: right;" class="i-b">

                    </div>
                </div> -->
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
                adhdweekrpt: {
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
                },
                option: {},
            }
        },
        created: function() {
            document.title="小儿多动症-周报";
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            var date = this.$route.query.date;
            var url = api.get('doctor.adhdweekrpt')
            var params = {
                date: date,
                openid: this.openid,
            }
            common.ajax({url: url, params: params, done: function(response){
                console.log(response);
                if (response.errno == 0) {
                    self.adhdweekrpt = response.data;
                    sessionStorage.setItem('shoporderlist', JSON.stringify(self.adhdweekrpt.shop_detail_list));
                    self.initOption();
                }
            }})
        },
        updated: function() {
            // console.log('deploy');
            var echartContainer = document.getElementById('patient_no');
            var chart = echarts.init(echartContainer);
            console.log(this.option);
            chart.setOption(this.option);
        },
        methods: {
            goDetail: function() {
                if (this.adhdweekrpt.shop_order_cnt !=0) {
                    this.$router.push({name: 'shoporderlist'})
                }
            },
            initOption: function() {
                this.option = {
                    series: {
                        type: 'pie',
                        data: [
                            {
                                value: this.adhdweekrpt.patient_cnt_female,
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
                                value: this.adhdweekrpt.patient_cnt_male,
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
        computed: {
            total: function() {
                console.log()
                var patient_cnt_male = this.adhdweekrpt.patient_cnt_male || 0;
                var patient_cnt_female = this.adhdweekrpt.patient_cnt_female || 0;
                return Number(patient_cnt_female) + Number(patient_cnt_male);
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
        color: #000000
    }
    .adhdweekrpt {
        text-align: left;
    }
    .content-item {
        background-color: #fff;
        border-radius: 2px;
        margin-bottom: 8px;
    }
    .boy-img {
        width: 20%;
        font-size: 0px;
        box-sizing:border-box;
        padding-left: 20px;
    }
    .total-patient {
        width: 60%;
        font-size: 0px;
        height: 150px;
    }
    .girl-img {
        font-size: 0px;
        width: 20%;
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
        /*width: 48px;*/
        height: 48px;
    }
    .buy-med {
        width: 98%;
        margin: 0 1% 0 1%;
    }
</style>
