<template>
  <div class="list">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input
      placeholder="请输入搜索内容"
      v-model="goodsObj.query"
      class="input-with-select"
      style="width:300px"
      @keyup.native.enter="inti"
    >
      <!-- 搜索框的实现 因为传递的参数有关键字，所以直接获取所有参数的方法能实现搜索，因为任何字符串都包含空字符串 -->
      <el-button slot="append" icon="el-icon-search" @click="inti"></el-button>
    </el-input>
    <!-- 添加用户 -->
    <el-button type="success" plain style="margin-left:10px" @click="$router.push({name: 'add'})">添加用户</el-button>
    <el-table :data="goodsList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="480"></el-table-column>
      <el-table-column prop="goods_price" label="价格" width="180"></el-table-column>
      <el-table-column prop="goods_status" label="商品状态"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="bottom" effect="light">
            <el-button
              size="mini"
              plain
              type="primary"
              icon="el-icon-edit"
            ></el-button>
          </el-tooltip>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            title="删除"
            style="margin-left:10px"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="warning"
            icon="el-icon-check"
            title="角色分配"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsObj.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="goodsObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getAllGoodsList } from '@/api/goods_index.js'
export default {
  data () {
    return {
      goodsObj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 10,
      goodsList: []
    }
  },
  methods: {
    // 分页功能
    handleSizeChange (val) {
      this.goodsObj.pagesize = val
      this.inti()
    },
    handleCurrentChange (val) {
      // 获取到了当前页面数据
      this.goodsObj.pagenum = val
      //  重新刷新页面
      this.inti()
    },
    // 页面初始化
    inti () {
      getAllGoodsList(this.goodsObj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.goodsList = res.data.data.goods
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.inti()
  }
}
</script>

<style lang="less" scoped>
</style>
