import Vue from "vue";
import Vuex from "vuex";
import { getMenuList } from "../api";

//引入allRoutes
import allroutes from "../router/allRoutes"
//引入递归函数
import recursionRoutes from "../utils/recursionrRoutes"
//引入动态路由dynamicRoutes
import dynamicRoutes from "../router/dynamicRoutes"
//引入router
import router from "../router";

Vue.use(Vuex);

//刷新页面会丢失用户信息，所以要从localstorage中取
let userInfo = localStorage.getItem("deng-userInfo") || "{}";
userInfo = JSON.parse(userInfo);
//{}不加"",JSON.parse是把字符串转换为对象，不是把对象转为对象

export default new Vuex.Store({
    state: {
        //vuex将来可能会共享给其他组件
        // userInfo: {}
        //要改他的值所以要去mutations
        userInfo,
        menuList: [], //定义用户侧边栏菜单，他的侧边栏菜单就是通过后端返回的menulist和我们定义好的全部的allRoutes对比
        crumbs: []
    },
    mutations: {
        // 更改userInfo
        SET_USERINFO(state, payload) {
            state.userInfo = payload
        },
        SET_MENULIST(state, payload) {
            state.menuList = payload;
            console.log(state.menuList);
            //动态的将路由添加到routes中 核心方法 router.addRoutes(复合路由配置规则的数据)

            //1、将menuList赋值给dynamicRoutes的children
            let target = dynamicRoutes.find(item => item.path === "/")
            target.children = [...state.menuList]
                //调试--看是不是得到了想要的路由配置
                // console.log(dynamicRoutes);

            //2、动态添加路由配置到router/routers中
            router.addRoutes(dynamicRoutes) //没有router在上面引入router

        },
        //设置面包屑：
        SET_CRUMBS(state, payload) {
            state.crumbs = payload
        }
    },
    actions: {
        // //1、发送请求，获取用户菜单数据
        // FETCH_MENULIST() {
        //     //2、通过allRoutes和请求回来的用户菜单数据进行对比，将结果提交给mutation
        //     //就要在上面allroutes引进来，还要把我们递归的方法引进来
        //     getMenuList()
        //         .then(res => {
        //             console.log(res);
        //         })
        // }

        async FETCH_MENULIST({ commit }) {
            //1、发送请求，获取用户菜单数据
            let userMenu = await getMenuList() //请求的方法,从服务器获取的用户菜单
                //2、通过allRoutes和请求回来的用户菜单数据进行对比
                // console.log(userMenu);
            let sideMenu = recursionRoutes(allroutes, userMenu.data.menuList)
                // console.log(sideMenu);
                //3、将结果提交给mutation
            commit("SET_MENULIST", sideMenu)
        }
    },
    modules: {}
});