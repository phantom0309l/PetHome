<template>
    <div class="text-left push-20-t">
        <div v-for="(group, parentIndex) in groups">
            <div class="fc-flex block-config push-10-l">
                <div class="push-10-r">
                    <img style="width:21px;" src="../../../static/image/消息中心-住院预约.png" />
                </div>
                <div class="fc-flex__item">
                    <h4 style="font-weight:normal;">{{group.groupstr}}</h4>
                </div>
            </div>
            <div class="config-item" v-for="(config, index) in group.configs">
                <div class="config-item-header fc-text-blue">
                    <span style="display: inline-block;line-height: 2">{{config.title}}</span>
                    <div style="display: inline-block; float: right;">
                        <mt-switch v-model="config.statusValue" @change.native="clickCheckBox(config, index, parentIndex)"></mt-switch>
                    </div>
                    <span style="float: right; display: inline-block;line-height: 2;margin-right: 20px" :class="{'opendesc': config.status == 1, 'closedesc': config.status== '0'}">{{config.status | buttondesfilter}}</span>
                </div>
                <div class="config-item-content">
                    <span style="color:#999">说明:&nbsp;&nbsp;&nbsp;</span>
                    <span style="word-break: break-all;color:#999">{{config.brief}}</span>
                </div>
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
                groups: [
                ]
            }
        },
        methods: {
            'clickCheckBox': function(config, index, parentIndex) {
                var self = this;
                if (config.statusValue == true) {
                    config.status = "1";
                }else {
                    config.status = "0";
                }
                var url = api.get('doctor.configpost');
                var params = {
                    openid: this.openid,
                    doctorconfigid: config.id,
                    status: config.status,
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        let instance = self.$toast('设置成功');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }else {
                        if (config.statusValue == true) {
                            config.statusValue = false;
                            config.status = "0";
                        }else {
                            config.statusValue = true;
                            config.status = "1";
                        }
                    }
                })
            },
            fetchData: function() {
                var self = this;
                var url = api.get('doctor.config');
                var params = {
                    openid: self.openid
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.groups = data.groups;
                        self.dataCorrect();
                    }else {

                    }
                })
            },
            dataCorrect: function() {
                for (var i = this.groups.length - 1; i >= 0; i--) {
                    for (var j = this.groups[i].configs.length-1; j >= 0; j--){
                        if (this.groups[i].configs[j].status == 0) {
                            this.groups[i].configs[j].statusValue = false;
                        }else {
                            this.groups[i].configs[j].statusValue = true;
                        }
                    }
                }
            }
        },
        created: function() {
            this.openid = localStorage.getItem('_openid_');
            this.fetchData();
        },
        filters: {
            'buttondesfilter': function(value) {
                // if (value == '0') {
                //     return '关闭';
                // }else {
                //     return '开启';
                // }
            },
        },
    }
</script>
<style scoped>
    .config-item {
        padding: 15px;
        margin-bottom: 10px;
        background: #fff;
    }
    .config-item-header {
        padding-bottom: 10px;
        border-bottom: 0.5px solid #e6e6e6;
    }
    .config-item-content {
        margin-top: 10px;
        line-height: 1.5;
    }
    .opendesc {
        color: #4472c5;
    }
    .closedesc {
        color: #f06500;
    }
    .block-config {
        padding-bottom: 10px;
        border-bottom: 0.5px solid #d9d9d9;
    }
</style>
