<template>
<div class="application-information">
  <div class="header">
    <div class="a-container">
        <a v-for="(item, key) in dataList" href="javascript:" :class="{'active': active == item.title}" @click="active = item.title" :style="getStyle">{{item.title}}</a>
    </div>
    <div class="div-edge">
        <i class="iconfont icon-combinedshapefuben font-s18" style="margin:auto"></i>
    </div>
  </div>
  <div class="clear"></div>
  <div class="body">
    <div id="Gallery">
        <div class="gallery-item">
          <img class="photo-gallery-img" v-for="(pic, index) in pics" :src="pic.thumb_url" @click="preview(pic.src, bigPics)">
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
      bedtktid: '',
      active: '',
      dataList: [],
    }
  },
  components: {

  },
  computed: {
    pics: function() {
      for (let i in this.dataList) {
          let item = this.dataList[i]
          if (this.active == item.title) {
              return item.pictures
          }
      }
      return []
    },
    bigPics: function() {
      let arr = []
      this.dataList.map(function(item) {
          item.pictures.map(function(pic) {
              arr.push(pic.src)
          })
      })
    //   console.log('bigPics', arr)
      return arr
     },
    getStyle: function() {
    //   let width = Math.round(100/this.dataList.length)
    //   let style = "width: " + width + "%"
    //   return style
    }
  },
  created: function() {
    var self = this;
    this.bedtktid = this.$route.params.bedtktid;
    var openid = localStorage.getItem('_openid_');
    var url = api.get('bedtkt.info');
    var params = {
      bedtktid: this.bedtktid,
      openid: openid,
    }
    common.post(url, params, function(response) {
        let d = response.data
         d.list.map(function(one){
             let tmp = {}
             tmp.is_show = one.is_show
             tmp.title = one.title
             tmp.pictures = []
             one.pictures.map(function(one1){
                 let obj = {}
                 obj.src = one1.url
                 obj.thumb_url = one1.thumb_url
                 obj.w = one1.size.width
                 obj.h = one1.size.height
                 tmp.pictures.push(obj)
             })

            self.dataList.push(tmp)
        })
        if (self.dataList.length > 0) {
            self.active = self.dataList[0].title
        }
    })

  },
  methods: {
    preview: function(curSrc) {
      var that = this
      WeixinJSBridge.invoke('imagePreview', {
        'current': curSrc,
        'urls': that.bigPics
      });
    },
    getImageSize: function(size) {
      return size['width'] + 'x' + size['height']
    },
  },
  mounted: function() {
    document.title = "申请资料";
    this.$nextTick(function() {
      //   this.initPhotoSwipeFromDOM('.gallery-row')
    })
  }
}
</script>
<style scoped>
@import '~photoswipe/dist/photoswipe.css';
@import '~photoswipe/dist/default-skin/default-skin.css';
::-webkit-scrollbar{
    width: 0px
}

.gallery-row {
  /*display: -webkit-flex;
  /* Safari */
  /*display: flex;
  flex-wrap: wrap;
  text-align: left;*/
}

.div-edge {
    position: absolute;
    top:0;
    right:0;
    width:30px;
    opacity: 0.8;
    height:100%;
    background-color:#fff;
    z-index:100;
    display: flex;
    -moz-box-shadow:-2px -2px 5px #666;
    -webkit-box-shadow:-2px -2px 5px #666;
    box-shadow:-2px -2px 5px #666;
}

.a-container {
    width:100%;
    display: inline;
    white-space: nowrap;
    overflow-x:scroll;
    float:left;
    overflow-y:hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
    padding-right: 30px;
}

.gallery-item {
  /*background: #fff;*/
  display: flex;
  flex-wrap: wrap;
   align-items: center;
}

.gallery-item img {
    margin: 5px;
    max-width: 100px;
    max-height: 100px;
}

.header {
    text-align: left;
    position: fixed;
    left: 0px;
    width: 100%;
    background-color: #fff;
    box-shadow: 2px 1px 3px #dddddd;
}

.header a {
  text-decoration: none;
  padding: 10px 10px;
  color: #4472c5;
  background-color: #fff;
  display: inline-block;
  text-align: center;
}

.header .active {
  color: #fff;
  background-color: #4472c5;
}

.body {
  padding-top: 45px;
}
</style>
