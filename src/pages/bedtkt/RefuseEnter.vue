<template>
    <div class="refuse-enter">
        <div class="fc-bg-white text-left">
            <div class="pi-basic fc-flex">
                <div class="icon">
                    <i class="iconfont icon-icon133 fc-text-blue font-s18"></i>
                </div>
                <div class="fc-flex__item">
                    <div><span class="font-s18 font-w500">{{bedtkt.name}}</span><span style="color:#6e6e6e">&nbsp;&nbsp;{{bedtkt.sex}}&nbsp;&nbsp;{{bedtkt.age}}岁</span></div>
                    <div class="fc-text-green push-10-t">应住院日期: {{bedtkt.plan_date}}</div>
                </div>
                <div class="text-right" style="line-height:1.8">
                    <span class="fc-text-blue">{{bedtkt.disease_name}}</span>
                </div>
            </div>
        </div>
        <div class="text-left push-10-t pull-10-l pull-10-r fc-flex">
            <div class="icon">

            </div>
            <div class="fc-flex__item">
                <span class="fc-text-danger">请填写拒绝患者入院的理由,该理由内容会发送至患者服务号中。可不填写。</span>
            </div>
        </div>
        <div class="text-left push-20-t pull-10-l pull-10-r fc-flex">
            <div class="icon">
                <i class="iconfont icon-beizhu fc-text-blue font-s18"></i>
            </div>
            <div class="fc-flex__item">
                <div><span class="font-s18 font-w500">拒绝理由</span></div>
                <textarea class="textarea-remark push-10-t form-control" rows="4" v-model="content"></textarea>
                <mt-cell class="push-5-t fc-text-blue remove-bgimg" title="将当前备注信息保存为默认备注"><mt-switch v-model="is_set_default"></mt-switch></mt-cell>

                <div class="push-20-t fc-flex">
                    <div class="fc-flex__item pull-10-r">
                        <mt-button class="fc-bg-blue" style="width:100%" plain type="primary" size="normal" @click.native="clickCancel">取消</mt-button>
                    </div>
                    <div class="fc-flex__item text-right">
                        <mt-button class="fc-bg-blue" style="width:100%"  type="primary" size="normal" @click.native="clickConfirm">拒绝入院</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import common from '../../lib/common.js'
    import api from '../../config/api.js'
    export default {
        data: function() {
            return {
                openid: '',
                content: '',
                is_set_default: false,
                bedtktid: '',
                bedtkt: {},
            }
        },
        methods: {
            'clickCancel': function() {
                this.$router.go(-1);
            },
            'clickConfirm': function() {
                var self = this;
                let is_set_default
                if (this.is_set_default == true) {
                    is_set_default = 1;
                }else {
                    is_set_default = 0;
                }
                this.$messagebox.confirm('一旦拒绝患者将无法撤回,请再次确认').then(action => {
                    var url = api.get('sickbed.refusejson');
                    var params = {
                        openid: this.openid,
                        content: this.content,
                        is_set_default: is_set_default,
                        bedtktid: this.bedtktid,
                    }
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            let instance = self.$toast('操作成功!');
                            setTimeout(() => {
                                instance.close();
                                self.$router.go(-1);
                            }, 2000);
                        }
                    })
                }, cancel => {

                });

            }
        },
        created(){
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            var queryString = this.$route.query;
            this.bedtktid = queryString.bedtktid;
            common.getBedtktInfo(this.bedtktid, this.openid,function(response){
                if (response.errno == 0) {
                    self.bedtkt = response.data.bedtkt;
                }
            })
            var url = api.get('sickbed.refuse');
            var params = {
                openid: this.openid,
                bedtktid: this.bedtktid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    self.content = data.bedtkt_refuse_content;
                }
            })
        },
        watch: {
            '$route': function(to, from) {

            }
        },
        mounted: function() {
            document.title = "拒绝患者入院";
        }
    }
</script>
<style scoped>
.refuse-enter {
}
.footer a {
    display: inline-block;
    /*width: 50%;*/
    padding: 10px 0px;
    text-decoration: none;
    color: #fff;
}
.pi-basic {
    padding: 10px;
    border-bottom: 0.5px solid #d9d9d9;
}

.refuse-enter .icon {
    padding: 3px 10px;
    padding-left: 0;
    width: 25px;
    text-align: right;
}
.textarea-remark {
    width: 100%;
    border: 0.5px solid #d9d9d9;
    border-radius: 3px;
}
</style>
