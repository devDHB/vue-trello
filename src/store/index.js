import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

// 어플리케이션을 기동할 때 로컬스토리지에서 토큰 정보를 읽어와서
// 로그인을 처리하는 로직
const { accessToken } = localStorage;
store.commit("LOGIN", { accessToken });

export default store;
