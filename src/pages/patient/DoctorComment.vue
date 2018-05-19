<template>
    <div class="doctorcomment">
        <div class="container">
            <!-- <div class="mint-cell-wrapper">
                <textarea class="form-control" placeholder="请输入批复内容" rows="8" v-model="content"></textarea>
                <div class="mint-field-clear" style="display: none;">
                    <i class="mintui mintui-field-error"></i></div> <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span>
                    <div class="mint-field-other">
                </div>
            </div> -->


            <div class="text-left push-20-t pull-10-l pull-10-r fc-flex">
                <div class="icon">
                    <i class="iconfont icon-beizhu fc-text-blue font-s18"></i>
                </div>
                <div class="fc-flex__item">
                    <div><span class="font-s18 font-w600">批复内容</span></div>
                    <textarea class="textarea-remark push-10-t form-control" rows="6" v-model="content"></textarea>

                    <div class="push-20-t fc-flex">
                        <div class="fc-flex__item pull-10-r">
                            <mt-button class="fc-bg-blue" style="width:100%" plain type="primary" size="normal" @click.native="cancel">取消</mt-button>
                        </div>
                        <div class="fc-flex__item text-right">
                            <mt-button class="fc-bg-blue" style="width:100%" :disabled="content == ''"   type="primary" size="normal" @click.native="submit">提交</mt-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function() {
            return {
                content: '',
                patientid: '',
                patient: {
                    // name: '张三',
                    // sexstr: '男',
                    // agestr: '35岁',
                    // disease: '肺癌',  //多疾病的情况没考虑
                },
            }
        },
        methods: {
            submit: function() {
                let url = api.get('doctorcomment.add4patientpost');
                let params = {
                    content: this.content,
                    patientid: this.patientid,
                }
                let self = this
                common.post(url, params, function(response){
                    let data = response.data;
                    if (response.errno == 0) {
                      let instance = self.$toast({
                          message: '批复成功',
                          iconClass: 'mintui mintui-success',
                      })
                      setTimeout(() => {
                        instance.close();
                        self.$router.go(-1)
                      }, 2000);
                    } else {
                      self.$messagebox.alert(response.errmsg).then(action => {});
                    }
                })
            },
            cancel: function() {
                this.$router.go(-1)
            }
        },
        created: function() {
            this.patientid = this.$route.params.patientid
            let url = api.get('patient.info')
            let params = {
                patientid: this.patientid,
            }
            let self = this
            common.post(url, params, function(response){
                let data = response.data;
                self.patient = data;
            })
        },
        mounted: function() {
            document.title = "批复";
        }
    }
</script>
<style scoped>
    .doctorcomment {
    }
    .container {
        text-align: left;
        display: block;
        background:#fff;
        margin-bottom: 20px;
    }
    .mint-cell-wrapper {
        background-image: none;
    }
    .doctorcomment .icon {
        padding: 2px 10px;
        padding-left: 0;
        width: 25px;
        text-align: right;
    }
</style>
