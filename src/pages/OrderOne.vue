<template>
    <div class="orderone">
        <van-cell-group>
            <van-cell>
                <van-col span="12">
                    <div class="goods-title">{{ goods.title }}</div>
                </van-col>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="24">寄养日期：{{ startDate}} 至 {{ endDate }}</van-col>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="24">寄养类型：{{ type }}</van-col>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="24">总计：￥{{ amount / 100 }}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express">
                <van-col span="24">家庭地址：北京市朝阳区</van-col>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="24">联系电话：{{ mobile }}</van-col>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="24">备注：{{ remark }}</van-col>
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
                startDate: '2018-07-17',
                endDate: '2018-07-22',
                type: '🐱 猫咪',
                amount: 0,
                mobile: '13098728392',
                remark: '爱吃罐头爱吃鱼',
                message: '',
                commentShow: false,
                goods: {
                    rate: 4,
                    title: '比熊元宝的家',
                    price: 2680,
                    express: '免运费',
                    remain: 19,
                    thumb: [
                        'http://viptail.image.alimmdn.com/files/official_web/img/gz001-f.jpg',
                        'http://viptail.image.alimmdn.com/files/official_web/img/sh001-f.jpg'
                    ],
                    thumb2: [
                        'http://viptail.image.alimmdn.com/files/official_web/img/gz002-f.jpg',
                        'http://viptail.image.alimmdn.com/files/official_web/img/bj002-f.jpg'
                    ],
                },
                comments: [
                    {
                        head: 'http://viptail.image.alimmdn.com/image/face/user/102351/20170926211531898019BBE.jpg@!face',
                        title: '球球0614',
                        rate: 4,
                        time: '2018-05-16',
                        content: '球球非常的开心，谢谢小姐姐像对待亲儿子似的耐心、爱护、陪伴球球，每天都发视频给我，期待下一次的看护。'
                    },
                    {
                        head: 'http://viptail.image.alimmdn.com/files/official_web/img/km001-u.jpg',
                        title: '丢丢',
                        rate: 5,
                        time: '2018-05-10',
                        content: '超级超级超级好！'
                    },
                    {
                        head: 'http://viptail.image.alimmdn.com/files/official_web/img/sh001-u.jpg',
                        title: '蛋挞君',
                        rate: 5,
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

            this.startDate = localStorage.getItem('startDate') || '2018-07-15';
            this.endDate = localStorage.getItem('endDate') || '2018-07-22';
            this.type = localStorage.getItem('type') || '🐱 猫咪';
            this.amount = localStorage.getItem('amount') || 50000;
            this.mobile = localStorage.getItem('mobile') || '13098728392';
            this.remark = localStorage.getItem('remark') || '爱吃罐头爱吃鱼';
        },
        mounted: function () {
            document.title = "订单详情";
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
    .orderone {

    }

    .goods-swipe {
        height: 250px;
    }

    .goods-swipe img {
        height: 100%;
        width: 100%;
    }

    .goods-price {
        color: #f44;
    }

    .goods-title {
        font-size: 16px;
    }

    .goods-price {
        color: #f44;
    }

    .goods-express {
        color: #999;
        font-size: 14px;
        padding: 5px 15px;
    }

    .goods-cell-group {
        margin: 15px 0;
    }

    .van-cell__value {
        color: #999;
    }

</style>
