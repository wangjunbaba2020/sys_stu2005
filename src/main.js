import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入全局的css和element-rest
import "@/assets/styles/el-reset.css"
import "@/assets/styles/base.css"

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入iconfont
import "./assets/iconfont/iconfont.css"

//引入subMenu组件
import qfSubMenu from "qf-sub-menu"


//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

Vue.config.productionTip = false;
Vue.use(ElementUI);

//注入到所有的子组件中去---即将我们组件注册到了全局
Vue.use(qfSubMenu)



//路由前置钩子(导 航守卫)
router.beforeEach((to, from, next) => { //next是放行的，有驼逻辑写完之后，要调用next,你不调用next下面的中间件/函数是没有办法执行的。to是去哪里，from是从哪来

        // NProgress.start()
        NProgress.set(0.4) //上来就有的进度


        let token = localStorage.getItem('deng-token') || null;
        // console.log(to);
        if (token) {
            //如果是注册页面或者是登入页面，直接放行；

            if (store.state.menuList.length == 0) {
                store.dispatch('FETCH_MENULIST')
                    .then(() => {
                        next({ path: to.path }) //这里要注意，next里面要传参数即要进入的页面的路由信息，因为next传参数后，当前要进入的路由会被废止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效了。--不然一直是个空白页。
                    })
            } else {
                next()
            }

        } else { //没token：去登入还是去欢迎页
            if (to.path === "/login") {
                next()
            } else { //访问的不是登录页，就要跳转到登录页
                next({ path: "/login" })
            }
        }
    })
    //页面能不能显示，全靠它放不放行。一个门



//使用路由后置钩子处理面包屑
router.afterEach((to, from) => {
    // console.log(to);
    let crumblist = to.matched.slice(1) //因为数组第0项永远是空把它去了
    console.log(crumblist);
    store.commit("SET_CRUMBS", crumblist)
    NProgress.done()
})
import "./utils/recursionrRoutes"

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");