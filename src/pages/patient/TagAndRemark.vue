<template>
    <div class="tag-and-remark text-left">
        <div class="text-left push-20-t fc-flex">
            <div class="icon">
                <i class="iconfont icon-beizhu fc-text-blue font-s18"></i>
            </div>
            <div class="fc-flex__item">
                <div><span class="font-s18 font-w500">患者备注</span></div>
                <textarea style="background-color:#fff" class="textarea-remark push-10-t form-control" rows="6" v-model="remark_doctor_forpost"></textarea>
            </div>
        </div>
        <div class="text-left push-20-t fc-flex">
            <div class="icon">
                <i class="iconfont icon-biaoqian fc-text-blue font-s18"></i>
            </div>
            <div class="fc-flex__item">
                <div><span class="font-s18 font-w500">标签列表</span></div>
                <mt-checklist
                align = "right"
                v-model = "selectTags"
                :options = "patienttagtplArr">
                </mt-checklist>
            </div>
        </div>
        <div class="push-20-t fc-flex">
            <div class="fc-flex__item">
                <mt-button class="fc-bg-blue" style="width:100%"  type="primary" size="normal" @click.native="modifyPost">修改提交</mt-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .tag-and-remark {
        font-size: 16px;
        font-size: 1.6rem;
        background-color: #fff;
        padding: 0 10px 10px 10px;
    }
    .mint-cell div.mint-cell-wrapper {
        padding-left: 0px;
    }

    .tag-and-remark .icon {
        padding: 2px 10px;
        padding-left: 0;
        width: 25px;
        text-align: right;
    }
</style>
<style>
    .tag-and-remark .mint-cell-wrapper, .tag-and-remark .mint-checklist-label {
        padding-left: 0 !important;
    }
</style>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                patientid: '',
                patienttagArr: [],
                patienttagtplArr: [],
                selectTags: [],
                remark_doctor: '',
                remark_doctor_forpost: '',
            }
        },
        methods: {
            init: function() {
                document.title="设置标签"
                this.patientid = this.$route.params.patientid || '';
            },
            fetchData: function() {
                this.getPatientTagAndRemark();
                this.getPatientTagTplArr();
            },
            getPatientTagAndRemark: function() {
                var self = this;
                var url = api.get('patienttag.list');
                var params = {
                    patientid: self.patientid,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        self.patienttagArr = response.data.patienttagArr;
                        self.remark_doctor = response.data.remark_doctor;
                        self.remark_doctor_forpost = response.data.remark_doctor;
                        self.selectTags = self.initSelectTags();
                    }
                })
            },
            getPatientTagTplArr: function() {
                var self = this;
                var url = api.get('patienttagtpl.list');
                var params = {
                };
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        var patienttagtpls = response.data.patienttagtpls;
                        self.patienttagtplArr = self.initChecklistOptions(patienttagtpls);
                    }
                })
            },
            initChecklistOptions: function(patienttagtpls) {
                var options = [];
                for (var i = 0; i < patienttagtpls.length; i++) {
                    var obj = {};
                    obj.label = patienttagtpls[i].name;
                    obj.value = patienttagtpls[i].patienttagtplid;

                    options[i] = obj;
                }
                return options;
            },
            initSelectTags: function(){
                var selectTags = [];
                for (var i = 0; i < this.patienttagArr.length; i++) {
                    selectTags[i] = this.patienttagArr[i]['patienttagtplid'];
                }
                return selectTags;
            },
            modifyPost: function() {
                var self = this;
                this.$messagebox.confirm('您确定要提交修改吗?').then(action => {
                    var url = api.get('patienttag.modifypost');
                    var params = {
                        patienttags: self.selectTags,
                        remark_doctor: self.remark_doctor_forpost,
                        patientid: self.patientid,
                    }
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            let instance = self.$toast('修改成功');
                            self.$router.go(-1);
                            setTimeout(() => {
                                instance.close();
                            }, 2000);
                        }
                    })
                }, cancel => {

                });
            }
        },
        created: function() {
            this.init();
            this.fetchData();
        },
        mounted: function() {

        }
    }
</script>
