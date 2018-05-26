<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

        <van-tabbar v-model="active" v-if="isShowTabbar" @change="change">
            <van-tabbar-item icon="shop" to="/index">首页</van-tabbar-item>
            <van-tabbar-item icon="chat" to="/msglist" dot>消息</van-tabbar-item>
            <van-tabbar-item icon="records" to="/my" info="5">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data: function () {
            return {
                active: 0,
            }
        },
        methods: {
            change() {
                // switch (this.active) {
                //     case 0:
                //         this.$router.push({name: 'index'});
                //         break;
                //     case 1:
                //         this.$router.push({name: 'msglist'});
                //         break;
                //     case 2:
                //         this.$router.push({name: 'my'});
                //         break;
                // }
            }
        },
        mounted: function () {
        },
        created: function () {
            var self = this;
            setTimeout(function () {
                console.log(self.$route);
                switch (self.$route.name) {
                    case 'index':
                        self.active = 0;
                        break;
                    case 'msglist':
                        self.active = 1;
                        break;
                    case 'my':
                        self.active = 2;
                        break;
                }
            }, 100);
        },
        computed: {
            isShowTabbar: function () {
                return this.$route.meta.showTabbar;
            }
        }
    }
</script>

<style>
    #app {
        padding-bottom: 50px;
    }

    .item-product {
        background-color: #fff;
        border-radius: 8px;
        position: relative;
        margin-bottom: 20px;
        text-align: left;
    }

    .cover-box {
        position: relative;
    }

    .cover-img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .price-box {
        padding: 0px 5px 5px;
        position: absolute;
        bottom: 20px;
        left: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
    }

    .item-product-price {
        font-size: 18px;
        color: #fabf40;
        font-weight: bolder;
    }

    .item-product .head-img {
        position: absolute;
        right: 20px;
        top: 165px;
        border-radius: 35px;
        border: 2px solid #fff;
    }

    .item-product .name {
        font-size: 16px;
        font-weight: bolder;
        color: #333;
    }

    .item-product .grade {
        font-size: 12px;
        color: #fabf40;
    }

    .item-product .address {
        padding-right: 15px;
    }

    .item-product .distance {
        padding-left: 15px;
    }

    .item-product.van-hairline--surround::after {
        border-radius: 16px;
    }

    .bottom-area {
        position: fixed;
        bottom: 0px;
        width: 100%;
    }
</style>