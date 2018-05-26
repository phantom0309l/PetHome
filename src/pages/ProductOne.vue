<template>
    <div class="goods">
        <van-swipe class="goods-swipe" :autoplay="3000">
            <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
                <img :src="thumb">
            </van-swipe-item>
        </van-swipe>

        <van-cell-group>
            <van-cell>
                <van-col span="12">
                    <div class="goods-title">{{ goods.title }}</div>
                </van-col>
                <van-col span="12">
                    <div class="goods-price">￥100元起</div>
                </van-col>
            </van-cell>
            <van-cell>
                <div>
                    <van-tag mark type="primary">专业寄养中心</van-tag>
                    <van-tag mark type="primary">临近公园</van-tag>
                    <van-tag mark type="primary">标签</van-tag>
                    <van-tag mark type="primary">标签</van-tag>
                </div>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="10">地址：北京市朝阳区</van-col>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="10">总面积：500㎡</van-col>
                <van-col span="14">
                    <van-rate
                            v-model="goods.rate"
                            :size="16"
                            :count="5"
                            color="#fabf40"
                            void-color="#fabf40"
                    />
                </van-col>
            </van-cell>
            <van-cell class="goods-express">
                我们是专业宠物寄养馆，接待猫咪、狗狗，有专人看护，宠物专业洗浴用品。
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell>
                <p class="">寄养价格</p>
            </van-cell>
            <van-cell>
                <van-row class="push-15-b">
                    <van-col span="8" offset="4">🐱 猫咪</van-col>
                    <van-col span="10" offset="1" style="text-align: right;">￥100元/天</van-col>
                </van-row>
                <van-row>
                    <van-col span="8" offset="4">🐶 狗狗</van-col>
                    <van-col span="10" offset="1" style="text-align: right;">￥150元/天</van-col>
                </van-row>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell>
                <p class="">室内环境</p>
            </van-cell>
            <van-swipe class="goods-swipe">
                <van-swipe-item v-for="thumb in goods.thumb2" :key="thumb">
                    <img :src="thumb">
                </van-swipe-item>
            </van-swipe>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell>
                <p class="">寄养评价</p>
            </van-cell>
            <van-cell v-for="(comment, index) in comments" :key="index">
                <van-row>
                    <van-col span="4">
                        <img :src="comment.head" width="90%"
                             style="border-radius: 100px; border: 1px solid #eee;">
                    </van-col>
                    <van-col span="10" style="padding-top: 3px;">
                        <p class="push-5-b" style="font-size: 15px;">{{comment.title}}</p>
                        <p>
                            <van-rate
                                    v-model="comment.rate"
                                    :size="12"
                                    :count="5"
                                    color="#fabf40"
                                    void-color="#fabf40"
                            />
                        </p>
                    </van-col>
                    <van-col span="10">
                        <p style="text-align: right;" class="goods-express">{{comment.time}}</p>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="20" offset="4">
                        {{comment.content}}
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>

        <van-goods-action>
            <van-goods-action-mini-btn icon="chat" @click="showComment">
                发表评论
            </van-goods-action-mini-btn>
            <van-goods-action-big-btn style="background-color: #fabf40" @click="talk">
                立即沟通
            </van-goods-action-big-btn>
        </van-goods-action>

        <van-dialog
                v-model="commentShow"
                show-cancel-button
                confirmButtonText="发表"
                :before-close="beforeClose">
            <van-field
                    v-model="message"
                    type="textarea"
                    placeholder="请填写评论内容"
                    rows="4"
                    autosize
            />
        </van-dialog>
    </div>
</template>

<script>
    import common from '../lib/common.js';

    export default {
        data() {
            return {
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
            };
        },

        methods: {
            formatPrice() {
                return '¥' + (this.goods.price / 100).toFixed(2);
            },

            onClickCart() {
                this.$router.push('cart');
            },

            sorry() {
                Toast('暂无后续逻辑~');
            },

            beforeClose(action, done) {
                if (action === 'confirm') {
                    setTimeout(done, 1000);
                } else {
                    done();
                }
            },

            showComment() {
                this.checkLogin();
                this.commentShow = true
            },

            checkLogin() {
                let isLogin = common.checkLogin();
                if (isLogin === false) {
                    this.$router.push({name: 'login'});
                }
                return isLogin;
            },

            talk() {
                if (this.checkLogin()) {
                    this.$router.push({name: 'msgone'});
                }
            }
        },
        mounted: function () {
            document.title = "寄养家庭";
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
    };
</script>

<style scoped>
    .goods {
        padding-bottom: 50px;
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
        font-size: 12px;
        padding: 5px 15px;
    }

    .goods-cell-group {
        margin: 15px 0;
    }

    .van-cell__value {
        color: #999;
    }

</style>
