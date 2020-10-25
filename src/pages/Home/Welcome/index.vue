<template>
<div>
    <h1>登录上去后显示的登录日志页面</h1>
    <button @click="send">发送请求</button>
    <button @click="abort">中断请求</button>
</div>
</template>

<script>
import  {getLoginLog} from "@/api"
    export default{
        data () {
            return {
                input:""
            }
        },
       methods: {
           send(){
               getLoginLog(this)
               .then(res=>{
                   console.log(res);
               })
           },
           abort(){
               console.log(this.cancel);//先看有没有这个方法
            //    if(typeof this.cancel==="function"){
            //        this.cancel()
            //    }
           }
       }
    }
</script>