<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入搜索内容" v-model="userObj.query" class="input-with-select" style="width:300px">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" plain style="margin-left:10px">添加用户</el-button>
    <!-- 表格 -->
     <el-table
      :data="userList"
      style="width: 100%"
      border>
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column label="用户状态" width="100">
      <template slot-scope="scope">
       <el-switch
  v-model="value2"
  active-color=""
  inactive-color="#ccc">
</el-switch>
      </template>
    </el-table-column>
       <el-table-column  label="操作" width="300" >
      <template slot-scope="scope">
          <el-tooltip content="编辑" placement="bottom" effect="light">
     <el-button size="mini" plain type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
    </el-tooltip>
        <el-button size="mini" plain type="danger" icon="el-icon-delete"></el-button>
        <el-button size="mini" plain type="warning" icon="el-icon-check"></el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllUserList } from '@/api/user_index.js'
export default {
  data () {
    return {
      value2: true,
      userObj: {
        // 搜索关键字
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 表格数据源，他是一个数组，里面每个元素都是对象
      userList: []
    }
  },
  mounted () {
    //   发送axios请求
    getAllUserList(this.userObj)
      .then(res => {
        console.log(res)
        // 状态要写正确
        if (res.data.meta.status === 200) {
          // 把获取到的数据渲染到页面上
          this.userList = res.data.data.users
        }
      }).catch(err => {
        console.log(err)
      })
  }

}
</script>
<style lang="less" scoped>
.users{
    height: 100%;
    background-color: #e9eef3;
    .el-table{
        margin-top: 10px;
    }
}
</style>
