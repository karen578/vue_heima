<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input
      placeholder="请输入搜索内容"
      v-model="userObj.query"
      class="input-with-select"
      style="width:300px"
      @keyup.native.enter="init"
    >
      <!-- 搜索框的实现 因为传递的参数有关键字，所以直接获取所有参数的方法能实现搜索，因为任何字符串都包含空字符串 -->
      <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
    </el-input>
    <el-button type="success" plain style="margin-left:10px">添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch v-model="value2" active-color inactive-color="#ccc"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="bottom" effect="light">
            <el-button
              size="mini"
              plain
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-button size="mini" plain type="danger" icon="el-icon-delete"></el-button>
          <el-button size="mini" plain type="warning" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userObj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getAllUserList } from "@/api/user_index.js";
export default {
  data() {
    return {
      total: 0,
      value2: true,
      userObj: {
        // 搜索关键字
        query: "",
        pagenum: 1,
        pagesize: 4
      },
      //表格数据源，他是一个数组，里面每个元素都是对象
      userList: []
    };
  },
  methods: {
    handleSizeChange(val) {
      //修改全局的页面显示条数
      this.userObj.pagesize = val;
      // 需要重新渲染页面
      this.init();

      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.userObj.pagenum = val;
      //需要重新渲染页面
      this.init();
    },
    init() {
      //   发送axios请求
      getAllUserList(this.userObj)
        .then(res => {
          console.log(res);
          // 状态要写正确
          if (res.data.meta.status === 200) {
            //获取到总页数
            this.total = res.data.data.total;
            // console.log(this.total);
            // 把获取到的数据渲染到页面上
            this.userList = res.data.data.users;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.users {
  height: 100%;
  background-color: #e9eef3;
  .el-table {
    margin-top: 10px;
  }
}
</style>
