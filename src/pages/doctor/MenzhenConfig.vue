<template>
    <div class="text-left push-10-t">
        <div class="config">
            <div class="config-item-header fc-text-blue">
                <span class="config-title">开启开药门诊</span>
                <div class="config-switch">
                    <mt-switch v-model="menzhen_offset_daycnt_bool" @change.native="clickCheckBox(menzhen_offset_daycnt_bool)"></mt-switch>
                </div>
            </div>
            <div class="config-item-content">
                <span class="config-item-brief">说明：开启后，患者成功报到加入平台后，即可立即使用在线开药门诊的服务。</span>
            </div>
            <div v-if="menzhen_offset_daycnt_bool" class="shopproduct-list">
                <span class="shopproduct-info">展示在患者端的药品列表</span>
                <div v-for="(shopproduct, index) in shopproducts">
                    <div class="shopproduct">
                    <span class="shopproduct-title">{{shopproduct.title}}</span>
                    <div class="config-switch shopproduct-switch-box">
                        <span @click="clickButton(index, shopproduct, shopproduct.bindstatus)" :class="{'taskBox-c-item-btn am-fr': shopproduct.statusBool, 'taskBox-c-item-defaultBtn am-fr': false==shopproduct.statusBool}">{{shopproduct.statusBool | statusValue}}</span>
                    </div>
                    </div>
                </div>
            </div>
            <div class="config-item-header fc-text-blue isauditchufangbox">
                <span class="config-title">患者延伸处方（续方）审核</span>
                <div class="config-switch">
                    <mt-switch v-model="is_audit_chufang_bool" @change.native="clickIsAuditChufangBox(is_audit_chufang_bool)"></mt-switch>
                </div>
            </div>
            <div class="config-item-content">
                <span class="config-item-brief">说明：开启手动审核后，患者在线支付的所有药物订单，都需要您手动审核，通过后才能给患者寄药，如果48小时内未审核，则视为拒绝；如果关闭手动审核，患者在线支付的药物订单由方寸平台审核。</span>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                openid: '',
                menzhen_offset_daycnt: 0,
                is_audit_chufang: 0,
                menzhen_offset_daycnt_bool: false,
                is_audit_chufang_bool: false,
                shopproducts: []
            }
        },
        methods: {
            clickCheckBox: function(menzhen_offset_daycnt_bool) {
                var self = this;
                var menzhen_offset_daycnt = 0;
                if (menzhen_offset_daycnt_bool == true) {
                    menzhen_offset_daycnt = "1";
                }else {
                    menzhen_offset_daycnt = "0";
                }
                var url = api.get('doctor.menzhenconfigpost');
                var params = {
                    openid: this.openid,
                    menzhen_offset_daycnt: menzhen_offset_daycnt,
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        let instance = self.$toast('设置成功');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }else {
                        if (menzhen_offset_daycnt_bool == true) {
                            self.menzhen_offset_daycnt_bool = false;
                            self.menzhen_offset_daycnt = "0";
                        }else {
                            self.menzhen_offset_daycnt_bool = true;
                            self.menzhen_offset_daycnt = "1";
                        }
                    }
                })
            },
            clickIsAuditChufangBox: function(is_audit_chufang_bool){
                var self = this;
                var is_audit_chufang = 0;
                if (is_audit_chufang_bool == true) {
                    is_audit_chufang = "1";
                }else {
                    is_audit_chufang = "0";
                }
                var url = api.get('doctor.isauditchufangpost');
                var params = {
                    openid: this.openid,
                    is_audit_chufang: is_audit_chufang,
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        let instance = self.$toast('设置成功');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }else {
                        if (is_audit_chufang_bool == true) {
                            self.is_audit_chufang_bool = false;
                            self.is_audit_chufang = "0";
                        }else {
                            self.is_audit_chufang_bool = true;
                            self.is_audit_chufang = "1";
                        }
                    }
                })
            },
            clickButton: function(index, shopproduct, status) {
                var self = this;
                var shopproductid = shopproduct.id;
                if (status == 0) {
                    status = "1";
                }else {
                    status = "0";
                }
                shopproduct.bindstatus = status;
                shopproduct.statusBool = status>0;
                var url = api.get('doctorshopproductref.bindorunbind');
                var params = {
                    openid: this.openid,
                    shopproductid: shopproductid,
                    status: status,
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        let instance = self.$toast('设置成功');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                        self.$set(self.shopproducts, index, shopproduct);
                    }else {
                        if (menzhen_offset_daycnt_bool == true) {
                            shopproduct.statusBool = false;
                            shopproduct.bindstatus = "0";
                        }else {
                            shopproduct.statusBool = true;
                            shopproduct.bindstatus = "1";
                        }
                    }
                })
            },
            fetchData: function() {
                var self = this;
                var url = api.get('doctor.menzhenconfig');
                var params = {
                    openid: self.openid
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.menzhen_offset_daycnt = data.menzhen_offset_daycnt;
                        self.is_audit_chufang = data.is_audit_chufang;
                        self.menzhen_offset_daycnt_bool = data.menzhen_offset_daycnt > 0;
                        self.is_audit_chufang_bool = data.is_audit_chufang > 0;
                        self.shopproducts = data.shopproducts;
                        self.dataCorrect();
                    }else {

                    }
                })
            },
            dataCorrect: function() {
                for (var i = this.shopproducts.length - 1; i >= 0; i--) {
                    if (this.shopproducts[i].bindstatus == 0) {
                        this.shopproducts[i].statusBool = false;
                    }else {
                        this.shopproducts[i].statusBool = true;
                    }
                }
            }
        },
        created: function() {
            this.openid = localStorage.getItem('_openid_');
            this.fetchData();
        },
        filters: {
            'statusValue': function(value) {
                return value == '1'? '开启': '关闭';
            },
        },
    }
</script>
<style scoped>
.config {
    padding: 15px;
    margin-bottom: 10px;
    background: #fff;
}
.config-item-header {
    padding-bottom: 0px;
}
.config-title{
    display: inline-block;
    font-size: 20px;
    line-height: 2;
}
.config-switch{
    display: inline-block;
    float: right;
}
.config-item-content {
    margin-top: 5px;
    padding: 5px;
    line-height: 1.5;
    border-radius: 3px;
    border: 0.5px solid #e6e6e6;
}
.config-item-brief{
    color: #666;
}
.shopproduct-list{
    margin-top: 35px;
    font-size: 15px;
}
.shopproduct-info{
    color: black;
    font-size: 20px;
}
.shopproduct{
    margin: 15px 5px 10px 5px;
    padding: 2px 2px 5px 2px;
    border-bottom: 0.5px dotted #e6e6e6;
}
.shopproduct-title{
    width: 80%;
    display: inline-table;
}
.shopproduct-switch-box{
    margin-right: 0px;
}
.shopproduct-switch{
    height: 10px;
}
.taskBox-c-item-btn{
    padding: 3px 10px;
    background: #1996ea;
    color: #fff;
    border-radius: 6px;
    font-size: 15px;
    border: 1px solid #1996ea;
}
.taskBox-c-item-defaultBtn{
    padding: 3px 10px;
    background: #fff;
    color: #333;
    border-radius: 6px;
    font-size: 15px;
    border: 1px solid #ccc;
}
.block-config {
    padding-bottom: 10px;
    border-bottom: 0.5px solid #d9d9d9;
}
.isauditchufangbox{
    margin-top: 25px;
}
</style>
