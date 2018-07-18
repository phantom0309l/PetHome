<template>
    <div class="my">
        <van-cell-group>
            <van-cell>
                <van-row class="pull-5">
                    <van-col span="6">
                        <img src="http://viptail.image.alimmdn.com/image/face/user/102351/20170926211531898019BBE.jpg@!face" width="90%"
                             style="border-radius: 100px; border: 2px solid #eee;"
                             @click="goInfo">
                    </van-col>
                    <van-col span="18" style="padding-top: 3px;">
                        <p style="font-size: 15px; font-weight: bolder;">球球作战指挥部</p>
                        <p style="font-size: 12px;">北京</p>
                        <p style="font-size: 12px;">一坨肉球走天下。</p>
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
        <van-row class="user-links push-15-b">
            <van-col span="12">
                <div @click="goMyFamily">
                    <van-icon name="pending-orders"/>
                    编辑家庭
                </div>
            </van-col>
            <van-col span="12">
                <div @click="goProductOne">
                    <van-icon name="pending-deliver"/>
                    我的家庭
                </div>
            </van-col>
        </van-row>

        <van-cell-group class="van-hairline--surround push-15-b">
            <div class="pull-15" style="text-align: left">
                <p class="push-5-b">我的宠物</p>
                <div class="pull-5">
                    <van-tag mark type="primary">蛋挞君</van-tag>
                    <van-tag mark type="success">肉肉君</van-tag>
                    <van-tag mark type="danger">球球酱</van-tag>
                </div>
            </div>
        </van-cell-group>


        <van-cell-group style="text-align: left;">
            <van-cell icon="exchange" title="我的订单" is-link @click="goOrderOne"/>
            <van-cell icon="exchange" title="我收到的订单" is-link @click="goReceiveOrder"/>
            <!--<van-cell icon="gold-coin" title="我的优惠券" is-link/>-->
            <!--<van-cell icon="gift" title="我收到的礼物" is-link/>-->
        </van-cell-group>
    </div>
</template>

<script>
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
            // 前往xx页面
            goInfo: function () {
                this.$router.push({name: 'info'});
            },
            send() {
                let now = util.getNowDate('YYYY-MM-DD hh:mm:ss');
                this.rightmsgs.push({time: now, content: this.content});
                this.content = '';
            },
            goProductOne: function () {
                this.$router.push({name: 'productone'});
            },
            goOrderOne: function () {
                this.$router.push({name: 'orderone'});
            },
            goReceiveOrder: function () {
                this.$router.push({name: 'receiveorder'});
            },
            goMyFamily: function () {
                this.$router.push({name: 'myfamily'});
            },
        },
        created: function () {
        },
        mounted: function () {
            document.title = "我的";
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('body').setAttribute('class', 'fc-bg-primary');
            next();
        },
        beforeRouteLeave(to, from, next) {
            document.querySelector('body').setAttribute('class', '');
            next();
        },
    };
</script>

<style scoped>
    .user-links {
        padding: 15px 0;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
    }

    .van-icon {
        display: inline-block;
        font-size: 14px;

    }
</style>
