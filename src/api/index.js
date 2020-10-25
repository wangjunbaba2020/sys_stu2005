//导入axios
import axios, { CancelToken } from "./config"
//引入中断

//登入导出接口
export const login = (username, password) => axios({
    url: "/users/login",
    method: 'post',
    data: {
        username,
        password
    }
})

//获取登录日志
// export const getLoginLog = () => axios.get("/getloginlog")
//     //登录成功的话会跳转到home页面，所以在home写。。。
/**
 * 
 * @param {object} _this一个组件实例
 */
export const getLoginLog = (_this) => axios.get("/getloginlog", {
    CancelToken: new CancelToken(function(c) {
        //c就是一个方法，可以终止请求
        _this.cancel = c //相当于给组件实例 添加一个cancel属性
    })
})


//获取用户菜单
export const getMenuList = () => axios.get("/permission/getMenuList")


//获取验证码
export const getCaptcha = () => axios.get("/users/getCaptcha")


//校验验证码
export const verifyCaptcha = (captcha) => axios.get(`/users/verifyCaptcha?captcha=${captcha}`)