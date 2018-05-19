<template>
    <div class="shoporderlist pd-8">
        <div v-for="order in shopOrderList" class="content-item" style="padding: 10px 10px 10px 5px">
            <div style="font-size: 0px ; font-size: 0rem; margin-bottom: 5px">
                <div class="i-b order-title-l">
                    <img src="../../assets/orderDetail.png" width="18px"/>
                </div>
                <div class="i-b order-title-r" style="vertical-align: top">
                    <span>{{order.patient_name}}</span>
                    <span style="float: right; color: #999">{{order.date_pay}}</span>
                </div>
            </div>
            <div class="medicine-item" style="margin-bottom: 5px">
            </div>
            <div v-for="list in order.detail_list" class="medicine-item">
                <div style="width: 100%" class="i-b">
                    <span class="medicine-item-title">{{list.title}}</span>
                    <span class="medicine-item-cnt" style="float: right">{{list.cnt}}{{list.pack_unit}}</span>
                </div>
            </div>
        </div>
        <div v-if="shopOrderList.length == 0">
            -----暂无数据-----
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                shopOrderList: [],
            }
        },
        created: function() {
            this.shopOrderList = JSON.parse(sessionStorage.getItem('shoporderlist'));
            document.title="其他服务";
            window.scroll(0,0);
        },
        mounted: function() {
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
    .shoporderlist {
    }
    .order-title-r {
        width: 90%;
        font-size: 14px;
        font-size: 1.4rem;
        text-align: left;
    }
    .order-title-l {
        width: 10%
    }
    .medicine-item {
        margin-left: 10%;
        text-align: left;
        font-size: 14px;
        font-size: 1.4rem;

    }
    .medicine-item-title {
        color: #90a1bd;
    }
    .medicine-item-cnt {
        color: #90a1bd;
    }
    .medicine-item-cost {
        color: #f1a512;
    }
    .content-item {
        background-color: #fff;
        border-radius: 2px;
        margin-bottom: 8px;
    }
    .boy-img {
        width: 30%;
        font-size: 0px;
    }
    .total-patient {
        width: 40%;
        font-size: 0px;
    }
    .girl-img {
        font-size: 0px;
        width: 30%;
    }
    .baodao-item-l {
        width: 49%;
        font-size: 14px;
        font-size: 1.4rem;
        margin-right: 1%;
        margin-bottom: 2%;
    }
    .baodao-item-r {
        width: 49%;
        font-size: 14px;
        font-size: 1.4rem;
        margin-left: 1%;
        margin-bottom: 2%;
    }
    .item-border {
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 4px;
    }
    .active-patient-item {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding:10px 0px 10px 0px;
        margin-bottom: 8px;
    }
    .baodao-item-l img {
        width:48px;
        height:48px;
    }
    .baodao-item-r img {
        width:48px;
        height:48px;
    }
    .active-patient-item img {
        height: 48px;
    }
    .buy-med {
        width: 48%;
        margin: 0 1% 0 1%;
    }
</style>
