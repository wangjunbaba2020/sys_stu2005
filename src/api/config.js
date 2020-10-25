import axios from "axios";

import router from "../router";

import ElementUI from "element-ui";

// 当我们没有插件处理跨域的话
//1、判断当前环境
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"
axios.defaults.withCredentials = true; //允许请求认证


//中断请求属性
// let CancelToken = axios.CancelToken;
// export {
//     CancelToken as
//     default
// }
export let CancelToken = axios.CancelToken;

//引入nprogress
// import NProgress from "nprogress"

//创建请求拦截器，可以给每一个请求都携带上想要传递的内容
axios.interceptors.request.use(config => {
    //登入和注册是不需要携带token的
    // console.log(config);
    if (config.url == "/users/login") {
        //直接放行
        return config
    } else {
        let token = localStorage.getItem('deng-token')
            //config指的是我们每一个请求对象
        config.headers['authorization'] = token;
        //放行
        return config
    }
})


// 响应拦截
axios.interceptors.response.use(config => {
    // NProgress.done() //没有这个变量要引入

    // console.log(config);
    let { data } = config;
    if (data.code == '1004' || data.code == '10022') {
        // 在当前的后台api中1004代表token校验失败，提示错误，并且让页面跳转到登录页。
        //10022表示session到期失效
        // alert('登录信息失效，请重新登入')
        // console.log(ElementUI); //打印出version:后面跟的都是组件名
        ElementUI.Message.error("登录信息失效，请重新登入")
            //页面跳转
            // console.log(router);
        localStorage.removeItem('deng-token')
        router.push("/login")
            //刷新页面
        window.location.reload()
    }
    return config
})



axios.create({
    timeout: 4000
})



//导出axios
export default axios