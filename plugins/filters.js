import Vue from 'vue'

export default () => {
  Vue.filter('lengthFilter', function (value) {
     return value.substr(0,16)+'...'
  })
}
