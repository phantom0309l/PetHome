<template>
    <div class="shoporder-list">
        <mt-loadmore :auto-fill="false" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul style="list-style-type: none; padding: 1px 0;">
                <li class="item-box" v-for="(shoporders, themonth) in shoporder_groups" style="text-align: left;">
                    <div class="pull-10 pull-15-l"><i class="iconfont icon-chushengriqi fc-text-blue font-s18"></i><span class="push-10-l fc-text-blue">{{themonth}}</span></div>
                    <div>
                        <div class="push-10 fc-bg-white border" style="border-radius: 5px; margin-top: 0;" v-for="shoporder in shoporders">
                            <div class="patient-info fc-flex pull-10 border-b" @click="goPatientDetail(shoporder.patient)">
                                <div class="fc-flex__item">
                                    <i class="iconfont icon-jibenxinxi font-s20 fc-text-blue"></i>
                                    <span class="font-s18 fc-text-blue pull-5-l">{{shoporder.patient.name}}</span>
                                    <span class="fc-text-999">&nbsp;&nbsp;{{shoporder.patient.attrstr}}</span>
                                </div>
                                <div class="text-center" style="align-self:center">
                                    <span class="font-s14 fc-text-999" style="padding-right: 6px;">{{shoporder.time_pay_format}}</span>
                                    <i class="iconfont icon-combinedshapefuben fc-text-999" style="font-size: 14px;"></i>
                                </div>
                            </div>
                            <div class="order-item fc-text-666 fc-flex" v-for="item in shoporder.shoporder_items">
                                <div class="order-item-title">{{item.shopproduct.title}}</div>
                                <div class="order-item-cnt text-right">× {{item.cnt}}</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
        <div class="noData fc-text-666" v-if="!shoporder_groups && allLoaded">
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
                shoporder_groups: {},
                thedate: '',
                allLoaded: false,
            }
        },
        created(){
            document.title = '处方列表';
            this.openid = localStorage.getItem('_openid_');
            this.thedate = this.$route.query.thedate;
            this.fetchData();
        },
        methods: {
            fetchData: function(loadMore) {
                var self = this;
                var url = api.get('shoporder.list');
                var params = {
                    openid: this.openid,
                    thedate: this.thedate,
                }
                common.post(url, params,function(response){
                    self.$refs.loadmore.onBottomLoaded();
                    if (response.errno == 0) {
                        var data = response.data;
                        self.thedate = data.thedate;
                        if (loadMore === true) {
                            self.shoporder_groups = Object.assign({}, self.shoporder_groups, data.shoporder_groups);
                        } else {
                            self.shoporder_groups = data.shoporder_groups;
                            setTimeout(function() {
                                window.scrollTo(0, 0);
                            }, 1);
                        }

                        if (data.shoporder_groups == undefined || data.shoporder_groups == null) {
                            self.allLoaded = true;
                        }
                    }
                })
            },
            loadMore: function() {
                this.fetchData(true);
            },
            goPatientDetail: function(patient) {
                var self = this;
                this.$router.push({
                  name: 'patient-main',
                  params: {
                    'patientid': patient.patientid
                  }
                });
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
    /*margin-top: -12.5px;*/
    width: 100%;
}

.patient-info {
    z-index: 3;
}

.order-item {
    /*padding: 15px 15px 0 15px;*/
    padding: 15px 0 15px;
    margin: 0 15px;
    justify-content: space-between;
    border-bottom: 1px dashed #ddd;
}
.order-item:last-of-type {
    padding-bottom: 15px;
    border-bottom: none;
}

.order-item-title {
    flex: 1;
    padding-right: 15px;
    word-break: break-all;
}

.order-item-cnt {
    align-self: center;
}
</style>
