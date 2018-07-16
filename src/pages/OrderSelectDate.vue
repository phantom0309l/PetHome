<template>
    <div class="orderone">
        <van-radio-group v-model="type" style="text-align: left">
            <van-cell-group>
                <van-cell title="🐱 猫咪" clickable @click="type = '🐱 猫咪'">
                    <van-radio name="🐱 猫咪"/>
                </van-cell>
                <van-cell title="🐶 狗狗" clickable @click="type = '🐶 狗狗'">
                    <van-radio name="🐶 狗狗"/>
                </van-cell>
            </van-cell-group>
        </van-radio-group>

        <div style="position: relative;">
            <fc-calendar
                    :date="date"
                    :datas="datasarr[type]"
                    @descOfDate="handleDescOfDate"
                    @clickDate="handleClickDate">
            </fc-calendar>
        </div>

        <div data-v-7d46dfc4="" class="van-submit-bar border-t"><!---->
            <div class="van-submit-bar__bar">
                <div class="van-submit-bar__price" style="text-align: left; padding-left: 20px;">{{getSelectedStr()}}</div>
                <button class="van-button van-button--danger van-button--normal" @click="goOrder"><!---->
                    <span class="van-button__text">继续预订</span>
                </button>
            </div>
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
                type: '🐱 猫咪',
                selectedDates: [],
                message: '',
                commentShow: false,
                date: '',
                datasarr: {
                    '🐱 猫咪': {
                        '2018-07-20': 700,
                        '2018-07-21': 800,
                        '2018-07-22': 800,
                        '2018-07-23': 700,
                        '2018-07-24': 700,
                        '2018-07-25': 700,
                        '2018-08-01': 700,
                        '2018-08-20': 700,
                        '2018-08-21': 800,
                        '2018-08-22': 800,
                        '2018-08-23': 700,
                        '2018-08-24': 700,
                        '2018-08-25': 700,
                        '2018-09-01': 700,
                        '2018-09-20': 700,
                        '2018-09-21': 800,
                        '2018-09-22': 800,
                        '2018-09-23': 700,
                        '2018-09-24': 700,
                        '2018-09-25': 700,
                        '2018-10-01': 700,
                        '2018-10-20': 700,
                        '2018-10-21': 800,
                        '2018-10-22': 800,
                        '2018-10-23': 700,
                        '2018-10-24': 700,
                        '2018-10-25': 700,
                        '2018-11-01': 700,
                        '2018-11-20': 700,
                        '2018-11-21': 800,
                        '2018-11-22': 800,
                        '2018-11-23': 700,
                        '2018-11-24': 700,
                        '2018-11-25': 700,
                        '2018-12-01': 700,
                        '2018-12-20': 700,
                        '2018-12-21': 800,
                        '2018-12-22': 800,
                        '2018-12-23': 700,
                        '2018-12-24': 700,
                        '2018-12-25': 700,
                        '2019-01-01': 700,
                        '2019-02-01': 700,
                        '2019-03-01': 700,
                        '2019-04-01': 700,
                        '2019-05-01': 700,
                    },
                    '🐶 狗狗': {
                        '2018-07-20': 900,
                        '2018-07-21': 1000,
                        '2018-07-22': 1000,
                        '2018-07-23': 900,
                        '2018-07-24': 900,
                        '2018-07-25': 900,
                        '2018-08-01': 900,
                        '2018-08-20': 900,
                        '2018-08-21': 1000,
                        '2018-08-22': 1000,
                        '2018-08-23': 900,
                        '2018-08-24': 900,
                        '2018-08-25': 900,
                        '2018-09-01': 900,
                        '2018-09-20': 900,
                        '2018-09-21': 1000,
                        '2018-09-22': 1000,
                        '2018-09-23': 900,
                        '2018-09-24': 900,
                        '2018-09-25': 900,
                        '2018-10-01': 900,
                        '2018-10-20': 900,
                        '2018-10-21': 1000,
                        '2018-10-22': 1000,
                        '2018-10-23': 900,
                        '2018-10-24': 900,
                        '2018-10-25': 900,
                        '2018-11-01': 900,
                        '2018-11-20': 900,
                        '2018-11-21': 1000,
                        '2018-11-22': 1000,
                        '2018-11-23': 900,
                        '2018-11-24': 900,
                        '2018-11-25': 900,
                        '2018-12-01': 900,
                        '2018-12-20': 900,
                        '2018-12-21': 1000,
                        '2018-12-22': 1000,
                        '2018-12-23': 900,
                        '2018-12-24': 900,
                        '2018-12-25': 900,
                        '2019-01-01': 900,
                        '2019-02-01': 900,
                        '2019-03-01': 900,
                        '2019-04-01': 900,
                        '2019-05-01': 900,
                    }
                },
                datas: {},
            }
        },
        computed: {
        },
        methods: {
            // 获取数据
            handleClickDate: function (selectedDates) {
                this.selectedDates = selectedDates;
            },
            handleDescOfDate: function (theDate, callback) {
                var desc = null;
                if (theDate in this.datas) {
                    desc = this.datas[theDate];
                }
                callback(desc);
            },
            getSelectedStr: function () {
                if (this.selectedDates.length === 1) {
                    return this.selectedDates[0] + " 至 " + '请选择结束日期';
                } else if (this.selectedDates.length === 2) {
                    return this.selectedDates[0] + " 至 " + this.selectedDates[1];
                } else {
                    return '请选择开始日期、结束日期';
                }
            },
            goOrder: function () {
                if (this.type === '') {
                    this.$toast('请选择宠物类型');
                    return false;
                }

                if (this.selectedDates.length < 2) {
                    this.$toast('请选择要预订的日期范围');
                    return false;
                }
                this.$router.push({
                    name: 'order',
                    params: {
                        selectedDates: this.selectedDates,
                        type: this.type,
                        datas: this.datasarr[this.type]
                    }
                })
            }
        },
        created: function () {
        },
        components: {
            'fc-calendar': function (resolve) {
                require(['../components/FCCalendar.vue'], resolve);
            },
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
        /*margin-top: 10px;*/
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
