<template>
    <div class="statistic">
        <div v-for="(rpt, outerIndex) in statistics.rpts" :key="outerIndex" style="width: 100%; height: 280px;background-color: #fff; margin-bottom: 10px;">
            <mt-swipe :auto="0" @change="handleChange($event, outerIndex)">
                <mt-swipe-item v-for="(rpt, index) in rpt.rpts" :key="index">
                    <pie :pieOption="rpt.pieOption" height="280px"></pie>
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/tooltip';
    import common from '../../lib/common.js';
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                is:{},
                statistics: {
                    // rpts: [
                    //     {
                    //         title: '患者服药率',
                    //         rpts:[
                    //             {
                    //                 title: '患者服药率',
                    //                 type: 'pie',
                    //                 x:['服药人数','不服药人数'],
                    //                 y1:['58', '19'],
                    //                 patientids: [
                    //                     ["17,20,23,49,67,68,82,107,110,112,118,124,129,133,149,150,169,195,264,265,289,100029895,100035293,100447209,100679391,100763757,100764083,100799115,101236755,101676671,101695657,101799157,101864147,101874443,102363579,103276587,103692353,104319271,104530729,104831597,106635593,107908649,108798913,108810293,109023941,109272599,120639715,134187976,104806717,161287126,104830971,165898046,172194096,173230266,173457876,194440536,214736316,214911556","60,66,106,168,183,241,350,100763925,100952977,101861537,101977217,104880265,111860815,120224315,100776553,137492246,161946086,226086126,231269646"]
                    //                 ]
                    //             },
                    //             {
                    //                 title: '患者服药率',
                    //                 type: 'pie',
                    //                 x:['服药人数','不服药人数'],
                    //                 y1:['58', '19'],
                    //                 patientids: [
                    //                     ["17,20,23,49,67,68,82,107,110,112,118,124,129,133,149,150,169,195,264,265,289,100029895,100035293,100447209,100679391,100763757,100764083,100799115,101236755,101676671,101695657,101799157,101864147,101874443,102363579,103276587,103692353,104319271,104530729,104831597,106635593,107908649,108798913,108810293,109023941,109272599,120639715,134187976,104806717,161287126,104830971,165898046,172194096,173230266,173457876,194440536,214736316,214911556","60,66,106,168,183,241,350,100763925,100952977,101861537,101977217,104880265,111860815,120224315,100776553,137492246,161946086,226086126,231269646"]
                    //                 ]
                    //             }
                    //         ]
                    //     },
                    //     {
                    //         title: '用药时长分布',
                    //         rpts: [
                    //             {
                    //                 title: '专注达用药时长分布',
                    //                 type:'pie',
                    //                 x:["1个月以下","1~3个月","3~14个月","14个月以上"],
                    //                 y1: ["2","6","8","21"],
                    //                 patientids: [
                    //                     ["17,20,23,49,67,68,82,107,110,112,118,124,129,133,149,150,169,195,264,265,289,100029895,100035293,100447209,100679391,100763757,100764083,100799115,101236755,101676671,101695657,101799157,101864147,101874443,102363579,103276587,103692353,104319271,104530729,104831597,106635593,107908649,108798913,108810293,109023941,109272599,120639715,134187976,104806717,161287126,104830971,165898046,172194096,173230266,173457876,194440536,214736316,214911556","60,66,106,168,183,241,350,100763925,100952977,101861537,101977217,104880265,111860815,120224315,100776553,137492246,161946086,226086126,231269646"]
                    //                 ]
                    //             }
                    //         ]
                    //     }
                    // ]
                }
            }
        },
        methods: {
            handleChange: function(e, index) {
                var chartContainer = document.getElementById(this.statistics.rpts[index].rpts[e].title + '' + e);
                var myChart = echarts.init(chartContainer);

                // var option = this.initChartOption(this.statistics.rpts[index].rpts[e]);
                var option = this.initOption(this.statistics.rpts[index].rpts[e])
                myChart.setOption(option);

            },
            initPage: function() {
                for (var i = 0; i < this.statistics.rpts.length; i++) {
                    var chartContainer = document.getElementById(this.statistics.rpts[i].rpts[0].title + '0');
                    var myChart = echarts.init(chartContainer);

                    var option = this.initChartOption(this.statistics.rpts[i].rpts[0]);
                    myChart.setOption(option);
                }
            },
            initChartOption: function(rpt) {
                var option = {};
                var data = [];
                var i = 0;
                data = rpt.y1.map(function(one){
                    var obj = {};
                    obj.name = rpt.x[i];
                    obj.value = one;
                    i++;
                    return obj;
                })
                if (rpt.type == 'pie') {
                    option = {
                        title: {
                            text: rpt.title,
                            x: 'center',
                        },
                        series: {
                            type: 'pie',
                            data:data,
                            name: '12345'
                        }
                    }
                }
                return option;
            },
            handleData: function(statistics) {
                console.log('1', statistics);
                for (var i = 0; i < statistics.rpts.length; i++) {
                    for (var j = 0; j < statistics.rpts[i].rpts.length; j++) {
                        var pieOption = {};
                        pieOption.show = false;
                        pieOption.divid = statistics.rpts[i].rpts[j].title + '' + j;
                        pieOption.containerHeight = window.innerWidth + 'px';
                        var rpt = statistics.rpts[i].rpts[j];

                        var option = this.initOption(rpt);
                        pieOption.option = option;
                        statistics.rpts[i].rpts[j].pieOption = pieOption;
                    }

                    statistics.rpts[i].rpts[0].pieOption.show = true;
                }
                this.statistics = statistics;
            },
            initOption: function(rpt) {
                var option = {};
                var data = [];
                var k = 0;
                data = rpt.y1.map(function(one){
                    var obj = {};
                    obj.name = rpt.x[k];
                    obj.value = one;
                    obj.patientids = rpt.patientids;
                    k++;
                    return obj;
                })
                // option.tooltip =  {
                //     trigger: 'item',
                //     formatter: "{a}<br/>{b} : {c} ({d}%)"
                // };
                console.log(data);
                if (rpt.type == 'pie') {

                    option = {
                        series: {
                            type: 'pie',
                            data:data,
                            name: rpt.title,
                            label: {
                                normal: {
                                    position: 'inside',
                                }
                            },
                            radius: ['50%', '65%']
                        },
                    }
                }
                if (rpt.type == 'mulbar') {
                    option = {

                        xAxis: {
                            data: rpt.x,
                        },
                        yAxis: {
                        },
                        series: {
                            type: 'bar',
                            data:data,
                            name: rpt.title,
                        },
                        color: [
                        "#0098d9",
                        "#f7ba2a",
                        "#13ce66",
                        "#d95850",
                        "#07a2a4",
                        "#a0a7e6"
                        ],
                    }
                }
                if (rpt.type == 'horizontalcolumn') {
                    // var data = [];
                    // data = rpt.x.map(function(one){
                    //     var obj = {};
                    //     obj.name =
                    // })
                    option = {
                        grid: {
                            show: true,
                            left: '20%',
                        },
                        xAxis: {
                            type: 'value',
                            // offset: 20,
                        },
                        yAxis: {
                            type: 'category',
                            data: rpt.x,
                        },
                        series: {
                            type: 'bar',
                            data: data,
                            name: rpt.title,
                        }
                    }
                }
                if (rpt.type == 'horizontalcolumn' || rpt.type == 'mulbar') {
                    option.tooltip =  {
                        trigger: 'axis',
                        // formatter: "{a}<br/>{b} : {c} ({d}%)"
                    };
                }else {
                    option.tooltip =  {
                        trigger: 'item',
                        formatter: "{b}<br/>{a} : {c} ({d}%)",
                        position: ['20%', '35%'],
                    };
                }
                option.title = {
                    text: rpt.title,
                    x: 'center',
                    padding: 20
                };
                option.color = ["#0098d9","#f7ba2a","#13ce66","#d95850","#07a2a4","#a0a7e6"];

                return option;
            }
        },
        created: function() {
            console.log('parent');
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var url = api.get('my.groupedchartstatistics');
            var params = {
                // doctorid: '33',
                openid: openid,
            };
            common.post(url, params, function(response) {
                var statistics = response.data;
                self.handleData(statistics);
            })
        },
        components: {
            'pie': function(resolve) {
                require(['../../components/Pie.vue'], resolve);
            },
            'test': function(resolve) {
                require(['../../components/test.vue'], resolve);
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
    }
</script>
<style>
    /*.is-active {
        background-color: red;
    }*/
    .mint-swipe-indicator.is-active{
        background-color: #01bcd4;
    }
</style>
