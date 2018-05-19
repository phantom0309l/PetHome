<template>
	<div class="detail">
		<mt-navbar class="navbar" v-model="type">
			<mt-tab-item id="1"><span class="navbar-item">90天</span></mt-tab-item>
			<mt-tab-item id="2"><span class="navbar-item">180天</span></mt-tab-item>
			<mt-tab-item id="3"><span class="navbar-item">360天</span></mt-tab-item>
		</mt-navbar>

		<mt-tab-container>
			<mt-tab-container-item>
				<mt-cell v-for="(option, index) in data" :key="index">
					<drugbar :option="option" :index="index"></drugbar>
				</mt-cell>
			</mt-tab-container-item>
		</mt-tab-container>
		<div class="no-data" v-if="nodata">暂无用药信息</div>
	</div>
</template>
<script>
    import common from '../../lib/common.js';
    import api from '../../config/api.js';
    export default {
		data() {
			return {
				type: '1',
				nodata: 0,
				data: []
			};
		},
		created: function() {
			var self = this;
			self.getData();
        },
		methods: {
			handleClick() {
				var self = this;
				self.getData();
			},
			getData() {
				var self = this;
				self.nodata = 0;
	            var patientid = this.$route.query.patientid;
	            var url = api.get('drug.detailjson');
	            var params = {
	                patientid: patientid,
	                type: self.type,
	            };
	            common.post(url, params, function(response){
	                self.data = response.data;
					if(JSON.stringify(self.data) == "{}"){
						self.nodata = 1;
						// console.log(self.data);
					}
	            });
			}
		},
		watch: {
            'type': function(){
				var self = this;
				self.data = [];
				self.getData();
            },
        },
		components: {
            'drugbar': function(resolve) {
                require(['../../components/DrugBar.vue'], resolve);
            },
        },
    }
</script>
<style scoped>
.navbar{margin-bottom: 2px;}
.navbar-item{font-size: 16px;}
.no-data{margin-top: 50px;}
</style>
