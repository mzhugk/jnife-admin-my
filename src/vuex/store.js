import Vue from 'vue'
import Vuex from 'vuex';
import Axios from 'axios';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    head_icon: null,//用户头像
    sysUserName:null//用户名称
  },
  mutations: {
    head_icon (state) {
      Axios.post("https://www.jnife.com/admin/login/userHeader")
        .then(function (res) {
          if(res.data.code==100000){
            state.head_icon=res.data.data.user_icon;
            state.sysUserName=res.data.data.username;
          }
        }).catch(function (err) {

      });
    },

  }
});
export default store
