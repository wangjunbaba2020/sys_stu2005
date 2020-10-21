//导入axios
import axios from "./config"

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
export const getLoginLog = () => axios.get("/getloginlog")
    //登录成功的话会跳转到home页面，所以在home写。。。