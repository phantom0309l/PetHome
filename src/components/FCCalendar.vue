<template lang="html">
    <div class="calendar cal">
        <div class="days border-b">
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
            <span>日</span>
        </div>
        <div class="date-wrap">
            <div class="month-box" v-for="datesData in dates">
                <div class="theMonth">
                    {{datesData.month}} 月
                </div>
                <template v-for="(week, weekIndex) in datesData.datesArr">
                    <div class="oneweek">
                        <template v-for="(day, dateIndex) in week">
                            <div v-if="(weekIndex * 7 + dateIndex) < datesData.preMonthDates"
                                 class="date pre">
                                <span>{{day}}</span>
                                <!-- <span class="desc">{{getDescOfDay(day)}}</span> -->
                            </div>
                            <div v-else-if="(weekIndex * 7 + dateIndex) >= (datesData.datesArr.length * 7 - datesData.nextMonthDates)"
                                 class="date next">
                                <span>{{day}}</span>
                                <!-- <span class="desc">{{getDescOfDay(day)}}</span> -->
                            </div>
                            <div v-else
                                 class="date"
                                 :class="{selected: isSelected(datesData.year, datesData.month, day), onlyOne: isOnlyOne(datesData.year, datesData.month, day), inRange: isInRange(datesData.year, datesData.month, day)}"
                                 @click="handleClickDate(datesData.year, datesData.month, day)">
                                <span v-if="isToday(datesData.year, datesData.month, day)" class="fc-text-blue today">今天</span>
                                <span v-else>{{day}}</span>
                                <span class="desc">{{getDescOfDay(datesData.year, datesData.month, day)}}</span>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../config/api.js'
    import common from '../lib/common.js'

    export default {
        data: function () {
            return {
                dates: [],
                // datesData: null,
                $year: null,
                $month: null,
                selectedDates: [],
                // datas: {},
            }
        },
        props: ['date', 'datas'],
        methods: {
            isToday: function (year, month, day) {
                var str = year + '/' + month + '/' + day;
                var d = new Date(str);
                var todaysDate = new Date();
                if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
                    return true;
                } else {
                    return false;
                }
            },
            getFullDate: function (year, month, day) {
                var fullDate = year + '-';
                if (month < 10) {
                    fullDate += '0';
                }
                fullDate += month + '-';
                if (day < 10) {
                    fullDate += '0';
                }
                fullDate += day;

                return fullDate;
            },
            isSelected: function (year, month, day) {
                var theDate = this.getFullDate(year, month, day);

                if ($.inArray(theDate, this.selectedDates) >= 0) {
                    return true;
                } else {
                    return false;
                }
            },
            isOnlyOne: function (year, month, day) {
                var theDate = this.getFullDate(year, month, day);
                if (this.selectedDates.length === 2) {
                    if (theDate === this.selectedDates[0] && theDate == this.selectedDates[1]) {
                        return true;
                    }
                }
                return false;
            },
            isInRange: function (year, month, day) {
                if (this.selectedDates.length === 2) {
                    let theDate = this.getFullDate(year, month, day),
                        start = this.selectedDates[0],
                        end = this.selectedDates[1];
                    if (start < theDate && theDate < end) {
                        return true;
                    }
                }
                return false;
            },
            getRangeDates: function (startDate, endDate) {
                var self = this;
                var rangeDates = [], i = 0;

                function getDate(datestr) {
                    var temp = datestr.split("-");
                    var date = new Date(temp[0], temp[1] - 1, temp[2]);
                    console.log(date);
                    return date;
                }

                var startTime = getDate(startDate);
                var endTime = getDate(endDate);
                while ((endTime.getTime() - startTime.getTime()) >= 0) {
                    var year = startTime.getFullYear();
                    var month = startTime.getMonth() + 1;
                    var day = startTime.getDate();
                    rangeDates[i] = self.getFullDate(year, month, day);
                    startTime.setDate(startTime.getDate() + 1);
                    i += 1;
                }

                return rangeDates;
            },
            handleClickDate: function (year, month, day) {
                let self = this;
                let theDate = this.getFullDate(year, month, day);
                if (this.datas[theDate] === undefined || this.datas[theDate] === null) {
                    this.$toast({duration: 1300, message: '该日期不可预订'});
                    return false;
                }
                if (this.selectedDates.length === 0) {
                    this.selectedDates.push(theDate);
                } else if (this.selectedDates.length === 1) {
                    if (theDate < this.selectedDates[0]) {
                        this.selectedDates = [];
                        this.selectedDates.push(theDate);
                    } else {
                        var rangeDates = this.getRangeDates(this.selectedDates[0], theDate);
                        var flag = true;
                        $.each(rangeDates, function (index, date) {
                            if (self.datas[date] === undefined || self.datas[date] === null) {
                                flag = false;
                                return false;
                            }
                        });
                        if (flag) {
                            this.selectedDates.push(theDate);
                        } else {
                            this.$toast({duration: 1300, message: '选择的日期范围内有不可预订日期'});
                        }
                    }
                } else if (this.selectedDates.length === 2) {
                    this.selectedDates = [];
                    this.selectedDates.push(theDate);
                }
                this.$emit('clickDate', this.selectedDates);
            },
            getDescOfDay: function (year, month, day) {
                var theDate = this.getFullDate(year, month, day);
                var desc = this.datas[theDate] ? "￥" + this.datas[theDate] : '';
                // this.$emit('descOfDate', theDate, function (_desc) {
                //     desc = _desc;
                // });
                return desc;
            },

            //获取某月的最后一天
            getLastDate: function (year, month) {
                return new Date(year, month, 0).getDate();
            },

            //取得当月日历表详细数据({arr: [], preMonthDates: number, nextMonthDates: number})
            getDatesData: function (year, month) {
                var datesArr = [],
                    j = 1,
                    k = 1,
                    lastDate = this.getLastDate(year, month), //获取当月的最后一天是几号（也就是当月天数）
                    preMonthDates = new Date(year, month - 1, 1).getDay(), //要显示上一个月的天数
                    preMonthDates = preMonthDates == 0 ? 6 : preMonthDates - 1,
                    all = lastDate + preMonthDates, //日历表显示的总天数
                    nextMonthDates = (((Math.ceil(all / 7) + 1) * 7) - all) % 7; //要显示下一个月的天数

                //日历上个月天数数组
                var preMonthDatesArr = this.getPreMonthDates(year, month, preMonthDates);

                //根据当月第一天星期几和最后一天来拼装当月天数数组
                var week = [];
                week = preMonthDatesArr.concat(week);
                for (var i = 0; i < lastDate + nextMonthDates; i++) {
                    // if (i < lastDate) {
                    //     datesArr[i] = j++;
                    // } else {
                    //     datesArr[i] = k++;
                    // }
                    if (i < lastDate) {
                        week.push(j++);
                    } else {
                        week.push(k++);
                    }
                    if (week.length == 7) {
                        datesArr.push(week);
                        week = [];
                    }
                }

                var datesData = {
                    datesArr: datesArr, //整个日历表天数
                    lastDate: lastDate, //最后一天
                    preMonthDates: preMonthDates, //日历表要显示的上个月天数
                    nextMonthDates: nextMonthDates, //日历表要显示的下个月天数
                    year: year,
                    month: month
                };

                return datesData;
            },

            //获取日历表中要显示的上一个月数据
            getPreMonthDates: function (year, month, preMonthDates) {
                var datesArr = [],
                    lastDate;

                if (!preMonthDates || preMonthDates === 0) {
                    return datesArr;
                }

                //上一个月的最后一天
                lastDate = new Date(year, month - 1, 0).getDate();
                //生成日历表中显示的上个月的日历天数
                while (preMonthDates) {
                    datesArr.unshift(lastDate--);
                    preMonthDates--;
                }

                return datesArr;
            },
        },
        created: function () {
            var theDate = this.date || new Date();
            this.$year = theDate.getFullYear();
            this.$month = theDate.getMonth() + 1;
            let i = 0,
                m = this.$month,
                y = this.$year;
            for (i; i < 13; i++) {
                if (m > 12) {
                    m = 1;
                    y++;
                }
                this.dates.push(this.getDatesData(y, m));
                m++;
            }

            // this.datesData = this.getDatesData(this.$year, this.$month);
        },
    }
