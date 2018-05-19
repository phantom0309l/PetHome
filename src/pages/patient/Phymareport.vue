<template>
    <div class="book-sick-bed">
        <div class="navbar-div">
            <a href="javascript:" :class="['navbar', {'selected': active =='all'}]" @click="active = 'all'">总览</a>
            <a href="javascript:" :class="['navbar', {'selected': active =='blood'}]" @click="active = 'blood'">血常规</a>
            <a href="javascript:" :class="['navbar', {'selected': active =='badeffect'}]" @click="active = 'badeffect'">不良反应</a>
        </div>
        <div class="container">
            <div class="all-bg" v-show="active == 'all' && hasData">
                <template v-for="item in all">
                    <div v-if="item.type == 'chemo'" class="chemo">
                        <span class="date-style">{{item.thedate}}</span>
                        <div class="content">
                            <img style="vertical-align:top" src="../../assets/chmoforreport.png"/>
                            <span style="color:#4472c5; font-size:16px;font-size:1.6rem;">{{item.content}}</span>
                        </div>
                    </div>
                    <div v-if="item.type == 'wbc_checkup'" class="wbc_checkup">
                        <span class="date-style">{{item.thedate}}</span>
                        <div class="content">
                            <div class="circle"></div>
                            <img v-if="item.status == 1" style="vertical-align:top" src="../../assets/smile.png"/>
                            <img v-if="item.status == 2" style="vertical-align:top" src="../../assets/cry2.png"/>
                            <img v-if="item.status == 3" style="vertical-align:top" src="../../assets/cry.png"/>
                            <span class="content-title">{{item.title}}</span>
                            <span class="content-content">{{item.content}}</span>
                        </div>
                    </div>
                    <div v-if="item.type == 'untoward_effect'" class="untoward_effect">
                        <span class="date-style">{{item.thedate}}</span>
                        <div class="content">
                            <div class="circle"></div>
                            <img v-if="item.status == 1" style="vertical-align:top" src="../../assets/smile.png"/>
                            <img v-if="item.status == 2" style="vertical-align:top" src="../../assets/cry2.png"/>
                            <img v-if="item.status == 3" style="vertical-align:top" src="../../assets/cry.png"/>
                            <span class="content-title">{{item.title}}</span>
                            <span class="content-content">{{item.content}}</span>
                        </div>
                    </div>
                    <div v-if="item.type == 'evaluate'" class="wbc_checkup">
                        <span class="date-style">{{item.thedate}}</span>
                        <div class="content">
                            <div class="circle"></div>
                            <img v-if="item.status == 1" style="vertical-align:top" src="../../assets/smile.png"/>
                            <img v-if="item.status == 2" style="vertical-align:top" src="../../assets/cry2.png"/>
                            <img v-if="item.status == 3" style="vertical-align:top" src="../../assets/cry.png"/>
                            <span class="content-title">{{item.title}}</span>
                            <span class="content-content">{{item.content}}</span>
                        </div>
                    </div>
                    <div v-if="item.type == 'medicine_sheet_item'" class="wbc_checkup">
                        <span class="date-style">{{item.thedate}}</span>
                        <div class="content">
                            <div class="circle"></div>
                            <img style="vertical-align:top" src="../../assets/medicine.png"/>
                            <span class="content-content" style="display: inline-block; margin-left: 0;">{{item.content}}</span>
                        </div>
                    </div>
                </template>
            </div>
            <div v-show="active == 'blood' && hasData">
                <div  class="blood-item" v-for="(item, index) in blood">
                    <div style="padding: 5px 0px">{{item.title}}</div>
                    <div class="echartcontainer" style="overflow-x:auto; width:90%; margin:auto">
                        <div :id="'line'+ index" :style="{height: '280px', width: containerWidth[index] + 'px',}">

                        </div>
                    </div>
                </div>
            </div>
            <div v-show="active == 'badeffect' && hasData">
                <ul class="item-box">
                    <li v-for="item in badeffect" class="li-item">
                        <div class="li-date"><span style="font-size: 14px; font-size:1.4rem">{{item.thedate}}</span></div>
                        <div class="li-content"><span style="font-size: 14px; font-size:1.4rem">{{item.content}}</span></div>
                    </li>
                </ul>
            </div>
            <div v-if="!hasData">
                暂无数据
            </div>
        </div>

    </div>
