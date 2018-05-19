<template>
<div class="shoporder-monthrpt">
    <div class="pull-15" style="text-align: left;">
        <i class="iconfont icon-chushengriqi fc-text-blue font-s18"></i>
        <span class="push-10-l fc-text-blue">统计的时间范围为：{{theMonth}}月整月</span>
    </div>
    <table class="items" v-if="items.length > 0">
        <thead>
            <tr>
                <th class="text-left">
                    药品
                </th>
                <th style="width: 90px;">
                    用药人次
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items">
                <td class="text-left">
                    {{item.shopproduct_title}}
                </td>
                <td>
                    {{item.total_cnt}}
                </td>
            </tr>
        </tbody>
    </table>
    <div class="noData fc-text-666" v-else>
        暂时没有数据
    </div>
</div>
</template>
<script>
import utils from '../../lib/utils.js'
import api from '../../config/api.js'
import common from '../../lib/common.js'
import moment from 'moment'
export default {
    data: function() {
        return {
            openid: '',
            items: [],
            theMonth: '',
        }
    },
    created() {
        document.title = '处方分析';
        this.openid = localStorage.getItem('_openid_');
        this.theMonth = this.$route.query.themonth;
        this.fetchData();
    },
    methods: {
        fetchData: function(loadMore) {
            var self = this;
            var url = api.get('shoporder.monthrpt');
            var params = {
                openid: this.openid,
                themonth: this.theMonth,
            }
            common.post(url, params, function(response) {
                if (response.errno == 0) {
                    var data = response.data;
                    self.items = data.items;
                } else {
                    let instance = self.$toast(response.errmsg);
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                }
            })
        },
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
.noData {
    position: absolute;
    top: 45%;
    width: 100%;
}

.shoporder-monthrpt {
    padding: 0;
}

.items {
    background-color: #fff;
    width: 100%;
}

.items th {
    padding: 10px 10px;
}

.items td {
    padding: 12px 10px;
    border-top: 1px solid #efefef;
    word-break: break-all;
}
</style>
