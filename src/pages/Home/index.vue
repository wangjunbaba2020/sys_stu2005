<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <!-- <h1>一个标签</h1> -->

        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo" 
          :router="true"
          :collapse="isCollapse">
          

          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>

          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>

            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/student"> 
            <i class="el-icon-menu"></i>
            <span slot="title" >学员信息</span>
          </el-menu-item> -->

         

        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部栏 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
              <div class="grid-content bg-purple " >
                <i class="iconfont icon-shouqi" @click="isCollapse=!isCollapse"></i>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">千锋管理系统</div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                 <el-avatar :size="40" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3584292853,440103369&fm=26&gp=0.jpg" 
                 ></el-avatar>
                 <span>欢迎您:</span>
                 <b>{{userInfo.nickname}}</b>
                 &nbsp;&nbsp;&nbsp;
                 <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- main内容布局 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:crumb.path}" 
          v-for="(crumb,index) in crumbs" :key="index">
            {{crumb.meta.name}}
          </el-breadcrumb-item>
         
          </el-breadcrumb>
            <router-view></router-view>
        </el-main>
        
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import { getLoginLog } from "@/api";

//渲染
import {mapState} from "vuex"

export default {
  //渲染
  computed: {
    ...mapState(['userInfo','menuList','crumbs'])
  },
  data() {
    return {
      isCollapse:false
    };
  },
  methods: {
    quit(){
      //退出登入
      //1、清除token和userInfo
      //2、跳转到登录页 
      localStorage.removeItem('deng-token');
      localStorage.removeItem('deng-userInfo')
      this.$router.push("/login")   

      //刷新页面
      window.location.reload()
      },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    // getLoginLog().then(res => {
    //   console.log(res);
    // });
  }
};
</script>

<style scoped>
/* 图标 */
.icon-shouqi{
  color: rgb(252, 0, 168);
  font-size: 30px;
}

/* 头像 */
span.el-avatar.el-avatar--circle {
    vertical-align: middle;
    margin-right: 10px;
}

/* 退出按钮 */
span.quit{
color: rgb(252, 0, 168);
}

body {
    font: 18px HELVETICA;
    background: #fff;
    word-wrap: break-word;
}

/* 导航栏的动画效果 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
  
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  /* background: #99a9bf; */
}
.bg-purple {
  /* font-size: 20px; */
  font: 20px/60px "Arial Narrow", HELVETICA;
  /* background: #d3dce6; */
}
.bg-purple-light {
  font: 20px/60px "Arial Narrow", HELVETICA;
  /* font-size: 20px; */
  /* background: #e5e9f2; */
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  /* padding: 10px 0; */
  /* background-color: #f9fafc; */
}
</style>