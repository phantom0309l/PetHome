<template>
    <div class="pipe-list fc-bg-gray">
        <div id="mark" style="position: relative; background-color: rgba(0, 0, 0, 0.3)"></div>
        <div class="pipelist-header pipelist-header-shadow border-b">
            <div class="pi-basic fc-flex">
                <div class="icon">
                    <i class="iconfont icon-icon133 fc-text-blue font-s18 v-a-m"></i>
                </div>
                <div class="fc-flex__item">
                    <div class="text-left"><span class="font-s18 font-w500">{{patient.name}}</span><span>&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;{{patient.age}}&nbsp;&nbsp;</span><span class="fc-text-blue">{{patient.disease_name}}</span></div>
                </div>
                <div class="text-right" style="line-height:1.8" v-show="hasPrivilegeShow()">
                    <button class="mint-button mint-button--primary mint-button--small pull-right fc-bg-blue" @click="clickDoctorComment()"><label class="mint-button-text">批复给医助</label></button>
                </div>
            </div>
            <div class="filterArea fc-flex border-t border-b">
                <div class="fc-flex__item"><a :class="{'filterActive': filterActive == 'all'}" href="javascript:" @click="clickAll">全部</a></div>
                <div class="fc-flex__item"><a :class="{'filterActive': filterActive == 'patient'}" href="javascript:" @click="clickPatient">患者</a></div>
                <div class="fc-flex__item"><a :class="{'filterActive': filterActive == 'auditor'}" href="javascript:" @click="clickAudit">医助</a></div>
                <div class="fc-flex__item"><a :class="{'filterActive': filterActive == 'doctor'}" href="javascript:" @click="clickDoctor">医生</a></div>
            </div>
            <div class="contentInputArea" v-show="hasPrivilegeShow()">
                <div>
                    <form class="fc-flex" style="justify-content: space-around;" action="" onsubmit="return false;">
                        <i class="iconfont icon-jiahao fc-text-blue" style="font-size: 34px; vertical-align: middle;" @touchstart="clickMoreType"></i>
                        <input type="text" class="contentInput" placeholder="回复给患者" v-model="content" v-on:keyup.13="sendMsg" @focus="onFocus()" @blur="onBlur()">
                        <mt-button class="fc-bg-blue" style="margin-top: 2px;" type="primary" size="small" @click="sendMsg">发送</mt-button>
                    </form>
                </div>
                <div v-if="moreType" style="border-top: 0.5px solid #d9d9d9; padding: 10px 15px;margin-top:10px">
                    <a href="javascript:" class="a-input-file a-input-file-photobg">
                        <input id="input-pic-file" class="input-file" type="file"  name="imgfile" value="浏览" @click="uploadImg" />
                    </a>
                </div>
            </div>
        </div>
        <div id="J_body" class="body" @click="clickBody">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" class="pipelist-ul">
                <li v-for="pipe in pipes" class="li-item">
                    <div class="pipe-from" style="">
                        <div>
                            <span class="pipe-title" :style="getStyle(pipe)">{{pipe.title}}</span>
                            <span style="padding:5px 10px 10px 10px; float: right; color: #555">{{pipe.createtime}}</span>
                            <div style="clear: both;"></div>
                        </div>
                        <div v-if="pipe.type=='text'">
                            <p style="clear: both;word-break: break-all; text-align: left; margin-left: 10px;padding: 5px 5px 5px 0px;line-height:1.5">{{pipe.content}}</p>
                        </div>
                        <div v-if="pipe.type == 'picture'" style="padding:10px;">
                            <img class="photo-gallery-img" :src="pipe.picture.thumb_url" @click="preview(pipe.picture.url, pics)"/>
                        </div>
                    </div>
                </li>
            </ul>
            <div  v-if="pipes.length == 0" style="position: none;margin-top: 200px;">
                <span style="margin-top:400px;width:80%; padding: 15px">暂无数据</span>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    import lodash from 'lodash'
    export default {
        data: function() {
            return {
                content: '',

                moreType: false,

                openid: '',
                filter: 'all',
                filterActive: 'all',
                patient:{},
                pipes: [
                    // {
                    //     owner_type: 'Patient',
                    //     title: '患者回复',
                    //     type: 'picture',
                    //     picture:{
                    //         thumb_url: 'http://photo.fangcunyisheng.com/8/20/820114d19871d260431fc0620a429fe5.300_300.jpeg',
                    //     }
                    // }
                ],
                pics: [],
                curr_doctorid: '',
                is_superior: 0,

                timer: null,
            }
        },
        created: function() {
            var windowHeight = $(window).height(); //浏览器当前的高度
            this.$nextTick(() => {
                $('#mark').height(windowHeight);
            });

            var self = this;

            var openid = localStorage.getItem('_openid_');
            var patientid = this.$route.params.patientid;
            $.ajax({
                url: api.get('pipe.pipelist'),
                type: 'post',
                dataType: 'json',
                data: {
                    openid: openid,
                    patientid: patientid,
                }
            }).done(function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    self.pipes = data.pipes;
                    self.patient = data.patient;
                    self.openid = openid;
                    self.curr_doctorid = data.curr_doctorid
                    self.is_superior = data.is_superior

                    self.pipes.map(function(pipe) {
                        if (pipe.type == 'picture') {
                            self.pics.push(pipe.picture.url)
                        }
                    })

                    self.$nextTick(() => {
                        var height = $('.pipelist-header').css('height');
                        $('.body').css('padding-top', height);
                    })
                }
            })
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('body').setAttribute('class', 'fc-bg-gray');
            next();
        },
        beforeRouteLeave(to, from, next) {
            document.querySelector('body').setAttribute('class', '')
            next();
        },
        methods: {
            onFocus: function() {
                $('#mark').css('z-index', 200);
                $('.pipelist-header').removeClass('pipelist-header-shadow');
            },
            onBlur: function() {
                $('#mark').css('z-index', '');
                $('.pipelist-header').addClass('pipelist-header-shadow');
            },
            hasPrivilegeShow: function() {
                return this.curr_doctorid == this.patient.doctorid || (this.curr_doctorid == 32 && this.patient.doctorid == 1294)
            },
            getStyle: function(pipe) {
                return "background-color:#" + pipe.color
            },
            clickDoctorComment: function() {
                let patientid = this.patient.patientid;
                this.$router.push({
                    name: 'patient-doctorcomment',
                    params: {
                        patientid: patientid,
                    }
                })
            },
            preview: function(curSrc) {
                var that = this
                WeixinJSBridge.invoke('imagePreview', {
                    'current' : curSrc,
                    'urls' :  that.pics
                });
            },
            getPicIndex: function(pictureid) {
                for (let i=0; i<this.pics.length;i++) {
                    if (this.pics[i].pictureid == pictureid) {
                        return i
                    }
                }
                return -1
            },
            uploadImg: function(e) {
                var self = this;
                var url = api.get('picture.addjson');
                var inputfile = $('#input-pic-file');
                inputfile.fileupload({
                    url:url,
                    formData:{
                    },
                    dataType:"json",
                    success: function(response) {
                        if (response.errno == 0) {
                            self.uploadImgId(response.data.pictureid);
                        }
                    }
                });
            },
            uploadImgId: function(pictureid) {
                var self = this;
                var url = api.get('wxpicmsgmgr.sendpic2onepatient');
                var params = {
                    openid: this.openid,
                    patientid: this.patient.patientid,
                    pictureid: pictureid,
                }
                common.post(url, params, function(response){
                    console.log('send...', response);
                    if (response.errno == 0) {
                        let instance = self.$toast('发送成功');
                        setTimeout(() => {
                            instance.close();
                        }, 1000);
                        self.content = '';
                        self.moreType = false;
                        self.fetchData();
                        $('input').blur();
                        $(".body").animate({
                            scrollTop: 0,
                        }, 0);
                    }
                })
            },
            sendMsg: function() {
                var self = this;
                if (this.content.trim() == '') {
                    $('input').blur();
                    return ;
                }
                var url = api.get('pushmsg.sendmsg2onepatient');
                var params = {
                    openid: this.openid,
                    content: this.content,
                    patientid: this.patient.patientid,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        let instance = self.$toast('发送成功');
                        setTimeout(() => {
                            instance.close();
                        }, 1000);
                        self.content = '';
                        self.fetchData();
                        $('input').blur();
                        $(".body").animate({
                            scrollTop: 0,
                      }, 0);
                    }
                })
            },
            clickBody: function() {
                $('input').blur();
            },
            clickMoreType: function() {
                this.moreType = !this.moreType;
            },
            clickAll: function() {
                if ($.trim(this.filter) == "all") {
                    return ;
                }
                this.filter = 'all';
                this.filterActive = 'all';
                this.fetchData();
            },
            clickPatient: function() {
                if ($.trim(this.filter) == "patient") {
                    return ;
                }
                this.filter = 'patient';
                this.filterActive = 'patient';
                this.fetchData();
            },
            clickAudit: function() {
                if ($.trim(this.filter) == "auditor") {
                    return ;
                }
                this.filter = 'auditor';
                this.filterActive = 'auditor';
                this.fetchData();
            },
            clickDoctor: function() {
                if ($.trim(this.filter) == "doctor") {
                    return ;
                }
                this.filter = 'doctor';
                this.filterActive = 'doctor';
                this.fetchData();
            },
            loadMore: function(){
                this.loading = true;
                this.loadMoreData();
            },
            fetchData: function() {
                var self = this;
                var pipeid = '';
                if (self.pipes.length != 0 && self.pipes[self.pipes.length -1].pipeid != 'undefined') {
                    pipeid = self.pipes[self.pipes.length-1].pipeid;
                }
                var openid = localStorage.getItem('_openid_');
                self.openid = openid,
                $.ajax({
                    url: api.get('pipe.pipelist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: self.openid,
                        patientid: self.patient.patientid,
                        filter: self.filter,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.pipes = data.pipes;
                        self.pipes.map(function(pipe) {
                            if (pipe.type == 'picture') {
                                // self.pics.push({
                                //     pictureid: pipe.picture.pictureid,
                                //     src: pipe.picture.url,
                                //     w: pipe.picture.width,
                                //     h: pipe.picture.height,
                                // })
                                self.pics.push(pipe.picture.url)
                            }
                        })
                    }
                })
            },
            loadMoreData: function() {
                var self = this;
                var pipeid = '';
                if (self.pipes.length != 0 && self.pipes[self.pipes.length -1].pipeid != 'undefined') {
                    pipeid = self.pipes[self.pipes.length-1].pipeid;
                }
                $.ajax({
                    url: api.get('pipe.pipelist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: self.openid,
                        lastpipeid: pipeid,
                        patientid: self.patient.patientid,
                        filter: self.filter,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.pipes = self.pipes.concat(data.pipes);
                        data.pipes.map(function(pipe) {
                            if (pipe.type == 'picture') {
                                self.pics.push(pipe.picture.url)
                            }
                        })
                        self.loading = false;
                    }
                })
            }
        },
        mounted: function() {
            document.title = "医患交流";
        },
        beforeDestroy: function() {

        },
    }
