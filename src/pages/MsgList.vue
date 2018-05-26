<template>
    <div class="msglist">
        <van-cell-group>
            <van-cell v-for="(msg, index) in msgs" :key="index" @click="goMsgOne">
                <van-row>
                    <van-col span="4">
                        <img :src="msg.head" width="90%"
                             style="border-radius: 100px; border: 1px solid #eee;">
                    </van-col>
                    <van-col span="20" style="padding-top: 3px;">
                        <p style="font-size: 15px; width: 46%; display: inline-block;">{{msg.title}}</p>
                        <p style="text-align: right; width: 50%; display: inline-block;" class="goods-express">{{msg.time}}</p>
                        <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{msg.content}}</p>
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    import api from '../config/api.js';
    import common from '../lib/common.js';
    import util from '../lib/utils.js'

    export default {
        data: function () {
            return {
                msgs: [
                    {
                        head: 'http://viptail.image.alimmdn.com/image/face/user/102351/20170926211531898019BBE.jpg@!face',
                        title: '球球0614',
                        time: '2018-05-16',
                        content: '球球非常的开心，谢谢小姐姐像对待亲儿子似的耐心、爱护、陪伴球球，每天都发视频给我，期待下一次的看护。'
                    },
                    {
                        head: 'http://viptail.image.alimmdn.com/files/official_web/img/km001-u.jpg',
                        title: '丢丢',
                        time: '2018-05-10',
                        content: '超级超级超级好！'
                    },
                    {
                        head: 'http://viptail.image.alimmdn.com/files/official_web/img/sh001-u.jpg',
                        title: '蛋挞君',
                        time: '2018-04-17',
                        content: '寄养了好多次，依旧很放心！'
                    },
                ]
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
            goMsgOne: function () {
                this.$router.push({name: 'msgone'});
            }
        },
        created: function () {
            this.fetchData();
        },
        mounted: function () {
            document.title = "消息";
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
</style>
