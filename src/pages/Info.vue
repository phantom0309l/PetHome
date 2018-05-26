<template>
    <div class="info">
        <van-cell-group class="push-10-b">
            <van-field
                    v-model="nickname"
                    label="昵称"
                    placeholder="请填写昵称"
            />
            <van-field
                    v-model="area"
                    label="地区"
                    placeholder="请输入地区"
            />
        </van-cell-group>
        <van-cell-group class="push-10-b">
            <van-field
                    v-model="category"
                    label="宠物品种"
                    placeholder="请输入宠物品种"
            />
            <van-field
                    v-model="petname"
                    label="宠物名字"
                    placeholder="请输入宠物名字"
            />
        </van-cell-group>
        <van-cell-group class="push-10-b">
            <van-field
                    v-model="desc"
                    type="textarea"
                    rows="1"
                    autosize
                    label="描述"
                    maxLength="50"
                    placeholder="请输入描述，不超过50个字"
            />
        </van-cell-group>

        <div class="bottom-area" @click="$router.go(-1)">
            <van-button style="background-color: #fabf40" bottom-action>保存</van-button>
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
                desc: '一坨肉球走天下。',
                petname: '蛋挞君',
                category: '猫咪',
                area: '北京',
                nickname: '球球作战指挥部',
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
            }
        },
        created: function () {
            this.fetchData();
        },
        mounted: function () {
            document.title = "个人资料";
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
    .info {
        padding: 15px 0;
    }
</style>
