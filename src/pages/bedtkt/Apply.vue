<template>
    <div class="bedtkt-apply">
        <p>基本信息</p>
        <div class="patientinfo">
            <div>
                <span class="left">姓名:&nbsp;&nbsp;{{bedtkt.patientname}}</span>
            </div>
            <div>
                <span class="left">年龄:&nbsp;&nbsp;{{bedtkt.agestr}}</span>
            </div>
            <div>
                <span class="left">疾病:&nbsp;&nbsp;{{bedtkt.diseasename}}</span>
            </div>
            <div>
                <span class="left">应住院日期:&nbsp;&nbsp;{{bedtkt.plan_date}}</span>
            </div>
            <p v-if="bedtkt.extra_info.hasOwnProperty('idcard')">身份证号： {{bedtkt.extra_info.idcard}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('zhuyuanhao')">住院号： {{bedtkt.extra_info.zhuyuanhao}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('bingshi')">病史： {{bedtkt.extra_info.bingshi}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('linchuangbiaoxian')">临床表现： {{bedtkt.extra_info.linchuangbiaoxian}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('otherdisease')">其他疾病： {{bedtkt.extra_info.otherdisease}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('shoushuriqi')">手术日期： {{bedtkt.extra_info.shoushuriqi}}</p>
            <p class="pull-5-t" v-if="bedtkt.extra_info.hasOwnProperty('xingongnengfenji')">心功能分级： {{bedtkt.extra_info.xingongnengfenji}}</p>
        </div>
        <p>运营描述</p>
        <div class="auditor_remark">
            <span class="left">{{bedtkt.auditor_remark}}</span>
        </div>
        <div class="picture">
            <div>
                <p>血常规</p>
                <img v-for="one in bedtkt.blood_pictures" :src="one" @click="preview(one)"/>
            </div>
            <div>
                <p>肝肾功</p>
                <img v-for="one in bedtkt.liver_pictures" :src="one" @click="preview(one)"/>
            </div>
            <div>
                <p>住院证</p>
                <img v-for="one in bedtkt.bedtkt_pictures" :src="one" @click="preview(one)"/>
            </div>
            <div v-if="bedtkt.xindiantu.length > 0">
                <p>心电图</p>
                <img v-for="one in bedtkt.xindiantu" :src="one" @click="preview(one)"/>
            </div>
            <div v-if="bedtkt.xueshuantanlitu.length > 0">
                <p>血栓弹力图</p>
                <img v-for="one in bedtkt.xueshuantanlitu" :src="one" @click="preview(one)"/>
            </div>
            <div v-if="bedtkt.fengshimianyijiancha.length > 0">
                <p>风湿免疫检查</p>
                <img v-for="one in bedtkt.fengshimianyijiancha" :src="one" @click="preview(one)"/>
            </div>
            <div v-if="bedtkt.shuqianqitajiancha.length > 0">
                <p>术前其他检查</p>
                <img v-for="one in bedtkt.shuqianqitajiancha" :src="one" @click="preview(one)"/>
            </div>
        </div>

        <div style="clear: both"></div>

        <div class="footer">
            <template v-if="audit_status == 1">
                <button class="mint-button mint-button--success mint-button--large is-disabled">已通过 审核时间：{{bedtkt.doctor_audit_time}}</button>
            </template>
            <template v-if="audit_status == 2">
                <mt-button size="large" type="danger" disabled>已拒绝 审核时间：{{bedtkt.doctor_audit_time}}</mt-button>
            </template>
            <template v-if="audit_status == 0">
                <a class="cn-btn-cancel" href="javascript:" style="width: 50%" @click="clickRefuse">拒绝申请</a><!--
                --><a class="cn-btn-confirm" href="javascript:" style="width:50%" @click="clickPass">通过申请</a>
            </template>
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
                audit_status: 0, //1 审核通过 2审核拒绝，只在status 为2的情况下才有意义
                bedtktid: '',
                bigPics: '',
                bedtkt: {
                    //patientid: '123456',
                    //patientname: '方达文测试',
                    //agestr: '18',
                    //diseasename: '肺癌',
                    //plan_date: '2017-10-01',
                    //auditor_remark: '运营描述运营描述运营描述运营描述',
                    //blood_pictures: [
                    //    'https://photo.fangcunyisheng.com/c/07/c077c187231dd5edadc5c6e651878437.1500_1500.jpeg',
                    //    'https://photo.fangcunyisheng.com/8/28/828a98fcefade955d5a48d8bbd81c743.1500_1500.jpeg',
                    //],
                    //liver_pictures: [
                    //    'https://photo.fangcunyisheng.com/c/07/c077c187231dd5edadc5c6e651878437.1500_1500.jpeg',
                    //    'https://photo.fangcunyisheng.com/8/28/828a98fcefade955d5a48d8bbd81c743.1500_1500.jpeg',
                    //],
                    //bedtkt_pictures: [
                    //    'https://photo.fangcunyisheng.com/c/07/c077c187231dd5edadc5c6e651878437.1500_1500.jpeg',
                    //    'https://photo.fangcunyisheng.com/8/28/828a98fcefade955d5a48d8bbd81c743.1500_1500.jpeg',
                    //],
                    extra_info: {},
                    xindiantu: [],
                    xueshuantanlitu: [],
                    fengshimianyijiancha: [],
                    shuqianqitajiancha: [],
                },
                refusePopupVisible: false,
                confirmPopupVisible: false,
                refuseReason: '',
            }
        },
        methods: {
            clickRefuse: function() {
                this.$router.push({
                    name: 'bedtkt-apply-refuse',
                    params: {
                        'bedtktid': this.bedtktid,
                    }
                })
            },
            clickPass: function() {
                //审核通过
                var url = api.get('bedtkt.applypass');
                var params = {
                    bedtktid: this.bedtktid,
                }
                this.$messagebox.confirm('确定审核通过吗？').then(action => {
                    let self = this
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            self.$router.push({
                                name: 'bedtkt-apply-pass',
                                params: {
                                    'bedtktid': self.bedtktid,
                                }
                            })
                        } else {
                            self.$messagebox.alert(response.errmsg).then(action => {});
                        }
                    })
                }, cancel => {

                })

            },
            preview: function(curSrc) {
              var that = this
              WeixinJSBridge.invoke('imagePreview', {
                'current': that.getBigPic(curSrc),
                'urls': that.bigPics
              });
            },
            getBigPic: function (src) {
                let tmp = src.split(".")
                if (tmp.length != 5) {
                    return src
                }
                let s = tmp[0] + "." + tmp[1] + "." + tmp[2] + ".1500_1500." + tmp[4]
                return s
            }
        },
        created(){
            var self = this;

            var params = this.$route.params;
            this.bedtktid = params.bedtktid;

            var url = api.get('bedtkt.apply');
            var params = {
                bedtktid: this.bedtktid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    self.bedtkt = response.data.bedtkt
                    self.audit_status = response.data.audit_status || 0
                    // self.bedtkt = response.data
                    //self.bigPics = Array.concat(self.bedtkt.blood_pictures, self.bedtkt.liver_pictures, self.bedtkt.bedtkt_pictures)
                    let pics = Array.concat(self.bedtkt.blood_pictures, self.bedtkt.liver_pictures, self.bedtkt.bedtkt_pictures)
                    if (self.bedtkt.hasOwnProperty('xindiantu') && self.bedtkt.xindiantu.length > 0) {
                        pics = Array.concat(pics, self.bedtkt.xindiantu)
                    } else {
                        self.bedtkt.xindiantu = [];
                    }
                    if (self.bedtkt.hasOwnProperty('xueshuantanlitu') && self.bedtkt.xueshuantanlitu.length > 0) {
                        pics = Array.concat(pics, self.bedtkt.xueshuantanlitu)
                    } else {
                        self.bedtkt.xueshuantanlitu = [];
                    }
                    if (self.bedtkt.hasOwnProperty('fengshimianyijiancha') && self.bedtkt.fengshimianyijiancha.length > 0) {
                        pics = Array.concat(pics, self.bedtkt.fengshimianyijiancha)
                    } else {
                        self.bedtkt.fengshimianyijiancha = [];
                    }
                    if (self.bedtkt.hasOwnProperty('shuqianqitajiancha') && self.bedtkt.shuqianqitajiancha.length > 0) {
                        pics = Array.concat(pics, self.bedtkt.shuqianqitajiancha)
                    } else {
                        self.bedtkt.shuqianqitajiancha = [];
                    }
                    self.bigPics = pics.map(function(pic) {
                        return self.getBigPic(pic)
                    });
                }

            })
        },
        watch: {
            '$route': function(to, from) {

            },
        },
        mounted: function() {
            document.title = "住院申请确认";
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
    text-align: left;
    margin-bottom: 30px;
}
.bedtkt-apply p {
    padding-left: 5px;
    margin: 10px 0;
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
