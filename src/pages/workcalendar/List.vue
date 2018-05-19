<template>
    <div>
        <fc-calendar
        :date="date"
        @changeMonth="handleChangeMonth"
        @descOfDate="handleDescOfDate"
        @clickDate="handleClickDate">
        </fc-calendar>
        <div class="push-10-t push-10-b" v-if="workcalendar_group != null">
            <div class="collapse text-left pull-10 pull-15-l pull-5-b fc-bg-primary">
                <!-- <i class="dot"></i> -->
                <i class="iconfont icon-chushengriqi fc-text-blue font-s18"></i><span class="push-5-r push-10-l font-s18 fc-text-blue">{{workcalendar_group.thedate}}</span><span class="font-s14">{{workcalendar_group.weekofday}}</span>
                <div class="collapse__ft"></div>
            </div>
            <div class="fc-bg-white push-10-b" v-for="workcalendar in workcalendar_group.workcalendars">
                <div class="fc-flex pull-15-l pull-10-t pull-10-b fc-text-blue" style="align-items: center;" @click="goPatientDetail(workcalendar.patient)">
                    <div class="fc-flex__item text-left">
                        <i class="iconfont icon-jibenxinxi font-s20 push-10-r"></i><span class="font-s18">{{workcalendar.patient.name}}</span><span class="push-10-l" style="color: rgb(102, 102, 102);">{{workcalendar.patient.attrstr}}</span>
                    </div>
                    <div class="text-center" style="align-self:center">
                        <i class="iconfont icon-combinedshapefuben fc-text-999 font-s14 push-10-r"></i>
                    </div>
                </div>
                <ul class="content-box fc-text-blue">
                    <li class="push-20-l push-5-b pull-5-b" v-for="config in workcalendar.content" v-if="config.checked == 1">
                        <div v-if="config.type == 'checkbox'">
                            <p class="fw-500 fc-text-blue push-5-b">
                                {{config.title}}
                            </p>
                            <p class="pull-5-t pull-10-b" v-for="option in config.options" v-if="option.checked == 1">
                                <template v-if="option.type == 'checkbox'">
                                    <span class="fc-text-666">{{option.title}}：</span>
                                    <template v-for="subOption in option.options" v-if="subOption.checked == 1">
                                        {{subOption.title}}
                                    </template>
                                </template>
                                <template v-else-if="option.type == 'radio'">
                                    <span class="fc-text-666">{{option.title}}：</span>
                                    {{option.options[option.selected]}}
                                </template>
                                <template v-else-if="option.type == 'textarea'">
                                    <span class="fc-text-666">{{option.title}}：</span>
                                    {{option.value}}
                                </template>
                                <template v-else-if="option.type == 'input'">
                                    <span class="fc-text-666">{{option.title}}：</span>
                                    {{option.value}}
                                </template>
                                <template v-else>
                                    {{option.title}}
                                </template>
                            </p>
                        </div>
                        <div v-else-if="config.type == 'radio'">
                            <p class="fw-500 fc-text-blue push-5-b">
                                {{config.title}}
                            </p>
                            <p class="pull-5-t pull-5-b">
                                {{config.options[config.selected]}}
                            </p>
                        </div>
                        <div v-else-if="config.type == 'textarea'">
                            <p class="fw-500 fc-text-blue push-5-b">
                                {{config.title}}
                            </p>
                            <p class="pull-5-t pull-5-b">
                                {{config.value}}
                            </p>
                        </div>
                        <div v-else-if="config.type == 'input'">
                            <p class="fw-500 fc-text-blue push-5-b">
                                {{config.title}}
                            </p>
                            <p class="pull-5-t pull-5-b">
                                {{config.value}}
                            </p>
                        </div>
                        <div v-else>
                            <p class="fw-500 fc-text-blue push-5-b">
                                {{config.title}}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .collapse {
        position: relative;
    }

    .collapse_open, .collapse_close {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        color: inherit;
    }

    .collapse .collapse__ft {
        padding-right: 13px;
        position: relative;
        text-align: right;
        color: #999;
    }

    .collapse_open .collapse__ft:after {
        content: " ";
        display: inline-block;
        height: 10px;
        width: 10px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -17px;
        right: 2px;
    }

    .collapse_close .collapse__ft:after {
        content: " ";
        display: inline-block;
        height: 10px;
        width: 10px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        -webkit-transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
        transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -14px;
        right: 2px;
    }

    .dot {
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background-color: #4472c5;
        display: inline-block;
        vertical-align: middle;
        margin-left: 3px;
    }

    .fw-500 {
        font-weight: 500;
    }

    .content-box {
        text-align: left;
        list-style-type: circle;
        padding: 10px 10px 5px 25px;
        /*background-color: #f7f7f7;*/
        border-top: 0.5px solid #ddd;
    }

    .content-box>li>* {
        color: #333;
    }

    .va-middle {
        vertical-align: middle;
    }

    /* 按钮域 begin */
    .btn-area {
        padding: 15px;
        display: flex;
        justify-content: space-around;
    }
    /* 按钮域 end */
</style>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                workcalendar_group: null,
                workcalendar_groups: [],
                collapses: [],

                date: null,
                theMonth: '',
                selectedDate: '',
            }
        },
        methods: {
            init: function() {
                document.title="工作日历"

                this.date = new Date();
                this.theMonth = this.date.getFullYear() + "-" + (this.date.getMonth() + 1);
            },
            handleChangeMonth: function(theMonth) {
                this.selectedDate = '';
                this.workcalendar_group = null;
                this.theMonth = theMonth;
                this.fetchData();
            },
            handleClickDate: function(theDate) {
                this.selectedDate = theDate;
                if (theDate in this.workcalendar_groups) {
                    this.workcalendar_group = this.workcalendar_groups[theDate];
                } else {
                    this.workcalendar_group = null;
                }
            },
            handleDescOfDate: function(theDate, callback) {
                var desc = null;
                if (theDate in this.workcalendar_groups) {
                    desc = this.workcalendar_groups[theDate].cnt + '人';
                }
                callback(desc);
            },
            fetchData: function() {
                var self = this;
                var url = api.get('doctorworkcalendar.list');
                var params = {
                    themonth: self.theMonth,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        self.workcalendar_groups = response.data.workcalendar_groups;
                        var i = 0;
                        for (var key in self.workcalendar_groups) {
                            var active = i < 3 ? true : false;
                            self.collapses[key] = active;
                            i++;
                        }
                    }
                })
            },
            handleCollapse: function(index) {
                this.$set(this.collapses, index, !this.collapses[index]);
            },
            getWeekOfDay: function(theDate) {
                var d = new Date(theDate.replace(/-/g,"/"));
                var arr = ['日', '一', '二', '三', '四', '五', '六'];
                return "星期" + arr[d.getDay()];
            },
            goPatientDetail: function(patient) {
                this.$router.push({name: 'patient-main', params:{'patientid': patient.patientid}})
            }
        },
        created: function() {
            this.init();
            this.fetchData();
        },
        components: {
            'fc-calendar': function(resolve) {
                require(['../../components/FCCalendar.vue'], resolve);
            },
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('body').setAttribute('class', 'fc-bg-primary');
            next();
        },
        beforeRouteLeave(to, from, next) {
            document.querySelector('body').setAttribute('class', '');
            next();
        },
    }
</script>
