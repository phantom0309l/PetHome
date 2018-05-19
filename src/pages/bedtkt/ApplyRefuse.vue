<template>
    <div class="bedtkt-apply">
        <div class="popup-refuse">
            <p class="remove-margin-b">请您填写拒绝申请理由，以便医生助理与患者沟通</p>
            <div class="mint-cell-value">
                <textarea placeholder="" rows="8" class="mint-field-core content-refusereason" v-model="refuseReason"></textarea>
            </div>
            <button class="mint-button mint-button--primary mint-button--large push-20-t" @click="clickConfirm"><!----> <label class="mint-button-text">确认</label></button>
            <button class="mint-button mint-button--danger mint-button--large push-10-t" @click="clickCancel"><!----> <label class="mint-button-text">取消</label></button>
        </div>
    </div>
</template>
<script>
    import common from '../../lib/common.js'
    import api from '../../config/api.js'
    import utils from '../../lib/utils.js'
    export default {
        data: function() {
            return {
                refuseReason: '',
            }
        },
        methods: {
            clickConfirm: function() {
                let url = api.get('bedtkt.applyrefuse');
                let params = {
                    bedtktid: this.bedtktid,
                    content: this.refuseReason,
                }
                let self = this
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        let instance = self.$toast({
                            message: '提交成功',
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
            clickCancel: function() {
                this.$router.go(-1)
            },
        },
        created(){
            var params = this.$route.params;
            this.bedtktid = params.bedtktid;
        },
        watch: {
            '$route': function(to, from) {

            },
        },
        mounted: function() {
            document.title = "住院申请拒绝";
        },
        beforeRouteEnter(to, from, next) {
          document.querySelector('body').setAttribute('class', 'fc-bg-gray')
          next();
        },
        beforeRouteLeave(to, from, next) {
          document.querySelector('body').setAttribute('class', '')
          next();
        },
    }
</script>
<style scoped>
.bedtkt-apply {
    padding: 5px;
    margin-top: 10px;
    text-align: left;
}
.bedtkt-apply p {
    padding-left: 5px;
}
.footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    left: 0px;
    text-align: center;
}
.footer a {
    display: inline-block;
    /*width: 50%;*/
    padding: 10px 0px;
    text-decoration: none;
    color: #fff;
}

.patientinfo, .auditor_remark {
    background: #fff;
    padding: 10px;
}
.auditor_remark {
    margin-top: 10px;
}

.patientinfo span {
    display: inline-block;
    padding: 3px 0;
}
.picture img {
    width: 100%;
    margin-bottom: 10px;
}
.mint-popup {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.popup-refuse .content-refusereason {
    margin: 5px 5px;
    border: 0.5px solid #ddd;
    border-radius: 3px;
    color: #353535;
}
.popup-refuse {
    padding-left: 10px;
    padding-right: 10px;
}


</style>
