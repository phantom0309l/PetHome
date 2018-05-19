<template>
    <div class="revisitrecordlist">
        <div class="item-div" v-for="(item, index) in items" @click="openOrClose(item, index)">
            <div class="title">
                <span class="pull-right flag" :class="getTagClass(item.typestr)">{{item.typestr | filterTypestr}}</span>
                <span style="color: #666; line-height: 1.9">{{item.thedate}}</span>
            </div>
            <div style="padding: 10px" v-if="item.typestr == '治疗'">
                <span style="line-height:1.5">{{item.hospital}}</span>
            </div>
            <div v-if="item.typestr == '治疗' && item.show == true" style="padding: 10px; margin-left: 10px;border-top: 0.5px dashed #d9d9d9">
                <table>
                    <tr>
                        <th>医院/时间/方案/性质/疗程</th>
                    </tr>
                    <tr>
                        <td>
                            化疗医院：{{item.hospital}}<br/>
                            开始时间：{{item.startdate}}<br/>
                            化疗方案：{{item.pkg_name}}<br/>
                            化疗性质：{{item.type}}<br/>
                            化疗疗程：{{item.stage}}
                        </td>
                    </tr>
                    <tr>
                        <th>进展原因</th>
                    </tr>
                    <tr>
                        <td>{{item.progress_reason}}</td>
                    </tr>
                    <tr>
                        <th>具体用药</th>
                    </tr>
                    <tr>
                        <td v-html="getPkgItems(item.pkg_items)"></td>
                    </tr>
                    <tr>
                        <th>疗效</th>
                    </tr>
                    <tr>
                        <td>{{item.effect_name}}</td>
                    </tr>
                    <tr>
                        <th>评价依据</th>
                    </tr>
                    <tr>
                        <td>{{item.effect_content}}</td>
                    </tr>
                    <tr>
                        <th>不良反应</th>
                    </tr>
                    <tr>
                        <td v-html="getSideEffect_items(item.sideeffect_items)"></td>
                    </tr>
                    <tr>
                        <th>放疗</th>
                    </tr>
                    <tr>
                        <td v-html="getChemosLog(item)"></td>
                    </tr>

                </table>
            </div>
            <div style="padding: 10px" v-if="item.typestr != '治疗'" >
                <span style="line-height:1.5">{{item.checkuptpltitle}}</span>
            </div>
            <div v-if="item.typestr != '治疗' && item.show==true" style="padding: 10px; margin-left: 10px;border-top: 0.5px dashed #d9d9d9">
                <div v-for="checkup in item.checkup">
                    <table>
                        <tr>
                            <th colspan="2">{{checkup.checkuptpl.title}} {{checkup.check_date}} {{checkup.hospitalstr}}</th>
                        </tr>
                        <tr v-for="answer in checkup.xanswersheet.answers">
                            <td>{{answer.xquestionname}}</td>
                            <td>{{answer.content}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
        <div class="noData" v-if="items.length == 0">
            <span>记录为空</span>
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
                patientid: '',

                items: [],
                revisitrecords: [],
                chemos: [],
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.patientid = this.$route.query.patientid;
            var url = api.get('revisitrecord.list');
            var params = {
                openid: this.openid,
                patientid: this.patientid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    self.revisitrecords = response.data.revisitrecords;
                    // console.log(self.revisitrecords);
                    self.chemos = response.data.chemos;
                    // console.log(self.chemos);
                    self.revisitrecords.map(function(revisitrecord){
                        revisitrecord.show = false;
                        revisitrecord.checkuptpltitle = revisitrecord.checkup.map(function(checkup){
                            return checkup.checkuptpl.title
                        }).join(' ');
                    });

                    self.chemos.map(function(one){
                        one.thedate = one.startdate;
                        one.show = false;
                        one.typestr = '治疗';
                    })

                    self.items = self.revisitrecords.concat(self.chemos);
                    self.items.sort(function(x, y){
                        if (x.thedate > y.thedate) {
                            return -1;
                        }else if (x.thedate < y.thedate) {
                            return 1;
                        }else {
                            return 0;
                        }
                    })
                    console.log('55555',self.items);
                }
            })
        },
        methods:{
            getPkgItems: function(pkg_items) {
                var result = '';
                pkg_items.map(function(pkg_item){
                    result += pkg_item.name + " " + pkg_item.method3 + " " + pkg_item.pickedmethod4 + " " + pkg_item.pickedtime + " " + pkg_item.remark + "<br/>";
                })
                return result;
            },
            getSideEffect_items: function(sideeffect_items) {
                var result = '';
                sideeffect_items.map(function(sideeffect_item){
                    result += sideeffect_item[0] + ' ' + sideeffect_item[1] + '<br/>';
                })
                return result;
            },
            getChemosLog: function(item) {
                var result = '';
                result = "开始日期 " + item.x_startdate + "<br/>" + '部位 ' + item.x_part + "<br/>" + "模式 " + item.x_type + "剂量 " + item.x_dose + "<br/>" + "持续时间 " + item.x_timespan;
                return result;
            },
            openOrClose: function(item, index){
                item.show = !item.show;
                // this.items.$set(item, index);
                this.$set(this.items, index, item);
            },
            getTagClass: function(typestr) {
                let str
                if (typestr == '门诊') {
                    str = 'flag1'
                } else if (typestr == '住院' || typestr == '出院') {
                    str = 'flag2'
                } else if (typestr == '手术' || typestr == '治疗') {
                    str = 'flag3'
                } else if (typestr == '随访') {
                    str = 'flag4'
                }
                return str
            }
        },
        filters: {
            filterTypestr: function(val) {
                if (val == '') {
                    return "量表"
                }
                return val
            }
        },
        mounted: function() {
            document.title = "数据查询";
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
    .revisitrecordlist .item-div {
        text-align: left;
        padding: 10px;
        background-color:#fff;
        margin-top: 10px;
    }
    .revisitrecordlist .item-div:first-child {
        margin-top: 0;
    }
    .item-div .flag {
        color: #fff;
        font-size: 14px;
        padding: 2px 5px;
        border-radius: 3px;
        box-sizing: border-box;
        display: inline-block;
    }
    .item-div .flag1 {
        background-color: #EFFFED;
        color: #1AAD19;
    }
    .item-div .flag2 {
        background-color: #FBE7E4;
        color: #EB476D;
    }
    .item-div .flag3 {
        background-color: #FFEBCC;
        color: #FFB86C;
    }
    .item-div .flag4{
        background-color: #D0E9FF;
        color: #37C6C0;
    }
    .item-div .title {
        border-bottom: 0.5px solid #d9d9d9;
    }
    .xanswer-item {
        text-align: left;
        padding: 5px 10px;
    }
    .xanswer-question {
        padding: 5px;
    }
    .xanswer-answer {
        padding: 5px;
        background-color: #eee;
    }
    .noData {
        position: absolute;
        width: 100%;
        top: 40%;
    }
</style>
