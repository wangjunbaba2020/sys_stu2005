<template>
  <div class="login-page">
    <div class="login-page-left">
      <h1 class="title">一个管理系统</h1>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <!-- ref="loginForm" 组件实例的引用-->
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label="验证码" prop="captcha">
          <el-input
            class="captcha"
            type="text"
            v-model="loginForm.captcha"
            autocomplete="off"
             @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
          <span
            class="captcha"
            v-html="captchaSvg"
            @click="refreshCaptcha"
            style="
    cursor: pointer;"
            >1234</span
          >
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
          <!-- <el-button type="danger" plain @click="resetForm('loginForm')"
          >清空</el-button
        > -->
        </el-form-item>
      </el-form>
    </div>
    <video
      muted="muted"
      src="./bg_video.d2d602a9.mp4"
      autoplay="autoplay"
      loop="loop"
      preload="auto"
      class="bg_video"
    ></video>
  </div>
</template>

<script>
// 登入逻辑的实现:
// 1、收集用户输入的username&password传递给后端-axios
// 2、登入通过过后，将后端返回的token存到本地，跳转到主页
// 3、每次请求的时候，携带token
// 4、展示token校验正确的数据
//5、校验不通过，跳转到登入页

//登入导入
import { login, getCaptcha, verifyCaptcha } from "@/api";

// 映射--到methods去
import { mapMutations } from "vuex";

export default {
  data() {
    /**
     * @param {object} rule 就是一个表单验证对象
     * @param {string} value 输入值
     * @param {function} callback 校验通过不传参，不通过传参
     */
    var validateUsername = (rule, value, callback) => {
      // if (value === "") {
      //   callback(new Error("请输入用户名"));
      // } else {
      //   callback();
      // }

      //用户名正则：
      // var username=/^[a-zA-Z0-9_-]{4-16}$/
      // if(!username.test(value)){
      if (!value) {
        callback("4到16位(字母，数字，下划线，减号)");
      } else {
        callback();
      }
    };
    //校验用户密码
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    // 校验验证码
    var validateCaptcha = (rule, value, callback) => {
      if (value === "" || value.length !== 5) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      captchaSvg: "", //从服务器获取下来的验证码svg结构
      loginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.set_captcha();
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),

    //刷新验证码
    refreshCaptcha() {
      this.set_captcha();
    },
    //设置验证码
    set_captcha() {
      getCaptcha().then(res => {
        // console.log(res);

        this.captchaSvg = res.data.img;
      });
    },

    //处理函数vue2.0缺点代码不好找
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //本地校验通过

          //先验证验证码是否正确如果正确再发送登入请求
          let verifyRes = await verifyCaptcha(this.loginForm.captcha);
          console.log(verifyRes);
          // return;
          // console.log(verifyRes.data)
          if(!verifyRes.data.state){
            //验证码不正确
            this.$message.error('验证码输入错误，请重新输入')
            return
          }

          //打开登入加载动画
          const loading = this.$loading({
            lock: true,
            text: "登录中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          // console.log(this.loginForm.username, this.loginForm.password);
          //登录页发送请求
          // login(this.loginForm.username,this.loginForm.password)
          let { username, password } = this.loginForm;
          login(username, password)
            .then(res => {
              //服务器响应，关闭loading动画
              loading.close();

              // console.log(res);
              if (res.data.state) {
                //用户名密码正确时
                this.$message({
                  message: "叮叮叮~~~ 登录成功",
                  type: "success"
                });
                // this.$message.success("叮叮叮~~~ 登录成功");
                localStorage.setItem("deng-token", res.data.token); //以键值对存入本地
                localStorage.setItem(
                  "deng-userInfo",
                  JSON.stringify(res.data.userInfo)
                );

                //更改vuex中state['userInfo']的值--要调用方法了--先映射
                this.SET_USERINFO(res.data.userInfo);

                //跳转到主页
                this.$router.push("/Welcome");
              } else {
                //用户名密码错误
                // alert("用户名密码错误");
                this.$message.error("用户名或密码错误");
              }
            })
            .catch(err => {
              //代表请求出错--可以不用走catch--有专门的响应拦截器去拦截--即统一的catch由我们响应拦截器去写。
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
/* 表单样式 */
.el-form {
  width: 400px;
}

element.style {
  width: 83px !important;
}

/* 验证码 */
.captcha {
  width: 40%;
  float: left;
  /* padding-left: 18px; */
  margin-left: 15px;
}
</style>