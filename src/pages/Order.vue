<template>
    <div class="order">
        <van-cell-group>
            <van-cell>
                <van-col span="12">
                    <div class="goods-title">{{ goods.title }}</div>
                </van-col>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="8">寄养日期：</van-col>
                <van-col span="16" style="text-align: right">{{selectedDates[0]}} 至 {{selectedDates[1]}}</van-col>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="8">寄养类型：</van-col>
                <van-col span="16" style="text-align: right">{{type}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-field v-model="mobile" label="联系电话" placeholder="请输入联系电话" />
            <van-field v-model="remark" label="备注" placeholder="请输入备注" />
        </van-cell-group>

        <van-submit-bar
                :price="getAmount"
                button-text="提交订单"
                @submit="onSubmit"
        />
    </div>
</template>

<script>
    import api from '../config/api.js';
    import common from '../lib/common.js';
    import util from '../lib/utils.js'

    export default {
        data: function () {
            return {
                selectedDates: [],
                type: '',
                datas: [],
                day_cnt: 0,
                message: '',
                commentShow: false,
                mobile: '',
                remark: '',
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
        computed: {
            getAmount: function() {
                var self = this;
                var rangeDates = this.getRangeDates(this.selectedDates[0], this.selectedDates[1]);
                var amount = 0;
                self.day_cnt = 0;
                $.each(rangeDates, function (index, date) {
                    amount += self.datas[date];
                    self.day_cnt++;
                });

                return amount * 100;
            },
        },
        methods: {
            onSubmit: function() {
                this.$toast('订单创建成功');
                localStorage.setItem('startDate', this.selectedDates[0]);
                localStorage.setItem('endDate', this.selectedDates[1]);
                localStorage.setItem('type', this.type);
                localStorage.setItem('amount', this.getAmount);
                localStorage.setItem('mobile', this.mobile);
                localStorage.setItem('remark', this.remark);

                this.$router.push({name: 'orderone'});
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
            this.selectedDates = this.$route.params.selectedDates;
            this.type = this.$route.params.type;
            this.datas = this.$route.params.datas;
            if (this.selectedDates === undefined || this.selectedDates === null || this.selectedDates.length === 0) {
                this.$router.push({name: 'productone'});
            }
            this.fetchData();
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
    .order {
text-align: left;
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
