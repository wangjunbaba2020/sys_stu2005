import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/el-reset.css"
import "@/assets/styles/base.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

//路由前置钩子(导航守卫)
router.beforeEach((to, from, next) => { //next是放行的，有驼逻辑写完之后，要调用next,你不调用next下面的中间件/函数是没有办法执行的。to是去哪里，from是从哪来
        let token = localStorage.getItem('deng-token');
        console.log(to);
        if (token) {
            //如果是注册页面或者是登入页面，直接放行。
            next()
        } else { //没token：去登入还是去欢迎页
            if (to.path === "/login") {
                next()
            } else { //访问的不是登录页，就要跳转到登录页
                next({ path: "/login" })
            }
        }
    })
    //页面能不能显示，全靠它放不放行。一个门

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");