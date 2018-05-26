<template>
    <div class="productlist">
        <van-search placeholder="请输入关键字" v-model="keyword"/>
        <van-row class="pull-10-t pull-10-b query-box van-hairline--top-bottom" style="background-color: rgb(242, 242, 242)">
            <van-col span="12">
                <button>离我最近</button>
            </van-col>
            <van-col span="12" class="van-hairline--left">
                <button @click="onPopupClick">筛选</button>
            </van-col>
            <div class="clear"></div>
        </van-row>

        <van-popup v-model="popup" position="right" :overlay="false">
            <div class="pull-15">
                <van-row class="push-20-b">
                    <van-col span="12" style="text-align: left;"><b style="font-size: 18px;">价格</b></van-col>
                    <van-col span="12" style="text-align: right;">￥{{min_price}}-{{max_price}}</van-col>
                </van-row>
                <van-row class="pull-10-t">
                    <van-col span="24" class="pull-10">
                        <vue-slider ref="slider" v-bind="slider" @callback="onSliderCallBack"></vue-slider>
                    </van-col>
                </van-row>
                <van-row class="push-20-b">
                    <van-col span="24" style="text-align: left;"><b style="font-size: 18px;">服务类型</b></van-col>
                </van-row>
                <van-row class="pull-10-t">
                    <van-col class="pull-5" span="5" v-for="service_type in service_types" :key="service_type.id">
                        <div class="pull-5 service_type" :class="{'active': isActive(service_type)}"
                             @click="onServiceTypeClick(service_type)">
                            <i class="service_type-icon" :style="{'background-image': 'url(\''+service_type.icon+'\')'}"></i>
                            <p>{{service_type.title}}</p>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <div class="query-btn-area">
                <van-button class="close-pop" @click="popup=!popup" size="large" type="default">关闭</van-button>
            </div>
        </van-popup>

        <van-list v-model="loading" :finished="finished" @load="onLoad" class="pull-15 van-hairline--top" style="padding-bottom: 0;">
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
    import util from '../lib/utils.js'
    import vueSlider from 'vue-slider-component';

    export default {
        components: {
            vueSlider
        },
        data: function () {
            return {
                keyword: '',
                finished: false,
                loading: false,
                products: [],
                popup: false,
                min_price: 0,
                max_price: 200,
                slider: {
                    value: [
                        0,
                        200
                    ],
                    width: "100%",
                    height: 2,
                    dotSize: 20,
                    min: 0,
                    max: 200,
                    disabled: false,
                    show: true,
                    useKeyboard: true,
                    tooltip: "always",
                    bgStyle: {
                        "backgroundColor": "#fff",
                        "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
                    },
                    tooltipStyle: {
                        "backgroundColor": "#666",
                        "borderColor": "#666"
                    },
                    processStyle: {
                        "backgroundColor": "#fabf40"
                    },
                    formatter: function (value) {
                        if (value === this.max) {
                            return '无限';
                        } else {
                            return '￥' + value;
                        }
                    },
                },
                service_types: [
                    {
                        'id': 1,
                        'icon': '/static/image/smalldogs.png',
                        'title': '小型犬'
                    },
                    {
                        'id': 2,
                        'icon': '/static/image/mediumdogs.png',
                        'title': '中型犬'
                    },
                    {
                        'id': 3,
                        'icon': '/static/image/largedogs.png',
                        'title': '大型犬'
                    },
                    {
                        'id': 4,
                        'icon': '/static/image/cat.png',
                        'title': '猫'
                    },
                    {
                        'id': 5,
                        'icon': '/static/image/other.png',
                        'title': '其他'
                    },
                ],
                selected_service_type: 4,
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
            onPopupClick: function () {
                let self = this;
                this.popup = !this.popup;
                setTimeout(function () {
                    self.$refs['slider'].refresh()
                }, 100);
            },
            onSliderCallBack: function (value) {
                this.min_price = value[0];
                this.max_price = value[1] == this.slider.max ? '无限' : value[1];
            },
            onServiceTypeClick: function (service_type) {
                this.selected_service_type = service_type.id;
            },
            isActive: function (service_type) {
                return this.selected_service_type === service_type.id
            },
            goProductOne: function () {
                this.$router.push({name: 'productone'});
            },
            onLoad: function () {
                let self = this;
                setInterval(function () {
                    self.finished = true;
                    self.loading = false;
                    self.products = [
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
                    ];
                    return true;
                }, 1000);
            },
            // 前往xx页面
            goXXX: function () {
                this.$router.push({name: 'xxx', params: {'xxx': 'xxx'}});
            }
        },
        created: function () {
            this.fetchData();
        },
        mounted: function () {
            document.title = "寄养家庭列表";
        },
        beforeRouteEnter(to, from, next) {
            $('#app').css('height', window.innerHeight);
            $('#app').css('padding-bottom', 0);
            document.querySelector('body').setAttribute('class', 'fc-bg-primary');
            next();
        },
        beforeRouteLeave(to, from, next) {
            $('#app').css('height', 'auto');
            $('#app').css('padding-bottom', 50);
            document.querySelector('body').setAttribute('class', '');
            next();
        },
    }
</script>

<style scoped>
    .query-box button {
        font-size: 12px;
        font-weight: bolder;
    }

    .van-search {
        padding: 10px 15px;
    }

    .van-popup {
        width: 100%;
        height: 100%;
    }

    .service_type {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 6px;
    }

    .service_type.active {
        border-color: rgba(234, 110, 12, 0.9);
        background-color: rgba(249, 154, 45, 0.5);
    }

    .service_type-icon {
        display: block;
        width: 24px;
        height: 24px;
    }

    .query-btn-area {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .close-pop {
        color: #fabf40;
    }
</style>
