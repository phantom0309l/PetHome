<template>
    <div class="templateBox">
        <header class="mint-header" style="display:flex">
            <div class="mint-header-button is-left"></div>
            <div class="mint-header-title">评估量表</div>
            <div class="mint-header-button is-right"></div>
        </header>

        <div class="page-cell am-text-secondary am-text-sm">
            <div class="mint-cell" v-on:click="clickChat(patientinfo.patientid)">
                <div class="mint-cell-wrapper" style="font-size:14px;">
                <span>{{patientinfo.name}}</span>
                <span class="am-margin-left-xl">{{patientinfo.sex_str}}</span>
                <span class="am-margin-left-xl">{{patientinfo.age_str}}岁</span>
                <i class="mint-cell-allow-right am-text-lg"></i>
                </div>
            </div>
        </div>

        <div class="am-padding-sm am-text-sm">
            <div id="adhd" style="width: 100%; height: 300px;background-color: #fff; margin-bottom: 10px;"></div>
            <audit :doctorserviceorderid="doctorserviceorderid" :content="content" :isaudit="isaudit"></audit>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/legend';
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function() {
            return {
                doctorserviceorderid : 0,
                content : "",
                isaudit : 0,
                patientinfo : []
            }
        },
        methods: {
            clickChat: function(patientid) {
                this.$router.push({name: 'patient-pipelist', params: {'patientid': patientid}});
            },
            renderChart : function(data){
                var myChart = echarts.init(document.getElementById('adhd'));
                var options = this.getOptions(data);
                myChart.setOption(options);
            },
            getOptions : function(data){
                var option = {
                    color: ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
        '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
        '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
        '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],
                    title: {
                        text: '',
                        textAlign: 'center',
                        x:'center',
                        y:'top',
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    grid: {
                        width: "87%",
                        x: 20,
                        y: 40,
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: false},
                            dataView: {show: false, readOnly: false},
                            magicType: {show: false, type: ['line', 'bar']},
                            restore: {show: false}
                        }
                    },
                    calculable: false,
                    legend: {
                        data: data.legend,
                        x : 'center',
                        y : 0,
                        padding : 0,
                        itemGap : 5,
                        itemHeight : 10
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                rotate: 30
                            },
                            data: data.created_at,
                        }
                    ],
                    yAxis: data.yAxis,
                    series: [
                        {
                            name: data.legend[0],
                            type: data.item1_type,
                            barWidth: 24,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "#337ab7"
                                        }
                                    }
                                }
                            },
                            data: data.item1
                        },
                        {
                            name: data.legend[1],
                            type: data.item2_type,
                            barWidth: 24,
                            barCategoryGap: '40%',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            data: data.item2
                        },
                        {
                            name: '总分',
                            type: data.scores_type,
                            barCategoryGap: '40%',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            yAxisIndex: data.scores_yAxisIndex,
                            data: data.scores
                        }
                    ]
                };

                if (data.item3_type) {
                    option.legend.data = data.legend;
                    var obj = {
                        name: data.legend[2],
                        type: data.item3_type,
                        barWidth: 30,
                        barCategoryGap: '40%',
                        itemStyle: {
                            normal: {
                                color: "#f90",
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: data.item3
                    };
                    option.series.splice(2, 0, obj);
                }
                return option;
            }
        },
        created: function() {
        },
        mounted: function() {
            document.title = "评估量表";
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var doctorserviceorderid = this.$route.query.doctorserviceorderid;
            var url = api.get('doctortask.scale');
            var params = {
                openid: openid,
                doctorserviceorderid: doctorserviceorderid,
            };
            common.post(url, params, function(response) {
                var data = response.data;
                var adhddata = data.adhd;
                self.renderChart(adhddata);
                self.doctorserviceorderid = data.first_doctorserviceorderid;
                self.content = data.audit_content;
                self.isaudit = data.is_audit;
                self.patientinfo = data.patient_info;
            })
        },
        components: {
            'audit': function(resolve) {
                require(['./components/Audit.vue'], resolve);
            }
        },
    }
</script>

<style src="../../../static/css/amazeui-2.7.2.min.css" scoped>
</style>
<style src="../../../static/css/pages/doctortask.css" scoped>
</style>
