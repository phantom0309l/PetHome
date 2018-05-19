<template>
    <div class="operationhistory fc-bg-gray">
        <div class="header">
            <a href="javascript:" :class="{'selected': active == 'all'}" @click="clickAll">全部</a>
            <a href="javascript:" :class="{'selected': active == 'pass'}" @click="clickConfirmEnter">已入院</a>
            <a href="javascript:" :class="{'selected': active == 'refuse'}" @click="clickRefuse">已拒绝</a>
        </div>
        <div class="body-container" style="">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="list-style-type: none; padding:0px;margin-top:41px;">
                <li v-for="bedtkt in bedtktlist">
                    <div class="patientinfo">
                        <div class="title">
                            <span v-if="bedtkt.status == '5'" class="pass">已入院</span>
                            <span v-if="bedtkt.status == '6'" class="refuse">已拒绝</span>
                        </div>
                        <div>
                            <span class="left">姓名:&nbsp;&nbsp;{{bedtkt.name}}</span>
                            <span>应住院日期:&nbsp;&nbsp;{{bedtkt.plan_date}}</span>
                        </div>
                        <div>
                            <span class="left">性别:&nbsp;&nbsp;{{bedtkt.sex}}</span>
                        <span>手机号:&nbsp;&nbsp;{{bedtkt.mobile}}</span>
                        </div>
                        <div>
                            <span class="left">年龄:&nbsp;&nbsp;{{bedtkt.age}}岁</span>
                            <span>近期居住地:&nbsp;&nbsp;{{bedtkt.address}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="bedtktlist.length == 0" style="position: none;margin-top: 200px;">
            <span style="margin-top:400px;width:80%; padding: 15px">暂无数据</span>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                active: 'all',
                bedtktlist: [],
                loadtimes: 0,
            }
        },
        methods: {
            clickAll: function() {
                if (this.active == 'all') {
                    return ;
                }
                this.active = 'all';
                this.fetchData();
            },
            clickConfirmEnter: function() {
                if (this.active == 'pass') {
                    return ;
                }
                this.active = 'pass';
                this.fetchData();
            },
            clickRefuse: function() {
                if (this.active == 'refuse') {
                    return ;
                }
                this.active = 'refuse';
                this.fetchData();
            },
            fetchData: function() {
                var self = this;
                var url = api.get('sickbed.historylist');
                var params = {
                    openid: this.openid,
                    filter: this.active,
                }
                self.bedtktlist = [];
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.bedtktlist = data.bedtktlist;
                    }
                })
            },
            loadMore: function(){
                this.loadtimes++;
                this.loadMoreData();
            },
            loadMoreData: function() {
                var self = this;
                var url = api.get('sickbed.historylist');
                var last_notify_time = this.bedtktlist.length != 0 ? this.bedtktlist[this.bedtktlist.length-1].notify_time : '';
                var params = {
                    openid: this.openid,
                    filter: this.active,
                    last_notify_time: last_notify_time,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        if (self.loadtimes == 1) {
                            self.bedtktlist = data.bedtktlist;
                        }else{
                            self.bedtktlist = self.bedtktlist.concat(data.bedtktlist);
                        }
                    }
                })
            }
        },
        created() {
            this.openid = localStorage.getItem('_openid_');
            this.fetchData();
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
<style scoped>
.body-container {
}

.header {
    font-size: 0px;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    -moz-box-shadow:2px 1px 3px #dddddd;
    -webkit-box-shadow:2px 1px 3px #dddddd;
     box-shadow:2px 1px 3px #dddddd;
}
.header a {
    text-decoration: none;
    background-color: #fff;
    width: 33.333%;
    display: inline-block;
    font-size: 16px;
    padding: 10px 0px;
    color: #4472c5;
}
.header a.selected {
    background-color: #4472c5;
    color: #fff;
}
.patientinfo {
    text-align: left;
    font-size: 0px;
    padding: 15px;
    margin-bottom: 10px;
    background: #fff;
}
.patientinfo span {
    font-size: 16px;
    padding: 3px 0px;
    display: inline-block;
}
.patientinfo span.left{
    width: 40%;
}
.patientinfo .title {
    margin-left: -15px;
    margin-bottom: 5px;
}
.patientinfo .title span {
    background-color: #4472c5;
    padding: 5px 10px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    width: auto;
    color: #fff;
    font-size: 14px;
}
.patientinfo .title span.refuse {
    background-color: #f06503;
}

</style>
