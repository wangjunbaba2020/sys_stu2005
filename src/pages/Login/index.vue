<template>
  <div class="login-page">
    <div class="login-page-left">
      <h1 class="title">一个管理系统</h1>
      <el-form
        :model="loginForm"
        status-icon
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
          ></el-input>
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
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    //处理函数vue2.0缺点代码不好找
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //本地校验通过
          alert("submit!");
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
</style>