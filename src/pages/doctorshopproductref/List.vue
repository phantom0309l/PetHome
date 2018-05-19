<template>
<div class="doctorshopproductref-list">
    <div class="page-part">
        <mt-cell class="text-left" v-for="doctorshopproductref in doctorshopproductrefs" :title="doctorshopproductref.shopproduct.name" :key="doctorshopproductref.id"></mt-cell>
    </div>
</div>
</template>

<script>
import common from '../../lib/common.js';
import api from '../../config/api.js';
export default {
    data: function() {
        return {
            doctorshopproductrefs: [],
        }
    },
    methods: {
        fetchData: function() {
            var self = this;
            var url = api.get('doctorshopproductref.list');
            var params = {}
            common.post(url, params, function(response) {
                if (response.errno == 0) {
                    var data = response.data;
                    self.doctorshopproductrefs = data.doctorshopproductrefs;
                } else {
                    Toast({
                        message: response.errmsg,
                        duration: 2000
                    });
                }
            })
        }
    },
    created: function() {
        var self = this;
        self.fetchData();
    },
    mounted: function() {
        document.title = "我的药品库";
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

<style scoped lang="css">
.doctorshopproductref-list {
    padding-top: 10px;
}
</style>
