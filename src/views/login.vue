<template>
  <div class="login">
    <div class="contance">
      <img src="../assets/avatar.jpg" alt="">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
  <el-form-item  prop="username">
    <!-- 字体图标需要看文件，前面需要再加类名 -->
    <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon='myicon myicon-user'></el-input>
  </el-form-item>
  <el-form-item  prop="password">
    <el-input v-model="loginForm.password"  placeholder="请输入密码" prefix-icon='myicon myicon-key'></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" class="loginbtn"  @click="login">登录</el-button>
  </el-form-item>
</el-form>
    </div>
  </div>
</template>
<script>
// 引用axios请求
import { login } from '@/api/user_index.js'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 再次实现验证
    login () {
      // ref 是个标签加个标识，this.$refs是获得这些标识的对象，里面包含着ref标识的数据
      // 可以调用表单的validate方法实现数据的验证，在完成验证的时候会调用回调函数，这个回调函数有一个参数valid，如果这个参数为true，则验证成功否则失败
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.loginForm)
          login(this.loginForm)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                // 登录成功之后将token值进行本地存储,为了方便登录的状态保持
                localStorage.setItem('itcast_massages_token', res.data.data.token)

                // 登录成功之后进行编程式跳转
                this.$router.push({ name: 'home' })
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'error'
                })
              }
            }).catch(err => {
              console.log(err)
              this.$message({
                message: '登录失败',
                type: 'error'
              })
            })
        } else {
          this.$message({
            message: '账号不合法，请重新输入',
            type: 'error'
          })
          return false
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
.login{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color:#2f4050;
  .contance{
   width: 400px;
   background-color: #fff;
   position: absolute;
   top: 25%;
   left: 33%;
   padding: 0 30px;

   form{
     position: relative;
     top: 0;
     left: 0;
     .loginbtn{
       width: 100%;
       margin-bottom: 20px;
       .el-input__inner{
         margin-top:-20px ;
       }
     }
   }
   img{
     border-radius: 50%;
     position: relative;
     top:-66px;
     left:33%;
     border: 10px solid rgba(245, 245,255, 0.7);
     margin-bottom: -40px

   }
  }
}
</style>
