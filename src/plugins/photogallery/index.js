import PhotoGalleryComponent from './PhotoGallery.vue'
let $vm
export default {
  install (Vue) {
    let PhotoGallery = Vue.extend(PhotoGalleryComponent)
    if (!$vm) {
      $vm = new PhotoGallery({el: document.createElement('div')})
      document.body.appendChild($vm.$el)
    }
    const photogallery = {
      open (index, list, params) {
        $vm.open(index, list, params)
      },
      close () {
        $vm.close()
      }
    }
    Vue.$photogallery = photogallery
    Vue.mixin({
      created: function () {
        this.$photogallery = Vue.$photogallery
      }
    })
  }
}