</template>
<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/tooltip';
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                active: 'all',
                patientid: '',
                openid: '',

                all:[],
                blood: [],
                badeffect: [],

                options: [],

                windowWidth: '',
                containerWidth: [370, 370, 370],
            }
        },
        computed: {
            hasData: function(dataType) {
                let ret = false
                if (this.active == 'blood') {
                    ret = this.blood.length >= 3 && (this.blood[0].hasOwnProperty('value') && this.blood[0].value.length > 0 || this.blood[1].hasOwnProperty('value') && this.blood[1].value.length > 0 || this.blood[2].hasOwnProperty('value') && this.blood[2].value.length > 0)
                } else if (this.active == 'badeffect') {
                    ret = this.badeffect.length > 0
                } else if (this.active == 'all') {
                    ret = this.all.length > 0
                }

                return ret
            }
        },
        methods: {
            initOptions: function() {
                var options = [];
                var option = {};
                for (var i = 0; i < this.blood.length; i++) {
                    var xData = [];
                    var yData = [];
                    var k = 0;
                    var title = this.blood[i].title;
                    this.blood[i].value.map(function(one){
                        xData[k] = one.thedate;
                        yData[k] = one.content;
                        k++;
                    })
                    console.log(xData, 'xdata');
                    option = {
                        grid: {
                            left: 50,
                            right: 50,
                        },
                        tooltip: {
                            trigger: 'axis',
                        },
                        xAxis: {
                            // nameRotate: '15',
                            data: xData,
                            axisLabel: {
                                interval: 0,
                                rotate: 30,
                            }
                        },
                        yAxis: {
                            min: 'dataMin',
                            // minInterval: 1,

                        },
                        series: [
                            {
                                type: 'line',
                                data: yData,
                                symbol: 'circle',
                                connectNulls: true,
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{c}',
                                    }
                                }
                            }
                        ],
                        color: [
                        "#f7ba2a",
                        "#13ce66",
                        "#d95850",
                        "#07a2a4",
                        "#a0a7e6"
                        ],
                    }
                    options[i] = option;
                }
                return options;
            },
            initContainerWidth: function() {
                var self = this;
                for (var i = 0; i < self.blood.length; i++) {
                    if (self.blood[i].value.length < 8) {
                        self.containerWidth[i] = self.windowWidth * 0.9;
                    }else if (self.blood[i].value.length >=8 && self.blood[i].value.length <= 24) {
                        self.containerWidth[i] = self.blood[i].value.length * 50;
                    }else {
                        self.containerWidth[i] = 1200;
                    }
                }
            }
        },
        updated: function() {
            for (var i = 0; i < this.options.length; i++) {
                var container = document.getElementById('line'+ i);
                var chart = echarts.init(container);
                chart.setOption(this.options[i]);
            }
            // var self = this;
            // setTimeout(function(){
            //     var container = document.getElementById('line'+ 0);
            //     var chart = echarts.init(container);
            //     chart.setOption(self.options[0]);
            // }, 2000);

        },
        created: function() {
            this.$nextTick(function() {
                this.windowWidth = window.innerWidth;
                var self = this;
                this.patientid = this.$route.params.patientid;
                this.openid = localStorage.getItem('_openid_');
                var url = api.get('patient.cancerreport');
                var params = {
                    patientid:this.patientid,
                    openid:this.openid,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.all = data['总览'];
                        self.blood = data['血常规'];
                        self.badeffect = data['不良反应'];
                        self.initContainerWidth();
                        self.options = self.initOptions();
                    }
                })
            })
        },
        mounted: function() {
        },
    }
</script>
<style scoped>
    .item-box {
        list-style: none;
        padding: 0px;

    }
    .li-item {
        font-size: 0px;
        background-color: #fff;
        border-bottom: 0.5px solid #ccc;
        padding: 15px 10px;
    }
    li:last-child {
        border-bottom: 0;
    }
    .li-date {
        display: inline-block;
        width: 25%;
        /*font-size: 0px;*/
        text-align: left;
    }
    .li-content {
        display: inline-block;
        width: 75%;
        /*font-size: 0px;*/
        text-align: left;
    }
    .container {
        margin: 53px 8px 0px 8px;
    }
    .blood-item {
        margin-top: 10px;
        background-color: #fff;
        height:300px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        text-align: center;
    }
    .navbar-div {
        text-align:left;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        background-color:#fff;
        -moz-box-shadow:2px 1px 3px #dddddd;
        -webkit-box-shadow:2px 1px 3px #dddddd;
        box-shadow:2px 1px 3px #dddddd;
        font-size: 0px;
        z-index: 1000;
    }
    .header-a {
        text-decoration: none;
        color: #353535;
        margin: 10px;
        padding-left: 20px;
        border-left: 1px solid #ddd;
    }
    .navbar {
        width:33.33%;
        display: inline-block;
        background-color: #fff;
        padding: 10px 0px;
        text-decoration: none;
        color: #4472c5;
        text-align: center;
        font-size: 16px;
        font-size:1.6rem;
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
    .doperation{
        margin: 0px -5px;
    }
    .doperation a {
        display: inline-block;
        font-size: 16px;
        font-size: 1.6rem;
        padding: 5px 0px;
        text-align: center;
        color: #fff;
        width:33.3333%;
        text-decoration:none;
    }
    .all-bg {
        font-size: 0px;
        font-size: 0rem;
        background-color: #ffffff;
        padding: 10px 5px;
        text-align: left;
    }
    .date-style {
        display: inline-block;
        width: 25%;
        font-size: 14px;
        font-size: 1.4rem;
        vertical-align: top;
        padding: 10px 5px;
    }
    .content {
        font-size: 14px;
        font-size: 1.4rem;
        width: 68%;
        display: inline-block;
        border-left: 1px dashed #ccc;
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .chemo img {
        width: 20px;
        height: 20px;
        position: relative;
        left: -20px;
    }
    .chemo .date-style {
        color: #4472c5;

    }
    .wbc_checkup .date-style {
        color: #888;
        font-size: 12px;
        font-size: 1.2rem;
        text-align: right;
        position: relative;
        right:8px;
    }
    .untoward_effect .date-style {
        color: #888;
        font-size: 12px;
        font-size: 1.2rem;
        text-align: right;
        position: relative;
        right:8px;
    }
    .untoward_effect img {
        width: 20px;
        height: 20px;
    }
    .wbc_checkup img {
        width: 20px;
        height: 20px;
    }
    .circle {
        display: inline-block;
        border: 1px solid #ccc;
        height: 4px;
        width: 4px;
        border-radius: 4px;
        position: relative;
        left: -13px;
        top: -3px;
        background-color: #fff;
    }
    .content-content {
        color: #666;
        display:block;
        margin-left: 34px;
    }
    .content-title {
        font-size: 15px;
        font-size:1.5rem;
    }

</style>
