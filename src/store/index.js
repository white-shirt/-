import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import VueAxios from 'vue-axios'
import _axios from "./modules/_axios";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueAxios, axios);
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    _axios
  }
})