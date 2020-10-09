import Vue from 'vue'
import App from './App.vue'
import './assets/css/animation.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
