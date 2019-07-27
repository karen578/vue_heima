<template>
    <div class="home">
        <el-container>
            <!-- 旁边部分的宽度一开始为自动 -->
  <el-aside width="auto">
      <div class="logo"></div>
      <!-- 导航菜单 -->
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="iscollapse"
      :router="true"
    :unique-opened='true'>
    <!-- 左侧栏菜单需要动态生成，所以需要进行循环， index的值是一个字符串所以需要加上引号 -->
      <el-submenu :index="frist.id+''" v-for="frist in menusData" :key="frist.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{frist.authName}}</span>
        </template>
        <el-menu-item :index="'/home/'+second.path" v-for="second in frist.children" :key="second.id">
            <i class="el-icon-menu"></i>
           {{second.authName}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
        <!-- 点击的时候是否关闭就取反 -->
        <i class="myicon myicon-menu toggle-btn" @click="iscollapse=!iscollapse"></i>
        <p class="system-title"> 电商后台管理系统</p>
        <a href="javascript:;">退出</a>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>
<script>
import { leftmenus } from '@/api/right_index.js'
export default {
  data () {
    return {
      // 是否合上的默认值为false
      iscollapse: false,
      menusData: []
    }
  },
  mounted () {
    leftmenus()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.menusData = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu{
        width: auto;
    }
    //如果是展开宽度就是200px，如果是合上宽度就是自动
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url('../assets/logo.png');
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    color: #989898;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome{
    color: #e9eef3;
  }
}
</style>