</script>
<style scoped>
    .body {
        height: 100%;
        width: 100%;
        -webkit-overflow-scrolling: touch;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
        outline:none;
        background: #eee;
        position: absolute;
        top: 0;
        overflow: scroll;
        z-index: 100;
        padding-top: 153px;
    }
    .pi-basic {
        padding: 10px;
        align-items: center;
    }
    .pipe-list {
        overflow: auto;
        position: relative;
        z-index: 0;
    }
    .pipe-list .icon {
        padding: 4px 10px;
        padding-left: 0;
        width: 25px;
        text-align: right;
    }

    .pipelist-ul .li-item {
        border-bottom: 0.5px solid #d9d9d9;
    }

    .pipelist-header {
        position: absolute;
        top: 0;
        left: 0px;
        width: 100%;
        background-color: #fff;
        z-index: 1000;
    }
    .pipelist-header-shadow {
        box-shadow: 0px 2px 4px #d9d9d9;
    }
    .filterArea {
        text-align: center;
        width: 100%;
        background-color: #fff;
    }
    .filterArea a {
        border-left: 0.5px solid #d9d9d9;
        display: inline-block;
        color: #4472c5;
        text-decoration: none;
        padding: 10px 0px;
        background: #fff;
        width: 100%;
    }
    .filterArea :first-child {
        border-left: 0;
    }
    .pipelist-ul {
        list-style-type: none;
        padding:0px;
    }
    .pipe-from {
        background: #fcfcfc;
        padding: 10px 10px 10px 0px;
    }
    .pipe-title {
        float: left;
        margin: 0px 0px 0px 0px;
        padding: 5px 10px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        color: #fff;
        font-size: 14px;
    }

    .filterArea a.filterActive {
        background-color: #4472c5;
        color: #fff;
    }
    a.a-input-file{
        display:block;
        width:34px;
        height:34px;
        position:relative;
        overflow:hidden;
    }
    .a-input-file-photobg {
        background-image: url('../../../static/image/photo.png');
        background-repeat: no-repeat;
        background-size: 34px;
    }
    .input-file {
        position:absolute;
        right:0; top:0;
        font-size:100px;
        opacity:0;
        filter:alpha(opacity=0);
    }
    .photo-gallery-img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
    #footer {
        width: 100%;
        bottom:0;
        left:0;
        position: absolute;
        background-color: #eee;
        border-top: 0.5px solid #d9d9d9;
        text-align: left;
        padding: 5px 0px
    }
    .contentInputArea {
        text-align: left;
        width: 100%;
        padding: 10px 10px;
    }
    .contentInput {
        padding: 8px;
        margin-left: 5px;
        margin-right: 5px;
        border: 0.5px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        box-sizing:border-box;
        vertical-align: middle;
        font-size: 16px;
        -webkit-appearance: none;
        flex: 1;
    }
</style>
