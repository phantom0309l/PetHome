<template>
    <div class="paperone">
        <p class="text-left push-10-b" v-if="score">
            本量表评分：{{score}}
        </p>
        <div class="xanswer-item" v-for="(xanswer, index) in xanswerlist">
            <div class="pull-left xanswer-question" v-html="filterQuestion(xanswer.question)"></div>
            <div style="clear:both"></div>
            <div class="xanswer-answer" :style="getStyle(index)" v-html="xanswer.xanswer"></div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function() {
            return {
                openid: '',
                paperid: '',
                score: '',
                thedate: '',

                xanswerlist: [],
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.paperid = this.$route.params.paperid;
            var url = api.get('paper.one');
            var params = {
                openid: this.openid,
                paperid: this.paperid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    self.xanswerlist = response.data.xanswerlist;
                    self.score = response.data.score;
                    self.thedate = response.data.thedate;
                }
            })
        },
        filters: {

        },
        methods:{
            getStyle: function(index) {
                if (index > 8) {
                    //return "padding-left:27px;"
                }
                return ""
            },
            filterQuestion: function(val) {
                //val = val.replace(/^\d{1,2}\./i, '')
                // let idx = val.indexOf('.')
                // if (idx >=0) {
                //     return val.substr(idx+1)
                // }
                return val
            }
        }
    }
</script>
<style scoped>
    .paperone {
        background: #fff;
        padding: 10px 15px;
    }
    .xanswer-item {
        text-align: left;
        padding: 5px 0;
    }
    .xanswer-question {
        width:100%;
        line-height: 1.5;
    }
    .xanswer-answer {
        padding: 5px;
        padding-left:17px;
    }
</style>
