import Vue from 'vue';
import './plugins/vuetify';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import Cookies from 'js-cookie';
import App from './App.vue';
import router from './router';
import store from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import moment from 'moment';
// import JsonExcel from 'vue-json-excel'

// Vue.component('downloadExcel', JsonExcel)
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.headers.common.Authorization = Cookies.get('token');
Vue.config.productionTip = false;
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
