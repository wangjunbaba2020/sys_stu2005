import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//刷新页面会丢失用户信息，所以要从localstorage中取
let userInfo = localStorage.getItem("deng-userInfo") || "{}";
userInfo = JSON.parse(userInfo);


export default new Vuex.Store({
    state: {
        //vuex将来可能会共享给其他组件
        // userInfo: {}
        //要改他的值所以要去mutations
        userInfo
    },
    mutations: {
        // 更改userInfo
        SET_USERINFO(state, payload) {
            state.userInfo = payload
        }
    },
    actions: {},
    modules: {}
});