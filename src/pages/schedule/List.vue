<template>
    <div class="appointment">
        <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="true" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" style="list-style-type: none; padding:1px 0">
            <li class="item-box">
                <div v-for="(month, index) in months" :key="index" style="text-align: left;">
                    <div class="pull-10 fc-bg-gray"><i class="iconfont icon-chushengriqi fc-text-blue font-s18"></i><span class="push-10-l fc-text-blue">{{month.themonth}}</span></div>
                    <div style="background-color:#fff">
                        <mt-cell
                        v-for="(schedule, index1) in month.schedules"
                        :key="index1"
                        @click.native="cellClickHandle(schedule)"
                        :title="schedule.theday"
                        :value="schedule.desc"
                        :is-link="isLink(schedule)"></mt-cell>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import utils from '../../lib/utils.js'
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    import moment from 'moment'
    export default {
        data: function() {
            return {
                showSchedule: false,
                openid: '',
                selected: '',
                days:[
                ],
                months:[
                ],

                next_month: null,

                noMore: false,
            }
        },
        created(){
            document.title = '复诊';
            this.openid = localStorage.getItem('_openid_');
            this.getSchedules();
        },
        methods: {
            loadMore: function() {
                var self = this;
                if (self.noMore == true) {
                  return
                }
                var url = api.get('schedule.list');
                var params = {
                    openid: this.openid,
                    frommonth: self.next_month,
                    tomonth: self.next_month,
                }
                common.post(url, params,function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        if (data.months.length == 0) {
                            self.noMore = true
                        } else {
                            self.months = self.months.concat(data.months);
                            self.next_month = data.next_month;
                            self.noMore = false
                        }
                    }
                })
            },
            getSchedules: function() {
                var self = this;
                var url = api.get('schedule.list');
                var params = {
                    openid: this.openid,
                    frommonth: '',
                    tomonth: '',
                }
                common.post(url, params,function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.months = data.months;
                        self.next_month = data.next_month;
                    }
                })
            },
            isLink: function(schedule) {
                return schedule.cnt > 0 ? true : false
            },
            cellClickHandle: function(schedule){
                var self = this;
                var islink = self.isLink(schedule)
                if (islink == false) {
                    return ;
                }
                var thedate = schedule.thedate
                this.$router.push({name: 'revisittkt-list', params:{'thedate': thedate}});
            },
            clickNavbar: function() {
                if (this.selected != 3) {
                    return ;
                }
            }
        },
    }
</script>
<style scoped>
.mint-search {
        height: 100%;
}
.mint-navbar {
    background: #fff;
}
.appointment {
}
.mint-tab-container {
    margin-top: 3px;
}
.item-div {
    margin: 20px 10px;
    background: #fff;
    padding: 5px 10px;
    line-height: 1.5;
}
    h4 {
        border-left: 3px solid #0099ff;
        text-align: left;
        padding-left: 10px;
        display: inline-block;
        margin: 10px 0px;
        font-weight: normal;
    }
    .container-header {
        margin: 5px 0px;
    }
    .container-header span {
        color: #666;
        float: right;
    }
    .scheduleStyle {
        float: left;
        display: inline-block;
        width: 25%;
        line-height: 1.5;
        padding: 10px 5px;
        margin-right: 10px;
        margin-bottom: 10px;
        background: #fff;
    }
    .scheduleStyle span {
        display: block;
        text-align: center;
    }
</style>
