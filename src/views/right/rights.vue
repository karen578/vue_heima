<template>
  <div class="roles">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="rightData" border style="width: 100%"  >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限管理" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="" label="层级">
        <!-- 需要层级0改成一级  prop在表格内是属性，不能用，所以需要用到自定义模板。里面能获取到row的数据-->
        <template slot-scope="scope">
            <!-- 过滤器的使用方法是 需要处理的数据 |(管道符) 过滤器的名字 -->
          {{scope.row.level|transText}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRight } from '@/api/right_index.js'
export default {
  data () {
    return {
      rightData: []
    }
  },
  // 过滤器
  filters: {
    // 过滤器是一个函数，所以需要return数据
    transText (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  //   钩子函数获取到权限的全部数据
  mounted () {
    // 根据文档知道获取权限列表的值: list 或 tree , list 列表显示权限, tree 树状显示权限,`参数是url参数:type，所以需要传入字符串为list
    getAllRight('list')
      .then(res => {
        // console.log(res)
        this.rightData = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
</style>
