<template>
    <div class="msgone">
        <div class="msg left">
            <p class="time">2018-04-15 14:32:16</p>
            <div>
                <img class="header" :src="left.head">
                <p class="bubble">
                    你好。
                </p>
                <div class="clear"></div>
            </div>
        </div>
        <div class="msg right" v-for="rightmsg in rightmsgs">
            <p class="time">{{rightmsg.time}}</p>
            <div>
                <img class="header" src="http://viptail.image.alimmdn.com/image/face/user/102351/20170926211531898019BBE.jpg@!face">
                <p class="bubble">
                    {{rightmsg.content}}
                </p>
                <div class="clear"></div>
            </div>
        </div>
        <div class="bottom">
            <van-row>
                <van-col span="20">
                    <van-cell-group>
                        <van-field v-model="content" placeholder="请输入发送内容"/>
                    </van-cell-group>
                </van-col>
                <van-col span="4">
                    <van-button @click="send">
                        发送
                    </van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import api from '../config/api.js';
    import common from '../lib/common.js';
    import util from '../lib/utils.js'

    export default {
        data: function () {
            return {
                name: '球球0614',
                left: {
                    head: 'http://viptail.image.alimmdn.com/image/face/user/102351/20170926211531898019BBE.jpg@!face',
                },
                right: {
                    head: '',
                },
                rightmsgs: [
                    {
                        time: '2018-05-01 12:40:59',
                        content: '你好。',
                    },
                    {
                        time: '2018-05-01 12:40:59',
                        content: '在吗？',
                    },
                ],
                content: '',

            }
        },
        methods: {
            // 获取数据
            fetchData: function () {
                var self = this;
                var url = api.get('xxx');
                var params = {};
                common.post(url, params, function (response) {
                    if (response.errno == 0) {
                        var data = response.data;
                    }
                })
            },
            // 前往xx页面
            goXXX: function () {
                this.$router.push({name: 'xxx', params: {'xxx': 'xxx'}});
            },
            send() {
                let now = util.getNowDate('YYYY-MM-DD hh:mm:ss');
                this.rightmsgs.push({time: now, content: this.content});
                this.content = '';
            },
        },
        created: function () {
            this.fetchData();
        },
        mounted: function () {
            document.title = "与" + this.name + "的对话";
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

<style scoped>
    .bottom {
        position: absolute;
        width: 100%;
        bottom: 0px;
        background-color: #f9f9f9;
        padding: 5px 5px;
    }

    .msg {
        padding: 5px 15px;
        margin-bottom: 10px;
    }

    .header {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        border: 2px solid #ccc;
    }

    .time {
        color: #999;
        font-size: 12px;
        margin: 10px 0 5px;
    }

    .bubble {
        padding: 10px 15px;
        max-width: 65%;
        border-radius: 6px;
    }

    .left .header {
        float: left;
    }

    .left .bubble {
        background-color: #fff;
        float: left;
        margin: 2px 0 0 10px;
        text-align: left;
    }

    .right .header {
        float: right;
    }

    .right .bubble {
        background-color: #fabf40;
        color: #fff;
        float: right;
        margin: 2px 10px 0 0;
        text-align: left;
    }

    .van-hairline--top-bottom::after {
        border-width: 1px;
    }
</style>
