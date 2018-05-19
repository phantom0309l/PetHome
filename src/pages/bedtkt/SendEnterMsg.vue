<template>
    <div class="SendEnterMsg">
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
                <span class="fc-text-danger">发送确认信息至患者,询问患者是否可以入院<br />点击发送确认通知将会发送确认信息给患者,届时请查收患者反馈。</span>
            </div>
        </div>
        <div class="text-left push-20-t pull-10-l pull-10-r fc-flex">
            <div class="icon">
                <i class="iconfont icon-info fc-text-blue font-s18"></i>
            </div>
            <div class="fc-flex__item">
                <div><span class="font-s18 font-w500">期望患者入院日期</span></div>
                <div class="push-10-t">
                    <input class="form-control" type="text" placeholder="请输入住院日期" v-model="thedate" @click="clickTimeInput" readonly/>
                </div>
                <div class="push-20-t fc-flex">
                    <div class="fc-flex__item pull-10-r">
                        <mt-button class="fc-bg-blue" style="width:100%" plain type="primary" size="normal" @click.native="clickCancel">取消</mt-button>
                    </div>
                    <div class="fc-flex__item text-right">
                        <mt-button class="fc-bg-blue" style="width:100%"  type="primary" size="normal" @click.native="clickConfirm">询问患者</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <template>
            <mt-datetime-picker
                ref="picker"
                type="date"
                v-model="pickerValue"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="startDate">
            </mt-datetime-picker>
        </template>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    export default {
        data: function() {
            return {
                bedtktid: '',
                bedtkt:{},


                openid: '',
                bedtktid: '',
                thedate: '',
                pickerValue: '',
                startDate: '',
            }
        },
        created(){
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            var queryString = this.$route.query;
            self.bedtktid = queryString.bedtktid;

            common.getBedtktInfo(self.bedtktid, self.openid, function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    self.bedtkt = data.bedtkt;
                }
            })

            this.startDate = new Date();
        },
        methods: {
            clickCancel: function() {
                this.$router.go(-1);
            },
            clickConfirm: function() {
                var self = this;
                this.$messagebox.confirm('请再次确认是否发送询问患者通知').then(action => {
                    var url = api.get('sickbed.senddate');
                    var params = {
                        openid: this.openid,
                        bedtktid: this.bedtktid,
                        thedate: this.thedate,
                    }
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            var data = response.data;
                            let instance = self.$toast('通知发送成功!');
                            setTimeout(() => {
                                instance.close();
                                self.$router.go(-1);
                            }, 2000);
                        }
                    })
                }, cancel => {

                });
            },
            clickTimeInput: function() {
                this.$refs.picker.open();
            },
        },
        watch: {
            'pickerValue': function(newValue, oldValue){
                let month = newValue.getMonth() + 1
                if (month < 10) {
                    month = '0' + month
                }
                let date = newValue.getDate()
                if (date < 10) {
                    date = '0' + date
                }
                this.thedate = newValue.getFullYear() + '-' + month + '-' + date;
            }
        },
        mounted: function() {
            document.title = "询问患者可否入院";
        }
    }
</script>
<style scoped>
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

.SendEnterMsg .icon {
    padding: 4px 10px;
    padding-left: 0;
    width: 25px;
    text-align: right;
}
</style>
