<template>
    <div style="margin-top: 100px">
        <img style="width:193px;height:141px" src="../../../static/image/error.png"/>
        <p class="push-10-t fc-text-999"><span>{{errmsg}}</span></p>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                errmsg: '页面消失不见了，请联系技术人员。',
            }
        },
        created: function() {
            // this.errmsg ='sessionStorage:'+ sessionStorage.getItem('_errorurl_') + '页面消失不见了，请联系技术人员。localStorage:' + localStorage.getItem('_errorwxurl_') +'----sessionStorage_href:'+sessionStorage.getItem('_href_') + '-----localStorage_href:' + localStorage.getItem('_errorhref_');
            if (this.$route.redirectedFrom != undefined) {
                // this.errmsg = this.$route.redirectedFrom + '页面消失不见了，请联系技术人员';
                this.errmsg = '页面消失不见了，请联系技术人员';
            }
            // console.log(this.$route);
        },
        mounted: function() {
            // console.log('22222');

        },
        watch: {
            '$route': function(to, from) {
                // console.log('11111');
                // console.log(to);
                // this.errmsg = sessionStorage.getItem('_href_');
            }
        },
        beforeRouteEnter(to, from, next) {
            // document.querySelector('body').setAttribute('class', 'fc-bg-gray')
            next();
        },
        beforeRouteLeave(to, from, next) {
            // document.querySelector('body').setAttribute('class', '')
            next();
        },
    }
</script>
