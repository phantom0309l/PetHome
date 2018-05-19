<template>
    <div>
        <!-- <div class="pd-15">
            <button class="fc-btn fc-btn_primary" @click="goAdd()">新增患者日历</button>
        </div> -->
        <fc-calendar
        :date="date"
        @changeMonth="handleChangeMonth"
        @descOfDate="handleDescOfDate"
        @clickDate="handleClickDate">
        </fc-calendar>
        <div class="push-10-t push-10-b fc-bg-white" v-if="workcalendar != null">
            <div class="collapse text-left border-b pd-15">
                <i class="dot"></i>
                <span class="va-middle push-20-r fw-500 fc-text-blue" style="margin-left: 7px;">{{workcalendar.thedate}}</span>
                <span class="va-middle">{{workcalendar.weekofday}}</span>
                <div class="collapse__ft"></div>
            </div>
            <ul class="content-box fc-text-blue pd-15 remove-padding-b">
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
            <div class="btn-area border-t">
                <button class="fc-btn fc-btn_primary" style="margin-right: 10px;" @click="goModify(workcalendar.workcalendarid)"><i class="iconfont icon-shanchu font-s16" style="margin-right: 5px;"></i>修改患者日历</button>
                <button class="fc-btn fc-btn_warning" @click="deleteWorkCalendar(workcalendar.workcalendarid, workcalendar.thedate)"><i class="iconfont icon-xiugai font-s16" style="margin-right: 5px;"></i>删除患者日历</button>
            </div>
        </div>
        <div class="push-10-t push-10-b fc-bg-white" v-else-if="workcalendar == null && selectedDate != ''">
            <div class="collapse text-left border-b pd-15">
                <i class="dot"></i>
                <span class="va-middle push-20-r fw-500 fc-text-blue" style="margin-left: 7px;">{{selectedDate}}</span>
                <span class="va-middle">{{getWeekOfDay(selectedDate)}}</span>
                <div class="collapse__ft"></div>
            </div>
            <div class="btn-area">
                <button class="fc-btn fc-btn_primary" style="margin-right: 10px;" @click="goAdd(selectedDate)"><i class="iconfont icon-jiahao1 font-s16" style="margin-right: 5px;"></i>新建患者日历</button>
            </div>
        </div>
        <!-- <div class="push-10-b border-t border-b" style="background-color: #fff;" v-for="(workcalendar, thedate) in workcalendars">
            <div :class="{'collapse_open': collapses[thedate], 'collapse_close': !collapses[thedate]}" class="collapse text-left border-b pd-15" @click="handleCollapse(thedate)">
                <i class="dot"></i>
                <span class="va-middle push-20-r fw-500 fc-text-blue" style="margin-left: 7px;">{{thedate}}</span>
                <span class="va-middle">{{workcalendar.weekofday}}</span>
                <div class="collapse__ft"></div>
            </div>
            <div v-show="collapses[thedate]">
                <ul class="content-box fc-text-blue pd-15 remove-padding-b">
                    <li class="push-20-l push-10-b" v-for="config in workcalendar.content" v-if="config.checked == 1">
                        <div v-if="config.type == 'checkbox'">
                            <p class="fw-500 fc-text-blue">
                                {{config.title}}
                            </p>
                            <table class="options-table">
                                <tbody>
                                    <tr class="" v-for="option in config.options" v-if="option.checked == 1">
                                        <td class="fc-text-blue pull-10-t">
                                            {{option.title}}：
                                        </td>
                                        <td class="pull-10-t" v-if="option.type == 'checkbox'">
                                            <template v-for="subOption in option.options" v-if="subOption.checked == 1">
                                                {{subOption.title}}
                                            </template>
                                        </td>
                                        <td class="pull-10-t" v-else-if="option.type == 'radio'">
                                            {{option.options[option.selected]}}
                                        </td>
                                        <td class="pull-10-t" v-else-if="option.type == 'textarea'">
                                            {{option.value}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else-if="config.type == 'radio'">
                            <p class="fw-500 fc-text-blue push-10-b">
                                {{config.title}}
                            </p>
                            <p>
                                {{config.options[config.selected]}}
                            </p>
                        </div>
                        <div v-else-if="config.type == 'textarea'">
                            <p class="fw-500 fc-text-blue push-10-b">
                                {{config.title}}
                            </p>
                            <p>
                                {{config.value}}
                            </p>
                        </div>
                        <div v-else>
                            <p class="fw-500 fc-text-blue push-10-b">
                                {{config.title}}
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="btn-area border-t">
                    <button class="fc-btn fc-btn_primary" style="margin-right: 10px;" @click="goModify(workcalendar.workcalendarid)"><i class="iconfont icon-shanchu font-s16" style="margin-right: 5px;"></i>修改患者日历</button>
                    <button class="fc-btn fc-btn_warning" @click="deleteWorkCalendar(workcalendar.workcalendarid, thedate)"><i class="iconfont icon-xiugai font-s16" style="margin-right: 5px;"></i>删除患者日历</button>
                </div>
            </div>
        </div> -->
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
                patientid: '',
                workcalendars: [],
                collapses: [],

                workcalendar: null,
                date: null,
                theMonth: '',
                selectedDate: '',
            }
        },
        methods: {
            init: function() {
                document.title="患者日历"
                this.patientid = this.$route.query.patientid || '';

                this.date = new Date();
                this.theMonth = this.date.getFullYear() + "-" + (this.date.getMonth() + 1);
            },
            handleChangeMonth: function(theMonth) {
                this.selectedDate = '';
                this.workcalendar = null;
                this.theMonth = theMonth;
                this.getList();
            },
            handleClickDate: function(theDate) {
                this.selectedDate = theDate;
                if (theDate in this.workcalendars) {
                    this.workcalendar = this.workcalendars[theDate];
                } else {
                    this.workcalendar = null;
                }
            },
            handleDescOfDate: function(theDate, callback) {
                var desc = null;
                if (theDate in this.workcalendars) {
                    desc = this.workcalendars[theDate].desc;
                }
                callback(desc);
            },
            fetchData: function() {
                this.getList();
            },
            getList: function() {
                var self = this;
                var url = api.get('doctorworkcalendar.listforpatient');
                var params = {
                    patientid: self.patientid,
                    themonth: self.theMonth,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        self.workcalendars = response.data.workcalendars;
                        var i = 0;
                        for (var key in self.workcalendars) {
                            var active = i < 3 ? true : false;
                            self.collapses[key] = active;
                            i++;
                        }
                    }
                })
            },
            deleteWorkCalendar: function(workcalendarid, key) {
                var self = this;
                this.$messagebox.confirm('确定删除吗?').then(action => {
                    var url = api.get('doctorworkcalendar.deletejson');
                    var params = {
                        workcalendarid: workcalendarid,
                    }
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            self.workcalendar = null;
                            self.$delete(self.workcalendars, key, undefined);
                            let instance = self.$toast('删除成功');
                            setTimeout(() => {
                                instance.close();
                            }, 2000);
                        } else {
                            self.$messagebox.alert(response.errmsg).then(action => {})
                        }
                    })
                }, cancel => {

                });
            },
            goModify: function(workcalendarid) {
                this.$router.push({name: 'workcalendar-edit', query: {'patientid': this.patientid, 'workcalendarid': workcalendarid}});
            },
            goAdd: function(theDate) {
                this.$router.push({name: 'workcalendar-edit', query: {'patientid': this.patientid, 'thedate': theDate}});
            },
            handleCollapse: function(index) {
                this.$set(this.collapses, index, !this.collapses[index]);
            },
            getWeekOfDay: function(theDate) {
                var d = new Date(theDate.replace(/-/g,"/"));
                var arr = ['日', '一', '二', '三', '四', '五', '六'];
                return "星期" + arr[d.getDay()];
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
        mounted: function() {

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
