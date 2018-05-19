<template>
    <div class="doctor-income">
        <template v-for="(doctorincome, index) in doctorincomes">
            <div class="income-year" @click="clickIncomeYear(doctorincome, index)" :class="{'clear-top-border': index == 0}">
                <div class="income-icon">¥</div>
                <span>{{doctorincome.year.date}}</span>
                <span class="income-amount">¥{{doctorincome.year.amount}}</span>
            </div>
            <div v-show="doctorincome.show == true">
                <div class="income-item" v-for="(month, index) in doctorincome.months" @click="goIncomeDetail(month)">
                    <div class="triangle"></div>
                    <span>{{month.date}}</span>
                    <span class="incomeitem-amount">¥{{month.amount}}</span>
                </div>
            </div>
        </template>
        <div v-if="doctorincomes.length != 0" style="border-top: 1px solid #ccc;"></div>
    </div>
</template>
<script>
    import common from '../../lib/common.js';
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                doctorincomes: [
                ],
            }
        },
        methods: {
            clickIncomeYear: function(doctorincome, index) {
                doctorincome.show = !doctorincome.show;
                this.$set(this.doctorincomes, index, doctorincome);
            },
            goIncomeDetail: function(month) {
                this.$router.push({
                    name: 'doctor-incomedetail',
                    params: {
                        themonth: month.date
                    }
                })
            },
            fetchData: function() {
                for (var i = 0; i < this.doctorincomes.length; i++) {
                    this.doctorincomes[i].show = false;
                }
                if (this.doctorincomes.length != 0) {
                    this.doctorincomes[0].show = true;
                }
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var url = api.get('revenue.list');
            var params = {
                openid: openid,
            };
            common.post(url, params, function(response){
                console.log(response);
                var data = response.data;
                self.doctorincomes = data.arr_revenueofyear;
                self.fetchData();
            })
        }
    }
</script>
<style scoped>
    .income-year {
        background-color: #ecf8ff;
        padding: 20px;
        border-top: 1px solid #ccc;
    }
    .income-icon {
        float: left;
        color: #f99a2d;
        margin-left: 10px;

        font-weight: bold;
        height: 18px;
        width: 18px;
        border: 2px solid #f99a2d;
        border-radius: 100%;
    }
    .income-amount {
        float: right;
        color: #f99a2d;
        margin-right: 10px;
        font-weight: bold;
        display: inline-block;
        width: 10%;
    },
    .income-date {
    }
    .triangle {
        float: left;
        display: inline-block;
        border-color: #f99a2d #f9fdff #f9fdff #f9fdff;
        border-style: solid;
        border-width: 10px 6px 0 6px;
        position: relative;
        left: 12%;
        transform: rotate(-90deg);
        position: relative;
        top: 5px;
        /*line-height: 2.4;*/
    }
    .income-item {
        font-size: 14px;
        font-size: 1.4rem;
        padding: 15px;
        background-color: #f9fdff;
        border: 1px solid #ccc;
        border-left: none;
        border-right: none;
        border-bottom: none;
        text-align: center;
    }
    .incomeitem-amount {
        float: right;
        position: relative;
        right: 5%;
        color: #f99a2d;
        display: inline-block;
        width: 10%;
    }
    .clear-top-border {
        border-top: none;
    }
    .doctor-income {
    }
</style>
