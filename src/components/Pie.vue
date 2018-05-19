<template>
    <div class="pie" :id="localOption.divid" :style="{height: height}" style="margin: auto">
    </div>
</template>
<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import staticData from '../lib/staticData.js';
    export default {
        data: function() {
            return {
                localOption: this.pieOption,
                param: {},
            }
        },
        props: ['pieOption', 'height'],
        mounted: function() {
            if (typeof this.localOption != 'undefined' && this.localOption.show == true) {
                this.initPie();
                // this.setDoubleClickEvent();
            }
        },
        methods: {
            initPie: function() {
                var pieContainer = document.getElementById(this.localOption.divid);
                var width = window.innerWidth;
                // width = width * 0.7;
                pieContainer.style.width = width + 'px';
                var myPie = echarts.init(pieContainer);
                myPie.on('click', this.setDoubleClickEvent);
                myPie.setOption(this.localOption.option);
            },
            eClick: function() {
                console.log(this.param, 'param in eClick');
                staticData.set('patientids', this.param.data.patientids[0][this.param.dataIndex]);
                this.$router.push({
                    name: 'patient-list4statistic'
                })
            },
            setDoubleClickEvent: function(param) {
                var self = this;
                self.param = param;
                if (param.dataIndex) {}
                var touchtime = 0;
                var lastSelectIndex = "";
                $('#' + this.localOption.divid).click(function() {
                    if (touchtime == 0) {
                        lastSelectIndex = self.param.dataIndex;
                        touchtime = new Date().getTime();
                    }else {
                        var nowTime = new Date().getTime();
                        if (nowTime - touchtime < 400) {
                            if (lastSelectIndex == self.param.dataIndex) {
                                lastSelectIndex = self.param.dataIndex;
                                self.eClick();
                            }else {
                                lastSelectIndex = self.param.dataIndex;
                                return ;
                            }
                        }else {
                            touchtime = new Date().getTime();
                            lastSelectIndex = self.param.dataIndex;
                        }
                    }
                })
            }
        },
    }
</script>
