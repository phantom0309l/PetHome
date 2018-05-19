<template>
    <div class="">
        <p class="fc-bg-blue fc-text-white text-left border-b pd-15">
            请编辑工作内容
        </p>
        <div class="fc-cells pd-15">
            <div class="fc-cell fc-cell_access border remove-padding-t remove-padding-b">
                <div class="fc-cell__hd"></div>
                <div class="fc-cell__bd">
                    <input class="fc-date" type="text" placeholder="请选择日期" v-model="theDate" readonly :disabled="workcalendarid != ''" onfocus="this.blur();" @click="openDatePicker()"/>
                </div>
                <div class="fc-cell__ft">
                </div>
            </div>
        </div>
        <div class="fc-cells fc-cells_checkbox remove-margin-t border-b">
            <template v-for="config in configs">
                <div>
                    <label class="fc-cell fc-check__label">
                        <div class="fc-cell__hd">
                            <input type="checkbox" class="fc-check" :name="config.key" v-model="config.checked" :true-value="1" :false-value="0"/>
                            <i class="fc-icon-checkbox-checked"></i>
                        </div>
                        <div class="fc-cell__bd"><p class="fc-text-blue">{{config.title}}</p></div>
                        <div class="fc-cell__ft"></div>
                    </label>
                    <template v-if="config.type == 'checkbox'">
                        <wc-checkbox :config="config" :parent="config"></wc-checkbox>
                    </template>
                    <template v-else-if="config.type == 'radio'">
                        <div class="fc-cell__collapse fc-cells remove-margin-t" v-if="config.options">
                            <label class="fc-cell fc-radio__label" v-for="(value, key) in config.options">
                                <div class="fc-cell__hd">
                                    <input type="radio" class="fc-radio" v-model="config.selected" :value="key" @change="config.checked = 1"/>
                                    <i class="fc-icon-radio-checked"></i>
                                </div>
                                <div class="fc-cell__bd"><p>{{value}}</p></div>
                            </label>
                        </div>
                    </template>
                    <template v-else-if="config.type == 'textarea'">
                        <div class="fc-cell__collapse fc-cells remove-margin-t">
                            <div class="fc-cell remove-padding no-border-b">
                                <!-- <div class="fc-cell__hd"></div> -->
                                <div class="fc-cell__bd pd-15">
                                    <textarea class="fc-textarea" placeholder="请填写内容" rows=4 v-model="config.value" @input="config.checked = 1"></textarea>
                                </div>
                                <!-- <div class="fc-cell__ft"></div> -->
                            </div>
                        </div>
                    </template>
                    <template v-else-if="config.type == 'input'">
                        <div class="fc-cell__collapse fc-cells remove-margin-t">
                            <div class="fc-cell remove-padding no-border-b">
                                <!-- <div class="fc-cell__hd"></div> -->
                                <div class="fc-cell__bd pd-15">
                                    <input class="fc-input-text" type="text" placeholder="请填写" v-model="config.value" @input="config.checked = 1"/>
                                </div>
                                <!-- <div class="fc-cell__ft"></div> -->
                            </div>
                        </div>
                    </template>
                </div>
            </template>
        </div>
        <div class="btn-area">
            <button class="fc-btn fc-btn_default" style="margin-right: 10px;" @click="cancel()">取消</button>
            <button class="fc-btn fc-btn_primary" @click="modifyOrAddPost()">保存</button>
        </div>
        <template>
            <mt-datetime-picker
                ref="picker"
                type="date"
                v-model="pickerValue"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="startDate"
                @confirm="handleConfirm">
            </mt-datetime-picker>
        </template>
    </div>
</template>
<style scoped>
* {
    text-align: left;
}

/* Cells begin */
.fc-cells {
    /*margin-top: 1.17647059em;*/
    background-color: #FFFFFF;
    line-height: 1.47058824;
    font-size: 17px;
    overflow: hidden;
    position: relative;
}

/*.fc-cells:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
}

.fc-cells:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
}*/

.fc-cells input, .fc-cells textarea, .fc-cells label[for] {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-shadow:0px 0px 0px rgba(0,0,0,0);
     -webkit-appearance:none;
}

.fc-cells__title + .fc-cells {
    margin-top: 0;
}

.fc-cells_checkbox .fc-cell__hd {
    padding-right: 0.35em;
}
/* Cells end */


/* Cell begin */
.fc-cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.fc-cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
}

.fc-cell.no-border-b .fc-cell__bd {
    padding-top: 0;
}

.fc-cell.no-border-b:before {
    content: none;
}

.fc-cell_access {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: inherit;
}

.fc-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}

.fc-cell_access .fc-cell__ft {
    padding-right: 13px;
    position: relative;
}

.fc-cell__ft {
    text-align: right;
    color: #999999;
}

.fc-cell_access .fc-cell__ft:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
}
/* Cell end */


/* 折叠 begin */
.fc-cell__collapse {
    color: #666;
    padding: 0 0 0 25px;
}

.fc-cell__collapse .fc-cell__collapse {
    color: #666;
}
/* 折叠 end */


