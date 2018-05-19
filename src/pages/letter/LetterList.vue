<template>
    <div class="letterlist">
        <div class="letter-body" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
            <h3 id="pgtitle">
                <img src="../../../static/image/thank.png" class="thank-icon"/>
                感谢信
            </h3>
            <div v-for="(letter, index) in letters" class="letter-box">
                <img src="../../../static/image/man.png" class="letter-like"/>
                <span class="ganxieffid">{{letter.patientname}}</span>
                <span class="ganxiedate">{{letter.audittime}}</span>
                <div class="letter-contentbox" v-on:click="clickToChat(letter.patientid)">
                    <p class="ganxiecontent">{{letter.content}}</p>
                    <hr v-if="letters.length != index+1" class="letter-border"/>
                </div>
            </div>
            <div v-if="letters.length == 0" class="no-letterbox">
                <span class="no-lettermsg">您暂时没有收到感谢信。</span>
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
                loading: false,
                openid: '',
                letters: [],
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            self.openid = openid;
            self.loadData();
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('body').setAttribute('class', 'fc-bg-light');
            next();
        },
        beforeRouteLeave(to, from, next) {
            document.querySelector('body').setAttribute('class', '')
            next();
        },
        methods: {
            clickToChat: function(patientid) {
                this.$router.push({name: 'patient-pipelist', params: {'patientid': patientid}});
            },
            loadMore: function(){
                this.loading = true;
                this.loadData();
            },
            loadData: function() {
                var self = this;
                var lastaudittime = '';
                if (self.letters.length != 0 && self.letters[self.letters.length -1].audittime != 'undefined') {
                    lastaudittime = self.letters[self.letters.length-1].audittime;
                }

                var url = api.get('letter.list');
                var params = {
                    openid: self.openid,
                    lastaudittime: lastaudittime,
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        var data = response.data;
                        self.letters = self.letters.concat(data.letters);
                        if(data.letters.length != 0){
                            self.loading = false;
                        }
                    }
                })
            }
        },
        mounted: function() {
            document.title = "感谢信";
        },
        beforeDestroy: function() {

        },
    }
</script>
<style scoped>
.letterlist{
    text-align: left;
    -webkit-font-smoothing: auto;
    font-family: "Segoe UI",Arial,Helvetica,"Microsoft Jhenghei","Hiragino Sans GB","WenQuanYi Zen Hei","Microsoft Yahei",STHeiti,"WenQuanYi Micro Hei",times, sans-serif;
}
.letter-body{
    margin: 30px 15px 10px 15px;
}
#pgtitle{
    text-align: center;
    vertical-align: middle;
    margin-bottom: 30px;
    font-size: 22px;
    color: #555;
}
.thank-icon{
    opacity: 0.8;
    height: 25px;
    width: 25px;
    vertical-align: middle;
    margin-top: -5px;
}
.letter-box{
    margin-top: 0px;
    margin-left: 0px;
}
.letter-like{
    height: 16px;
    width: 16px;
    vertical-align: middle;
    margin-top: -3px;
}
.ganxieffid {
    vertical-align: middle;
    font-size: 16px;
}
.ganxiedate {
    height: 16px;
    bottom: 0px;
    font-size: 12px;
    line-height: 32px;
    color: #999999;
    float: right;
    margin-right: 0px;
}
.letter-contentbox{
    margin-left: 0px;
    margin-top: 0px;
    margin-bottom: 20px;
    width: 100%;
}
.letter-border{
    border: none;
    border-bottom: 1px dashed #eee;
    color: #eee;
    margin-top: 25px;
}
.ganxiecontent {
    border-radius: 3px;
    font-size: 14px;
    color: #666666;
    line-height: 24px;
    letter-spacing: 1px;
    margin-top: 5px;
    font-weight: lighter;
    border: 1px solid #ffd9d9;
    background-color: #fff9f9;
    padding: 10px;
}
.no-letterbox{
    position: none;
    margin-top: 100px;
    text-align: center;
}
.no-lettermsg{
    margin-top: 400px;
    width: 80%;
    padding: 15px;
}
</style>
