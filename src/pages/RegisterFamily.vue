<template>
    <div class="registerFamily pull-15-t">
        <van-cell-group class="push-10-b">
            <van-field
                    v-model="name"
                    label="名称"
                    placeholder="请填写名称"
            />
        </van-cell-group>
        <van-cell-group class="push-10-b">
            <!--<van-field-->
                    <!--v-model="category"-->
                    <!--label="类型"-->
                    <!--placeholder="请填写类型"-->
            <!--/>-->
            <van-field
                    v-model="price"
                    label="价格"
                    placeholder="请填写价格"
            />
        </van-cell-group>
        <van-cell-group class="push-10-b">
            <van-field
                    v-model="area"
                    label="面积"
                    placeholder="请填写面积"
            />
        </van-cell-group>
        <van-cell-group class="push-10-b">
            <van-field
                    v-model="desc"
                    type="textarea"
                    rows="2"
                    autosize
                    label="描述"
                    maxLength="50"
                    placeholder="请输入描述，不超过50个字"
            />
        </van-cell-group>
        <van-cell-group class="push-10-b">
            <van-checkbox-group v-model="result">
                <van-row>
                    <van-col span="10" offset="2"
                             style="text-align: left; padding: 15px 10px; font-size: 12px;"
                             v-for="(item, index) in list" :key="index">
                        <van-checkbox
                                :key="item"
                                :name="item"
                        >{{ item }}
                        </van-checkbox>
                    </van-col>
                </van-row>
            </van-checkbox-group>
        </van-cell-group>
        <van-cell-group class="push-10-b">
            <van-field
                    v-model="address"
                    label="地址"
                    placeholder="请填写地址"
            />
        </van-cell-group>
        <h2 class="van-doc-block__title">服务宠物类型（多选）</h2>
        <van-cell-group class="push-10-b">
            <van-checkbox-group v-model="result2">
                <van-row>
                    <van-col span="6"
                             style="text-align: center; padding: 10px 5px; font-size: 12px;"
                             v-for="(item, index) in list2" :key="index">
                        <van-checkbox
                                :key="item"
                                :name="item"
                        >{{ item }}
                        </van-checkbox>
                    </van-col>
                </van-row>
            </van-checkbox-group>
        </van-cell-group>

        <div class="bottom-area" @click="$router.go(-1)">
            <van-button style="background-color: #fabf40" bottom-action>提交</van-button>
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
                desc: '',
                petname: '',
                category: '',
                area: '',
                name: '',
                price: '',
                list: [
                    '专业寄养中心',
                    '靠近公园',
                    '专人看护',
                    '空调环境'
                ],
                result: [],
                address: '',
                list2: [
                    '大型犬',
                    '中型犬',
                    '小型犬',
                    '猫',
                ],
                result2: [],
            }
        },
        methods: {
            // 获取数据
            fetchData: function () {
                var self = this;
                var url = api.get('xxx');
                var params = {};
                common.post(url, params, function (response) {
                    if (response.errno === 0) {
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
            document.title = "注册家庭";
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
    .van-doc-block__title {
        margin: 0;
        font-weight: 400;
        font-size: 14px;
        color: rgba(69, 90, 100, .6);
        padding: 15px 15px 5px;
        text-align: left;
    }
</style>