</script>

<style scoped>
    .calendar {
        text-align: center;
        background: #fff;
        /*padding-bottom: 1rem;*/
        overflow: hidden;
        -webkit-transition: all 200ms;
        transition: all 200ms;
    }

    /*------- 日历头部模块 ------*/
    .calendar .cal-header {
        padding: 0 3%;
        border-bottom: 1px solid #eee;
        height: 5rem;
        line-height: 5rem;
        background: #4472c5;
        position: relative;
        z-index: 2;
    }

    .calendar .select-dep-wrap {
        display: inline-block;
        width: 14%;
        height: 5.5rem;
        position: absolute;
        margin-right: 1.2%;
        right: 0;
    }

    .calendar .select-deparment {
        display: inline-block;
        width: 2.6rem;
        height: 2.6rem;
        background: #1a85ff;
        border-radius: 100%;
        vertical-align: middle;
    }

    .calendar .date-wrap {
        position: relative;
        height: 80vh;
        overflow: scroll;
        /*top: 0px;*/
        /*transition: none;*/
        -webkit-transition: all 200ms;
        transition: all 200ms;
        background-color: #e9ecf1;
    }

    .calendar .cal-header .title-wrap {
        margin: 0 5%;
        font-size: 1.2em;
        color: #fff;
    }

    .calendar .cal-header .pre-mon, .calendar .cal-header .next-mon {
        display: inline-block;
        width: 4rem;
        height: 3rem;
        vertical-align: -.8rem;
        position: relative;
    }

    .calendar .cal-header .pre-mon:before, .calendar .cal-header .next-mon:before {
        content: '';
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        position: absolute;
    }

    .calendar .cal-header .pre-mon:before {
        right: 1rem;
        top: .9rem;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .calendar .cal-header .next-mon:before {
        top: .9rem;
        left: .6rem;
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
    }

    /*------- 头部星期部分 ------*/
    .calendar .days {
        width: 100%;
        padding: 10px 0;
        background: #fff;
        /*position: fixed;*/
        z-index: 2;
        /*top: 0;*/
        font-size: 0;
    }

    .calendar .days span {
        display: inline-block;
        width: 14%;
        font-size: 14px;
    }

    /*------- 日历表模块 ------*/
    .calendar .oneweek {
        font-size: 0px;
        background-color: #fff;
    }

    .calendar .oneweek > .date {
        display: inline-block;
        width: 14%;
        position: relative;
        font-size: 0px;
        padding: 5px 0;
        margin: 6px 0;
        vertical-align: middle;
    }

    .calendar .oneweek .pre, .calendar .oneweek .next {
        /*color: #d9dbdd !important;*/
        visibility: hidden;
    }

    .calendar .date span {
        display: inline-block;
        width: 95%;
        -webkit-transition: all 200ms;
        transition: all 200ms;
        font-size: 16px;
        text-align: center;
        /*padding: 5px 0 0;*/
    }

    .calendar .date .desc {
        font-size: 12px;
        font-weight: bolder;
        color: #4472c5;
        /*padding: 0 0 5px 0;*/
    }

    .calendar .date .today {
        /*font-weight: bolder;*/
        /*font-size: 14px;*/
        color: #4472c5;
    }

    .calendar .date.selected {
        background-color: #4472c5;
        color: #fff;
        border-radius: 5px 0 0 5px;
    }

    .calendar .date.selected.onlyOne {
        border-radius: 5px;
    }

    .calendar .date.inRange {
        background-color: rgba(68, 144, 197, 0.1);
        color: #999;
        border-radius: 0;
    }

    .calendar .date.inRange + .selected {
        border-radius: 0 5px 5px 0;
    }

    .calendar .date.selected + .selected {
        border-radius: 0 5px 5px 0;
    }

    .calendar .date.selected .desc, .calendar .date.selected .today {
        color: #fff;
    }

    .calendar .date.curr-date > span {
        color: #fff;
        background: #1a85ff;
    }

    .calendar .date.small-font {
        font-size: 1.3rem;
    }

    .calendar .tag:after {
        content: '';
        display: inline-block;
        width: 0.8rem;
        height: .8rem;
        border-radius: 100%;
        background: #b0ceee;
        position: absolute;
        left: 50%;
        margin-left: -.4rem;
        bottom: 0;
    }

    .calendar .my-tag:after {
        content: '';
        display: inline-block;
        width: 0.8rem;
        height: .8rem;
        border-radius: 100%;
        background: #eeb0b0;
        position: absolute;
        left: 50%;
        margin-left: -.4rem;
        bottom: .1rem;
    }

    .calendar .theMonth {
        text-align: left;
        font-size: 20px;
        padding: 10px 25px;
    }

    .calendar .month-box {
        /*margin: 10px 0;*/
    }
</style>
