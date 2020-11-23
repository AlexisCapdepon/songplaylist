import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import KnobControl from 'vue-knob-control';

Vue.config.productionTip = false

Vue.use(KnobControl);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
