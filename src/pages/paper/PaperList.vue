<template>
    <div class="paperlist">
        <div class="button-box" v-if="writers.length != 0">
            <mt-button class="button" :class="{'is-active': 'all'==localwriter}" size="small" @click='renderChart("all")'>全部</mt-button>
            <mt-button class="button" v-for="(writer, index) in writers" :key="index" size="small" :class="{'is-active': writer==localwriter}" @click="renderChart(writer)">{{writer}}</mt-button>
        </div>
        <div id="echart"></div>
        <mt-cell
        style="text-align:left"
        :title="paper.thedate"
        :value="getScore(paper)"
        :key="index"
        is-link
        @click.native="clickPaperItem(paper)"
        v-for="(paper, index) in papers">
        </mt-cell>
        <div class="noData" v-if="papers.length == 0">
            <span>暂无量表信息</span>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    export default {
        data: function() {
            return {
                openid: '',
                papertplid: '',
                ename: '',
                patientid: '',
                localwriter: '',
                writers: [],
                papers: [],
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.papertplid = this.$route.query.papertplid;
            this.ename = this.$route.query.ename;
            this.patientid = this.$route.query.patientid;
            var url = api.get('paper.list');
            var params = {
                openid: this.openid,
                patientid: this.patientid,
                papertplid: this.papertplid,
            }
            common.post(url, params, function(response) {
                self.papers = response.data.papers;
                document.title = response.data.title || '量表';
            })
        },
        mounted: function() {
            var self = this;
            self.renderChart(self.localwriter);
        },
        methods: {
            getScore: function(paper) {
                if (paper.score) {
                    return '评分：' + paper.score;
                } else {
                    return '';
                }
            },
            clickPaperItem: function(paper) {
                this.$router.push({name: 'paper-one', params: {'paperid': paper.id}})
            },
            renderChart : function(writer){
                var self = this;
                if('adhd_iv' == self.ename){
                    var myChart = self.getEchartNode();
                    self.renderAdhdChart(myChart, writer);
                }
                if('zlfywj' == self.ename){
                    var myChart = self.getEchartNode();
                    self.renderZlfywjWeightChart(myChart);
                }
            },
            getEchartNode: function(){
                var self = this;
                var echart = document.getElementById("echart");
                var width = window.innerWidth;
                // width = width * 0.8;
                echart.style.width = width + 'px';
                echart.style.height = '350px';
                // echart.style.padding = '0px 0px 0px 0px';
                return echarts.init(echart);
            },
            renderAdhdChart : function(myChart, writer){
                var self = this;
                var url = api.get('patient.get_adhd_dataJson');
                var params = {
                    openid: self.openid,
                    patientid: self.patientid,
                    writer: writer,
                }
                common.post(url, params, function(response) {
                    var localoption = self.getAdhdOption(response.data);
                    self.localwriter = response.writer;
                    self.writers = response.writers;
                    myChart.setOption(localoption);
                })
            },
            renderZlfywjWeightChart : function(myChart){
                var self = this;
                var url = api.get('patient.getZlfywjWeightChartJson');
                var params = {
                    openid: self.openid,
                    patientid: self.patientid,
                }
                common.post(url, params, function(response) {
                    var localoption = self.getZlfywjWeightOption(response.data);
                    myChart.setOption(localoption);
                })
            },
            getAdhdOption : function(data){
                var option = {
                    title: {
                        text: 'SNAP-IV评估量表',
                        // textAlign: 'center',
                        x:'center',
                        y: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    grid: {
                        width: "75%",
                        x: 40,
                        y: 100,
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
                        x:'center',
                        y: 40
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                rotate: 30
                            },
                            x:'center',
                            data: data.created_at,
                        }
                    ],
                    yAxis: data.yAxis,
                    series: [
                        {
                            name: data.legend[0],
                            type: data.item1_type,
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
                            // barWidth: 30,
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
                };
                return option;
            },
            getZlfywjWeightOption : function(data){
                var option = {
                    title: {
                        text: '治疗反应问卷-体重',
                        // textAlign: 'center',
                        x:'center',
                        y: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            rotate: 30
                        },
                        data: data.createday
                    },
                    yAxis: {
                        type: 'value',
                        name: '重量／kg'
                    },
                    series: [{
                        data: data.weight,
                        type: 'line'
                    }],
                };

                return option;
            },
        },
    }
</script>
<style scoped>
    .paper-item {
        text-align: left;
        padding: 10px;
        margin: 10px;
        background: #fff;
    }
    .noData {
        position: absolute;
        width: 100%;
        top: 40%;
    }
    .button-box{
        text-align: left;
        margin: 5px 0px 0px 5px;
    }
    .button{
        background-color: #faf8fa;
        color: #333;
        margin: 0px 3px;
    }
    .is-active{
        background-color: #26a2ff;
        color: white;
    }
</style>
