import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      phone:window.localStorage.getItem('phone'),
      haslogin:window.localStorage.getItem('haslogin')
  },
  mutations: {
      setphone:(state,data)=>{
          state.phone =data;
          window.localStorage.setItem('phone',data)
      },
      sethaslogin:(state,data)=>{
        state.haslogin =data;
        window.localStorage.setItem('haslogin',data)
    },
    loginout:(state)=>{
        state.phone ='';
        state.haslogin = false,
        localStorage.setItem("phone", '');
        localStorage.setItem("haslogin", '');
    }
  },
  actions: {
  },
  modules: {
  }
})
