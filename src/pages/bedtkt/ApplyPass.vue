<template>
    <div class="bedtkt-apply">
        <p class="text-center push-20-t">
            <i class="weui-icon-success weui-icon_msg"></i>
        </p>
        <h2>操作成功</h2>
        <p class="push-10-t text-center">您的反馈已收到，医生助理团队会第一时间处理</p>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
            }
        },
        methods: {
            clickBack: function() {
                this.$router.go(-1)
            }
        },
        created(){

        },
        watch: {
            '$route': function(to, from) {

            },
        },
        mounted: function() {
            document.title = "住院申请审核通过";
        }
    }
</script>
</style>

<style scoped>
    p {
        margin-top: 10px;
    }
    .bedtkt-apply {
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 25%;
    }
</style>
