<template>
    <div class="index">
        <van-notice-bar
                text="温馨舒适的环境，开放宽敞的活动空间，温暖充足的阳光；清新流动的空气，干净清洁的饮用水，新鲜可口的食物；"
                left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
        />
        <van-swipe class="swipe-box" :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image"/>
            </van-swipe-item>
        </van-swipe>

        <van-row class="fc-bg-white pull-20-t pull-20-b" style="font-size: 14px;">
            <van-col span="7" offset="1">
                <button @click="goRegisterFamily"><i class="icon icon-home i-b"></i> 申请家庭</button>
            </van-col>
            <van-col span="7" offset="1" class="van-hairline--left">
                <button><i class="icon icon-pet i-b"></i> 宠物指南</button>
            </van-col>
            <van-col span="7" offset="1" class="van-hairline--left">
                <button><i class="icon icon-baozhang i-b"></i> 保障服务</button>
            </van-col>
        </van-row>

        <p class="vc push-20-t pull-5-b" style="font-weight: bolder;">你可能想要</p>
        <van-row class="fc-bg-white pull-15-t pull-15-b push-10-t" style="font-size: 14px;">
            <van-col span="7" offset="1">
                <button><i class="icon icon-release" style="margin: 10px auto;"></i> 发布寄养</button>
            </van-col>
            <van-col span="7" offset="1">
                <button><i class="icon icon-integral" style="margin: 10px auto;" @click="goProductList"></i> 寄养家庭</button>
            </van-col>
            <van-col span="7" offset="1">
                <button><i class="icon icon-hospital" style="margin: 10px auto;"></i> 合作医院</button>
            </van-col>
        </van-row>

        <p class="vc push-20-t pull-5-b" style="font-weight: bolder;">为你推荐</p>
        <van-list v-model="loading" :finished="finished" @load="onLoad" class="pull-15">
            <div class="item-product van-hairline--surround" v-for="(product, index) in products" :key="index" @click="goProductOne">
                <div class="cover-box">
                    <img class="cover-img" v-lazy="product.cover" width="100%" height="200px"/>
                    <div class="price-box">
                        <p class="price-p van-hairline--bottom pull-5">
                            寄养价格
                            <span class="item-product-price"><span style="font-size: 12px;">￥</span>{{product.price}}</span>
                            起
                        </p>
                        <p class="pull-5">随时可以接单</p>
                    </div>
                </div>

                <img class="head-img" width="70" height="70" v-lazy="product.head"/>

                <div class="pull-20-l pull-5">
                    <p>
                        <van-icon name="wap-home" class="v-a-m" style="font-size: 16px; font-weight: bolder;"/>
                        <span class="name v-a-m">{{product.name}}</span>
                        <span class="grade v-a-m">评分 {{product.grade}}</span>
                    </p>
                    <p class="push-5-t push-5-b">
                        <van-rate
                                v-model="product.rate"
                                :size="12"
                                :count="5"
                                color="#e34252"
                                void-color="#ceefe8"
                        />
                    </p>
                    <p style="font-size: 12px; color: #666;">
                        <span class="address van-hairline--right">{{product.address}}</span>
                        <span class="distance">距离我{{product.distance}}</span>
                    </p>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import api from '../config/api.js';
    import common from '../lib/common.js';
    import util from '../lib/utils.js';

    export default {
        data: function () {
            return {
                images: [
                    'http://viptail.image.alimmdn.com/files/official_web/img/mob_topbanner.png',
                    'http://viptail.image.alimmdn.com/image/albums/dairy/admin/201803200931456mQjfUxg.jpg',
                    'http://viptail.image.alimmdn.com/image/albums/dairy/admin/20180410093300mLcCz9Au.jpg',
                ],
                list: [],
                loading: false,
                finished: false,
                rateValue: 5,
                products: [
                    {
                        cover: 'http://viptail.image.alimmdn.com/files/official_web/img/gz001-f.jpg',
                        price: 80,
                        head: 'http://viptail.image.alimmdn.com/image/face/user/102351/20170926211531898019BBE.jpg@!face',
                        name: '科科大王',
                        grade: 5.0,
                        rate: 5,
                        address: '北京',
                        distance: '7.04km'
                    },
                    {
                        cover: 'http://viptail.image.alimmdn.com/files/official_web/img/sh001-f.jpg',
                        price: 38,
                        head: 'http://viptail.image.alimmdn.com/files/official_web/img/km001-u.jpg',
                        name: '比熊元宝的家',
                        grade: 4.4,
                        rate: 4.5,
                        address: '昆明',
                        distance: '2007.04km'
                    },
                    {
                        cover: 'http://viptail.image.alimmdn.com/files/official_web/img/gz002-f.jpg',
                        price: 55,
                        head: 'http://viptail.image.alimmdn.com/files/official_web/img/gz002-u.jpg',
                        name: '丢丢家',
                        grade: 4.7,
                        rate: 4,
                        address: '广州',
                        distance: '2507.11km'
                    },
                    {
                        cover: 'http://viptail.image.alimmdn.com/files/official_web/img/bj002-f.jpg',
                        price: 88,
                        head: 'http://viptail.image.alimmdn.com/files/official_web/img/sh001-u.jpg',
                        name: 'mocci',
                        grade: 5.0,
                        rate: 5,
                        address: '上海',
                        distance: '1887.04km'
                    },
                ]
            }
        },
        methods: {
            // 获取数据
            fetchData: function () {
                let self = this,
                    url = api.get('xxx'),
                    params = {};
                common.post(url, params, function (response) {
                    if (response.errno === 0) {
                        let data = response.data;
                    }
                })
            },
            onLoad: function () {
                setInterval(function () {
                    return true;
                }, 2000);
            },
            // 前往xx页面
            goXXX: function () {
                this.$router.push({name: 'xxx', params: {'xxx': 'xxx'}});
            },
            goProductList: function () {
                this.$router.push({name: 'productlist'});
            },
            goRegisterFamily: function () {
                this.$router.push({name: 'registerfamily'});
            },
            goProductOne: function () {
                this.$router.push({name: 'productone'});
            }
        },
        created: function () {
            this.fetchData();
        },
        mounted: function () {
            document.title = "首页";
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
    .index {
        background-color: #fff;
    }

    .swipe-box {
        width: 100%;
        height: 250px;
    }

    .swipe-box img {
        width: 100%;
        height: 100%;
    }

    .icon {
        display: block;
        vertical-align: middle;

        position: relative;
        top: -2px;
    }

    .icon-home {
        width: 16px;
        height: 16px;
        background-size: 16px;
        background-image: url("../../static/image/home.png");
    }

    .icon-pet {
        width: 16px;
        height: 16px;
        background-size: 16px;
        background-image: url("../../static/image/pet.png");
    }

    .icon-baozhang {
        width: 16px;
        height: 16px;
        background-size: 16px;
        background-image: url("../../static/image/baozhang.png");
    }

    .icon-hospital {
        width: 24px;
        height: 24px;
        background-size: 24px;
        background-image: url("../../static/image/hospital.png");
    }

    .icon-integral {
        width: 24px;
        height: 24px;
        background-size: 24px;
        background-image: url("../../static/image/integral.png");
    }

    .icon-release {
        width: 24px;
        height: 24px;
        background-size: 24px;
        background-image: url("../../static/image/release.png");
    }

    .i-b {
        display: inline-block;
    }
</style>
