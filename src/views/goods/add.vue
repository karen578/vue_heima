<template>
  <div class="list">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom:20px">添加商品信息</div>

    <!-- 因为标签页的侧右边是一个表格，所以决定用表单的模板 -->
    <el-form ref="addform" :model="addform" label-width="100px">
      <!-- 步骤条 -->
      <!-- 因为active是一个num所以-0可以进行js的隐性转换，active=activeName是为了关联器步骤条和标签页 -->
      <el-steps :active="activeName-0" finish-status="success" style="margin-bottom:40px">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
        <el-step title="步骤 5"></el-step>
      </el-steps>
      <!-- 标签页 -->
      <el-tabs v-model="activeName" tab-position="left">
        <!-- activeName在标签页中可以决定页面在哪个地方显示，决定name步骤条的索引值是从0开始的 -->
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称">
            <el-input v-model="addform.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addform.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addform.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addform.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- v-model是选择某个选项后会自动的将实际值赋值给v-model所绑定的属性
            props里面的数据是展示到页面或者我们需要的数据-->
            <el-cascader
              v-model="addform.goods_cat"
              :options="cateList"
              change-on-select
              :props="defaultprop"
              @change="cateSelect"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button>取消</el-button>
            <el-button type="primary">确定</el-button>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <!-- action// 文件上传的目标路径：基准路径+路由
             :file-list:上传文件的列表
             不需要发送axios请求，因为element-ui的框架已经封装好了图片上传的请求，不过是没有token值，
          需要我们在请求头里面设置token :headers-->
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            list-type="picture"
            :headers="getToken()"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { getAllCateList } from '@/api/cate_index.js'
export default {
  data () {
    return {
      fileList: [],
      defaultprop: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      },
      cateList: [],
      addform: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: '',
        // 根据接口文档知道pics,attrs是一个数组
        pics: [],
        attrs: [],
        goods_introduce: ''
      },
      activeName: ''
    }
  },
  methods: {
    //   发送token值得函数
    getToken () {
      var token = localStorage.getItem('itcast_massages_token')
      // 返回一个一个对象
      return { Authorization: token }
    },
    // 图片上传成功时触发
    handleSuccess (response) {
      //  response 文件上传成功返回文件的名称
      console.log(response)
      if (response.meta.status === 200) {
        this.addform.pics.push({ pic: response.data.tmp_path })
      }
    },
    // 图片预览
    handlePreview (file) {
      console.log(file)
    },
    // 图片移除时触发
    handleRemove (file) {
      //  file 就是当前删除的图片的地址，并不会把存储的图片给删除了
      var current = file.response.data.tmp_path
      for (var i = 0; i < this.addform.pics.length; i++) {
        if (this.addform.pics[i].pic === current) {
          this.addform.pics.splice(i, 1)
          break
        }
      }
    },

    //   选择级联选项时触发,万物皆对象，可以传入obj，打印obj发现是一个数组，里面是商品分类 ID
    cateSelect (obj) {
      this.addform.goods_cat = obj.join(',')
    }
  },
  mounted () {
    getAllCateList(3)
      .then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.cateList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
</style>
