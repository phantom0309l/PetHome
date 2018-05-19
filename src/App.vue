<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted: function() {
    var self = this;
    $(document).ajaxSuccess(function(event, xhr, settings){
      if (xhr.responseJSON.errno == '1002') {
        localStorage.setItem('_openid_', '');
        localStorage.setItem('_isbind_', '');
        let instance = self.$toast('授权失效,请重新进入本页面.');
        setTimeout(() => {
          instance.close();
          WeixinJSBridge.call('closeWindow');
        }, 2000);
      }else if(xhr.responseJSON.errno == '1001') {
        localStorage.setItem('_isbind_', '');
        let instance = self.$toast('用户未绑定,请前往绑定页面进行绑定');
        setTimeout(() => {
          instance.close();
          WeixinJSBridge.call('closeWindow');
        }, 2000);
      }
    })
    },
    created: function() {

    }
}
</script>
