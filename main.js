import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
// define your mixin
Vue.mixin({
  methods: {
    globalHelper: function () {
      alert("Hello world")
    },
  },
})