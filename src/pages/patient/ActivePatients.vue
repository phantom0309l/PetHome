<template>
    <div class="vertical-container">
        <div class="body">
            <div v-for="item in items" class="div-item" @click="goPipe(item)">
                <div class="div-item-div">
                    <h4 style="margin:0;font-weight:normal;display:inline-block"><span class="text-info">{{item.patient.name}}</span>&nbsp;&nbsp;{{item.patient.sexstr}}&nbsp;&nbsp;{{item.patient.agestr}}</h4>
                    <span style="float: right;color:#666">患者消息</span>
                </div>
                <div class="patient-message">
                    <!-- <div style="text-align: left">
                        <span>患者消息:</span>
                    </div> -->
                    <!-- <div style="width:80%; padding: 5px 10px; margin: auto; text-align: left">
                        <template v-for="pipe in item.pipes">
                            <span>{{pipe.content}}</span><br/>
                        </template>
                    </div> -->
                    <div style="padding: 5px 0px; margin: auto; text-align: left">
                        <!-- <template v-for="pipe in item.pipes">
                            <span style="line-height:1.5">{{pipe.content}}</span><br/>
                        </template> -->
                        <p class="remove-margin-t" v-for="pipe in item.pipes" v-html="getContent(pipe)"></p>
                    </div>
                    <div style="clear: both"></div>
                </div>
            </div>
            <div v-if="items.length == 0" style="position: none;margin-top: 200px">
                <span style="margin-top:400px;width:80%; padding: 15px">{{thedate}}无活跃患者</span>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                thedate: '',
                items: [
                ],
            }
        },
        methods: {
            goPipe: function(item) {
                var self = this;
                this.$router.push({
                    name: 'patient-pipelist',
                    params: {
                        patientid: item.patient.patientid,
                    },
                    query: {
                        thedate: self.thedate,
                    }
                })
            },
            close: function() {
                WeixinJSBridge.call('closeWindow');
            },
            getContent: function(pipe) {
                if (pipe.type == "text") {
                    return pipe.content
                } else if (pipe.type == "picture" || pipe.type == "paper") {
                    return '<span class="text-info">[' + pipe.content +']</span>'
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('body').setAttribute('class', 'fc-bg-gray')
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var thedate = to.query.thedate;
            $.ajax({
                url: api.get('pipe.listofday'),
                type: 'post',
                dataType: 'json',
                data: {
                    openid: openid,
                    thedate: thedate,
                }
            }).done(function(response){
                if (response.errno == "0") {
                    var data = response.data;
                    next(function(vm){
                        vm.items = data.items;
                        vm.thedate = thedate;
                    });
                }else if(response.errno == 1001){
                    next('/bind');
                }
            })
        },
        beforeRouteLeave(to, from, next) {
          document.querySelector('body').setAttribute('class', '')
          next();
        },
    }
</script>
<style scoped>
.body {
}
.vertical-container {
    padding: 0 10px;
}
.div-item {
    background:#fff;
    padding: 5px;
    border-radius: 0px;
    margin: 10px 0;
}
.div-item-div {
    text-align: left;
    margin: 5px 0px;
    padding-bottom:10px;
    border-bottom:1px solid #eee;
}
</style>
