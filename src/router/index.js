import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login";
import Home from "../pages/Home";

import allRoutes from "../router/allRoutes"
Vue.use(VueRouter);

const routes = [{
    path: "/login",
    name: "login",
    component: Login
}];

const router = new VueRouter({
    routes
});

//百度未捕获(承诺)导航重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
            //报错没有抛出，只是返回了
    }
    //错误的原因，是我们导航到了一个同样的路径

export default router;