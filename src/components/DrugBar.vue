<template>
    <div class="drugbar">
        <div class="box-t mt15">{{localoption.name}}({{localoption.unit}})</div>
        <div class="box-c">
            <div :id="'echart'+localindex" class="echart"></div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    export default {
        data: function() {
            return {
                localoption: this.option,
                localindex: this.index,
            }
        },
        props: ['option', 'index'],
        mounted: function() {
            var self = this;
            // console.log(this.index);
            self.renderChart();
        },
        methods: {
            renderChart : function(){
                var self = this;
                var echart = document.getElementById("echart" + self.localindex);
                var width = window.innerWidth;
                // width = width * 0.8;
                echart.style.width = width + 'px';
                echart.style.height = '200px';
                echart.style.padding = '0px 20px 0px 0px';
                var myChart = echarts.init(echart);

                var localoption = self.localoption;
                var name = localoption.name;
                var unit = localoption.unit;
                var val = localoption.value;
                if(!val){
                    return;
                }
                // console.log(name);
                // console.log(unit);
                // console.log(localoption.value);
                // console.log(localoption.date);
                var ydata = localoption.value;
                var xdata = localoption.date;
                var localoption = self.getOption(name, ydata, unit, xdata);
                myChart.setOption(localoption);
            },
            getOption : function(name, ydata, unit, xdata){
                var option = {
                    title: {
                        //text: name + "(" + unit + ")"
                        text: ""
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        formatter: '{c}'
                    },
                    legend: {
                        data:[name]
                    },
                    grid: {
                        left: 0,
                        right: 0,
                        top: 30,
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            formatter: function (value, index) {
                                var arr = value.split("-");
                                return arr[1] + "." + arr[2];
                            }
                        },
                        data: xdata
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            onZero: false
                        },
                        min: 0,
                        scale: true
                    },
                    series: [
                        {
                            type:'line',
                            step: 'end',
                            data: ydata
                        }
                    ]
                };
                return option;
            }
        },
    }
</script>
<style scoped>
.box-t{
    color: #0e90d2;
    text-align: left;
    font-size: 15px;
    border-left: 3px solid #0e90d2;
    padding: 4px 0px 4px 12px;
    line-height: 120%;
}
.drugbar{display: block; margin-top: 15px;}
.echart{padding: 0px 10px; width: 100%;}
</style>