/* icon begin */
.fc-check__label {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

[class^="fc-icon-"], [class*=" fc-icon-"] {
    display: inline-block;
    background-color: #fff;
    border-radius: 100%;
    border: 1px solid #bbb;
    position: relative;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}

.fc-icon-checkbox-checked {
    border-radius: 4px;
}

.fc-check, .fc-radio {
    position: absolute;
    left: -9999em;
}

.fc-check:checked+.fc-icon-checkbox-checked, .fc-radio:checked+.fc-icon-radio-checked {
    /*background-color: #26a2ff;
    border-color: #26a2ff;*/
    background-color: #336dd5;
    border-color: #336dd5;
}
/* icon begin */

/* 复选 begin */

.fc-check:checked+.fc-icon-checkbox-checked:after {
    border-color: #fff;
    -webkit-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
}

.fc-icon-checkbox-checked:after {
    border: 2px solid transparent;
    border-left: 0;
    border-top: 0;
    content: " ";
    top: 2px;
    left: 6px;
    position: absolute;
    width: 6px;
    height: 10px;
    -webkit-transform: rotate(45deg) scale(0);
    transform: rotate(45deg) scale(0);
    -webkit-transition: -webkit-transform .2s;
    transition: -webkit-transform .2s;
    transition: transform .2s;
    transition: transform .2s,-webkit-transform .2s;
}
/* 复选 end */


/* 单选 begin */
.fc-radio:checked+.fc-icon-radio-checked:after {
    background-color: #fff;
    -webkit-transform: scale(1);
    transform: scale(1);
}

.fc-icon-radio-checked:after {
    content: " ";
    border-radius: 100%;
    top: 5px;
    left: 5px;
    position: absolute;
    width: 8px;
    height: 8px;
    -webkit-transition: -webkit-transform .2s;
    transition: -webkit-transform .2s;
    transition: transform .2s;
    transition: transform .2s,-webkit-transform .2s;
    -webkit-transform: scale(0);
    transform: scale(0);
}
/* 单选 end */


/* 日期 begin */
.fc-date {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
    z-index: 100;
}
/* 日期 end */


/* 文本域 begin */
.fc-textarea {
    display: block;
    border: 0.5px solid #e5e5e5;
    border-radius: 5px;
    resize: none;
    width: 100%;
    color: inherit;
    font-size: 1em;
    line-height: inherit;
    outline: 0;
    padding: 10px;
}
/* 文本域 end */

/* 输入框 begin */
.fc-input-text {
    display: block;
    border: 0.5px solid #e5e5e5;
    border-radius: 5px;
    width: 100%;
    color: inherit;
    font-size: 1em;
    line-height: inherit;
    outline: 0;
    padding: 10px;
}
/* 输入框 end */

/* 按钮域 begin */
.btn-area {
    padding: 15px;
    display: flex;
    justify-content: space-around;
}
/* 按钮域 end */

</style>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    import utils from '../../lib/utils.js'
    export default {
        data: function() {
            return {
                patientid: '',
                workcalendarid: '',
                theDate: '',
                pickerValue: '',
                configs: [],
            }
        },
        methods: {
            init: function() {
                document.title="患者日历"
                this.patientid = this.$route.query.patientid || '';
                this.workcalendarid = this.$route.query.workcalendarid || '';
                this.theDate = this.$route.query.thedate || utils.getNowDate();
                var d = new Date(this.theDate.replace(/-/g,"/"));
                var today = new Date();
                // 欣宇说：先不用判断了，随便补、
                // if (d < today) {
                //     this.theDate = utils.getNowDate();
                // }
                this.pickerValue = new Date(this.theDate.replace(/-/g,"/"));
                this.startDate = new Date();
            },
            fetchData: function() {
                if (this.workcalendarid != '') {
                    this.getOne();
                } else {
                    this.getConfigs();
                }
            },
            openDatePicker() {
                this.$refs.picker.open();
            },
            handleConfirm(date) {
                this.theDate = utils.formatDate(date);
            },
            getOne: function() {
                var self = this;
                var url = api.get('doctorworkcalendar.one');
                var params = {
                    patientid: self.patientid,
                    workcalendarid: self.workcalendarid,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        self.configs = response.data.configs;
                        self.theDate = response.data.thedate;
                    }
                })
            },
            getConfigs: function() {
                var self = this;
                var url = api.get('doctorworkcalendar.configs');
                var params = {
                    patientid: self.patientid,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        self.configs = response.data.configs;
                    } else {
                        let instance = self.$toast(response.errmsg);
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                })
            },
            modifyOrAddPost: function() {
                var self = this;
                if (this.theDate == '' || this.theDate == null || this.theDate == undefined) {
                    self.$messagebox.alert("请选择日期").then(action => {})
                    return false;
                }
                this.$messagebox.confirm('确定保存吗?').then(action => {
                    var url = api.get('doctorworkcalendar.addormodifyjson');
                    var params = {
                        patientid: self.patientid,
                        workcalendarid: self.workcalendarid,
                        thedate: self.theDate,
                        content: self.configs,
                    }
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            let instance = self.$toast('保存成功');
                            setTimeout(() => {
                                instance.close();
                            }, 2000);
                            self.$router.go(-1);
                        } else {
                            self.$messagebox.alert(response.errmsg).then(action => {})
                        }
                    })
                }, cancel => {

                });
            },
            cancel: function() {
                this.$router.go(-1);
            }
        },
        created: function() {
            this.init();
            this.fetchData();
        },
        components: {
            'wc-checkbox': function(resolve) {
                require(['../../components/WorkCalendar_checkbox.vue'], resolve);
            },
        }
    }
</script>
