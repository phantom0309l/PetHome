<template>
    <div class="templateBox weektasklist">
        <div class="page-navbar">

            <div class="mint-navbar page-part">
                <a class="mint-tab-item is-selected" v-on:click="tab(0, $event)">
                    当前任务
                </a>
                <a class="mint-tab-item" v-on:click="tab(1, $event)">
                    全部任务
                </a>
            </div>

            <div class="mint-tab-container">
                <div class="mint-tab-container-wrap">
                    <div class="mint-tab-container-item" v-show="num == 0">
                        <div class="taskBox" v-show="has_data" v-if="current_weektask != null">
                            <div class="taskBox-t">{{current_weektask.from_date}}--{{current_weektask.end_date}}</div>
                            <div class="taskBox-c">
                                <div v-for="task in current_weektask.tasks" class="taskBox-c-item am-cf">
                                    <span class="am-fl">
                                        <span v-if="task.task_type == 'pipe_audit'">
                                            <i class="am-icon-commenting am-text-secondary"></i>
                                        </span>
                                        <span v-else-if="task.task_type == 'faq_audit'">
                                            <i class="am-icon-exchange am-text-warning"></i>
                                        </span>
                                        <span v-else-if="task.task_type == 'scale_audit'">
                                            <i class="am-icon-line-chart am-text-primary am-text-danger"></i>
                                        </span>
                                        <span v-else-if="task.task_type == 'train_audit'">
                                            <i class="am-icon-leanpub am-text-success"></i>
                                        </span>
                                        {{task.task_name}}
                                    </span>
                                    <span v-bind:class="task.is_audit == 0 ? 'taskBox-c-item-btn am-fr' : 'taskBox-c-item-defaultBtn am-fr'" v-on:click="goDetail(task.task_type, task.doctorserviceorderid, current_weektask.from_date, current_weektask.end_date)">{{ task.is_audit == 1 ? '查看' : '处理'}}</span>
                                </div>
                            </div>
                        </div>
                        <div v-show="no_data" class="am-text-center am-margin-lg am-text-sm">暂无任务</div>
                    </div>

                    <div class="mint-tab-container-item" v-show="num == 1">
                        <div v-for="weektask in weektasklist" class="taskBox" v-show="has_data" v-if="weektasklist.length > 0">
                            <div class="taskBox-t">{{weektask.from_date}}--{{weektask.end_date}}</div>
                            <div class="taskBox-c">
                                <div v-for="task in weektask.tasks" class="taskBox-c-item am-cf">
                                    <span class="am-fl">
                                        <span v-if="task.task_type == 'pipe_audit'">
                                            <i class="am-icon-commenting am-text-secondary"></i>
                                        </span>
                                        <span v-else-if="task.task_type == 'faq_audit'">
                                            <i class="am-icon-exchange am-text-warning"></i>
                                        </span>
                                        <span v-else-if="task.task_type == 'scale_audit'">
                                            <i class="am-icon-line-chart am-text-primary am-text-danger"></i>
                                        </span>
                                        <span v-else-if="task.task_type == 'train_audit'">
                                            <i class="am-icon-leanpub am-text-success"></i>
                                        </span>
                                        {{task.task_name}}
                                    </span>
                                    <span v-bind:class="task.is_audit == 0 ? 'taskBox-c-item-btn am-fr' : 'taskBox-c-item-defaultBtn am-fr'" v-on:click="goDetail(task.task_type, task.doctorserviceorderid, weektask.from_date, weektask.end_date)">{{ task.is_audit == 1 ? '查看' : '处理'}}</span>
                                </div>
                            </div>
                        </div>
                        <div v-show="no_data" class="am-text-center am-margin-lg am-text-sm">暂无任务</div>
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
                num : 0,
                weektasklist : [],
                current_weektask : null,
                no_data : false,
                has_data : false,
            }
        },
        methods: {
            tab(index, e) {
                this.num = index;
                var node = $(e.target);
                node.addClass('is-selected');
                node.siblings().removeClass('is-selected');
            },
            goDetail(task_type, doctorserviceorderid, from_date, end_date){
                if(task_type == "pipe_audit"){
                    this.$router.push({name: 'doctortask-pipepatients', query: {'from_date': from_date, 'end_date' : end_date}});
                }
                if(task_type == "faq_audit"){
                    this.$router.push({name: 'doctortask-faqs', query: {'from_date': from_date, 'end_date' : end_date}});
                }
                if(task_type == "scale_audit"){
                    this.$router.push({name: 'doctortask-scale', query: {'doctorserviceorderid': doctorserviceorderid}});
                }
                if(task_type == "train_audit"){
                    this.$router.push({name: 'doctortask-train', query: {'doctorserviceorderid': doctorserviceorderid}});
                }
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var url = api.get('doctortask.weektasklist');
            var params = {
                openid: openid,
                weekcnt: 20,
            }
            common.post(url, params, function(response){
                var data = response.data;
                self.weektasklist = data;
                if(data.length){
                    self.current_weektask = data[0];
                    self.has_data = true;
                }else{
                    self.no_data = true;
                }
            })
        },
        mounted: function() {
            document.title = "审阅列表";
        }
    }
</script>

<style src="../../../static/css/amazeui-2.7.2.min.css" scoped>
</style>
<style src="../../../static/css/pages/doctortask.css" scoped>
</style>
